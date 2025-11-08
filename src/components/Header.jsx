// src/components/Header.jsx
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector'; // Import the new component

const Header = ({ language, onLanguageChange,onSave, onRun, isLoading, theme, setTheme }) => {
  
  return (
    <header className="flex items-center justify-between p-3 border-b border-border bg-secondary shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <h1 className="text-xl font-bold text-text-primary hidden sm:block">Texmate</h1>
        </div>
        <LanguageSelector language={language} onSelect={onLanguageChange} />
      </div>

      <div className="flex items-center gap-4">
        <ThemeSelector theme={theme} setTheme={setTheme} /> 
        {(language!= 'note')?<button
          onClick={onRun}
          disabled={isLoading}
          className="px-4 py-2 font-semibold text-white bg-accent rounded-md hover:bg-accent-hover transition-colors disabled:bg-opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
          <span>{isLoading ? "Running..." : "Run"}</span>
        </button> : 
        <button
          onClick={onSave}
          disabled={isLoading}
          className="px-4 py-2 font-semibold text-white bg-accent rounded-md hover:bg-accent-hover transition-colors disabled:bg-opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
          <span>{isLoading ? "Saving..." : "Save"}</span>
        </button> }

      </div>
    </header>
  );
};

export default Header;