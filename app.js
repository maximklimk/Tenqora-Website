const features=[
  ['▤','Racks','Independent rack configuration, RU validation, numbering direction, capacity, feeds, PDU rules and thermal views.','racks'],
  ['▥','Equipment','Installed, planned, ordered, warehouse, service and archived assets in one actionable equipment list.','assets'],
  ['⇄','Connectivity','Device-centric ports, compatible media, direct links, splitters, breakout cables, labels and reports.','connectivity'],
  ['ϟ','Power','Exact PSU-to-PDU outlet assignment, feed limits, outlet banks, planned power and calculated demand.','racks'],
  ['✓','Tasks','Reporter, assignee, priority, work plans, rack visits, planned changes and component-level work.','operations'],
  ['◫','Lifecycle','Immutable asset biography for procurement, movement, installation, service, connectivity and disposition.','assets'],
  ['◇','Warehouses','Separate equipment, spare-parts and consumables inventory with virtual recovery storage.','platform'],
  ['▣','Catalogs','Equipment, passive infrastructure, adapters, optics, cables, CPUs, memory, GPU and PSU models.','catalog'],
  ['⌁','Sensors & SNMP','Scoped profiles, customer agents, optional telemetry, environmental sensors and heatmaps.','monitoring'],
  ['◎','Governance','Clients, plans, people, roles, asset quality, audit history, backups and security controls.','governance'],
  ['✦','Appearance','Unified design tokens for interface, equipment, racks, PDU, connectivity, overlays, tasks and charts.','platform'],
  ['↗','Reports & API','Rack connectivity, asset reports, PDFs, CSV workflows and a shared versioned backend contract.','architecture']
];
const catalogs={
  Equipment:{tag:'EQUIPMENT',text:'Vendor-first discovery with categories and exact model cards for Cisco, Juniper, Arista, Ubiquiti, NVIDIA/Mellanox, Huawei, Dell, HPE, Supermicro, TYAN, xFusion, Pure Storage, Moxa and more.',items:['Manufacturer part number and official source','Rack height, power architecture and airflow','Front/rear physical port inventory','Modular chassis slot compatibility','Images and visual rendering profiles']},
  Adapters:{tag:'SERVER EXPANSION',text:'One table-based catalog for PCIe NICs, InfiniBand HCAs, Fibre Channel HBAs, DPUs, OCP/Mezzanine adapters and GPU accelerators.',items:['Physical PCIe slot fit and lane checks','Full/low profile and card length','Power and cooling boundaries','Ports created on the correct server panel','Dedicated full-page product card']},
  Consumables:{tag:'CONNECTIVITY INVENTORY',text:'Manufacturer optics and cabling are selected from catalog, received into a warehouse and reserved by planned or active connections.',items:['SFP, SFP+, SFP28, QSFP, QSFP28/56/DD','CWDM, DWDM, BiDi and duplex optics','DAC, AOC and breakout assemblies','Copper and fiber patch cords','Connector, medium, length, color and SKU']},
  Passive:{tag:'PASSIVE INFRASTRUCTURE',text:'Patch panels, cassettes, keystones, rack drawers and storage cabinets follow power-free workflows and dedicated connectivity rules.',items:['Front-to-rear channel mapping','Provider and cross-rack termination','Modular panel capacity','Storage-bound inventory','No false PSU, cooling or sensor data']},
  Components:{tag:'SERVER CONFIGURATION',text:'Server configuration is driven by model-defined positions and compatible generations rather than a generic component list.',items:['CPU sockets and processor generations','DIMM slots, DDR generation and capacity','PCIe, OCP and Mezzanine positions','GPU physical size and power fit','Integrated versus replaceable PSU rules']}
};
document.querySelector('#featureGrid').innerHTML=features.map(([icon,title,text,target])=>`<a class="feature-card" href="#${target}"><i>${icon}</i><h3>${title}</h3><p>${text}</p><span>Explore →</span></a>`).join('');
const tabs=document.querySelector('#catalogTabs');
function showCatalog(name){const data=catalogs[name];document.querySelector('#catalogTag').textContent=data.tag;document.querySelector('#catalogTitle').textContent=name+' catalog';document.querySelector('#catalogText').textContent=data.text;document.querySelector('#catalogList').innerHTML=data.items.map(item=>`<li>${item}</li>`).join('');tabs.querySelectorAll('button').forEach(button=>button.classList.toggle('active',button.dataset.name===name))}
tabs.innerHTML=Object.keys(catalogs).map(name=>`<button data-name="${name}">${name}<span>→</span></button>`).join('');
tabs.addEventListener('click',event=>{const button=event.target.closest('button');if(button)showCatalog(button.dataset.name)});showCatalog('Equipment');

const searchable=[...features.map(([,title,text,target])=>({title,text,target})),...Object.entries(catalogs).map(([title,value])=>({title:title+' Catalog',text:value.text,target:'catalog'})),{title:'Architecture',text:'One backend and one authoritative database for web, mobile and agents.',target:'architecture'},{title:'Roadmap',text:'Production persistence, mobile field work, deployment and integrations.',target:'roadmap'}];
const dialog=document.querySelector('#searchDialog'),input=document.querySelector('#searchInput'),results=document.querySelector('#searchResults');
function renderSearch(){const value=input.value.trim().toLowerCase(),rows=value?searchable.filter(item=>(item.title+' '+item.text).toLowerCase().includes(value)):searchable.slice(0,7);results.innerHTML=rows.map(row=>`<a href="#${row.target}" onclick="searchDialog.close()"><b>${row.title}</b><small>${row.text}</small><span>↵</span></a>`).join('')||'<p>No matching capability.</p>'}
document.querySelector('#searchOpen').addEventListener('click',()=>{dialog.showModal();input.focus();renderSearch()});input.addEventListener('input',renderSearch);document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();dialog.open?dialog.close():document.querySelector('#searchOpen').click()}if(event.key==='Escape'&&dialog.open)dialog.close()});
document.querySelector('#year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('visible',entry.isIntersecting)),{threshold:.12});document.querySelectorAll('.section,.metric-band,.cta-section').forEach(section=>observer.observe(section));
