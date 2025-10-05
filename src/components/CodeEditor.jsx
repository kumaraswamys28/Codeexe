import AceEditor from "react-ace";

// Import necessary modes and themes
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";


// Import new theme
import "ace-builds/src-noconflict/theme-tomorrow_night";

// Other imports remain the same
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
// ... other language modes
import "ace-builds/src-noconflict/ext-language_tools";




const CodeEditor = ({ language, code, setCode }) => {
  return (
    <div className="h-full w-full bg-secondary">
      <AceEditor
        mode={language}
        theme="tomorrow_night" // Changed theme
        onChange={setCode}
        value={code}
        name="code-editor"
        width="100%"
        height="100%" // Dynamic height
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          showPrintMargin: false,
          fontSize: "16px"
        }}
      />
    </div>
  );
};

export default CodeEditor;