const btn        = document.getElementById('action-btn');
const statusIcon = document.getElementById('status-icon');
const statusText = document.getElementById('status-text');

function setStatus(icon, iconClass, text) {
  statusIcon.textContent = icon;
  statusIcon.className   = iconClass;
  statusText.textContent = text;
}

async function checkStatus() {
  const resp = await chrome.runtime.sendMessage({ type: 'status' });

  if (resp.installed) {
    setStatus('✓', 'ok', 'Bookmarks are installed');
    btn.textContent = 'Update Bookmarks';
  } else {
    setStatus('○', '', 'Not yet installed');
    btn.textContent = 'Install Bookmarks';
  }
  btn.disabled = false;
}

btn.addEventListener('click', async () => {
  btn.disabled = true;
  btn.classList.add('working');
  btn.textContent = 'Working…';
  setStatus('⋯', '', 'Fetching latest data…');

  const resp = await chrome.runtime.sendMessage({ type: 'install' });

  btn.classList.remove('working');

  if (resp.ok) {
    setStatus('✓', 'ok', 'Bookmarks updated successfully!');
    btn.textContent = 'Update Bookmarks';
    btn.disabled = false;
  } else {
    setStatus('✗', 'error', 'Error: ' + resp.error);
    btn.textContent = 'Try Again';
    btn.disabled = false;
  }
});

checkStatus();
