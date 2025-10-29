// src/components/ThemeSelector.jsx
import { useState } from 'react';

const themes = [
  { id: 'dark-blue', name: 'Dark Blue', icon: '🔵' },
  { id: 'light', name: 'Light', icon: '⚪' },
  { id: 'dracula', name: 'Dracula', icon: '🟣' },
];

const ThemeSelector = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (themeId) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  const currentTheme = themes.find(t => t.id === theme);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-40 px-3 py-2 bg-secondary border border-border rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label="Select theme"
      >
        {/* <span>{currentTheme?.icon} {currentTheme?.name}</span> */}
                <span>{currentTheme?.name}</span>

        <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-40 mt-1 bg-secondary border border-border rounded-md shadow-lg right-0">
          <ul className="py-1">
            {themes.map(t => (
              <li
                key={t.id}
                onClick={() => handleSelect(t.id)}
                className="flex items-center px-3 py-2 text-sm text-text-primary hover:bg-border cursor-pointer"
              >
                {/*{t.icon}*/} <span className="ml-2">{t.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;