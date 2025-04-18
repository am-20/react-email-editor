export const ExportButton = () => {
  const handleExport = () => {
    const content = document.getElementById('export-canvas').outerHTML;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-template.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return <button onClick={handleExport}>Export HTML</button>;
};
