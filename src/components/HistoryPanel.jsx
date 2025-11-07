import HistoryItem from "./HistoryItem";

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"
      clipRule="evenodd"
    />
  </svg>
);

const HistoryPanel = ({ history,activeTab, onHistoryClick, onHistoryDelete }) => {
  if (history.length === 0) {
    return <p className="text-text-secondary text-sm">Your execution history will appear here.</p>;
  }

  return (
    <div className="space-y-3">
      {history.map((item) => (
        <HistoryItem
          key={item.id}
          item={item}
          onSelect={() => onHistoryClick(item)} 
          onDelete={() => onHistoryDelete(item.id)}
        />
      ))}
      {activeTab === 'history' && (
          <div className="absolute bottom-0 right-0 p-3 flex items-center gap-4 text-sm bg-secondary">
            <a 
              href="https://github.com/kumaraswamys28" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-text-secondary hover:text-accent transition-colors"
              aria-label="GitHub Profile"
            >
              <GitHubIcon />
            </a>
            <a 
              href="https://kumaraswamys28.github.io/project/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-medium text-text-secondary hover:text-accent transition-colors"
            >
              More Projects
            </a>
          </div>
        )}
    </div>
  );
};

export default HistoryPanel;
