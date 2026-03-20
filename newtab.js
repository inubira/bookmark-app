const TABS = ['All', 'Accounting', 'HR', 'Operation', 'Shipping', 'Graphic', 'Marketing', 'Sales', 'Sourcing', 'Online', 'IT'];

const DATA = {
  'Company': [
    { name: 'ECOUNT',               url: 'https://login.ecount.com/' },
    { name: 'Asana',                url: 'https://app.asana.com/1/1145917644780783/home' },
    { name: 'SPS Commerce',         url: 'https://commerce.spscommerce.com/home/apps/' },
    { name: 'ShippingEasy',         url: 'https://app.shippingeasy.com/login' },
    { name: 'ShipSaving',           url: 'https://s.shipsaving.com/login' },
    { name: 'OneDrive',             url: 'https://yessalesinc620-my.sharepoint.com/' },
    { name: 'Innerest Beauty',      url: 'https://innerestbeauty.com/' },
    { name: 'Innerest Solutions',   url: 'https://www.innerestsolutions.com/' },
  ],
  'Apps': [
    { name: 'ChatGPT',      url: 'https://chatgpt.com/' },
    { name: 'Gemini',       url: 'https://gemini.google.com/app' },
    { name: 'Grok',         url: 'https://grok.com/' },
    { name: 'Email Server', url: 'http://mail.yessalesusa.com/Mondo/lang/sys/Timeout.aspx' },
    { name: 'Canva',        url: 'https://www.canva.com/' },
  ],
  'SharePoint': [
    { name: 'Communication Site',    url: 'https://yessalesinc620.sharepoint.com/' },
    { name: '000. Yes Sales',        url: 'https://yessalesinc620.sharepoint.com/sites/000.Manual/SitePages/CollabHome.aspx' },
    { name: '100. HR',               url: 'https://yessalesinc620.sharepoint.com/sites/100.HR/SitePages/CollabHome.aspx' },
    { name: '105. Accounting',       url: 'https://yessalesinc620.sharepoint.com/sites/105.Accounting/SitePages/Home.aspx' },
    { name: '110. Operation',        url: 'https://yessalesinc620.sharepoint.com/sites/110.Operation/SitePages/CollabHome.aspx' },
    { name: '111. Shipping',         url: 'https://yessalesinc620.sharepoint.com/sites/111.Shipping/SitePages/CollabHome.aspx' },
    { name: '114. Graphic',          url: 'https://yessalesinc620.sharepoint.com/sites/114.Graphic/SitePages/CollabHome.aspx' },
    { name: '115. Marketing',        url: 'https://yessalesinc620.sharepoint.com/sites/marketing' },
    { name: '120. Sales',            url: 'https://yessalesinc620.sharepoint.com/sites/120.Sales/SitePages/CollabHome.aspx' },
    { name: '125. Sourcing',         url: 'https://yessalesinc620.sharepoint.com/sites/YesSales-Sourcing' },
    { name: '130. Online',           url: 'https://yessalesinc620.sharepoint.com/sites/130.Online/SitePages/CollabHome.aspx' },
    { name: '190. IT',               url: 'https://yessalesinc620.sharepoint.com/sites/YesSales-IT' },
    { name: '900. Final Version',    url: 'https://yessalesinc620.sharepoint.com/sites/900.FinalVersion/SitePages/CollabHome.aspx' },
  ],
  'Accounting': [
    { name: 'QuickBooks',       url: 'https://quickbooks.intuit.com/' },
    { name: '105. Accounting',  url: 'https://yessalesinc620.sharepoint.com/sites/105.Accounting/SitePages/Home.aspx' },
  ],
  'HR': [
    { name: 'ADP',      url: 'https://www.adp.com/' },
    { name: '100. HR',  url: 'https://yessalesinc620.sharepoint.com/sites/100.HR/SitePages/CollabHome.aspx' },
  ],
  'Operation': [
    { name: '110. Operation', url: 'https://yessalesinc620.sharepoint.com/sites/110.Operation/SitePages/CollabHome.aspx' },
  ],
  'Shipping': [
    { name: 'ShippingEasy',   url: 'https://app.shippingeasy.com/login' },
    { name: 'ShipSaving',     url: 'https://s.shipsaving.com/login' },
    { name: '111. Shipping',  url: 'https://yessalesinc620.sharepoint.com/sites/111.Shipping/SitePages/CollabHome.aspx' },
  ],
  'Graphic': [
    { name: 'Canva',        url: 'https://www.canva.com/' },
    { name: '114. Graphic', url: 'https://yessalesinc620.sharepoint.com/sites/114.Graphic/SitePages/CollabHome.aspx' },
  ],
  'Marketing': [
    { name: 'TikTok',          url: 'https://www.tiktok.com/en/' },
    { name: 'SoloVegan',       url: 'https://gosolovegan.com/' },
    { name: '115. Marketing',  url: 'https://yessalesinc620.sharepoint.com/sites/marketing' },
  ],
  'Sales': [
    { name: 'Dollar Tree',  url: 'https://www.dollartree.com/' },
    { name: '120. Sales',   url: 'https://yessalesinc620.sharepoint.com/sites/120.Sales/SitePages/CollabHome.aspx' },
  ],
  'Sourcing': [
    { name: '125. Sourcing', url: 'https://yessalesinc620.sharepoint.com/sites/YesSales-Sourcing' },
  ],
  'Online': [
    { name: 'Amazon Seller Central', url: 'https://sellercentral.amazon.com/' },
    { name: 'Shopify',               url: 'https://accounts.shopify.com/select?rid=025d24b7-df28-4dd0-807a-d4ce2f946a4c' },
    { name: 'ShipSaving',            url: 'https://s.shipsaving.com/login' },
    { name: '130. Online',           url: 'https://yessalesinc620.sharepoint.com/sites/130.Online/SitePages/CollabHome.aspx' },
  ],
  'IT': [
    { name: 'M365',             url: 'https://m365.cloud.microsoft/apps/?auth=2' },
    { name: 'M365 Admin',       url: 'https://m365.cloud.microsoft/apps/?auth=2' },
    { name: 'MS Entra',         url: 'https://entra.microsoft.com/#home' },
    { name: 'Tailscale',        url: 'https://login.tailscale.com/login?next_url=%2Fadmin%2Fmachines' },
    { name: 'Avast',            url: 'http://businesshub.avast.com/dashboard?companyId=d501562c-f70d-4ce6-bb6a-b12e1986963c' },
    { name: 'GoDaddy',          url: 'https://www.godaddy.com/' },
    { name: 'Synology Backup',  url: 'http://192.168.0.160:5000/' },
    { name: '190. IT',          url: 'https://yessalesinc620.sharepoint.com/sites/YesSales-IT' },
  ],
};

function getFavicon(url) {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  } catch {
    return '';
  }
}

function renderSection(title, items) {
  const section = document.createElement('div');
  section.className = 'section';

  const heading = document.createElement('h2');
  heading.textContent = title;
  section.appendChild(heading);

  const grid = document.createElement('div');
  grid.className = 'grid';

  items.forEach(({ name, url }) => {
    const a = document.createElement('a');
    a.href = url;
    a.className = 'card';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';

    const img = document.createElement('img');
    img.src = getFavicon(url);
    img.alt = '';
    img.width = 20;
    img.height = 20;

    const span = document.createElement('span');
    span.textContent = name;

    a.appendChild(img);
    a.appendChild(span);
    grid.appendChild(a);
  });

  section.appendChild(grid);
  return section;
}

function render(tab) {
  const content = document.getElementById('content');
  content.innerHTML = '';

  if (tab === 'All') {
    ['Company', 'Apps', 'SharePoint', ...TABS.slice(1)].forEach(key => {
      if (DATA[key] && DATA[key].length > 0) {
        content.appendChild(renderSection(key, DATA[key]));
      }
    });
  } else {
    content.appendChild(renderSection('Company', DATA['Company']));
    content.appendChild(renderSection('Apps', DATA['Apps']));
    if (DATA[tab] && DATA[tab].length > 0) {
      content.appendChild(renderSection(tab, DATA[tab]));
    }
  }
}

function initTabs() {
  const nav = document.getElementById('tabs');
  let active = 'All';

  TABS.forEach(tab => {
    const btn = document.createElement('button');
    btn.textContent = tab;
    btn.className = tab === active ? 'active' : '';
    btn.addEventListener('click', () => {
      active = tab;
      nav.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render(tab);
    });
    nav.appendChild(btn);
  });

  render(active);
}

initTabs();
