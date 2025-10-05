const ResultsPanel = ({ result, isLoading }) => {
  if (isLoading) {
    return <div className="text-text-secondary">⏳ Running code...</div>;
  }

  if (!result) {
    return <div className="text-text-secondary">Run code to see the results here.</div>;
  }

  const { isError, message, output } = result;

  return (
    <div>
      <h3 className={`font-semibold mb-2 ${isError ? 'text-error' : 'text-success'}`}>{message}</h3>
      {output && (
        <pre className="bg-primary p-3 rounded-md overflow-x-auto whitespace-pre-wrap text-text-primary text-sm">
          {output}
        </pre>
      )}
    </div>
  );
};

export default ResultsPanel;