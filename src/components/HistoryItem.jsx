import { LANGUAGES } from "../constants/languages";

const HistoryItem = ({ item, onClick }) => {
  const { languageId, result } = item;
  const language = LANGUAGES.find(l => l.id === languageId);

  return (
    <div
      onClick={onClick}
      className="p-3 bg-primary rounded-md border border-border hover:border-accent cursor-pointer transition-colors"
    >
      <div className="flex justify-between items-center">
        <span className="font-semibold text-text-primary">{language?.name || languageId}</span>
        <span className={`text-xs font-bold ${result.isError ? 'text-error' : 'text-success'}`}>
          {result.isError ? 'Error' : 'Success'}
        </span>
      </div>
      <p className="text-xs text-text-secondary mt-1 truncate">
        {item.code.replace(/\s+/g, ' ').trim()}
      </p>
    </div>
  );
};

export default HistoryItem;