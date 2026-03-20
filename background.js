const SHEET_ID = '1izhN4nNK-_khkZ2dYN0CRQDqwcJIaZYwkXhC4zP8Hp0';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

function parseCSV(text) {
  const rows = [];
  const lines = text.trim().split('\n');
  for (const line of lines) {
    const cols = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === ',' && !inQuotes) {
        cols.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
    cols.push(current.trim());
    rows.push(cols);
  }
  return rows;
}

async function createBookmarks() {
  // Prevent duplicate installation
  const existing = await chrome.bookmarks.search({ title: 'Yes Sales' });
  if (existing.length > 0) return;

  // Fetch data from Google Sheets
  const response = await fetch(CSV_URL);
  const text = await response.text();
  const rows = parseCSV(text);

  // Skip header row, group by Folder
  const folders = {};
  for (const [folder, siteName, url] of rows.slice(1)) {
    if (!folder || !siteName || !url) continue;
    if (!folders[folder]) folders[folder] = [];
    folders[folder].push({ name: siteName, url });
  }

  // Create root folder in bookmark bar
  const root = await chrome.bookmarks.create({ parentId: '1', title: 'Yes Sales' });

  // Create subfolders and bookmarks
  for (const [folderName, items] of Object.entries(folders)) {
    const subfolder = await chrome.bookmarks.create({ parentId: root.id, title: folderName });
    for (const { name, url } of items) {
      await chrome.bookmarks.create({ parentId: subfolder.id, title: name, url });
    }
  }
}

chrome.runtime.onInstalled.addListener(createBookmarks);
