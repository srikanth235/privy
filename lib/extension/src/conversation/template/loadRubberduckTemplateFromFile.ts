import * as vscode from "vscode";
import { RubberduckTemplateLoadResult } from "./RubberduckTemplateLoadResult";
import { parseRubberduckTemplate } from "./parseRubberduckTemplate";
import { readFileContent } from "../../vscode/readFileContent";

export const loadConversationFromFile = async (
  file: vscode.Uri
): Promise<RubberduckTemplateLoadResult> => {
  try {
    const parseResult = parseRubberduckTemplate(await readFileContent(file));

    if (parseResult.type === "error") {
      return {
        type: "error" as const,
        file,
        error: parseResult.error,
      };
    }

    return {
      type: "success" as const,
      file,
      template: parseResult.template,
    };
  } catch (error) {
    return {
      type: "error" as const,
      file,
      error,
    };
  }
};
