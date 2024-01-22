# Set Up Privy with locally running LLMs

Privy works best with local models, e.g. [Mistral](https://mistral.ai/),
[CodeLLama](https://github.com/facebookresearch/codellama), etc. You can run these models using various solutions like [Ollama](https://github.com/jmorganca/ollama), [llamafile](https://github.com/Mozilla-Ocho/llamafile), [llama.cpp](https://github.com/ggerganov/llama.cpp) etc.

You need to configure the LLM and the corresponding provider that you want to use in the settings.

# Settings

- **privy.provider**(`required`): Pick the platform that is being used for running LLMs locally. There is support for using OpenAI, but this will affect the privacy aspects of the solution. The default is `Ollama`.
- **privy.providerUrl**(`required`): The URL of the platform that is being used for running LLMs locally. The default is `http://localhost:11434`.
- **privy.model**: Select the LLM that you want to use. Currently, supports Mistral and CodeLLama. If you want to use other LLMs, please select `custom` and configure `privy.customModel` accordingly.
- **privy.customModel**: If you want to pick any other models running on your Ollama, please input their name.
- **privy.logger.level**: Specify the verbosity of logs that will appear in 'Privy: Show Logs'.
