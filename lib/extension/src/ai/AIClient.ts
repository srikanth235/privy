import {
  OpenAITextEmbeddingResponse,
  InstructionPrompt,
  TextStreamingModel,
  embed,
  llamacpp,
  LlamaCppApiConfiguration,
  ollama,
  openai,
  streamText,
} from "modelfusion";
import * as vscode from "vscode";
import { z } from "zod";
import { Logger } from "../logger";
import { ApiKeyManager } from "./ApiKeyManager";

function getProviderBaseUrl(): string {
  let defaultUrl = "http://localhost:8080/";
  if (getProvider() === "Ollama") {
    defaultUrl = "http://localhost:11434";
  }
  return (
    vscode.workspace
      .getConfiguration("privy")
      .get("providerBaseUrl", defaultUrl)
      // Ensure that the base URL doesn't have a trailing slash:
      .replace(/\/$/, "")
  );
}

function getModel(): string {
  let model = z
    .enum(["mistral:instruct", "codellama:instruct", "custom"])
    .parse(vscode.workspace.getConfiguration("privy").get("model"));
  if (model === "custom") {
    return vscode.workspace.getConfiguration("privy").get("customModel", "");
  }
  return model;
}

function getProvider() {
  return z
    .enum(["llamafile", "llama.cpp", "Ollama", "OpenAI"])
    .parse(vscode.workspace.getConfiguration("privy").get("provider"));
}

function getPromptTemplate() {
  const model = getModel();
  if (model.startsWith("mistral")) {
    return ollama.prompt.Mistral;
  } else if (model.startsWith("deepseek")) {
    return ollama.prompt.Text;
  }

  return ollama.prompt.Llama2;
}

export class AIClient {
  private readonly apiKeyManager: ApiKeyManager;
  private readonly logger: Logger;

  constructor({
    apiKeyManager,
    logger,
  }: {
    apiKeyManager: ApiKeyManager;
    logger: Logger;
  }) {
    this.apiKeyManager = apiKeyManager;
    this.logger = logger;
  }

  private async getProviderApiConfiguration() {
    if (getProvider().startsWith("llama")) {
      return new LlamaCppApiConfiguration({ baseUrl: getProviderBaseUrl() });
    }

    return ollama.Api({ baseUrl: getProviderBaseUrl() });
  }

  async getTextStreamingModel({
    maxTokens,
    stop,
    temperature = 0,
  }: {
    maxTokens: number;
    stop?: string[] | undefined;
    temperature?: number | undefined;
  }): Promise<TextStreamingModel<InstructionPrompt>> {
    const provider = getProvider();

    if (provider.startsWith("llama")) {
      return llamacpp
        .CompletionTextGenerator({
          api: await this.getProviderApiConfiguration(),
          // TODO the prompt format needs to be configurable for non-Llama2 models
          promptTemplate: llamacpp.prompt.Llama2,
          maxGenerationTokens: maxTokens,
          stopSequences: stop,
          temperature,
        })
        .withInstructionPrompt();
    }

    return ollama
      .CompletionTextGenerator({
        api: await this.getProviderApiConfiguration(),
        promptTemplate: getPromptTemplate(),
        model: getModel(),
        maxGenerationTokens: maxTokens,
        stopSequences: stop,
        temperature,
      })
      .withInstructionPrompt();
  }

  async streamText({
    prompt,
    maxTokens,
    stop,
    temperature = 0,
  }: {
    prompt: string;
    maxTokens: number;
    stop?: string[] | undefined;
    temperature?: number | undefined;
  }) {
    this.logger.log(["--- Start prompt ---", prompt, "--- End prompt ---"]);
    return streamText({
      model: await this.getTextStreamingModel({ maxTokens, stop, temperature }),
      prompt: {
        instruction: prompt,
      },
    });
  }

  async generateEmbedding({ input }: { input: string }) {
    try {
      const { embedding, rawResponse } = await embed({
        model: openai.TextEmbedder({
          api: await this.getProviderApiConfiguration(),
          model: "text-embedding-ada-002",
        }),
        value: input,
        fullResponse: true,
      });

      return {
        type: "success" as const,
        embedding,
        totalTokenCount: (rawResponse as OpenAITextEmbeddingResponse).usage
          .total_tokens,
      };
    } catch (error: any) {
      console.log(error);

      return {
        type: "error" as const,
        errorMessage: error?.message,
      };
    }
  }
}
