import {
  Llama2Prompt,
  OpenAITextEmbeddingResponse,
  InstructionPrompt,
  TextStreamingModel,
  embed,
  llamacpp,
  LlamaCppApiConfiguration,
  ollama,
  openai,
  streamText,
  MistralInstructPrompt,
} from "modelfusion";
import * as vscode from "vscode";
import { z } from "zod";
import { Logger } from "../logger";
import { ApiKeyManager } from "./ApiKeyManager";

function getProviderBaseUrl(): string {
  let defaultUrl = "http://localhost:8080/";
  if (getProvider() === "Ollama") {
    defaultUrl = "http://localhost:11434";
  } else if (getProvider() === "OpenAI") {
    defaultUrl = "https://api.openai.com/v1/";
  }
  return (
    vscode.workspace
      .getConfiguration("privy")
      .get("providerBaseUrl", defaultUrl)
      // Ensure that the base URL doesn't have a trailing slash:
      .replace(/\/$/, "")
  );
}

function getModel() {
  return z
    .enum([
      "gpt-4",
      "gpt-4-32k",
      "gpt-4-1106-preview",
      "gpt-3.5-turbo",
      "gpt-3.5-turbo-16k",
      "gpt-3.5-turbo-1106",
      "Mistral (7B)",
      "CodeLlama Instruct (7B)",
    ])
    .parse(vscode.workspace.getConfiguration("privy").get("model"));
}

function getProvider() {
  return z
    .enum(["llamafile", "llama.cpp", "Ollama", "OpenAI"])
    .parse(vscode.workspace.getConfiguration("privy").get("provider"));
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
    const apiKey = await this.apiKeyManager.getOpenAIApiKey();

    if (getProvider().startsWith("llama")) {
      return new LlamaCppApiConfiguration({ baseUrl: getProviderBaseUrl() });
    }

    if (getProvider() === "Ollama") {
      return ollama.Api({ baseUrl: getProviderBaseUrl() });
    }

    if (apiKey == undefined) {
      throw new Error(
        "No OpenAI API key found. " +
          "Please enter your OpenAI API key with the 'Privy: Enter OpenAI API key' command."
      );
    }

    return openai.Api({
      baseUrl: getProviderBaseUrl(),
      apiKey,
    });
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
    const modelConfiguration = getModel();
    const provider = getProvider();

    if (provider.startsWith("llama")) {
      return llamacpp
        .TextGenerator({
          api: await this.getProviderApiConfiguration(),
          maxGenerationTokens: maxTokens,
          stopSequences: stop,
          temperature,
        })
        .withTextPromptTemplate(Llama2Prompt.instruction());
    }

    if (provider === "Ollama") {
      return ollama
        .ChatTextGenerator({
          api: await this.getProviderApiConfiguration(),
          model:
            getModel() === "CodeLlama Instruct (7B)" ? "codellama" : "mistral",
        })
        .withInstructionPrompt();
    }
    return openai
      .ChatTextGenerator({
        api: await this.getProviderApiConfiguration(),
        // @ts-ignore
        model: modelConfiguration,
        maxGenerationTokens: maxTokens,
        stopSequences: stop,
        temperature,
        frequencyPenalty: 0,
        presencePenalty: 0,
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

    return streamText(
      await this.getTextStreamingModel({ maxTokens, stop, temperature }),
      { instruction: prompt }
    );
  }

  async generateEmbedding({ input }: { input: string }) {
    try {
      const { embedding, response } = await embed(
        openai.TextEmbedder({
          api: await this.getProviderApiConfiguration(),
          model: "text-embedding-ada-002",
        }),
        input,
        { fullResponse: true }
      );

      return {
        type: "success" as const,
        embedding,
        totalTokenCount: (response as OpenAITextEmbeddingResponse).usage
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
