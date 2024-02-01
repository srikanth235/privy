import { Logger } from "../logger";

export class AutoCompletePromptTemplateProvider {
  private readonly logger: Logger;
  constructor({ logger }: { logger: Logger }) {
    this.logger = logger;
  }

  public getAutoCompletePrompt(
    model: string,
    {
      additionalContext,
      suffix,
      prefix,
    }: { additionalContext: string; suffix: string; prefix: string }
  ): { prompt: string; stop: string[] } {
    if (model.startsWith("deepseek")) {
      return {
        prompt: `<｜fim▁begin｜>${additionalContext}\n${prefix}<｜fim▁hole｜>${suffix}<｜fim▁end｜>`,
        stop: [`<｜fim▁begin｜>`, `<｜fim▁hole｜>`, `<｜fim▁end｜>`, `<END>`],
      };
    }

    if (model.startsWith("stable-code")) {
      return {
        prompt: `<fim_prefix>${additionalContext}\n${prefix}<fim_suffix>${suffix}<fim_middle>`,
        stop: [`<|endoftext|>`],
      };
    }

    // Default is CodeLLama style.
    return {
      prompt: `<PRE> ${additionalContext}\n${prefix} <SUF>${suffix} <MID>`,
      stop: [`<PRE>`, `<SUF>`, `<MID>`, `<END>`, `EOT`],
    };
  }
}
