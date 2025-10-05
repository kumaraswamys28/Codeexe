import { useState } from 'react';
import ResultsPanel from './ResultsPanel';
import HistoryPanel from './HistoryPanel';

const OutputPanel = ({ result, isLoading, history, onHistoryClick }) => {
  const [activeTab, setActiveTab] = useState('output');

  const TabButton = ({ name, label }) => (
    <button
      onClick={() => setActiveTab(name)}
      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
        activeTab === name
          ? 'text-accent border-accent'
          : 'text-text-secondary border-transparent hover:text-text-primary'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-secondary flex flex-col h-full">
      {/* Tab Headers */}
      <div className="flex-shrink-0 border-b border-border">
        <nav className="flex space-x-2 px-2">
          <TabButton name="output" label="Output" />
          <TabButton name="history" label="History" />
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-grow p-4 overflow-y-auto">
        {activeTab === 'output' && <ResultsPanel result={result} isLoading={isLoading} />}
        {activeTab === 'history' && <HistoryPanel history={history} onHistoryClick={onHistoryClick} />}
      </div>
    </div>
  );
};

export default OutputPanel;