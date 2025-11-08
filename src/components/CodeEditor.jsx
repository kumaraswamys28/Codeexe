import Editor from "@monaco-editor/react";
import dracula from "monaco-themes/themes/Dracula.json";
import monokai from "../LAZY.json";
import { useEffect, useRef } from "react";

const CodeEditor = ({ language, code, setCode, theme, onRun }) => {
  const monacoThemeMap = {
    "dark-blue": "monokai",
    light: "light",
    dracula: "dracula",
  };


  


  const handleEditorWillMount = (monaco) => {
    console.log(language);
    
    
    monaco.editor.defineTheme("dracula", dracula);
    monaco.editor.defineTheme("monokai", monokai);
  };
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const onRunRef = useRef(onRun);

  // keep latest onRun in ref (so closure always fresh)
  useEffect(() => {
    onRunRef.current = onRun;
  }, [onRun]);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    monacoRef.current = monaco;

    editor.addAction({
      id: "run-code",
      label: "Run Code (Ctrl+Enter)",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      run: () => {
        if (typeof onRunRef.current === "function") {
          onRunRef.current();
        } else {
          console.error("onRun is not a function");
        }
      },
    });
  }

  return (
    <div className="h-full w-full bg-secondary">
     
      <Editor
  height="100%"
  width="100%"
        language={language}
  value={code}
  onChange={setCode}
  beforeMount={handleEditorWillMount}
              onMount={handleEditorDidMount}

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
