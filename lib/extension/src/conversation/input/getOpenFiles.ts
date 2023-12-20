import * as vscode from "vscode";
import { getActiveEditor } from "../../vscode/getActiveEditor";

export const getOpenFiles = async () => {
  const contextDocuments = vscode.workspace.textDocuments.filter(
    (document) => document.uri.scheme === "file"
  );

  return contextDocuments.map((document) => {
    return {
      name: document.fileName,
      language: document.languageId,
      content: document.getText(),
    };
  });
};
