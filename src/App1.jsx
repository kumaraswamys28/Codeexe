// src/App.jsx
import { useState, useEffect } from "react";
import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";
import OutputPanel from "./components/OutputPanel";
import { LANGUAGES } from "./constants/languages";
import { executeCode } from "./services/pistonApi";

function App() {
  // --- THEME STATE MANAGEMENT ---
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark-blue";
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  // -----------------------------

  const [activeLanguage, setActiveLanguage] = useState(LANGUAGES[0].id);
  const [code, setCode] = useState(LANGUAGES[0].sampleCode);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("codeHistory");
    return saved ? JSON.parse(saved) : [];
  });

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("codeHistory", JSON.stringify(history));
  }, [history]); 

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


const handleSaveCode = () => {
     if (!code) return;
  
     const savedSnapshot = {
       isError: false,
       message: "Saved snapshot",
       output: "note saved " 
     };
     setResult(savedSnapshot);
     setHistory([
       { 
         id: Date.now(), 
         languageId: activeLanguage, 
         code: code, 
         result: savedSnapshot 
       }, 
       ...history
      ]);

  };


   const handleHistoryDelete = (id) => {
    // Filter out the item with the matching id
    setHistory(currentHistory => 
      currentHistory.filter(item => item.id !== id)
    );
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
        onSave={handleSaveCode}
        onRun={handleRunCode}
        isLoading={isLoading}
        theme={theme}
        setTheme={setTheme}
      />
      <main className="flex-grow grid grid-cols-1 grid-rows-10 md:grid-cols-10 md:grid-rows-1 overflow-hidden">
        <div className="row-span-7 md:col-span-7 md:row-span-1 h-full overflow-auto">
          <CodeEditor
            language={activeLanguage}
            code={code}
            setCode={setCode}
            theme={theme}
          />
        </div>
        <div className="row-span-3 md:col-span-3 md:row-span-1 h-full overflow-auto border-t md:border-t-0 md:border-l border-border">
          <OutputPanel
            result={result}
            isLoading={isLoading}
            history={history}
            onHistoryDelete={handleHistoryDelete}
            onHistoryClick={handleHistoryClick}
          />
        </div>
      </main>
    </div>
  );
}

export default App;