// Paranoid DAO — переключение языка RU/EN + подсветка активного пункта меню.

const EN = {
  "nav.about": "About",
  "nav.services": "Services",
  "nav.cases": "Cases",
  "nav.process": "How we work",
  "nav.contact": "Contact",
  "btn.contact": "Get in touch",
  "btn.cases": "Cases",
  "btn.tgdm": "Personal TG",

  "hero.label": "// marketing agency",
  "hero.title": "WE KNOW<br>WHERE YOUR<br>AUDIENCE LIVES.",
  "hero.text": "Paranoid DAO is an agency that promotes projects through crypto and AI communities. 250+ communities on Telegram, Twitter and YouTube, and we know how to advertise in them.",
  "hero.btnCases": "View cases",
  "hero.btnAbout": "Who we are",
  "stat.communities": "communities",
  "stat.platforms": "platforms",
  "stat.focus": "focus",
  "marquee": "ADS / SEEDING / CREATIVE / MEDIA PLAN / TRAFFIC / ANALYTICS / ",

  "about.label": "01 / About",
  "about.title": "We're not a<br>big agency.",
  "about.p1": "Paranoid DAO is a small team with access to 250+ crypto and AI communities on Telegram, Twitter and YouTube. We work with Web3 projects, NFT collections, DAOs and products that need marketing.",
  "about.p2": "No bureaucracy: you give us a task, we build a media plan, run ads across crypto channels and report the actual results. Budgets, creatives and outcomes are all transparent.",

  "services.label": "02 / Services",
  "services.title": "What we do",
  "svc1.title": "Creative & content",
  "svc1.desc": "Texts, banners and creatives for ad placements in crypto channels.",
  "svc2.title": "Traffic & performance",
  "svc2.desc": "Seeding and ads in Telegram, Twitter and YouTube communities.",
  "svc3.title": "Channel selection",
  "svc3.desc": "We collect bids from channel admins and build a media plan for your budget.",
  "svc4.title": "Analytics & reports",
  "svc4.desc": "We verify placements against the spec and report: what ran, where, with what numbers.",

  "cases.label": "03 / Cases",
  "cases.title": "Selected work",
  "case1.tag": "TON / TELEGRAM",
  "case1.title": "TonMarket",
  "case1.desc": "TonMarket: a prediction market in Telegram on TON. Audience warm-up and ads across crypto channels for a referral and quest event.",
  "case2.tag": "CREATIVE / CRYPTO",
  "case2.title": "Case 02",
  "case3.tag": "SEEDING / AIRDROP",
  "case3.title": "Case 03",
  "case4.tag": "PROMOTION / DAO",
  "case4.title": "Case 04",
  "case.desc": "Case description: task, media plan, result. Metrics and links inside.",
  "cases.note": "Cases will appear after the first completed campaigns.",

  "process.label": "04 / Process",
  "process.title": "Four steps<br>to launch.",
  "step1.title": "01 / Brief",
  "step1.desc": "We collect the project's task, budget and deadline.",
  "step2.title": "02 / Bids",
  "step2.desc": "We collect bids from channels and communities and build a media plan.",
  "step3.title": "03 / Approval",
  "step3.desc": "We go through the media plan with the client and approve placements.",
  "step4.title": "04 / Control",
  "step4.desc": "We verify spec compliance and deliver a report with numbers.",

  "contact.label": "05 / Contact",
  "contact.title": "Got a project?<br>Write us.",
  "contact.text": "Tell us about your project, budget and timeline. We'll build a media plan across crypto channels and get back with an offer."
};

// Сохраняем оригинальные (русские) тексты при загрузке.
const i18nEls = [...document.querySelectorAll('[data-i18n], [data-i18n-html]')];
const original = new Map(i18nEls.map(el => {
  const entries = [];
  if (el.hasAttribute('data-i18n')) entries.push(['data-i18n', el.textContent]);
  if (el.hasAttribute('data-i18n-html')) entries.push(['data-i18n-html', el.innerHTML]);
  return [el, entries];
}));

const langToggle = document.getElementById('langToggle');
const marqueeSpans = document.querySelectorAll('.marquee__track span');
const ruMarquee = marqueeSpans[0] ? marqueeSpans[0].textContent : '';
const savedLang = localStorage.getItem('lang') || 'ru';

if (langToggle) {
  langToggle.addEventListener('click', () => {
    setLang(document.documentElement.lang === 'en' ? 'ru' : 'en');
  });
}

function setLang(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);
  if (langToggle) langToggle.textContent = lang === 'en' ? 'RU' : 'EN';

  for (const [el, entries] of original) {
    for (const [attr, ruText] of entries) {
      if (lang === 'en') {
        const key = el.getAttribute(attr);
        const value = EN[key];
        if (value === undefined) continue;
        if (attr === 'data-i18n') el.textContent = value;
        else el.innerHTML = value;
      } else {
        if (attr === 'data-i18n') el.textContent = ruText;
        else el.innerHTML = ruText;
      }
    }
  }

  const phrase = lang === 'en' ? EN['marquee'] : ruMarquee;
  marqueeSpans.forEach(s => { s.textContent = phrase.repeat(12); });
}

setLang(savedLang);

// Подсветка активного пункта меню при скролле.
const links = document.querySelectorAll('.nav a');
const sections = [...links]
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const onScroll = () => {
  const y = window.scrollY + 120;
  let current = sections[0];
  for (const s of sections) {
    if (s.offsetTop <= y) current = s;
  }
  links.forEach(a => {
    a.style.opacity = a.getAttribute('href') === '#' + current.id ? '1' : '0.5';
  });
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
