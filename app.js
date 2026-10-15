/* HydroGrameen | Dependency-free, hash-routed website. Works on GitHub Pages and inside GHL. */
(function () {
  'use strict';
  const mount = document.getElementById('hydrogrameen-app');
  if (!mount || mount.dataset.hgMounted === 'true') return;
  mount.dataset.hgMounted = 'true';

  const sourceScript = document.currentScript;
  const scriptBase = new URL('.', (sourceScript && sourceScript.src) || window.location.href).href;
  const config = Object.assign({ mode: 'standalone', contactEmail: 'info@iibhb.org', ghlFormUrl: '' }, window.HG_SITE_CONFIG || {});
  const isEmbed = config.mode === 'embed';
  const asset = name => new URL('assets/' + name, scriptBase).href;
  const PHOTOS = {
    hero: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=85',
    landscape: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=82',
    wetland: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=82',
    forest: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=82',
    mountain: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=82',
    stream: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&q=82'
  };
  const URLS = {
    institute: 'https://iibhb.org/',
    model: 'https://iibhb.org/hydrogrameen/',
    about: 'https://iibhb.org/about-us/',
    team: 'https://iibhb.org/team/',
    events: 'https://iibhb.org/conference/',
    archive: 'https://iibhb.org/archive/',
    docs: 'https://jpatrick96.wixsite.com/iibhb/copy-of-downloads',
    science: 'https://jpatrick96.wixsite.com/iibhb/about1',
    contact: 'https://iibhb.org/contact-us/'
  };
  const routes = [
    ['/', 'Home'], ['/model', 'The Model'], ['/science', 'The Science'], ['/communities', 'Communities'],
    ['/projects', 'Our Work'], ['/research', 'Research'], ['/team', 'Our People'], ['/events', 'Events'],
    ['/about', 'About IIBHB'], ['/contact', 'Connect']
  ];
  const nav = [routes[1], routes[2], routes[3], routes[4], routes[5], routes[8]];
  const icons = {
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    external: '<path d="M14 5h5v5M10 14 19 5M19 13v6H5V5h6"/>',
    drop: '<path d="M12 2c4 6 8 10 8 14a8 8 0 0 1-16 0C4 12 8 8 12 2z"/>',
    waves: '<path d="M2 8c2.2-2 4.4-2 6.6 0s4.4 2 6.6 0 4.4-2 6.8 0M2 14c2.2-2 4.4-2 6.6 0s4.4 2 6.6 0 4.4-2 6.8 0M2 20c2.2-2 4.4-2 6.6 0s4.4 2 6.6 0 4.4-2 6.8 0"/>',
    leaf: '<path d="M21 3c-9-1-17 3-17 12a6 6 0 0 0 6 6c9 0 13-8 11-18Z"/><path d="M6 18c4-5 8-8 13-11"/>',
    shield: '<path d="M12 22c6-3 8-8 8-12V5l-8-3-8 3v5c0 4 2 9 8 12Z"/><path d="m9 12 2 2 4-5"/>',
    users: '<circle cx="9" cy="8" r="3"/><path d="M2 20v-2a7 7 0 0 1 14 0v2M16 5a3 3 0 0 1 0 6m2 3c2 1 4 3 4 6"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2c3 3 4 6 4 10s-1 7-4 10M12 2c-3 3-4 6-4 10s1 7 4 10"/>',
    flask: '<path d="M9 3h6m-5 0v7L4 20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2l-6-10V3M7 16h10"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-8M22 20V7M2 20h22"/>',
    home: '<path d="m3 11 9-8 9 8v10h-6v-7H9v7H3z"/>',
    search: '<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',
    book: '<path d="M12 6c-3-2-6-2-10-1v14c4-1 7-1 10 1 3-2 6-2 10-1V5c-4-1-7-1-10 1zM12 6v14"/>',
    file: '<path d="M6 2h8l5 5v15H6zM14 2v6h5M9 12h7M9 16h7"/>',
    handshake: '<path d="M2 13 7 6l5 2 4-2 6 7-5 6-4-2-3 2-8-6Z"/><path d="m9 13 4 4m1-7-4 4"/>',
    compass: '<circle cx="12" cy="12" r="10"/><path d="m16 8-3 6-5 2 2-5z"/>',
    map: '<path d="m2 6 7-3 6 3 7-3v15l-7 3-6-3-7 3zM9 3v15M15 6v15"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 8 10-8"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6m10-6v6M3 10h18"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    menu: '<path d="M3 7h18M3 12h18M3 17h18"/>',
    close: '<path d="M5 5 19 19M19 5 5 19"/>',
    layers: '<path d="m2 9 10-6 10 6-10 6zM2 14l10 6 10-6M2 19l10 4 10-4"/>',
    seed: '<path d="M12 21V10M12 14c-6 1-9-3-9-9 6 0 9 3 9 9Zm0-3c0-5 3-8 9-8 0 6-3 9-9 8Z"/>',
    heart: '<path d="M20.8 5.5a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.5a5.2 5.2 0 0 0-7.4 7.4L12 22l8.8-9.1a5.2 5.2 0 0 0 0-7.4Z"/>',
    plus: '<path d="M12 3v18M3 12h18"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    arrowup: '<path d="M7 17 17 7M7 7h10v10"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'
  };
  function icon(name, more = '') {
    return `<svg class="hg-icon ${more}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.drop}</svg>`;
  }
  function ext(url, label, cls = 'hg-text-link') {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="${cls}">${label} ${icon('external', 'hg-icon-sm')}<span class="hg-sr-only" style="position:absolute;clip-path:inset(50%);width:1px;height:1px;overflow:hidden"> (opens in new tab)</span></a>`;
  }
  function button(path, label, variant = 'primary') { return `<a class="hg-btn hg-btn-${variant}" href="#${path}">${label} ${icon('arrow','hg-icon-sm')}</a>`; }
  function eyebrow(label, light = false) { return `<span class="hg-eyebrow ${light ? 'hg-eyebrow-light' : ''}">${label}</span>`; }
  function heading(kicker, title, desc = '') {
    return `<div class="hg-section-heading">${eyebrow(kicker)}<h2 class="hg-title">${title}</h2>${desc ? `<p>${desc}</p>` : ''}</div>`;
  }
  function sourceNote(text, dark = false) { return `<div class="hg-source-note ${dark ? 'hg-source-note-dark' : ''}">${text}</div>`; }
  function feature(iconName, title, copy, link, label = 'Explore more') {
    return `<article class="hg-card"><span class="hg-card-icon">${icon(iconName,'hg-icon-lg')}</span><h3>${title}</h3><p>${copy}</p>${link ? `<a href="#${link}" class="hg-text-link">${label} ${icon('arrow','hg-icon-sm')}</a>` : ''}</article>`;
  }
  function imageWithNote(src, alt, note) {
    return `<div><figure class="hg-img-frame" style="margin:0"><img src="${src}" alt="${alt}" loading="lazy" /></figure><p class="hg-img-caption">${note || 'Illustrative landscape photography; not a documented HydroGrameen installation.'}</p></div>`;
  }
  function pageHero(kicker, title, desc, artSrc = '', artCaption = '') {
    return `<section class="hg-page-hero"><div class="hg-container"><div class="hg-page-hero-grid"><div><div class="hg-breadcrumb"><a href="#/">Home</a> / ${kicker}</div>${eyebrow(kicker, true)}<h1>${title}</h1><p>${desc}</p></div>${artSrc ? `<div class="hg-page-hero-art"><img alt="Illustrative watershed landscape" src="${artSrc}" loading="lazy"/><span>${artCaption || 'Landscape photography is illustrative, not documentation of an operating project.'}</span></div>` : `<div aria-hidden="true"></div>`}</div></div></section>`;
  }
  function joinCTA(title='Bring your perspective to the water conversation.', copy='Scientists, communities, educators, public agencies, and funders each have a role in building evidence-led watershed solutions.') {
    return `<section class="hg-section hg-section-sm"><div class="hg-container"><div class="hg-water-band"><div class="hg-water-band-grid"><div>${eyebrow('Collaborate with IIBHB',true)}<h2 class="hg-title">${title}</h2><p style="margin-top:18px">${copy}</p><div class="hg-cta-row">${button('/contact','Start a conversation','light')}</div></div><ul class="hg-band-list"><li>${icon('check')} Research &amp; technical expertise</li><li>${icon('check')} Community and local knowledge</li><li>${icon('check')} Education and training</li><li>${icon('check')} Institutional partnership</li></ul></div></div></div></section>`;
  }
  function scienceSVG(mode='baseline') {
    return `<svg class="hg-science-svg hg-mode-${mode}" viewBox="0 0 760 465" role="img" aria-label="Simplified cross-section of land, groundwater aquifers, a river, and a proposed managed recharge well; illustration not to scale.">
      <defs>
        <linearGradient id="hg-sky" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#D4EBF3"/><stop offset="1" stop-color="#F1F7F3"/></linearGradient>
        <pattern id="hg-strata" width="22" height="14" patternUnits="userSpaceOnUse"><path d="M0 10 22 10" stroke="#B1B29D" stroke-width="1" opacity=".48"/></pattern>
      </defs>
      <rect width="760" height="465" rx="12" fill="#EDF6F6"/>
      <rect width="760" height="115" fill="url(#hg-sky)"/>
      <path d="M0 115 Q90 84 170 120 T340 110 Q420 90 515 121 T760 111 V188 H0Z" fill="#95BD9B"/>
      <path d="M0 146 Q130 129 270 158 T540 155 T760 158 V230 H0Z" fill="#A88D6A"/>
      <rect x="0" y="187" width="760" height="94" fill="#DDD2B8"/>
      <rect x="0" y="187" width="760" height="94" fill="url(#hg-strata)"/>
      <g class="hg-waterline"><path class="hg-blue-water" d="M0 207 Q160 198 320 208 T760 203 V281 H0Z" fill="#86BED4" fill-opacity=".83"/><path d="M0 207 Q160 198 320 208 T760 203" stroke="#367F9E" stroke-width="3" fill="none" stroke-dasharray="7 7"/></g>
      <rect x="0" y="281" width="760" height="41" fill="#786D62"/><path d="M0 305 H760" stroke="#625B50" stroke-width="3"/>
      <rect x="0" y="322" width="760" height="108" fill="#D3C4A5"/><path d="M0 340 Q150 332 280 344 T540 338 T760 340 V430 H0Z" fill="#7BAEC4" opacity=".67"/>
      <path d="M0 429h760v36H0z" fill="#544F4B"/>
      <path d="M0 147 C115 133 160 149 218 153s96-5 135-9" stroke="#4C8FAD" stroke-width="3" fill="none"/>
      <path d="M530 143c18-7 34-8 50 2s30 10 47 1 28-7 47 2l86-9v16H530z" fill="#4FABC7"/>
      <path d="M572 144c18 12 40 15 58 3" stroke="#B7DFE8" stroke-width="3" fill="none"/>
      <rect x="436" y="137" width="16" height="229" rx="3" fill="#F4F3EE" stroke="#356176" stroke-width="3"/>
      <path d="M436 345h-30m46 0h31" stroke="#356176" stroke-width="3"/><path d="M436 357h-30m46 0h31" stroke="#356176" stroke-width="2"/>
      <rect x="432" y="112" width="24" height="27" rx="3" fill="#0B4F6C"/>
      <path d="M444 106v-30M436 87h16" stroke="#0B4F6C" stroke-width="4"/>
      <path d="M444 147v198" stroke="#24A2BD" stroke-width="4" stroke-dasharray="9 11"/>
      <g class="hg-recharge-arrows" fill="none" stroke="#0E91B0" stroke-width="4" stroke-linecap="round"><path d="M478 243v69m-8-9 8 9 8-9M408 243v69m-8-9 8 9 8-9"/></g>
      <g font-family="Open Sans, Arial, sans-serif" font-weight="700" font-size="17" fill="#143B4F">
      <text x="28" y="32">WATERSHED SURFACE</text>
      <text x="27" y="235">Shallow aquifer</text>
      <text x="29" y="306" fill="#fff" font-size="14">LOW-PERMEABILITY LAYER</text>
      <text x="28" y="389">Deeper aquifer</text>
      <text x="506" y="82" font-size="14">Proposed monitored</text><text x="506" y="101" font-size="14">recharge well</text>
      <text x="558" y="179" font-size="15">River / reservoir</text>
      </g>
      <path d="M501 103 456 131" stroke="#2F768F" stroke-width="2"/>
      <path d="M0 464h760" stroke="#1B5D77" stroke-width="2"/>
    </svg>`;
  }

  function homePage() {
    return `
      <section class="hg-hero"><div class="hg-container"><div class="hg-hero-grid">
        <div class="hg-hero-copy">${eyebrow('Water • People • Possibility',true)}
          <h1>A healthier water future begins <em>beneath our feet.</em></h1>
          <p>HydroGrameen connects aquifer replenishment, watershed science, and community-centered planning—bringing practical water solutions and long-term stewardship into one shared vision.</p>
          <div class="hg-cta-row">${button('/model','Explore HydroGrameen','light')}${button('/science','Understand the science','ghost')}</div>
          <div class="hg-hero-note"><span></span> A public-interest model advanced by the International Institute of Bengal and Himalayan Basins</div>
        </div>
        <div class="hg-hero-visual">
          <div class="hg-hero-image"><img src="${PHOTOS.hero}" alt="Mountain lake and green watershed landscape" fetchpriority="high"/><div class="hg-photo-overlay"><span>One connected system</span><strong>Healthier water. More resilient communities.</strong></div></div>
          <div class="hg-hero-float"><div class="hg-float-icon">${icon('waves','hg-icon-lg')}</div><div><strong>From watershed to water table</strong><small>Explore the layers of restoration</small></div></div>
        </div>
      </div></div></section>
      <section class="hg-section"><div class="hg-container">
        ${heading('The essential idea','Water restoration is more than a single technology.','Water, land use, public health, agriculture, and local decision-making are connected. HydroGrameen brings those pieces into one proposed community-scale framework.')}
        <div class="hg-grid-3">
          ${feature('drop','Replenish aquifers','Explore carefully planned groundwater recharge as part of restoring depleted water systems.','/model','Discover the model')}
          ${feature('leaf','Protect living watersheds','Pair hydrology with ecological safeguards, land stewardship, and environmental health.','/science','Explore the science')}
          ${feature('users','Strengthen communities','Consider how water access can support learning, homes, livelihoods, and local participation.','/communities','See the community vision')}
        </div>
      </div></section>
      <section class="hg-section hg-section-mist"><div class="hg-container"><div class="hg-split">
        ${imageWithNote(PHOTOS.landscape,'A freshwater lake ringed by vegetation and hills')}
        <div class="hg-split-copy">${eyebrow('Why this matters')}<h2 class="hg-title">The water crisis is a systems challenge.</h2>
          <p>Groundwater depletion, water contamination, drought, and unsustainable land use do not happen in isolation. Addressing them requires rigorous study of the entire watershed—from recharge and geology to how water is used.</p>
          <p>The experience of the Bengal and Himalayan Basins and California informs IIBHB’s mission: turn scientific knowledge into practical approaches communities can understand and adapt.</p>
          <div class="hg-cta-row">${button('/projects','See the work','primary')}</div>
        </div>
      </div></div></section>
      <section class="hg-section"><div class="hg-container">
        ${heading('The proposed approach','A connected path from evidence to action.','The HydroGrameen concept is designed to connect scientific assessment, responsible water management, ecological planning, and local partnership.')}
        <div class="hg-process">
          <div class="hg-process-step"><span class="hg-process-bubble">01</span><h3>Understand the basin</h3><p>Study aquifers, contaminants, water demand, geology, and local needs.</p></div>
          <div class="hg-process-step"><span class="hg-process-bubble">02</span><h3>Plan safe water pathways</h3><p>Assess source-water quality, recharge feasibility, permitting, and monitoring.</p></div>
          <div class="hg-process-step"><span class="hg-process-bubble">03</span><h3>Design with communities</h3><p>Connect water systems to land, housing, ecology, agriculture, and learning.</p></div>
          <div class="hg-process-step"><span class="hg-process-bubble">04</span><h3>Measure and adapt</h3><p>Track environmental and community outcomes before drawing conclusions.</p></div>
        </div>
        ${sourceNote('<strong>Concept, not a performance claim:</strong> These steps describe a proposed implementation framework. Safety, technical feasibility, funding, and effectiveness must be established separately for each site.')}
      </div></section>
      <section class="hg-section hg-section-mist"><div class="hg-container"><div class="hg-split hg-split-wide">
        <div class="hg-split-copy">${eyebrow('The science, made visible')}<h2 class="hg-title">What happens beneath the surface?</h2>
          <p>An aquifer is a layer of rock or sediment that can hold and transmit groundwater. Replenishing it responsibly depends on local conditions, water quality, engineering controls, and long-term monitoring.</p>
          <p>Explore a simplified cross-section of a watershed to understand the key parts of the HydroGrameen proposal.</p>
          <div class="hg-cta-row">${button('/science','Explore the aquifer','primary')}</div>
        </div>
        <div class="hg-visual-panel">${scienceSVG()}<p class="hg-diagram-caption">Conceptual illustration; not to scale. A recharge design must undergo site-specific hydrogeological and water-quality review.</p></div>
      </div></div></section>
      <section class="hg-section"><div class="hg-container"><div class="hg-split">
        ${imageWithNote(PHOTOS.wetland,'Green rolling landscape beside water')}
        <div class="hg-split-copy">${eyebrow('Place and people')}<h2 class="hg-title">Rooted in the Bengal Basin. Informed by California. Open to the world.</h2>
          <p>HydroGrameen grew from the former Bengal Basin Working Model and IIBHB’s wider work on groundwater quality, environmental science, and sustainable development.</p>
          <p>The institute’s vision connects lessons from South Asia, the United States, and beyond to support locally appropriate models—not one-size-fits-all promises.</p>
          <div class="hg-cta-row">${button('/about','About the institute','outline')}</div>
        </div>
      </div></div></section>
      <section class="hg-section hg-section-navy"><div class="hg-container"><div class="hg-split">
        <div>${eyebrow('Public-interest science',true)}<h2 class="hg-title hg-title-light">A model for water—and for the communities around it.</h2>
          <p style="color:#C6DFE3;margin-top:22px;line-height:1.9">The original HydroGrameen concept describes shared reservoirs, watershed planning, sustainable housing, communal resources, education, and local livelihoods. Today it is best understood as a proposed integrated model that warrants testing and community review.</p>
          <div class="hg-cta-row">${button('/communities','Discover the community model','light')}</div>
        </div>
        <div style="padding:10px 0"><div class="hg-quote-mark" aria-hidden="true">“</div><blockquote class="hg-quote" style="color:#EFF9F8;margin:0">Science in service of water, people, and the living systems that sustain them.</blockquote><p style="color:#B6DADD;margin-top:20px;font-weight:700;font-size:.83rem">IIBHB brand foundation</p></div>
      </div></div></section>
      <section class="hg-section"><div class="hg-container">
        ${heading('Explore & learn','A living knowledge base for healthier watersheds.','Visit the scientific background, research documents, historical events, and people contributing to the larger conversation.')}
        <div class="hg-grid-3">
          <article class="hg-card hg-photo-card"><img src="${PHOTOS.mountain}" alt="Mountains above a valley" loading="lazy"/><div class="hg-photo-card-body"><span class="hg-pill">Knowledge</span><h3>Research &amp; resources</h3><p>Explore historical proposals, the HydroGrameen brochure, and further reading.</p><a href="#/research" class="hg-text-link">Browse the library ${icon('arrow','hg-icon-sm')}</a></div></article>
          <article class="hg-card hg-photo-card"><img src="${PHOTOS.forest}" alt="Forest canopy with sunlight" loading="lazy"/><div class="hg-photo-card-body"><span class="hg-pill hg-pill-green">People</span><h3>Scientists &amp; collaborators</h3><p>Meet the IIBHB founder and the interdisciplinary team listed by the institute.</p><a href="#/team" class="hg-text-link">Meet the people ${icon('arrow','hg-icon-sm')}</a></div></article>
          <article class="hg-card hg-photo-card"><img src="${PHOTOS.stream}" alt="Flowing stream through forested rocks" loading="lazy"/><div class="hg-photo-card-body"><span class="hg-pill hg-pill-neutral">Archive</span><h3>Talks &amp; public programs</h3><p>Learn about past conferences and Townes and Tagore seminars.</p><a href="#/events" class="hg-text-link">Explore events ${icon('arrow','hg-icon-sm')}</a></div></article>
        </div>
      </div></section>
      ${joinCTA('Better water futures are built together.','Discover ways to collaborate on water science, education, environmental stewardship, and responsible community-scale research.')}`;
  }

  function modelPage() {
    return `${pageHero('HydroGrameen model','Water that works for communities.','An integrated vision for responsible aquifer replenishment, healthy watersheds, and community development. Formerly known as the Bengal Basin Working Model.',PHOTOS.landscape)}
      <section class="hg-section"><div class="hg-container"><div class="hg-split hg-split-wide">
        <div class="hg-split-copy">${eyebrow('The concept')}<h2 class="hg-title">A water system designed around life.</h2>
          <p>HydroGrameen is the flagship applied model presented by the International Institute of Bengal and Himalayan Basins. In its historic brochure, the institute envisions a managed watershed organized around a reservoir and associated villages, with aquifer recharge and community stewardship as central goals.</p>
          <p>Rather than treating water supply, land use, and local economies as separate questions, the proposed model considers them together. It is a framework for assessment and potential pilots—not a blanket guarantee of water quality or recharge performance.</p>
          ${sourceNote(`<strong>Source:</strong> IIBHB’s HydroGrameen brochure and current model description. ${ext(URLS.model,'Read the original description')}`)}
        </div>
        <div class="hg-visual-panel">${scienceSVG()}<p class="hg-diagram-caption">A simplified depiction of a proposed recharge well and aquifer system. The original historic brochure contains a separate dam cross-section and cooperative village plan.</p></div>
      </div></div></section>
      <section class="hg-section hg-section-mist"><div class="hg-container">
        ${heading('Five connected elements','The building blocks of HydroGrameen.','The historical model combines environmental engineering and community design. Every location would need its own technical and social feasibility assessment.')}
        <div class="hg-grid-3">
          ${feature('drop','Managed aquifer recharge','Explore whether a locally appropriate water source can replenish stressed aquifers through a permitted, monitored system.')}
          ${feature('waves','Watershed &amp; reservoir management','Consider storage, drainage, river connections, flooding, sediment, and ecological flow together.')}
          ${feature('shield','Water quality safeguards','Assess contaminants, pretreatment needs, groundwater chemistry, and safe operational controls before any intervention.')}
          ${feature('home','Community-centered places','Connect watershed infrastructure with housing, shared facilities, public education, and local planning.')}
          ${feature('leaf','Ecological design','Study native habitats, land restoration, vegetation, and long-term watershed resilience.')}
          ${feature('handshake','Cooperative stewardship','Explore shared governance, local knowledge, accountable maintenance, and benefits for participating communities.')}
        </div>
      </div></section>
      <section class="hg-section"><div class="hg-container">
        ${heading('From proposal to practice','What would an actual implementation require?','HydroGrameen does not replace local permitting, hydrogeological investigation, or field validation. The pathway below distinguishes critical decisions from the broader vision.')}
        <div class="hg-grid-4">
          <article class="hg-soft-card"><div class="hg-number">01</div><h3>Baseline assessment</h3><p>Characterize geology, hydraulic gradients, water budget, uses, and contaminants.</p></article>
          <article class="hg-soft-card"><div class="hg-number">02</div><h3>Feasibility &amp; consent</h3><p>Consult local stakeholders, regulators, landowners, and water experts; evaluate alternatives.</p></article>
          <article class="hg-soft-card"><div class="hg-number">03</div><h3>Safeguarded pilot</h3><p>Only after approval, test engineering controls, recharge behavior, and quality monitoring at appropriate scale.</p></article>
          <article class="hg-soft-card"><div class="hg-number">04</div><h3>Independent evaluation</h3><p>Measure outcomes, publish limitations, and determine whether expansion is justified.</p></article>
        </div>
      </div></section>
      <section class="hg-section hg-section-mist"><div class="hg-container"><div class="hg-split">
        ${imageWithNote(PHOTOS.wetland,'Rolling green landscape with water in the distance')}
        <div class="hg-split-copy">${eyebrow('A watershed community')}<h2 class="hg-title">Water as a common foundation.</h2>
          <p>The original HydroGrameen cooperative proposal discusses shared reservoirs, village centers, communal spaces, agriculture, educational opportunities, and a blend of housing options.</p>
          <p>These ideas invite public dialogue about equity and local self-reliance. They should be developed with communities—not assumed to be appropriate everywhere.</p>
          <div class="hg-cta-row">${button('/communities','See the community vision','primary')}</div>
        </div>
      </div></div></section>
      <section class="hg-section"><div class="hg-container"><div class="hg-split hg-split-wide">
        <div>${eyebrow('Frequently asked questions')}<h2 class="hg-title">Thoughtful questions deserve clear answers.</h2>
        <p class="hg-lead" style="margin-top:18px">Read the model as a starting point for evidence-led inquiry—not as a substitute for engineering design or regulatory review.</p></div>
        <div>
          <details class="hg-faq"><summary>Is HydroGrameen an operating water treatment plant?</summary><p>The supplied materials describe a proposed watershed and recharge model. They do not establish a currently operating, independently evaluated HydroGrameen installation. Specific pilot or deployment claims should be documented before publication.</p></details>
          <details class="hg-faq"><summary>Does aquifer recharge automatically make groundwater safe to drink?</summary><p>No. Water quality depends on the source, treatment, geology, contaminants, reactions within the aquifer, and monitoring. Drinking-water safety must be established with appropriate testing and applicable standards.</p></details>
          <details class="hg-faq"><summary>Can the same design be deployed everywhere?</summary><p>No. Hydrogeology, local water demand, water rights, environmental conditions, and community priorities differ. The framework would need to be adapted and independently evaluated for each site.</p></details>
          <details class="hg-faq"><summary>How can researchers or institutions contribute?</summary><p>Potential collaborators could support hydrogeological studies, baseline testing, community engagement, regulatory analysis, educational resources, and pilot assessment. Contact IIBHB to discuss specific opportunities.</p></details>
        </div>
      </div></div></section>
      ${joinCTA('Help shape the next chapter of HydroGrameen.','Share scientific expertise, a potential research collaboration, or a community perspective on responsible water-system restoration.')}`;
  }

  function sciencePage() {
    return `${pageHero('Water science','Understanding the water beneath us.','Explore groundwater, recharge, water quality, and why protecting an aquifer begins with knowing its geology and chemistry.',PHOTOS.mountain)}
      <section class="hg-section"><div class="hg-container"><div class="hg-split hg-split-wide">
        <div><div class="hg-visual-panel">${scienceSVG()}<div class="hg-science-controls" role="group" aria-label="Choose a conceptual groundwater scenario">
          <button type="button" data-science-mode="baseline" aria-pressed="true">Typical conditions</button>
          <button type="button" data-science-mode="depletion" aria-pressed="false">Groundwater drawdown</button>
          <button type="button" data-science-mode="recharge" aria-pressed="false">Managed recharge</button>
        </div><div class="hg-diagram-readout" aria-live="polite"><strong id="hg-science-mode-title">Typical conditions</strong><p id="hg-science-mode-desc">Groundwater occupies pores and fractures in subsurface materials. Actual water-table depths and aquifer boundaries vary from place to place.</p></div>
        <p class="hg-diagram-caption">Conceptual educational illustration, not to scale. The selected views are explanatory, not model predictions, measured data, or proof of effectiveness.</p></div></div>
        <div class="hg-split-copy">${eyebrow('Interactive aquifer explorer')}<h2 class="hg-title">An aquifer is a living part of the water cycle.</h2>
          <p>Rainfall, surface water, soils, rock, plants, and human activity all affect the amount and quality of groundwater. A watershed is the land area through which water drains toward a common receiving body.</p>
          <p>Managed aquifer recharge describes intentional efforts to increase groundwater replenishment. Depending on local conditions, it can involve infiltration, spreading areas, basins, or engineered wells. Each method has distinct risks, design requirements, and regulatory obligations.</p>
          <ul class="hg-checklist" style="margin-top:25px"><li>${icon('check')} Understand local aquifer geology and hydraulic connections</li><li>${icon('check')} Evaluate source water and groundwater chemistry</li><li>${icon('check')} Monitor levels, quality, and unintended effects</li><li>${icon('check')} Protect people, ecosystems, and neighboring water users</li></ul>
        </div>
      </div></div></section>
      <section class="hg-section hg-section-mist"><div class="hg-container">
        ${heading('The core questions','Good restoration begins with good questions.','The HydroGrameen concept draws on an interdisciplinary field: hydrogeology, geochemistry, engineering, public health, ecology, and environmental governance.')}
        <div class="hg-grid-3">
          ${feature('layers','Where does the water move?','Geology, gradients, recharge zones, pumping, and connected surface waters shape the flow of groundwater.')}
          ${feature('flask','What is in the water?','Arsenic, nitrate, microbes, salts, organic chemicals, and other constituents require context-specific assessment.')}
          ${feature('chart','What changes over time?','Monitoring can track levels, seasonal variation, pumping, chemistry, ecosystems, and well performance.')}
          ${feature('shield','What needs protection?','Safeguards must account for existing water users, aquifer contamination risks, habitats, and drinking-water supplies.')}
          ${feature('map','Where would it be appropriate?','Site selection depends on subsurface properties, water availability, land-use conditions, and regulations.')}
          ${feature('users','Who participates in decisions?','Communities, technical specialists, and authorities must be involved in developing and interpreting the evidence.')}
        </div>
      </div></section>
      <section class="hg-section"><div class="hg-container"><div class="hg-split">
        ${imageWithNote(PHOTOS.stream,'Freshwater stream flowing over rocks in a forest')}
        <div class="hg-split-copy">${eyebrow('Water quality & public health')}<h2 class="hg-title">Clean water is a matter of chemistry and trust.</h2>
          <p>Arsenic in groundwater is a major concern in parts of the Bengal Basin and elsewhere. Geological conditions, subsurface chemistry, and human water use can influence where and when contaminants occur.</p>
          <p>IIBHB’s historical materials focus on drinking-water contamination and the importance of detailed hydrogeological and geochemical investigation. Safe use always depends on testing and on meeting the requirements for the intended use of water.</p>
          ${sourceNote(`For practical guidance on privately owned wells, consult current public-health authorities such as the ${ext('https://www.epa.gov/privatewells','U.S. EPA private wells resource')}. IIBHB historical source: ${ext(URLS.science,'Bengal Basin science background')}.`)}
        </div>
      </div></div></section>
      <section class="hg-section hg-section-mist"><div class="hg-container"><div class="hg-split hg-split-wide"><div>
        ${eyebrow('Evidence pathway')}<h2 class="hg-title">From observation to a trustworthy result.</h2><p style="margin-top:20px;line-height:1.9">A credible pilot needs to document baseline conditions, monitor operational changes, test water chemistry, consider ecological and community effects, and publish both successful and inconclusive findings.</p>
        <div class="hg-timeline" style="margin-top:32px">
          <div class="hg-timeline-item"><small>Before intervention</small><h3>Establish a baseline</h3><p>Measure aquifer levels, withdrawals, water quality, environmental conditions, and community needs.</p></div>
          <div class="hg-timeline-item"><small>During any approved pilot</small><h3>Monitor and respond</h3><p>Record recharge volumes, hydraulics, groundwater chemistry, operation, and unexpected effects.</p></div>
          <div class="hg-timeline-item"><small>After evaluation</small><h3>Share what was learned</h3><p>Compare results with baselines and independent criteria; make limitations transparent.</p></div>
        </div>
        </div><div class="hg-soft-card"><span class="hg-card-icon">${icon('file','hg-icon-lg')}</span><h3>Technical research in the archive</h3><p>IIBHB’s historical EPA project narrative outlined training and technical assistance for private well owners in San Francisco Bay Area counties. It describes water-quality education, community outreach, and evaluation methods.</p><div style="margin-top:20px">${ext(URLS.docs,'Explore historical documents')}</div></div>
      </div></div></section>
      ${joinCTA('Contribute to careful water science.','Get in touch about hydrogeology, geochemistry, public-health education, data collection, or evaluation partnerships.')}`;
  }

  function communitiesPage() {
    return `${pageHero('Community model','The water village: a shared vision of resilience.','HydroGrameen’s original cooperative concept places water, ecology, education, and livelihoods at the center of community design.',PHOTOS.wetland)}
      <section class="hg-section"><div class="hg-container"><div class="hg-split">
        <div class="hg-split-copy">${eyebrow('Beyond infrastructure')}<h2 class="hg-title">A watershed can also be a place to belong.</h2>
          <p>The historical HydroGrameen brochure envisions a network of communities built around shared water resources. It describes villages with communal spaces, sustainable land use, different housing options, and a cooperative approach to local economic life.</p>
          <p>The underlying idea is that restoring water should create conditions for long-term community well-being. These elements are proposals for co-design and feasibility testing, not established results.</p>
          <div class="hg-cta-row">${button('/model','Understand the model','primary')}</div>
        </div>
        ${imageWithNote(PHOTOS.forest,'Sunlight passing through the trees of a healthy forest')}
      </div></div></section>
      <section class="hg-section hg-section-mist"><div class="hg-container">
        ${heading('The design principles','A model that sees the whole community.','The brochure describes a cooperative vision. The following themes summarize the parts most relevant to public dialogue and partnership.')}
        <div class="hg-grid-3">
          ${feature('drop','Shared water stewardship','Water storage and groundwater protection are conceived as collective assets that require governance, care, and transparent monitoring.')}
          ${feature('home','Housing &amp; public spaces','The concept includes housing options, gathering places, and shared facilities alongside watershed infrastructure.')}
          ${feature('seed','Food systems &amp; land','Agriculture, green space, erosion management, and ecological restoration become part of local planning.')}
          ${feature('book','Education &amp; learning','Public education and technical training are important to building local scientific understanding and capacity.')}
          ${feature('heart','Health &amp; dignity','Access to safer water and decisions responsive to local needs are guiding goals—not outcomes that can be assumed in advance.')}
          ${feature('handshake','Shared responsibility','The historical design explores a cooperative economic structure, with community participation at its center.')}
        </div>
      </div></section>
      <section class="hg-section"><div class="hg-container"><div class="hg-water-band"><div class="hg-water-band-grid"><div>${eyebrow('Design with, not for',true)}<h2 class="hg-title hg-title-light">Local knowledge belongs in every decision.</h2><p style="margin-top:20px">Land access, water rights, governance, financing, maintenance, housing, and cultural context cannot be resolved by engineering diagrams alone. Real projects need transparent consent processes and partnerships responsive to local priorities.</p></div><ul class="hg-band-list"><li>${icon('check')} Community-defined priorities</li><li>${icon('check')} Equitable participation</li><li>${icon('check')} Long-term governance</li><li>${icon('check')} Environmental accountability</li></ul></div></div></section>
      <section class="hg-section hg-section-mist"><div class="hg-container"><div class="hg-split hg-split-wide">
        <div>${eyebrow('Historical design language')}<h2 class="hg-title">Inside the HydroGrameen cooperative concept.</h2><p style="margin-top:21px;line-height:1.9">The historic brochure illustrates a central reservoir, surrounding villages, access roads, and communal areas. It discusses opportunities for affordable housing and self-sustaining livelihoods, while connecting local development to water management.</p>
        <p style="margin-top:19px;line-height:1.9">The brochure is a source of design history, not an approved engineering plan. Reservoir specifications, subsurface injection methods, financing approaches, and site impacts require contemporary independent evaluation.</p>
        <div class="hg-cta-row">${button('/research','Browse the archival materials','outline')}</div>
        </div>
        <div class="hg-visual-panel"><div style="padding:14px 6px 2px;display:grid;gap:18px">
          <div style="text-align:center;color:#0B4F6C;font-weight:800;font-size:.73rem;letter-spacing:.13em;text-transform:uppercase">Conceptual community relationships</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:13px"><div class="hg-soft-card" style="background:white;padding:20px;text-align:center">${icon('home','hg-icon-lg')}<h3 style="font-size:.95rem">Living</h3><p style="font-size:.76rem">Homes &amp; gathering places</p></div><div class="hg-soft-card" style="background:white;padding:20px;text-align:center">${icon('book','hg-icon-lg')}<h3 style="font-size:.95rem">Learning</h3><p style="font-size:.76rem">Education &amp; skills</p></div></div>
          <div style="padding:22px;background:#0B4F6C;color:white;border-radius:12px;text-align:center">${icon('drop','hg-icon-lg')}<div style="font-family:var(--serif);font-size:1.4rem;margin-top:5px">Shared watershed</div><p style="color:#D8EEEB;font-size:.8rem">Water stewardship as a common foundation</p></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:13px"><div class="hg-soft-card" style="background:white;padding:20px;text-align:center">${icon('seed','hg-icon-lg')}<h3 style="font-size:.95rem">Land</h3><p style="font-size:.76rem">Farms &amp; habitats</p></div><div class="hg-soft-card" style="background:white;padding:20px;text-align:center">${icon('handshake','hg-icon-lg')}<h3 style="font-size:.95rem">Governance</h3><p style="font-size:.76rem">Local participation</p></div></div>
        </div><p class="hg-diagram-caption">Relationship illustration based on themes in the historical HydroGrameen brochure; not a site layout or operating cooperative.</p></div>
      </div></div></section>
      ${joinCTA('Build the human side of water resilience.','Help translate responsible water research into community-centered partnerships, accessible education, and locally appropriate planning.')}`;
  }

  const workItems = [
    { src:PHOTOS.wetland, tag:'Research origins', cls:'hg-pill-green', title:'Bengal & Himalayan Basins', copy:'The ecological, geological, and hydrological diversity of South Asia shapes the institute’s historical interest in arsenic, water quality, and basin-wide management.', status:'Regional research context', url:URLS.science },
    { src:PHOTOS.landscape, tag:'Historical proposal', cls:'hg-pill-amber', title:'San Francisco Bay Area private wells', copy:'An archived project narrative proposed technical training and assistance for private well owners in several Bay Area counties. It is not evidence of an awarded or completed project.', status:'Project narrative / not a confirmed deployment', url:URLS.docs },
    { src:PHOTOS.forest, tag:'Conceptual model', cls:'', title:'HydroGrameen watershed cooperative', copy:'The historic model proposes reservoirs, aquifer recharge, shared amenities, and community-oriented land use as parts of a single framework.', status:'Design concept; requires site validation', url:URLS.model },
    { src:PHOTOS.stream, tag:'Historical event topic', cls:'hg-pill-neutral', title:'Buriganga River discussion', copy:'IIBHB’s published 2025 Dhaka conference invitation proposed a focus on pollution mitigation for the Buriganga River. The source is an announcement, not a project outcome report.', status:'Conference agenda / historical announcement', url:URLS.events }
  ];
  function projectsPage() {
    return `${pageHero('Our work','From local challenges to shared learning.','Explore HydroGrameen’s geographic roots, historical proposals, and the questions that could guide future field partnerships.',PHOTOS.stream)}
      <section class="hg-section"><div class="hg-container">
        ${heading('Project & knowledge areas','Where the story takes shape.','The institute’s historical record includes science, proposal development, events, and community concepts. Status labels below distinguish those materials from verified deployments.')}
        <div class="hg-grid-2">${workItems.map(w=>`<article class="hg-project-card"><img src="${w.src}" alt="Illustrative natural landscape" loading="lazy"/><div class="hg-project-card-body"><span class="hg-pill ${w.cls}">${w.tag}</span><h3>${w.title}</h3><p>${w.copy}</p><p style="font-size:.75rem;color:#42657A;margin-top:13px;font-weight:800">STATUS — ${w.status}</p>${ext(w.url,'Explore source material')}</div></article>`).join('')}</div>
        ${sourceNote('<strong>Project transparency:</strong> The supplied documents do not establish a roster of completed HydroGrameen installations, verified restoration volumes, or active institutional pilot agreements. These should only be added once supported by dated records.')}
      </div></section>
      <section class="hg-section hg-section-mist"><div class="hg-container"><div class="hg-split">
        <div>${eyebrow('What comes next')}<h2 class="hg-title">A practical way to develop future partnerships.</h2><p style="margin-top:18px;line-height:1.9">HydroGrameen’s next steps can be framed as a series of measurable opportunities: assemble evidence, identify candidate settings, build local trust, assess feasibility, and report results openly.</p>
        <div class="hg-timeline" style="margin-top:34px">
          <div class="hg-timeline-item"><small>Discovery</small><h3>Listen and document the need</h3><p>Community context, existing datasets, water concerns, and potential collaborators.</p></div>
          <div class="hg-timeline-item"><small>Design</small><h3>Co-create a rigorous scope</h3><p>Research questions, partner roles, ethics, regulatory steps, and budgets.</p></div>
          <div class="hg-timeline-item"><small>Validation</small><h3>Measure before scaling</h3><p>Technical assessment, independently reviewed monitoring, and transparent reporting.</p></div>
        </div></div>
        ${imageWithNote(PHOTOS.mountain,'Mountain watershed landscape under open sky')}
      </div></div></section>
      ${joinCTA('Explore a place-based research partnership.','Share local watershed challenges, potential data collaborations, or a proposal for a feasibility study with the IIBHB network.')}`;
  }

  function researchPage() {
    const resources = [
      {title:'The HydroGrameen / HydroGramin model brochure', status:'Historical model concept', description:'A two-page legacy brochure outlining reservoir engineering concepts, aquifer recharge, housing, a watershed cooperative, education, and local economic ideas.', url:asset('HydroGramin--Brochure.pdf'), source:'Historical IIBHB brochure (PDF)'},
      {title:'Technical Training to Develop a National Model for Privately Owned Wells', status:'Historical project proposal', description:'An IIBHB project narrative prepared for the U.S. EPA addressing well-owner training and water quality in San Francisco Bay Area counties. A proposal is not proof of funding or implementation.', url:asset('Project-Narrative--US_EPA.pdf'), source:'IIBHB / archived project narrative (PDF)'},
      {title:'The HydroGrameen model — institute overview', status:'Institutional description', description:'The current IIBHB description traces the model from the Bengal Basin Working Model to HydroGrameen and explains its integrated watershed ambition.', url:URLS.model, source:'IIBHB current website'},
      {title:'Bengal Basin water quality: historical science overview', status:'Historical background', description:'The institute’s legacy science page discusses waterborne disease, arsenic contamination, hydrology, and the importance of geochemistry. Older figures and explanations require independent review.', url:URLS.science, source:'IIBHB legacy website'},
      {title:'Townes and Tagore seminar materials', status:'Historical public programs', description:'Programs and reading materials from seminars on science, environmental stewardship, culture, and water challenges.', url:URLS.docs, source:'IIBHB legacy document library'},
      {title:'IIBHB news and archive', status:'Historical archive', description:'Past announcements, drought coverage, community-water events, and additional research references from the institute.', url:URLS.archive, source:'IIBHB current website'}
    ];
    return `${pageHero('Research & resources','Knowledge is the foundation of action.','Dive into the institute’s published archive, historical project narratives, water science themes, and the questions that matter for future pilots.',PHOTOS.forest)}
      <section class="hg-section"><div class="hg-container">
        ${heading('Source library','Original materials & further reading.','These materials describe the institute’s thinking and history. Links lead to external IIBHB pages and their document libraries; they are not presented as peer-reviewed validation of a completed HydroGrameen project.')}
        <div class="hg-grid-2">${resources.map(r=>`<article class="hg-resource"><span class="hg-resource-icon">${icon('file','hg-icon-lg')}</span><div><span class="hg-pill hg-pill-neutral">${r.status}</span><h3>${r.title}</h3><p>${r.description}</p><p style="margin-top:9px;font-weight:700;font-size:.73rem;color:#5B777F">SOURCE — ${r.source}</p>${ext(r.url,'Open resource')}</div></article>`).join('')}</div>
        <div class="hg-split" style="margin-top:55px;align-items:start"><div class="hg-visual-panel" style="background:#ECF5E7;text-align:center"><img src="${asset('hydrogrameen-historical-diagram.webp')}" alt="Historic HydroGramin brochure showing a dam cross-section and watershed cooperative plan" loading="lazy" style="max-height:560px;width:100%;object-fit:contain;border-radius:7px"/><p class="hg-diagram-caption">Historical diagram from the supplied HydroGramin brochure. Not an approved construction plan.</p></div><div>${eyebrow('From the archives')}<h2 class="hg-title-sm">The original watershed design.</h2><p style="margin-top:19px;line-height:1.9">The archival brochure includes a reservoir cross-section and a proposed cooperative village layout. Read it as a historical conceptual drawing; any contemporary design would require independent hydrological, environmental, regulatory, and economic review.</p><div class="hg-cta-row"><a href="${asset('HydroGramin--Brochure.pdf')}" target="_blank" rel="noopener noreferrer" class="hg-btn hg-btn-outline">View historical brochure ${icon('external','hg-icon-sm')}</a></div></div></div>
        ${sourceNote('<strong>Archival note:</strong> The original brochure and EPA narrative are included in the downloadable site assets; some older external IIBHB document links may need maintenance.')}
      </div></section>
      <section class="hg-section hg-section-mist"><div class="hg-container">
        ${heading('Responsible research','What evidence should accompany a field pilot?','The following reporting checklist is recommended for future HydroGrameen feasibility studies. It is not a statement that these measurements have already been completed.')}
        <div class="hg-grid-3">
          ${feature('layers','Hydrogeology &amp; site conditions','Well logs, aquifer properties, groundwater flow, recharge conditions, and connections to surface water.')}
          ${feature('flask','Water quality &amp; safety','Baseline chemical and microbiological tests, treatment needs, monitoring frequency, and applicable water-use criteria.')}
          ${feature('chart','Water balance &amp; performance','Recharge inputs, groundwater responses, withdrawals, long-term trends, and uncertainty ranges.')}
          ${feature('leaf','Ecological outcomes','Potential effects on soils, vegetation, waterways, habitats, and adjacent land use.')}
          ${feature('users','Community participation','Consent processes, distribution of benefits and burdens, educational access, and local accountability.')}
          ${feature('file','Independent documentation','Study design, methods, limitations, partner responsibilities, peer review, and publicly available results.')}
        </div>
      </div></section>
      <section class="hg-section"><div class="hg-container"><div class="hg-split hg-split-wide">
        <div>${eyebrow('Foundational topic')}<h2 class="hg-title">Private wells, public knowledge.</h2><p style="margin-top:20px;line-height:1.9">The archived IIBHB EPA proposal emphasizes an often-overlooked need: accessible technical assistance for private well owners. Its intended work included education on well maintenance, contamination risks, emergency responses, and the interpretation of water-quality tests.</p><p style="margin-top:18px;line-height:1.9">The document proposed both in-person and remote training, with surveys and laboratory analysis to evaluate results. These are historical plans and should not be mistaken for confirmed program delivery.</p><div class="hg-cta-row">${ext('https://www.epa.gov/privatewells','Current EPA guidance','hg-btn hg-btn-outline')}</div></div>
        <div class="hg-soft-card"><span class="hg-card-icon">${icon('book','hg-icon-lg')}</span><h3>Science should be understandable.</h3><p>The IIBHB mission includes education and knowledge sharing. Useful research materials answer the questions most people actually have: What is the risk? What was tested? What do the findings mean? Who can help next?</p><hr class="hg-divider"/><p class="hg-overline">A publishing standard worth keeping</p><p style="margin-top:8px">Name the source, the date, the location, the method, and the limits of the evidence.</p></div>
      </div></div></section>
      ${joinCTA('Share research that can advance public understanding.','Collaborate on environmental science, archival digitization, technical publishing, or accessible water-resource education.')}`;
  }

  const northAmericaTeam = [
    ['Rash B. Ghosh, PhD','Founder; Charles Townes Professor of Water Chemistry; inventor of HydroGrameen'],
    ['Sergey Donskoy','Assistant to Chair'],
    ['Rosalie Say','Chief Financial Officer'],
    ['Derek Whitworth, PhD','Former President'],
    ['Melissa Dworkin','Director'],
    ['Dawn Bravo, PhD','Director, Project Development'],
    ['Jason Ravitz, PhD','Director for Education'],
    ['Sukomal Modak, PhD','Director'],
    ['Nir Krakauer, PhD','Director'],
    ['Michael Sims','Volunteer'],
    ['Liam Caffrey','Volunteer'],
    ['Tomoko Hattori','Volunteer'],
    ['Ahmed Abdelrahman, PhD','Volunteer'],
    ['Kevin Mahoney','Volunteer'],
    ['Megan Timberlake','Volunteer']
  ];
  const southAsiaTeam = [
    ['Aftab Zaman, PhD','Volunteer'],['Dilip Sinha, PhD','Volunteer'],['Igbal Yousuf','Volunteer'],
    ['Monica Bardhan','Volunteer'],['Rupsha Roy','Volunteer'],['Nirupum Mazumder, PhD','Volunteer'],
    ['Sukla Das','Volunteer'],['Kevin Anderson','Volunteer']
  ];
  function personCard(row) {
    const initials = row[0].replace(/,.*$/,'').split(/\s+/).filter(Boolean).slice(0,2).map(n=>n.charAt(0)).join('').toUpperCase();
    return `<article class="hg-person"><span class="hg-person-avatar" aria-hidden="true">${initials}</span><h3>${row[0]}</h3><p>${row[1]}</p><span class="hg-tag">IIBHB directory listing</span></article>`;
  }
  function teamPage() {
    return `${pageHero('People & leadership','Many disciplines. A shared purpose.','Explore the founder, scientific history, and the North America and South Asia rosters published by the International Institute of Bengal and Himalayan Basins.',PHOTOS.mountain)}
      <section class="hg-section"><div class="hg-container">
        ${eyebrow('Founder & scientific vision')}<h2 class="hg-title" style="margin-bottom:27px">Where the mission began.</h2>
        <div class="hg-founder"><div class="hg-monogram" aria-label="Rash B. Ghosh initials">RG</div><div><span class="hg-pill hg-pill-green">Founder • HydroGrameen concept</span><h2>Rash B. Ghosh, PhD</h2><p><strong>Hydrologist and environmental chemistry researcher.</strong> The institute identifies Dr. Ghosh as its founder, the Charles Townes Professor of Water Chemistry, and the originator of the HydroGrameen model.</p><p>The published institutional history traces his work across the Bengal Basin, the United Kingdom, and California, with long-standing interests in water contamination, aquifer management, and public-benefit science.</p>${ext(URLS.team,'View the IIBHB team directory')}</div></div>
        ${sourceNote('<strong>Biographical caution:</strong> Titles, appointments, and current availability are presented as published by IIBHB and should be reconfirmed with the institute before public launch.')}
      </div></section>
      <section class="hg-section hg-section-mist"><div class="hg-container">
        ${heading('Institutional history','Scientific relationships that shaped the mission.','IIBHB’s published history credits Nobel-associated scientific figures in its founding story. The references below are historical, not a claim of present-day affiliation.')}
        <div class="hg-grid-3">
          <article class="hg-card"><span class="hg-card-icon">${icon('flask','hg-icon-lg')}</span><span class="hg-pill hg-pill-neutral">Historical co-founder</span><h3 style="margin-top:17px">Glenn T. Seaborg</h3><p>Nobel laureate in Chemistry (1951). The institute’s institutional history identifies him among its co-founders.</p></article>
          <article class="hg-card"><span class="hg-card-icon">${icon('target','hg-icon-lg')}</span><span class="hg-pill hg-pill-neutral">Historical co-founder</span><h3 style="margin-top:17px">Charles H. Townes</h3><p>Nobel laureate in Physics (1964). IIBHB credits his scientific guidance and shares historical seminar materials associated with his name.</p></article>
          <article class="hg-card"><span class="hg-card-icon">${icon('book','hg-icon-lg')}</span><span class="hg-pill hg-pill-neutral">Intellectual influence</span><h3 style="margin-top:17px">Rabindranath Tagore</h3><p>The institute’s cultural and intellectual tradition is reflected in its longstanding Townes and Tagore public seminar series.</p></article>
        </div>
      </div></section>
      <section class="hg-section"><div class="hg-container">
        ${heading('North America','Institute team directory.','Names and roles below follow IIBHB’s published roster. No new biographies or unverified contact information have been added.')}
        <div class="hg-grid-4">${northAmericaTeam.map(personCard).join('')}</div>
      </div></section>
      <section class="hg-section hg-section-mist"><div class="hg-container">
        ${heading('South Asia','Regional team directory.','The institute also lists a group of volunteers connected to South Asia. Current responsibilities and availability should be confirmed.')}
        <div class="hg-grid-4">${southAsiaTeam.map(personCard).join('')}</div>
        <div class="hg-cta-row">${ext(URLS.team,'See original directory','hg-btn hg-btn-outline')}</div>
      </div></section>
      ${joinCTA('Science advances when more people can participate.','Introduce yourself and share your background in water science, engineering, education, community organizing, or environmental research.')}`;
  }

  function eventsPage() {
    return `${pageHero('Events & ideas','A place where science meets community.','Explore IIBHB’s historical conferences and seminars on the global water crisis, environmental stewardship, and the role of public-interest knowledge.',PHOTOS.stream)}
      <section class="hg-section"><div class="hg-container">${eyebrow('Event archive')}<h2 class="hg-title" style="margin-bottom:30px">Conversations that connect disciplines.</h2>
        <div class="hg-event-panel"><div class="hg-event-art"><div><span class="hg-pill" style="background:rgba(255,255,255,.14);color:#fff">December 19–21, 2025 • Archived announcement</span><h3 style="margin-top:22px">Science, technology &amp; the global water crisis</h3></div><div>${icon('globe','hg-icon-lg')}<p style="margin-top:10px">Dhaka, Bangladesh — proposed international conference</p></div></div><div class="hg-event-info"><span class="hg-overline">Historical conference invitation</span><h3>International conference in Dhaka</h3><p>IIBHB’s published announcement invited scientists and scholars to a December 2025 conference on water, science, technology, and environmental challenges. It included proposed discussion of Buriganga River pollution.</p><p style="margin-top:15px">Because the available source is an invitation, this listing does not assume or verify that the event took place as described.</p>${ext(URLS.events,'Read the original announcement')}</div></div>
        <div class="hg-grid-2" style="margin-top:26px;align-items:center"><a href="${asset('conference-2025-poster.webp')}" target="_blank" rel="noopener noreferrer" aria-label="Open the archived 2025 conference poster (image)"><img src="${asset('conference-2025-poster.webp')}" alt="Archived 2025 IIBHB conference announcement poster" style="width:100%;border-radius:13px;box-shadow:var(--shadow)" loading="lazy"/></a><div><span class="hg-pill hg-pill-neutral">Original archival material</span><h3 style="margin:14px 0;color:var(--navy);font-size:1.3rem">2025 conference announcement</h3><p>The original event poster is preserved as a reference. It represents an announcement for an event dated in the past and is not a current registration invitation.</p><p style="margin-top:13px"><a class="hg-text-link" href="${asset('conference-2025-poster.webp')}" target="_blank" rel="noopener noreferrer">View full poster ${icon('external','hg-icon-sm')}</a></p></div></div>
        ${sourceNote('<strong>Events policy:</strong> The 2025 conference and earlier seminar series are archival. No event on this site is presented as currently open for registration without confirmation.')}
      </div></section>
      <section class="hg-section hg-section-mist"><div class="hg-container"><div class="hg-split hg-split-wide"><div>
        ${eyebrow('A tradition of public dialogue')}<h2 class="hg-title">Townes and Tagore seminars.</h2><p style="margin-top:20px;line-height:1.9">The institute’s archive documents a series of public programs bringing together water science, intellectual history, environmental ethics, and international cooperation.</p>
        <div class="hg-timeline" style="margin-top:32px">
          <div class="hg-timeline-item"><small>2014</small><h3>Annual seminar at UC Berkeley</h3><p>Historical event listing on the institute’s legacy website.</p></div>
          <div class="hg-timeline-item"><small>2013</small><h3>Fourth Annual Townes and Tagore Seminar</h3><p>Archival program and related address materials.</p></div>
          <div class="hg-timeline-item"><small>2012</small><h3>Third Annual Seminar</h3><p>Booklet with program information and a keynote associated with Professor Townes.</p></div>
          <div class="hg-timeline-item"><small>2010–2011</small><h3>Earlier seminar recordings</h3><p>Video links are referenced in the historic events directory.</p></div>
        </div><div class="hg-cta-row">${ext(URLS.docs,'Explore seminar materials','hg-btn hg-btn-outline')}</div></div>
        ${imageWithNote(PHOTOS.forest,'Sunlit forest with tall trees', 'Illustrative environmental imagery; not a photograph from the listed historical events.')}
      </div></div></section>
      <section class="hg-section"><div class="hg-container"><div class="hg-grid-2"><div class="hg-soft-card"><span class="hg-card-icon">${icon('calendar','hg-icon-lg')}</span><h3>Interested in future conversations?</h3><p>Ask about seminars, educational events, or participating as a speaker on water science and community resilience.</p><div class="hg-cta-row">${button('/contact','Express interest','primary')}</div></div><div class="hg-soft-card"><span class="hg-card-icon">${icon('users','hg-icon-lg')}</span><h3>Host a knowledge exchange.</h3><p>Universities, community groups, and public agencies can explore co-hosted learning opportunities with the institute.</p><div class="hg-cta-row">${button('/contact','Discuss an event','outline')}</div></div></div></div></section>`;
  }

  const values = [
    ['Science for the benefit of all people','Rigorous knowledge made useful and accessible.'],
    ['Environmentally sound water-resource management','Safeguarding watersheds and freshwater systems.'],
    ['Aquifer restoration and safe drinking water','Restoration and mitigation of drinking-water contamination.'],
    ['Rights and human dignity','Respect for women, the poor, and religious and ethnic minorities.'],
    ['Sustainable development','Connecting opportunity with long-term ecological health.'],
    ['Secular democracy','Civic institutions grounded in equal standing.'],
    ['Mutual tolerance and respect','Cross-cultural work built on shared humanity.']
  ];
  function aboutPage() {
    return `${pageHero('About IIBHB','Science for water. Science for everyone.','The International Institute of Bengal and Himalayan Basins is a public-interest network working at the intersection of water, environment, education, and community well-being.',PHOTOS.mountain)}
      <section class="hg-section"><div class="hg-container"><div class="hg-split">
        <div>${eyebrow('Our mission')}<h2 class="hg-title">Better stewardship begins with shared understanding.</h2><p style="margin-top:22px;line-height:1.92">IIBHB brings together scientific and community perspectives to understand and protect water systems. The institute’s stated mission is to develop models for watershed management and the remediation of contaminated ground and surface waters in California and on the Indian subcontinent, and to share that knowledge more widely.</p>
        <p style="margin-top:20px;line-height:1.92">The institute’s work and historical resources span environmental science, aquifer replenishment, water quality, education, and public programs. HydroGrameen is its flagship integrated watershed concept.</p><div class="hg-cta-row">${button('/model','Explore HydroGrameen','primary')}</div></div>
        ${imageWithNote(PHOTOS.landscape,'A lake and surrounding mountain watershed')}
      </div></div></section>
      <section class="hg-section hg-section-mist"><div class="hg-container"><div class="hg-grid-2"><div class="hg-soft-card"><span class="hg-card-icon">${icon('target','hg-icon-lg')}</span>${eyebrow('Mission')}<h2 class="hg-title-sm">Practical models for a changing planet.</h2><p style="margin-top:17px">Develop and implement approaches to watershed management and remediation of toxic ground and surface waters in California and the Indian subcontinent, and share relevant knowledge with the world.</p></div><div class="hg-soft-card"><span class="hg-card-icon">${icon('globe','hg-icon-lg')}</span>${eyebrow('Vision')}<h2 class="hg-title-sm">Science and technology for all people.</h2><p style="margin-top:17px">Share advances in science and technology broadly, including with those who have the fewest resources, while preserving nature and the ecological balance on which life depends.</p></div></div></div></section>
      <section class="hg-section"><div class="hg-container">
        ${heading('Guiding values','The principles beneath the work.','The institute’s published values extend beyond water engineering to education, environmental stewardship, inclusion, and mutual respect.')}
        <div class="hg-grid-4">${values.map((item,i)=>`<article class="hg-soft-card" style="padding:25px"><span class="hg-number" style="font-size:2rem">0${i+1}</span><h3 style="font-size:.98rem">${item[0]}</h3><p style="font-size:.83rem">${item[1]}</p></article>`).join('')}</div>
      </div></section>
      <section class="hg-section hg-section-mist"><div class="hg-container"><div class="hg-split hg-split-wide">
        <div>${eyebrow('Institutional roots')}<h2 class="hg-title">From the Bengal and Himalayan Basins to California.</h2><p style="margin-top:21px;line-height:1.9">The institute’s story connects the environmental challenges of the Bengal Basin with scientific experience in California and international academic relationships. Its historical material describes work on drinking-water contamination, groundwater systems, and a commitment to training the next generation of professionals.</p><p style="margin-top:19px;line-height:1.9">IIBHB credits Rash B. Ghosh, Glenn T. Seaborg, and Charles H. Townes in its founding history. Historical seminars and scientific materials connect this work with a larger tradition of public-benefit science.</p>
        <div class="hg-cta-row">${button('/team','Our people','outline')}${button('/research','Research archive','outline')}</div><div style="display:flex;align-items:center;gap:15px;margin-top:27px"><img src="${asset('iibhb-historical-mark.webp')}" alt="Historical IIBHB globe emblem" style="width:72px;height:72px;object-fit:cover;border-radius:50%" loading="lazy"/><p class="hg-small">Historical IIBHB globe emblem, reproduced from the supplied archival brochure.</p></div></div>
        <div class="hg-soft-card"><span class="hg-card-icon">${icon('handshake','hg-icon-lg')}</span><h3>Public-interest consultation</h3><p>IIBHB’s existing About page has described pro bono environmental consulting for community members, institutions, and public-interest organizations. Availability, scope, and advisor capacity should be confirmed before making arrangements.</p><div class="hg-cta-row">${button('/contact','Request a conversation','primary')}</div></div>
      </div></div></section>
      ${joinCTA('Science belongs in the public interest.','Whether you work in research, community leadership, education, government, or philanthropy, there is value in a thoughtful conversation about water.')}`;
  }

  function contactPage() {
    const displayMail = config.contactEmail || 'info@iibhb.org';
    const formHTML = config.ghlFormUrl && /^https:\/\//i.test(config.ghlFormUrl)
      ? `<div class="hg-contact-form"><h2>Send a message</h2><p class="hg-form-help">Complete the form below to reach the institute.</p><iframe class="hg-ghl-iframe" src="${config.ghlFormUrl}" title="Contact HydroGrameen" loading="lazy"></iframe><p class="hg-form-notice">This form is hosted by the connected GoHighLevel account.</p></div>`
      : `<form class="hg-contact-form" id="hg-contact-form"><h2>Start a conversation.</h2><p class="hg-form-help">This demo prepares an email in your own email app; it does not collect or store submissions on the website.</p>
          <div class="hg-field-row"><div class="hg-field"><label for="hg-name">Your name *</label><input id="hg-name" name="name" autocomplete="name" required maxlength="100" placeholder="Name"/></div><div class="hg-field"><label for="hg-email">Email address *</label><input id="hg-email" name="email" type="email" autocomplete="email" required maxlength="150" placeholder="you@example.com"/></div></div>
          <div class="hg-field"><label for="hg-interest">What would you like to discuss?</label><select id="hg-interest" name="interest"><option value="General inquiry">General inquiry</option><option value="Research collaboration">Research collaboration</option><option value="Community partnership">Community partnership</option><option value="Funding or institutional support">Funding or institutional support</option><option value="Education and events">Education and events</option><option value="Press or media">Press or media</option></select></div>
          <div class="hg-field"><label for="hg-message">Your message *</label><textarea id="hg-message" name="message" required maxlength="4000" placeholder="Tell us about your question or idea..."></textarea></div>
          <button type="submit" class="hg-btn hg-btn-primary">Prepare email ${icon('arrow','hg-icon-sm')}</button><p class="hg-form-notice">Submitting opens a prefilled email draft addressed to IIBHB. Your message is not sent until you send it from your email application. For a live embedded CRM form, connect a published GoHighLevel form URL in the site configuration.</p>
        </form>`;
    return `${pageHero('Contact & collaboration','Let’s build knowledge that moves water forward.','Reach out about research, watershed challenges, partnerships, educational events, or the HydroGrameen model.')}
      <section class="hg-section"><div class="hg-container"><div class="hg-contact-layout"><div>
        ${eyebrow('Get in touch')}<h2 class="hg-title">Start with a conversation.</h2><p style="margin-top:21px;line-height:1.9">IIBHB’s mission depends on bringing together practical knowledge across communities, institutions, and disciplines.</p>
        <div class="hg-contact-detail"><span class="hg-card-icon">${icon('mail')}</span><div><h3>Email</h3><p><a href="mailto:${displayMail}">${displayMail}</a></p><p class="hg-small">Listed on the institute’s current Contact page.</p></div></div>
        <div class="hg-contact-detail"><span class="hg-card-icon">${icon('map')}</span><div><h3>Mailing address</h3><p>P.O. Box 11553<br/>Berkeley, CA 94712, USA</p><p class="hg-small">Confirm before sending physical correspondence.</p></div></div>
        <div class="hg-contact-detail"><span class="hg-card-icon">${icon('globe')}</span><div><h3>Institute website</h3><p>${ext(URLS.institute,'iibhb.org')}</p></div></div>
        ${sourceNote('Contact information is taken from the current IIBHB website. Older brochures and sites list different contact details; these should be consolidated before public launch.')}
      </div><div>${formHTML}</div></div></div></section>
      <section class="hg-section hg-section-mist"><div class="hg-container">${heading('Partnership pathways','Where could we start?','Different kinds of collaborators can help turn scientific ideas into carefully evaluated public-interest work.')}
        <div class="hg-grid-3">${feature('flask','Researchers &amp; experts','Share technical expertise in hydrology, chemistry, water quality, monitoring, and environmental engineering.')}${feature('users','Communities &amp; advocates','Discuss local watershed conditions, community priorities, and public education needs.')}${feature('handshake','Funders &amp; institutions','Explore transparent, measurable research plans and support for knowledge-sharing programs.')}</div></div></section>`;
  }

  const pageMap = {
    '/': { title: 'HydroGrameen | Water. People. Possibility.', render: homePage },
    '/model': { title: 'The HydroGrameen Model | HydroGrameen', render: modelPage },
    '/science': { title: 'Water Science & Aquifer Recharge | HydroGrameen', render: sciencePage },
    '/communities': { title: 'Watershed Communities | HydroGrameen', render: communitiesPage },
    '/projects': { title: 'Our Work & Project Context | HydroGrameen', render: projectsPage },
    '/research': { title: 'Research & Resources | HydroGrameen', render: researchPage },
    '/team': { title: 'Our People | HydroGrameen', render: teamPage },
    '/events': { title: 'Events & Archive | HydroGrameen', render: eventsPage },
    '/about': { title: 'About IIBHB | HydroGrameen', render: aboutPage },
    '/contact': { title: 'Contact & Collaboration | HydroGrameen', render: contactPage }
  };
  const getRoute = () => {
    const fromHash = window.location.hash.startsWith('#/') ? window.location.hash.slice(1) : '/';
    return pageMap[fromHash] ? fromHash : '/';
  };
  function brandMarkup() {
    return `<a class="hg-brand" href="#/" aria-label="HydroGrameen, go to homepage"><img src="${asset('mark.svg')}" alt="" /><span><span class="hg-brand-name" style="display:block">HydroGrameen</span><span class="hg-brand-sub" style="display:block">A water initiative of IIBHB</span></span></a>`;
  }
  function layout() {
    return `<div class="hg-site" id="hg-site"><a class="hg-skip" href="#hg-main">Skip to main content</a>
      <header class="hg-header" id="hg-header"><div class="hg-container hg-header-inner">
        ${brandMarkup()}
        <nav class="hg-nav" id="hg-navigation" aria-label="Primary navigation">${nav.map(([path,label])=>`<a class="hg-nav-link" href="#${path}" data-nav-route="${path}">${label}</a>`).join('')}</nav>
        <div class="hg-header-actions"><a class="hg-btn hg-btn-primary" href="#/contact">Get involved ${icon('arrow','hg-icon-sm')}</a><button id="hg-menu-toggle" class="hg-menu-toggle" type="button" aria-label="Open navigation" aria-controls="hg-navigation" aria-expanded="false">${icon('menu')}</button></div>
      </div></header>
      <main id="hg-main" tabindex="-1"></main>
      <footer class="hg-footer"><div class="hg-container hg-footer-inner"><div class="hg-footer-top">
        <div>${brandMarkup()}<p>Science and community action for healthier water systems. HydroGrameen is the flagship integrated watershed model of the International Institute of Bengal and Himalayan Basins.</p></div>
        <div><h3>Explore</h3><div class="hg-footer-links">${routes.slice(1).map(([path,label])=>`<a href="#${path}">${label}</a>`).join('')}</div></div>
        <div class="hg-footer-contact"><h3>Connect</h3><a href="mailto:${config.contactEmail}">${config.contactEmail}</a><span>P.O. Box 11553<br/>Berkeley, California 94712</span>${ext(URLS.institute,'Visit IIBHB.org')}</div>
      </div><div class="hg-footer-bottom"><p>© ${new Date().getFullYear()} HydroGrameen · International Institute of Bengal and Himalayan Basins.</p><p>Concept diagrams are illustrative; landscape images do not depict verified HydroGrameen installations. <a href="#/research">Explore sources</a>.</p></div></div></footer></div>`;
  }
  mount.innerHTML = layout();
  // Original, bundled illustrations keep the design usable if illustrative photo URLs fail.
  mount.addEventListener('error', event => {
    const image = event.target;
    if (!image || image.tagName !== 'IMG' || image.dataset.hgFallback) return;
    image.dataset.hgFallback = 'true';
    const description = (image.getAttribute('alt') || '').toLowerCase();
    const fallback = /forest|trees|stream/.test(description) ? 'forest.svg' : /river|water/.test(description) ? 'river.svg' : 'landscape.svg';
    image.src = asset(fallback);
  }, true);
  const navMenu = mount.querySelector('#hg-navigation');
  const menuButton = mount.querySelector('#hg-menu-toggle');
  const main = mount.querySelector('#hg-main');
  let lastRoute = null;

  function closeMenu(restoreFocus = false) {
    navMenu.classList.remove('hg-nav-open');
    menuButton.setAttribute('aria-expanded','false');
    menuButton.setAttribute('aria-label','Open navigation');
    menuButton.innerHTML = icon('menu');
    if (restoreFocus) menuButton.focus();
  }
  function navigate() {
    const nextRoute = getRoute();
    const page = pageMap[nextRoute];
    main.innerHTML = page.render();
    mount.querySelectorAll('[data-nav-route]').forEach(a => {
      if (a.getAttribute('data-nav-route') === nextRoute) a.setAttribute('aria-current','page');
      else a.removeAttribute('aria-current');
    });
    closeMenu();
    if (!isEmbed) {
      document.title = page.title;
      const description = document.querySelector('meta[name="description"]');
      if (description) description.setAttribute('content', (main.querySelector('.hg-hero-copy > p, .hg-page-hero p')?.textContent || 'Discover HydroGrameen, an IIBHB water and community initiative.').trim());
    }
    if (lastRoute !== null && lastRoute !== nextRoute) {
      if (isEmbed) mount.scrollIntoView({ behavior: 'auto', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'auto' });
      main.focus({ preventScroll: true });
    }
    lastRoute = nextRoute;
  }
  menuButton.addEventListener('click', () => {
    const open = !navMenu.classList.contains('hg-nav-open');
    navMenu.classList.toggle('hg-nav-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuButton.innerHTML = icon(open ? 'close' : 'menu');
  });
  window.addEventListener('hashchange', navigate);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navMenu.classList.contains('hg-nav-open')) closeMenu(true);
  });
  mount.addEventListener('click', event => {
    if (event.target.closest('.hg-skip')) {
      event.preventDefault();
      main.focus({ preventScroll: true });
      main.scrollIntoView({ behavior: 'auto', block: 'start' });
      return;
    }
    if (event.target.closest('.hg-nav-link')) closeMenu();
    const modeBtn = event.target.closest('[data-science-mode]');
    if (!modeBtn) return;
    const mode = modeBtn.getAttribute('data-science-mode');
    if (!['baseline','depletion','recharge'].includes(mode)) return;
    const diagram = main.querySelector('.hg-science-svg');
    if (!diagram) return;
    diagram.classList.remove('hg-mode-baseline','hg-mode-depletion','hg-mode-recharge');
    diagram.classList.add('hg-mode-' + mode);
    main.querySelectorAll('[data-science-mode]').forEach(btn => btn.setAttribute('aria-pressed', String(btn === modeBtn)));
    const readings = {
      baseline:['Typical conditions','Groundwater occupies pores and fractures in subsurface materials. Actual water-table depths and aquifer boundaries vary from place to place.'],
      depletion:['Groundwater drawdown','When water withdrawals exceed replenishment over time, groundwater levels can decline. Real responses depend on pumping, recharge, geology, and connected water bodies.'],
      recharge:['Managed recharge concept','An approved, carefully monitored recharge intervention may help replenish an appropriate aquifer. Source-water quality, hydrogeology, permits, and safeguards must first be established.']
    };
    main.querySelector('#hg-science-mode-title').textContent = readings[mode][0];
    main.querySelector('#hg-science-mode-desc').textContent = readings[mode][1];
  });
  mount.addEventListener('submit', event => {
    if (event.target.id !== 'hg-contact-form') return;
    event.preventDefault();
    const form = event.target;
    if (!form.reportValidity()) return;
    const details = new FormData(form);
    const name = (details.get('name') || '').toString().trim();
    const email = (details.get('email') || '').toString().trim();
    const interest = (details.get('interest') || 'General inquiry').toString();
    const message = (details.get('message') || '').toString().trim();
    const subject = `HydroGrameen inquiry: ${interest}`;
    const body = `Hello IIBHB team,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}\nInterest: ${interest}\n`;
    window.location.href = `mailto:${config.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
  navigate();
})();