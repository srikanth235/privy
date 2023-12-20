import { vscodeApi } from "./VsCodeApi";
import { webviewApi } from "@privy/common";

export type SendMessage = (message: webviewApi.OutgoingMessage) => void;

export const sendMessage: SendMessage = (message) => {
  vscodeApi.postMessage(message);
};
