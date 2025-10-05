import { LANGUAGES } from '../constants/languages';

const LanguageNav = ({ activeLanguage, onLanguageChange }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.id}
          onClick={() => onLanguageChange(lang.id)}
        className={`px-3 py-1.5 text-sm rounded transition-colors ${
  activeLanguage === lang.id
    ? "bg-secondary text-white font-semibold"
    : "text-subtext hover:bg-white/5"
}`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageNav;