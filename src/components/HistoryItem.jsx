
import { LANGUAGES } from "../constants/languages";

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.414a1 1 0 0 1 0-1.414z"/>
  </svg>
);

const HistoryItem = ({ item, onSelect, onDelete }) => {
  const { languageId, result } = item;
  const language = LANGUAGES.find(l => l.id === languageId);

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevents onSelect from firing
    onDelete();
  };

  return (
    <div
      onClick={onSelect} 
      className="p-3 bg-primary z-50 rounded-md border border-border hover:border-accent cursor-pointer transition-colors"
    >
      <div className="flex justify-between items-center">
        <span className="font-semibold text-text-primary">{language?.name || languageId}</span>
                <div className="flex items-center gap-2">
          <span className={`text-xs font-bold ${result.isError ? 'text-error' : 'text-success'}`}>
            {result.isError ? 'Error' : 'Success'}
          </span>
          
          <button
            onClick={handleDeleteClick}
            className="p-1 text-text-secondary hover:text-error rounded-full hover:bg-error/10 transition-colors"
            aria-label="Delete history item"
          >
            <CloseIcon />
          </button>
        </div>
      </div>
      <p className="text-xs text-text-secondary mt-1 truncate">
        {item.code.replace(/\s+/g, ' ').trim()}
      </p>
    </div>
  );
};

export default HistoryItem;