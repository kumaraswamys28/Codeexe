import Editor from "@monaco-editor/react";
import dracula from "monaco-themes/themes/Dracula.json";
import monokai from "../LAZY.json";

const CodeEditor = ({ language, code, setCode, theme }) => {
  const monacoThemeMap = {
    "dark-blue": "monokai",
    light: "light",
    dracula: "dracula",
  };

  const handleEditorWillMount = (monaco) => {
    monaco.editor.defineTheme("dracula", dracula);
    monaco.editor.defineTheme("monokai", monokai);
  };

  return (
    <div className="h-full w-full bg-secondary">
     
      <Editor
  height="100%"
  width="100%"
        language={language}
  value={code}
  onChange={setCode}
  beforeMount={handleEditorWillMount}
  theme={monacoThemeMap[theme]}
  options={{
    fontSize: 16,
    minimap: { enabled: false },
    autoClosingBrackets: "always",
    autoClosingQuotes: "always",
    autoSurround: "languageDefined",
    formatOnType: true,
    formatOnPaste: true,
    smoothScrolling: true,
    tabSize: 2,
    insertSpaces: true,
    quickSuggestions: { other: true, comments: true, strings: true },
    wordBasedSuggestions: true,
    suggestOnTriggerCharacters: true,
    parameterHints: { enabled: true },
    acceptSuggestionOnEnter: "on",
    snippetSuggestions: "inline",
    contextmenu: true
  }}
/>

    </div>
  );
};

export default CodeEditor;
