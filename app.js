const pages = [
  {title:'DCIM',description:'Sites, racks, space, power and capacity.',url:'dcim.html',group:'Product'},
  {title:'Asset Management',description:'Identity, inventory, lifecycle and governance.',url:'asset-management.html',group:'Product'},
  {title:'Connectivity',description:'Ports, cables, splitters, patching and routes.',url:'connectivity.html',group:'Product'},
  {title:'Monitoring',description:'Measured power, environment, port health and alerts.',url:'monitoring.html',group:'Product'},
  {title:'Work Orders',description:'Plan, assign, execute and prove field work.',url:'work-orders.html',group:'Product'},
  {title:'Platform',description:'One data model, shared API, permissions and integrations.',url:'platform.html',group:'Platform'},
  {title:'Solutions',description:'Workflows for data centers, enterprise IT, edge and colocation.',url:'solutions.html',group:'Solutions'},
  {title:'Resources',description:'Product documentation, architecture and operational guidance.',url:'resources.html',group:'Resources'}
];

const productIcon = title => title === 'DCIM' ? 'ph-circuitry' : title === 'Asset Management' ? 'ph-package' : title === 'Connectivity' ? 'ph-path' : title === 'Monitoring' ? 'ph-chart-line-up' : 'ph-check-square-offset';
const productLinks = pages.filter(page => page.group === 'Product').map(page => `
  <a href="${page.url}"><i class="ph ${productIcon(page.title)}"></i><span><b>${page.title}</b><small>${page.description}</small></span></a>`).join('');

const current = document.documentElement.dataset.page || 'home';
function recordHomepageVisit(){
  if(current!=='home'||!['/','/index.html'].includes(location.pathname))return;
  const storageKey='tenqora-home-visit';let existing='';
  try{existing=sessionStorage.getItem(storageKey)||''}catch{}
  const eventId=existing||globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random().toString(36).slice(2)}`;
  if(!existing)try{sessionStorage.setItem(storageKey,eventId)}catch{}
  const parameters=new URLSearchParams(location.search),campaign=['utm_source','utm_medium','utm_campaign'].map(key=>parameters.get(key)).filter(Boolean).join(' / '),payload=JSON.stringify({eventId,page:location.pathname,referrer:document.referrer,language:navigator.language,timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||'',campaign});
  fetch('/api/public/platform-visits',{method:'POST',headers:{'content-type':'application/json'},body:payload,keepalive:true,credentials:'omit'}).catch(()=>{});
}
recordHomepageVisit();
const header = `
  <header class="site-header">
    <a class="brand" href="index.html" aria-label="Tenqora home"><img src="assets/tenqora-mark.svg" alt=""><b>Tenqora</b></a>
    <nav class="top-nav" aria-label="Primary navigation">
      <details class="mega-menu"><summary>Product <i class="ph ph-caret-down"></i></summary><div class="mega-panel"><div><span>Products</span>${productLinks}</div><aside><span>One operational model</span><h3>From Site to Port, Power and Task.</h3><p>Every Tenqora product works on the same physical inventory, identity and evidence.</p><a href="platform.html">Explore the platform <i class="ph ph-arrow-right"></i></a></aside></div></details>
      <a href="solutions.html" ${current === 'solutions' ? 'aria-current="page"' : ''}>Solutions</a>
      <a href="platform.html" ${current === 'platform' ? 'aria-current="page"' : ''}>Platform</a>
      <a href="resources.html" ${current === 'resources' ? 'aria-current="page"' : ''}>Resources</a>
      <a href="register.html">Pricing</a>
    </nav>
    <div class="header-actions"><button class="icon-button search-open" type="button" aria-label="Search"><i class="ph ph-magnifying-glass"></i></button><a class="plain-link" href="https://app.tenqora.net/login">Sign in</a><a class="button primary" href="register.html">Book a demo</a><button class="icon-button menu-toggle" type="button" aria-label="Open menu" aria-expanded="false"><i class="ph ph-list"></i></button></div>
  </header>
  <div class="mobile-panel" id="mobilePanel" hidden><button class="mobile-backdrop" type="button" aria-label="Close menu"></button><nav aria-label="Mobile navigation"><a href="index.html" ${current === 'home' ? 'aria-current="page"' : ''}>Home</a>${pages.map(page => `<a href="${page.url}" ${current === page.url.replace('.html','') || current === ({'asset-management':'assets','work-orders':'work-orders'}[page.url.replace('.html','')]) ? 'aria-current="page"' : ''}>${page.title}</a>`).join('')}<a href="https://app.tenqora.net/login">Sign in</a><a class="button primary" href="register.html">Book a demo</a></nav></div>`;

const footer = `
  <footer class="site-footer">
    <div class="footer-brand"><a class="brand" href="index.html"><img src="assets/tenqora-mark.svg" alt=""><b>Tenqora</b></a><p>The operational system of record for physical infrastructure.</p></div>
    <div><b>Product</b><a href="dcim.html">DCIM</a><a href="asset-management.html">Asset Management</a><a href="connectivity.html">Connectivity</a><a href="monitoring.html">Monitoring</a><a href="work-orders.html">Work Orders</a></div>
    <div><b>Solutions</b><a href="solutions.html#data-centers">Data Centers</a><a href="solutions.html#enterprise">Enterprise IT</a><a href="solutions.html#colocation">Colocation</a><a href="solutions.html#edge">Edge Sites</a></div>
    <div><b>Platform</b><a href="platform.html">Architecture</a><a href="platform.html#integrations">Integrations</a><a href="platform.html#api">API & Webhooks</a><a href="platform.html#security">Security</a></div>
    <div><b>Resources</b><a href="resources.html">Documentation</a><a href="resources.html#guides">Guides</a><a href="resources.html#change-log">Change Log</a><a href="register.html">Contact</a></div>
    <small><span>© <span id="year"></span> Tenqora · Built by Tenqora</span><span><a href="resources.html#privacy">Privacy</a><a href="resources.html#security">Trust & Security</a></span></small>
  </footer>
  <dialog class="search-dialog" id="searchDialog"><form method="dialog"><header><i class="ph ph-magnifying-glass"></i><input id="searchInput" type="search" placeholder="Search Tenqora products and solutions" autocomplete="off"><button type="submit" aria-label="Close"><i class="ph ph-x"></i></button></header><div id="searchResults"></div></form></dialog>`;

document.querySelector('#siteHeader')?.insertAdjacentHTML('beforeend', header);
document.querySelector('#siteFooter')?.insertAdjacentHTML('beforeend', footer);
document.querySelector('#year').textContent = new Date().getFullYear();

const menuToggle = document.querySelector('.menu-toggle');
const mobilePanel = document.querySelector('#mobilePanel');
function setMobileMenu(open) {
  if (!menuToggle || !mobilePanel) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobilePanel.hidden = !open;
  document.body.classList.toggle('mobile-menu-open', open);
  menuToggle.querySelector('i').className = `ph ${open ? 'ph-x' : 'ph-list'}`;
  if (open) mobilePanel.querySelector('nav a')?.focus();
  else menuToggle.focus();
}
menuToggle?.addEventListener('click', () => setMobileMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
mobilePanel?.querySelector('.mobile-backdrop')?.addEventListener('click', () => setMobileMenu(false));
mobilePanel?.querySelector('nav')?.addEventListener('click', event => {
  if (event.target.closest('a')) setMobileMenu(false);
});
window.matchMedia('(min-width:1101px)').addEventListener('change', event => {
  if (event.matches && menuToggle?.getAttribute('aria-expanded') === 'true') setMobileMenu(false);
});

document.addEventListener('click', event => {
  document.querySelectorAll('.mega-menu[open]').forEach(menu => {
    if (!menu.contains(event.target)) menu.removeAttribute('open');
  });
});

const searchDialog = document.querySelector('#searchDialog');
const searchInput = document.querySelector('#searchInput');
const searchResults = document.querySelector('#searchResults');
function renderSearch() {
  const term = searchInput.value.trim().toLowerCase();
  const matches = pages.filter(page => !term || `${page.title} ${page.description} ${page.group}`.toLowerCase().includes(term));
  searchResults.innerHTML = matches.length ? matches.map(page => `<a href="${page.url}"><span><b>${page.title}</b><small>${page.description}</small></span><i class="ph ph-arrow-right"></i></a>`).join('') : '<p>No matching page. Try a product or workflow name.</p>';
}
function openSearch() { searchDialog.showModal(); renderSearch(); searchInput.focus(); }
document.querySelectorAll('.search-open').forEach(button => button.addEventListener('click', openSearch));
searchInput?.addEventListener('input', renderSearch);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobilePanel?.hidden) setMobileMenu(false);
  if (event.key === 'Tab' && !mobilePanel?.hidden) {
    const focusable = [...mobilePanel.querySelectorAll('button:not([disabled]),a[href]')];
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); searchDialog.open ? searchDialog.close() : openSearch(); }
});

const previewImages = {
  rack:['assets/product-rack.png','Tenqora rack workspace showing rack elevation and equipment details'],
  connectivity:['assets/product-connectivity.png','Tenqora physical connectivity register'],
  equipment:['assets/product-equipment.png','Tenqora selected equipment workspace']
};
document.querySelector('.window-nav')?.addEventListener('click', event => {
  const button = event.target.closest('button[data-preview]');
  if (!button) return;
  document.querySelectorAll('.window-nav button').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-selected', String(item === button)); });
  const [src,alt] = previewImages[button.dataset.preview];
  const image = document.querySelector('#heroPreview');
  image.classList.add('changing');
  window.setTimeout(() => { image.src = src; image.alt = alt; image.classList.remove('changing'); }, 140);
});

document.querySelectorAll('.sparkline').forEach(canvas => {
  const values = canvas.dataset.series.split(',').map(Number);
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || 280, height = canvas.clientHeight || 74;
  canvas.width = width * ratio; canvas.height = height * ratio;
  const context = canvas.getContext('2d'); context.scale(ratio,ratio);
  const min = Math.min(...values), max = Math.max(...values), range = max-min || 1;
  context.strokeStyle = '#2f7cf6'; context.lineWidth = 1.5; context.beginPath();
  values.forEach((value,index) => { const x=index*(width/(values.length-1)); const y=height-8-((value-min)/range)*(height-18); index ? context.lineTo(x,y) : context.moveTo(x,y); });
  context.stroke();
});

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('revealed'); }), {threshold:.08});
document.querySelectorAll('.section,.proof-band,.final-cta').forEach(element => revealObserver.observe(element));
