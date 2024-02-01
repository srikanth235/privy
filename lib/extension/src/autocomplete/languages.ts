export type Language =
  | "typescript"
  | "javascript"
  | "javascriptreact"
  | "typescriptreact"
  | "html"
  | "scss"
  | "sass"
  | "css"
  | "json"
  | "yaml"
  | "xml"
  | "vue"
  | "markdown"
  | "java"
  | "kotlin"
  | "swift"
  | "objective-c"
  | "rust"
  | "python"
  | "c"
  | "cpp"
  | "csharp"
  | "cpp"
  | "go"
  | "ruby"
  | "sql"
  | "php"
  | "bat"
  | "shellscript";

export type LanguageDescriptor = {
  name: string;
  extensions: string[];
  filenames?: string[];
  comment?: { start: string; end?: string };
};

export const languages: { [key in Language]: LanguageDescriptor } = {
  typescript: {
    name: "Typescript",
    extensions: [".ts", ".tsx", ".cts", ".mts"],
    comment: { start: "//" },
  },

  javascript: {
    name: "JavaScript",
    extensions: [".js", ".jsx", ".mjs"],
    comment: { start: "//" },
  },

  javascriptreact: {
    name: "JavaScript React",
    extensions: [".jsx", ".tsx"],
    comment: { start: "//" },
  },

  typescriptreact: {
    name: "TypeScript React",
    extensions: [".tsx", ".jsx"],
    comment: { start: "//" },
  },

  html: {
    name: "HTML",
    extensions: [".html", ".htm"],
    comment: { start: "<!--", end: "-->" },
  },

  scss: {
    name: "SCSS",
    extensions: [".scss"],
    comment: { start: "//" },
  },

  sass: {
    name: "Sass",
    extensions: [".sass"],
    comment: { start: "//" },
  },

  css: {
    name: "CSS",
    extensions: [".css"],
  },

  json: {
    name: "JSON",
    extensions: [".json", ".jsonl", ".geojson"],
  },

  yaml: {
    name: "YAML",
    extensions: [".yaml", ".yml"],
    comment: { start: "#" },
  },

  xml: {
    name: "XML",
    extensions: [".xml"],
    comment: { start: "<!--", end: "-->" },
  },

  vue: {
    name: "Vue",
    extensions: [".vue"],
    comment: { start: "//" },
  },

  markdown: {
    name: "Markdown",
    extensions: [".md", ".markdown"],
    comment: { start: "<!--", end: "-->" },
  },

  java: {
    name: "Java",
    extensions: [".java"],
    comment: { start: "//" },
  },

  kotlin: {
    name: "Kotlin",
    extensions: [".kt", ".ktm", ".kts"],
    comment: { start: "//" },
  },

  swift: {
    name: "Swift",
    extensions: [".swift"],
    comment: { start: "//" },
  },

  "objective-c": {
    name: "Objective C",
    extensions: [".m", ".h", ".mm"],
    comment: { start: "//" },
  },

  rust: {
    name: "Rust",
    extensions: [".rs", ".rs.in"],
    comment: { start: "//" },
  },

  python: {
    name: "Python",
    extensions: [".py", ".pyi"],
    comment: { start: "#" },
  },

  c: {
    name: "C",
    extensions: [".c", ".h"],
    comment: { start: "//" },
  },

  cpp: {
    name: "C++",
    extensions: [".cpp", ".cxx", ".cc"],
    comment: { start: "//" },
  },

  csharp: {
    name: "C#",
    extensions: [".cs"],
    comment: { start: "//" },
  },

  go: {
    name: "Go",
    extensions: [".go"],
    comment: { start: "//" },
  },

  ruby: {
    name: "Ruby",
    extensions: [".rb"],
    comment: { start: "#" },
  },

  sql: {
    name: "SQL",
    extensions: [".sql"],
    comment: { start: "--" },
  },

  php: {
    name: "PHP",
    extensions: [
      ".aw",
      ".ctp",
      ".fcgi",
      ".inc",
      ".php",
      ".php3",
      ".php4",
      ".php5",
      ".phps",
      ".phpt",
    ],
    comment: { start: "//" },
  },

  bat: {
    name: "Batch",
    extensions: [".bat", ".cmd"],
    comment: { start: "REM" },
  },

  shellscript: {
    name: "Shell Script",
    extensions: [".sh"],
    comment: { start: "#" },
  },
};
