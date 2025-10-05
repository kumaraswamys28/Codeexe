import { useState } from "react";
import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";
import OutputPanel from "./components/OutputPanel";
import { LANGUAGES } from "./constants/languages";
import { executeCode } from "./services/pistonApi";

function App() {
  const [activeLanguage, setActiveLanguage] = useState(LANGUAGES[0].id);
  const [code, setCode] = useState(LANGUAGES[0].sampleCode);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleLanguageChange = (langId) => {
    const newLang = LANGUAGES.find(l => l.id === langId);
    if (newLang) {
      setActiveLanguage(langId);
      setCode(newLang.sampleCode);
      setResult(null);
    }
  };

  const handleRunCode = async () => {
    if (!code) return;
    setIsLoading(true);
    setResult(null);
    try {
      const response = await executeCode(activeLanguage, code);
      const isError = response.run.stderr && response.run.stderr.trim() !== "";
      const newResult = {
        isError,
        message: isError ? "Execution error" : "Code executed successfully",
        output: isError ? response.run.stderr : response.run.output,
      };
      setResult(newResult);
      setHistory([{ id: Date.now(), languageId: activeLanguage, code, result: newResult }, ...history]);
    } catch (error) {
      const errorResult = { isError: true, message: `API Error: ${error.message}`, output: error.toString() };
      setResult(errorResult);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleHistoryClick = (historyItem) => {
    setActiveLanguage(historyItem.languageId);
    setCode(historyItem.code);
    setResult(historyItem.result);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header 
        language={activeLanguage} 
        onLanguageChange={handleLanguageChange}
        onRun={handleRunCode}
        isLoading={isLoading}
      />
      <main className="flex-grow grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Editor Panel */}
        <div className="h-full overflow-auto">
           <CodeEditor language={activeLanguage} code={code} setCode={setCode} />
        </div>
        
        {/* Output/History Panel */}
        <div className="h-full overflow-auto border-t md:border-t-0 md:border-l border-border">
          <OutputPanel 
            result={result}
            isLoading={isLoading}
            history={history}
            onHistoryClick={handleHistoryClick}
          />
        </div>
      </main>
    </div>
  );
}

export default App;