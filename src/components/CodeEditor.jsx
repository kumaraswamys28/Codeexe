import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-tomorrow_night"; 
import "ace-builds/src-noconflict/theme-github";         
import "ace-builds/src-noconflict/theme-dracula";       
import "ace-builds/src-noconflict/theme-vibrant_ink";    

const CodeEditor = ({ language, code, setCode, theme }) => {
  const aceThemeMap = {
    'dark-blue': 'tomorrow_night',
    'light': 'github',
    'dracula': 'dracula',
    'synthwave': 'vibrant_ink',
  };

  return (
    <div className="h-full w-full bg-secondary">
      <AceEditor
        mode={language}
        theme={aceThemeMap[theme]} // Use the theme from the map
        onChange={setCode}
        value={code}
        name="code-editor"
        width="100%"
        height="100%"
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