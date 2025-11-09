import Editor from "@monaco-editor/react";
import dracula from "monaco-themes/themes/Dracula.json";
import monokai from "../LAZY.json";
import { useEffect, useRef } from "react";

const CodeEditor = ({ language, code, setCode, theme,onChangeLanguage, onRun }) => {
  const monacoThemeMap = {
    "dark-blue": "monokai",
    light: "light",
    dracula: "dracula",
  };
const LANGUAGES = [
  { id: "note", label: "note" },
  { id: "java", label: "java" },
  { id: "typescript", label: "typescript" },
  { id: "javascript", label: "javascript" },
  { id: "cpp", label: "cpp" },
  { id: "python", label: "python" },
  { id: "ruby", label: "ruby" },
  { id: "go", label: "go" }
];

  


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

  }, [onRun,]);

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

    





editor.addAction({
  id: "prev-language",
  label: "Previous Language (Ctrl+↑)",
  keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.UpArrow],
  run: () => {
    // --- Add these console logs for debugging ---
    console.log("DEBUG: Current language variable value:", language);
    console.log("DEBUG: Entire LANGUAGES list:", LANGUAGES.map(l => l.id));
    
    const ids = LANGUAGES.map((l) => l.id);
    const idx = ids.indexOf(language);

    console.log("DEBUG: Index of current language:", idx);

    // If idx is -1, it means the value in the 'language' variable 
    // doesn't match anything in your list. 
    if (idx === -1) {
        console.error("CRITICAL ERROR: Language variable value is invalid or misspelled!");
        return; // Stop execution if we can't find the language
    }

    const prevIdx = (idx - 1 + ids.length) % ids.length;
    const prevLang = ids[prevIdx];
    
    console.log(`DEBUG: Next language calculated: ${prevLang}`);

    onChangeLanguage(prevLang);
  },
});

editor.addAction({
  id: "next-language",
  label: "Next Language (Ctrl+↓)",
  keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.DownArrow],
  run: () => {
    // We rely on the external 'language' variable being correct here
    const currentLanguage = language; 

    const ids = LANGUAGES.map((l) => l.id);
    const idx = ids.indexOf(currentLanguage);

     if (idx === -1) {
        console.error(`Current language state '${currentLanguage}' not found in list. Cannot cycle.`);
        return; 
    }

    const nextIdx = (idx + 1) % ids.length;
    const nextLang = ids[nextIdx];
    
    console.log(`Next: Current(${currentLanguage}) -> Next(${nextLang})`);

    // Only call the state change handler
    onChangeLanguage(nextLang); 
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
