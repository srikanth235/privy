import { util, webviewApi } from "@privy/common";
import * as vscode from "vscode";
import { AIClient } from "../ai/AIClient";
import { Conversation } from "../conversation/Conversation";
import { ConversationType } from "../conversation/ConversationType";
import { resolveVariables } from "../conversation/input/resolveVariables";
import { DiffEditorManager } from "../diff/DiffEditorManager";
import { ChatModel } from "./ChatModel";
import { ChatPanel } from "./ChatPanel";
import { Logger } from "../logger";

export class ChatController {
  private readonly chatPanel: ChatPanel;
  private readonly chatModel: ChatModel;
  private readonly ai: AIClient;
  private readonly getConversationType: (
    id: string
  ) => ConversationType | undefined;
  private readonly diffEditorManager: DiffEditorManager;
  private readonly basicChatTemplateId: string;
  private readonly generateConversationId: () => string;
  private readonly logger: Logger;

  constructor({
    chatPanel,
    chatModel,
    ai,
    getConversationType,
    diffEditorManager,
    basicChatTemplateId,
    logger,
  }: {
    chatPanel: ChatPanel;
    chatModel: ChatModel;
    ai: AIClient;
    getConversationType: (id: string) => ConversationType | undefined;
    diffEditorManager: DiffEditorManager;
    basicChatTemplateId: string;
    logger: Logger;
  }) {
    this.chatPanel = chatPanel;
    this.chatModel = chatModel;
    this.ai = ai;
    this.getConversationType = getConversationType;
    this.diffEditorManager = diffEditorManager;
    this.basicChatTemplateId = basicChatTemplateId;
    this.logger = logger;
    this.generateConversationId = util.createNextId({
      prefix: "conversation-",
    });
  }

  private async updateChatPanel() {
    await this.chatPanel.update(this.chatModel);
  }

  private async addAndShowConversation<T extends Conversation>(
    conversation: T
  ): Promise<T> {
    this.chatModel.addAndSelectConversation(conversation);

    await this.showChatPanel();
    await this.updateChatPanel();

    return conversation;
  }

  async showChatPanel() {
    await vscode.commands.executeCommand("privy.chat.focus");
  }

  async receivePanelMessage(rawMessage: unknown) {
    const message = webviewApi.outgoingMessageSchema.parse(rawMessage);
    const type = message.type;

    switch (type) {
      case "enterOpenAIApiKey": {
        await vscode.commands.executeCommand("privy.enterOpenAIApiKey");
        break;
      }
      case "clickCollapsedConversation": {
        this.chatModel.selectedConversationId = message.data.id;
        await this.updateChatPanel();
        break;
      }
      case "sendMessage": {
        await this.chatModel
          .getConversationById(message.data.id)
          ?.answer(message.data.message);
        break;
      }
      case "startChat": {
        await this.createConversation(this.basicChatTemplateId);
        break;
      }
      case "deleteConversation": {
        this.chatModel.deleteConversation(message.data.id);
        await this.updateChatPanel();
        break;
      }
      case "exportConversation": {
        await this.chatModel
          .getConversationById(message.data.id)
          ?.exportMarkdown();
        break;
      }
      case "retry": {
        await this.chatModel.getConversationById(message.data.id)?.retry();
        break;
      }
      case "dismissError":
        await this.chatModel
          .getConversationById(message.data.id)
          ?.dismissError();
        break;
      case "insertPromptIntoEditor":
        await this.chatModel
          .getConversationById(message.data.id)
          ?.insertPromptIntoEditor();
        break;
      case "applyDiff":
      case "reportError": {
        // Architecture debt: there are 2 views, but 1 outgoing message type
        // These are handled in the Conversation
        break;
      }
      default: {
        const exhaustiveCheck: never = type;
        throw new Error(`unsupported type: ${exhaustiveCheck}`);
      }
    }
  }

  async createConversation(conversationTypeId: string) {
    try {
      const conversationType = this.getConversationType(conversationTypeId);

      if (conversationType == undefined) {
        throw new Error(`No conversation type found for ${conversationTypeId}`);
      }

      const variableValues = await resolveVariables(
        conversationType.variables,
        {
          time: "conversation-start",
        }
      );

      const result = await conversationType.createConversation({
        conversationId: this.generateConversationId(),
        ai: this.ai,
        updateChatPanel: this.updateChatPanel.bind(this),
        diffEditorManager: this.diffEditorManager,
        initVariables: variableValues,
        logger: this.logger,
      });

      if (result.type === "unavailable") {
        if (result.display === "info") {
          await vscode.window.showInformationMessage(result.message);
        } else if (result.display === "error") {
          await vscode.window.showErrorMessage(result.message);
        } else {
          await vscode.window.showErrorMessage("Required input unavailable");
        }

        return;
      }

      await this.addAndShowConversation(result.conversation);

      if (result.shouldImmediatelyAnswer) {
        await result.conversation.answer();
      }
    } catch (error: any) {
      console.log(error);
      await vscode.window.showErrorMessage(error?.message ?? error);
    }
  }
}
