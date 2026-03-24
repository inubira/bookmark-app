// ── Config ──────────────────────────────────────────────────
// Update SHEET_ID to your Google Sheet's ID.
// The sheet must be shared: "Anyone with the link → Viewer".
// Columns: A = Category  |  B = Name  |  C = URL  (row 1 = header, skipped)
const SHEET_ID = '1izhN4nNK-_khkZ2dYN0CRQDqwcJIaZYwkXhC4zP8Hp0';
const CSV_URL  = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

const ROOT_TITLE = 'Yes Sales';

// These folders appear FIRST (in order), then a separator, then the rest
const PRIORITY_FOLDERS = ['Company', 'SharePoint', 'Apps'];
const SEPARATOR_TITLE  = '──────────────';

// ── CSV parser ───────────────────────────────────────────────
function parseCSV(text) {
  const rows = [];
  for (const line of text.trim().split('\n')) {
    const cols = [];
    let cur = '', inQ = false;
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ; }
      else if (ch === ',' && !inQ) { cols.push(cur.trim()); cur = ''; }
      else { cur += ch; }
    }
    cols.push(cur.trim());
    rows.push(cols);
  }
  return rows;
}

// ── Fetch bookmark data from Google Sheets ───────────────────
async function fetchGroups() {
  const resp = await fetch(CSV_URL);
  if (!resp.ok) throw new Error(`Fetch failed: HTTP ${resp.status}`);
  const rows = parseCSV(await resp.text()).slice(1); // skip header

  const groups = {};
  for (const [cat = '', name = '', url = ''] of rows) {
    const c = cat.trim(), n = name.trim(), u = url.trim();
    if (!c || !n || !u) continue;
    (groups[c] ??= []).push({ name: n, url: u });
  }
  return groups;
}

// ── Remove existing Yes Sales root folder ────────────────────
async function removeExisting() {
  const results = await chrome.bookmarks.search({ title: ROOT_TITLE });
  for (const bm of results) {
    if (!bm.url) {                       // it's a folder, not a bookmark
      await chrome.bookmarks.removeTree(bm.id);
    }
  }
}

// ── Create full bookmark tree ────────────────────────────────
async function buildTree(groups) {
  // Create root folder in the bookmark bar (parentId '1' = Bookmarks Bar)
  const root = await chrome.bookmarks.create({ parentId: '1', title: ROOT_TITLE });

  // Priority folders first (Company, SharePoint, Apps)
  const priorityCreated = [];
  for (const cat of PRIORITY_FOLDERS) {
    if (groups[cat]?.length) {
      const folder = await chrome.bookmarks.create({ parentId: root.id, title: cat });
      for (const { name, url } of groups[cat]) {
        await chrome.bookmarks.create({ parentId: folder.id, title: name, url });
      }
      priorityCreated.push(cat);
    }
  }

  // Separator (only if there are also department folders)
  const deptCategories = Object.keys(groups).filter(k => !PRIORITY_FOLDERS.includes(k));
  if (priorityCreated.length > 0 && deptCategories.length > 0) {
    await chrome.bookmarks.create({ parentId: root.id, title: SEPARATOR_TITLE, url: 'about:blank' });
  }

  // Department folders (all remaining categories, in sheet order)
  for (const cat of deptCategories) {
    if (groups[cat]?.length) {
      const folder = await chrome.bookmarks.create({ parentId: root.id, title: cat });
      for (const { name, url } of groups[cat]) {
        await chrome.bookmarks.create({ parentId: folder.id, title: name, url });
      }
    }
  }
}

// ── Main install / update function ──────────────────────────
async function installBookmarks() {
  const groups = await fetchGroups();
  await removeExisting();
  await buildTree(groups);
}

// ── Check if already installed ───────────────────────────────
async function isInstalled() {
  const results = await chrome.bookmarks.search({ title: ROOT_TITLE });
  return results.some(bm => !bm.url);
}

// ── Auto-install on first install only ───────────────────────
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    try { await installBookmarks(); } catch (e) { console.error('Auto-install failed:', e); }
  }
});

// ── Message handler (called by popup) ────────────────────────
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === 'install' || msg.type === 'update') {
    installBookmarks()
      .then(() => sendResponse({ ok: true }))
      .catch(err => sendResponse({ ok: false, error: err.message }));
    return true; // keep channel open for async response
  }

  if (msg.type === 'status') {
    isInstalled()
      .then(installed => sendResponse({ installed }))
      .catch(() => sendResponse({ installed: false }));
    return true;
  }
});
