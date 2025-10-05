import { useState } from 'react';
import { LANGUAGES } from '../constants/languages';

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (langId) => {
    onSelect(langId);
    setIsOpen(false);
  };

  const selectedLanguage = LANGUAGES.find(l => l.id === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-40 px-3 py-2 bg-secondary border border-border rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <span>{selectedLanguage?.name || 'Select Language'}</span>
        <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-40 mt-1 bg-secondary border border-border rounded-md shadow-lg">
          <ul className="py-1">
            {LANGUAGES.map(lang => (
              <li
                key={lang.id}
                onClick={() => handleSelect(lang.id)}
                className="px-3 py-2 text-sm text-text-primary hover:bg-border cursor-pointer"
              >
                {lang.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;