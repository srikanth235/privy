import * as vscode from "vscode";
import { RubberduckTemplate } from "./RubberduckTemplate";

export type RubberduckTemplateLoadResult =
  | {
      type: "success";
      file: vscode.Uri;
      template: RubberduckTemplate;
    }
  | {
      type: "error";
      file: vscode.Uri;
      error: unknown;
    };
