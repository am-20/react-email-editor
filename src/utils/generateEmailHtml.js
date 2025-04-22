/**
 * Build a production‑ready 640 px‑wide email from the live canvas.
 */
export default function generateEmailHtml() {
  const canvas = document.getElementById('export-canvas');
  if (!canvas) throw new Error('Canvas not found');

  /* ensure any editing input blurs so its value is in the DOM */
  document.activeElement?.blur();

  /* clone for safe mutations */
  const clone = canvas.cloneNode(true);

  /* strip all editor‑only UI */
  clone.querySelectorAll('[data-editor]').forEach((n) => n.remove());
  clone.querySelectorAll('button').forEach((n) => n.remove());

  /* replace ordinary inputs with their text; drop colour/file pickers */
  clone.querySelectorAll('input,textarea').forEach((inp) => {
    if (inp.type === 'color' || inp.type === 'file') {
      inp.remove();
    } else {
      inp.replaceWith(document.createTextNode(inp.value));
    }
  });

  /* collect each block inside its own <tr><td> wrapper */
  const rows = [];

  Array.from(clone.children).forEach((wrap) => {
    const table = wrap.querySelector('table');
    if (table) {
      rows.push(`<tr><td>${table.outerHTML}</td></tr>`);
      return;
    }

    const linkedImg = wrap.querySelector('a > img')?.parentElement;
    if (linkedImg) {
      rows.push(`<tr><td align="center">${linkedImg.outerHTML}</td></tr>`);
      return;
    }

    const img = wrap.querySelector('img');
    if (img) {
      rows.push(`<tr><td align="center">${img.outerHTML}</td></tr>`);
      return;
    }
    const html = wrap.innerHTML.trim();
    if (html) rows.push(`<tr><td>${html}</td></tr>`);
  });

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>Email template</title>
</head>
<body style="margin:0;padding:0;background:#E5E5E5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="background:#E5E5E5;">
    <tr>
      <td align="center">
        <table role="presentation" width="640" cellpadding="0" cellspacing="0" border="0" style="background:#FFFFFF;">
          <tbody>
            ${rows.join('\n')}
          </tbody>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
