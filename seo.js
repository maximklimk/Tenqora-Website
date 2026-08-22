(() => {
  const origin = 'https://tenqora.net';
  const routes = {
    '/': 'Tenqora DCIM',
    '/index.html': 'Tenqora DCIM',
    '/dcim.html': 'DCIM Software',
    '/asset-management.html': 'Asset Management',
    '/connectivity.html': 'Physical Connectivity',
    '/monitoring.html': 'Infrastructure Monitoring',
    '/network-management.html': 'Network Management',
    '/telegram-manager.html': 'Telegram Manager',
    '/work-orders.html': 'Work Orders',
    '/platform.html': 'Tenqora Platform',
    '/solutions.html': 'Infrastructure Solutions',
    '/resources.html': 'Resources',
    '/register.html': 'Client Registration',
  };
  const pathname = routes[location.pathname] ? location.pathname : '/';
  const canonical = document.querySelector('link[rel="canonical"]')?.href || `${origin}${pathname}`;
  const description = document.querySelector('meta[name="description"]')?.content || '';
  const pageName = routes[pathname];
  const graph = [{
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: pageName,
    description,
    isPartOf: { '@id': `${origin}/#website` },
    inLanguage: document.documentElement.lang || 'en',
  }];

  if (pathname === '/' || pathname === '/index.html') {
    graph.push({
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      url: `${origin}/`,
      name: 'Tenqora',
      alternateName: ['Tenqora DCIM', 'Tenqora Infrastructure Management'],
      publisher: { '@id': `${origin}/#organization` },
      inLanguage: 'en',
    }, {
      '@type': 'Organization',
      '@id': `${origin}/#organization`,
      name: 'Tenqora',
      url: `${origin}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${origin}/assets/tenqora-mark.svg`,
        contentUrl: `${origin}/assets/tenqora-mark.svg`,
        width: 512,
        height: 512,
      },
      description: 'Operations-first DCIM, Asset Management, physical Connectivity and infrastructure Monitoring.',
    });
  } else {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Tenqora', item: `${origin}/` },
        { '@type': 'ListItem', position: 2, name: pageName, item: canonical },
      ],
    });
    const hero = document.querySelector('.page-hero');
    if (hero) {
      const breadcrumb = document.createElement('nav');
      breadcrumb.className = 'site-breadcrumbs';
      breadcrumb.setAttribute('aria-label', 'Breadcrumb');
      breadcrumb.innerHTML = `<a href="index.html">Tenqora</a><i aria-hidden="true">/</i><span aria-current="page">${pageName}</span>`;
      hero.prepend(breadcrumb);
    }
  }

  const structuredData = document.createElement('script');
  structuredData.type = 'application/ld+json';
  structuredData.id = 'tenqoraStructuredData';
  structuredData.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  document.head.append(structuredData);
})();
