import * as vscode from "vscode";
import { AIClient } from "./ai/AIClient";
import { ApiKeyManager } from "./ai/ApiKeyManager";
import { ChatController } from "./chat/ChatController";
import { ChatModel } from "./chat/ChatModel";
import { ChatPanel } from "./chat/ChatPanel";
import { ConversationTypesProvider } from "./conversation/ConversationTypesProvider";
import { DiffEditorManager } from "./diff/DiffEditorManager";
import { indexRepository } from "./index/indexRepository";
import { getVSCodeLogLevel, LoggerUsingVSCodeOutput } from "./logger";
import { AutoCompleteProvider } from "./autocomplete/AutoCompleteProvider";

export const activate = async (context: vscode.ExtensionContext) => {
  const apiKeyManager = new ApiKeyManager({
    secretStorage: context.secrets,
  });

  const mainOutputChannel = vscode.window.createOutputChannel("Privy");
  const indexOutputChannel = vscode.window.createOutputChannel("Privy Index");

  const vscodeLogger = new LoggerUsingVSCodeOutput({
    outputChannel: mainOutputChannel,
    level: getVSCodeLogLevel(),
  });
  vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration("privy.logger.level")) {
      vscodeLogger.setLevel(getVSCodeLogLevel());
    }
  });

  const hasOpenAIApiKey = await apiKeyManager.hasOpenAIApiKey();
  const chatPanel = new ChatPanel({
    extensionUri: context.extensionUri,
    apiKeyManager,
    hasOpenAIApiKey,
    logger: vscodeLogger,
  });

  const chatModel = new ChatModel();

  const conversationTypesProvider = new ConversationTypesProvider({
    extensionUri: context.extensionUri,
  });

  await conversationTypesProvider.loadConversationTypes();

  const ai = new AIClient({
    apiKeyManager,
    logger: vscodeLogger,
  });

  const chatController = new ChatController({
    chatPanel,
    chatModel,
    ai,
    diffEditorManager: new DiffEditorManager({
      extensionUri: context.extensionUri,
    }),
    getConversationType(id: string) {
      return conversationTypesProvider.getConversationType(id);
    },
    basicChatTemplateId: "chat-en",
    logger: vscodeLogger,
  });

  chatPanel.onDidReceiveMessage(
    chatController.receivePanelMessage.bind(chatController)
  );

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("privy.chat", chatPanel),

    vscode.commands.registerCommand("privy.startConversation", (templateId) =>
      chatController.createConversation(templateId)
    ),

    vscode.commands.registerCommand("privy.diagnoseErrors", () => {
      chatController.createConversation("diagnose-errors");
    }),
    vscode.commands.registerCommand("privy.explainCode", () => {
      chatController.createConversation("explain-code");
    }),
    vscode.commands.registerCommand("privy.findBugs", () => {
      chatController.createConversation("find-bugs");
    }),
    vscode.commands.registerCommand("privy.generateCode", () => {
      chatController.createConversation("generate-code");
    }),
    vscode.commands.registerCommand("privy.generateUnitTest", () => {
      chatController.createConversation("generate-unit-test");
    }),
    vscode.commands.registerCommand("privy.startChat", () => {
      chatController.createConversation("chat-en");
    }),
    vscode.commands.registerCommand("privy.editCode", () => {
      chatController.createConversation("edit-code");
    }),
    vscode.commands.registerCommand("privy.startCustomChat", async () => {
      const items = conversationTypesProvider
        .getConversationTypes()
        .map((conversationType) => ({
          id: conversationType.id,
          label: conversationType.label,
          description: (() => {
            const tags = conversationType.tags;
            return tags == null
              ? conversationType.source
              : `${conversationType.source}, ${tags.join(", ")}`;
          })(),
          detail: conversationType.description,
        }));

      const result = await vscode.window.showQuickPick(items, {
        title: `Start Custom Chat…`,
        matchOnDescription: true,
        matchOnDetail: true,
        placeHolder: "Select conversation type…",
      });

      if (result == undefined) {
        return; // user cancelled
      }

      await chatController.createConversation(result.id);
    }),
    vscode.commands.registerCommand("privy.touchBar.startChat", () => {
      chatController.createConversation("chat-en");
    }),
    vscode.commands.registerCommand("privy.showChatPanel", async () => {
      await chatController.showChatPanel();
    }),
    vscode.commands.registerCommand("privy.getStarted", async () => {
      await vscode.commands.executeCommand("workbench.action.openWalkthrough", {
        category: `Privy.privy-vscode#privy`,
      });
    }),
    vscode.commands.registerCommand("privy.openSettings", async () => {
      await vscode.commands.executeCommand(
        "workbench.action.openSettings",
        `@ext:privy.privy-vscode`
      );
    }),
    vscode.commands.registerCommand("privy.reloadTemplates", async () => {
      await conversationTypesProvider.loadConversationTypes();
      vscode.window.showInformationMessage("Privy templates reloaded.");
    }),

    vscode.commands.registerCommand("privy.showLogs", () => {
      mainOutputChannel.show(true);
    }),

    vscode.commands.registerCommand("privy.indexRepository", () => {
      indexRepository({
        ai: ai,
        outputChannel: indexOutputChannel,
      });
    }),

    vscode.languages.registerInlineCompletionItemProvider(
      { pattern: "**" },
      new AutoCompleteProvider({ ai: ai, logger: vscodeLogger })
    )
  );

  return Object.freeze({
    async registerTemplate({ template }: { template: string }) {
      conversationTypesProvider.registerExtensionTemplate({ template });
      await conversationTypesProvider.loadConversationTypes();
    },
  });
};

export const deactivate = async () => {
  // noop
};
