import * as vscode from "vscode";
import { AIClient } from "../ai/AIClient";
import { Logger } from "../logger";
import { languages } from "./languages";
import { AutoCompletePromptTemplateProvider } from "./AutoCompleteTemplateProvider";

export class AutoCompleteProvider
  implements vscode.InlineCompletionItemProvider
{
  private mode: "automatic" | "disabled" | "manual" = "automatic";
  private ai: AIClient;
  private readonly logger: Logger;
  private debouncer: NodeJS.Timeout | undefined;
  private debounceWait: number = 300;
  // TODO: Should be made configurable
  private numLinesAsContext: number = 300;
  private autoCompleteTemplateProvider: AutoCompletePromptTemplateProvider;

  constructor({ ai, logger }: { ai: AIClient; logger: Logger }) {
    this.logger = logger;
    this.ai = ai;
    this.setConfiguration();
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (
        event.affectsConfiguration("privy") ||
        event.affectsConfiguration("editor.inlineSuggest")
      ) {
        this.setConfiguration();
      }
    });
    this.autoCompleteTemplateProvider = new AutoCompletePromptTemplateProvider({
      logger,
    });
  }

  private setConfiguration() {
    if (
      !vscode.workspace
        .getConfiguration("editor")
        .get("inlineSuggest.enabled", true)
    ) {
      this.mode = "disabled";
    } else {
      this.mode = vscode.workspace
        .getConfiguration("privy")
        .get("autocomplete.mode", "automatic");
      this.debounceWait = vscode.workspace
        .getConfiguration("privy")
        .get("autocomplete.debounceWait", 300);
      this.logger.debug([
        "Debounce wait time: ",
        this.mode,
        this.debounceWait.toString(),
      ]);
    }
  }
  private shouldSkipCompletion(
    context: vscode.InlineCompletionContext,
    token: vscode.CancellationToken
  ): boolean {
    if (this.mode === "disabled") {
      return true;
    }
    if (
      context.triggerKind === vscode.InlineCompletionTriggerKind.Automatic &&
      this.mode === "manual"
    ) {
      console.debug("Skip automatic trigger when triggerMode is manual.");
      return true;
    }
    if (
      context.triggerKind === vscode.InlineCompletionTriggerKind.Automatic &&
      vscode.window.activeTextEditor &&
      !vscode.window.activeTextEditor.selection.isEmpty
    ) {
      // Text selected, don't trigger inline completion.
      return true;
    }
    if (token?.isCancellationRequested) {
      return true;
    }
    return false;
  }

  private getAdditionalContext(document: vscode.TextDocument) {
    const lang = languages[document.languageId as keyof typeof languages];
    if (!lang) {
      return "";
    }
    const language = `${lang.comment?.start || ""} Language: ${lang.name}${
      lang.comment?.end || ""
    }`;

    const path = `${
      lang.comment?.start || ""
    } File uri: ${document.uri.toString()}${lang.comment?.end || ""}`;

    return `${language}\n${path}`;
  }

  private getSurroundingCodeContext(
    document: vscode.TextDocument,
    position: vscode.Position
  ): { prefix: string; suffix: string } {
    const line = position.line;
    const startLine = Math.max(0, line - this.numLinesAsContext);
    const endLine = line + this.numLinesAsContext;

    const prefixRange = new vscode.Range(
      startLine,
      0,
      line,
      position.character
    );
    const suffixRange = new vscode.Range(line, position.character, endLine, 0);

    const prefix = document.getText(prefixRange);
    const suffix = document.getText(suffixRange);

    return { prefix, suffix };
  }
  public async provideInlineCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    context: vscode.InlineCompletionContext,
    token: vscode.CancellationToken
  ): Promise<vscode.InlineCompletionItem[] | null> {
    return new Promise((resolve) => {
      if (this.debouncer) {
        clearTimeout(this.debouncer);
      }
      this.debouncer = setTimeout(async () => {
        if (this.shouldSkipCompletion(context, token)) {
          this.logger.debug("Skipping completion");
          return null;
        }
        const { prefix, suffix } = this.getSurroundingCodeContext(
          document,
          position
        );
        const additionalContext = this.getAdditionalContext(document);
        const { prompt, stop } =
          this.autoCompleteTemplateProvider.getAutoCompletePrompt(
            this.ai.getModel(),
            { additionalContext, prefix, suffix }
          );
        const response = await this.ai.generateText({
          prompt: prompt,
          stop: stop,
        });
        this.logger.debug(["Response: ", response]);
        return resolve([
          {
            insertText: response,
            range: new vscode.Range(position, position),
          },
        ]);
      }, this.debounceWait);
    });
  }
}
