import * as vscode from "vscode";
import { loadConversationFromFile } from "./loadRubberduckTemplateFromFile";
import { RubberduckTemplateLoadResult } from "./RubberduckTemplateLoadResult";

const TEMPLATE_GLOB = ".privy/template/**/*.rdt.md";

export async function loadRubberduckTemplatesFromWorkspace(): Promise<
  Array<RubberduckTemplateLoadResult>
> {
  const files = await vscode.workspace.findFiles(TEMPLATE_GLOB);
  return await Promise.all(files.map(loadConversationFromFile));
}
