import generateEmailHtml from '../utils/generateEmailHtml';

export default function ExportButton() {
  const handleExport = () => {
    try {
      const html = generateEmailHtml();
      const blob = new Blob([html], { type: 'text/html;charset=UTF‑8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'email‑template.html';
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      // eslint‑disable‑next‑line no‑alert
      alert(err.message || 'Unable to export template');
    }
  };

  return (
    <button
      type='button'
      onClick={handleExport}
      style={{ marginLeft: 8, padding: '6px 12px', cursor: 'pointer' }}>
      Export HTML
    </button>
  );
}
