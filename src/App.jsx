import React, { useState, useEffect } from 'react';

const ADMIN_PIN = "2580";

const INITIAL_DATA = [
  {
    id: 1,
    title: "Google AI Essentials",
    category: "Courses",
    url: "https://coursera.org",
    descEn: "Learn foundational AI concepts and productivity tools from Google experts.",
    descUr: "گوگل کے ماہرین سے بنیادی AI کے تصورات اور ٹولز سیکھیں۔",
    isSponsored: true
  },
  {
    id: 2,
    title: "DeepLearning.AI Prompt Engineering",
    category: "Courses",
    url: "https://coursera.org",
    descEn: "Master LLM prompting techniques and workflows directly from Andrew Ng.",
    descUr: "اینڈریو این جی سے جدید پرامپٹ انجینئرنگ اور طریقے سیکھیں۔",
    isSponsored: false
  },
  {
    id: 3,
    title: "Perplexity Pro Research Suite",
    category: "AI Tools",
    url: "https://perplexity.ai",
    descEn: "Real-time discovery and multi-source verified search engine for professionals.",
    descUr: "پیشہ ور افراد کے لیے جدید، ریئل ٹائم اور تصدیق شدہ ریسرچ انجن۔",
    isSponsored: true
  },
  {
    id: 4,
    title: "Claude 3.5 Sonnet Ecosystem",
    category: "AI Tools",
    url: "https://anthropic.com",
    descEn: "Advanced coding, analytical reasoning, and long-form document processing.",
    descUr: "جدید کوڈنگ، تفصیلی تجزیہ اور طویل دستاویزات پروسیسنگ کے لیے بہترین۔",
    isSponsored: false
  },
  {
    id: 5,
    title: "Upwork Remote Talent Network",
    category: "Remote Jobs",
    url: "https://upwork.com",
    descEn: "Global marketplace for top freelance talent, contracts, and remote engineering jobs.",
    descUr: "فری لانسرز اور ریموٹ جابز کے لیے دنیا کا سب سے بڑا پلیٹ فارم۔",
    isSponsored: false
  },
  {
    id: 6,
    title: "Notion AI Workspace",
    category: "Productivity",
    url: "https://notion.so",
    descEn: "Connected workspace with integrated artificial intelligence for notes and docs.",
    descUr: "دفتری کام، نوٹس اور پراجیکٹ مینجمنٹ کے لیے بہترین AI ٹول۔",
    isSponsored: false
  }
];

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('ur');
  const [search, setSearch] = useState('');
  const [currentCat, setCurrentCat] = useState('All');
  
  // Admin states
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Data list
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('smarthub_data_v1');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  // Admin form
  const [formTitle, setFormTitle] = useState('');
  const [formCat, setFormCat] = useState('AI Tools');
  const [formUrl, setFormUrl] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formSponsored, setFormSponsored] = useState(false);

  useEffect(() => {
    localStorage.setItem('smarthub_data_v1', JSON.stringify(items));
  }, [items]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsLoggedIn(true);
      setLoginError('');
      setPinInput('');
    } else {
      setLoginError(lang === 'ur' ? 'غلط پن کوڈ! دوبارہ درج کریں۔' : 'Incorrect PIN! Try again.');
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!formTitle || !formUrl) return;

    const newItem = {
      id: Date.now(),
      title: formTitle,
      category: formCat,
      url: formUrl,
      descEn: formDesc,
      descUr: formDesc,
      isSponsored: formSponsored
    };

    setItems([newItem, ...items]);
    setFormTitle('');
    setFormUrl('');
    setFormDesc('');
    setFormSponsored(false);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const isDark = theme === 'dark';
  const isUr = lang === 'ur';

  // لائیو فلٹرنگ فکس
  const cleanQuery = search.trim().toLowerCase();
  const filteredList = items.filter(item => {
    const titleMatch = item.title ? item.title.toLowerCase().includes(cleanQuery) : false;
    const descEnMatch = item.descEn ? item.descEn.toLowerCase().includes(cleanQuery) : false;
    const descUrMatch = item.descUr ? item.descUr.toLowerCase().includes(cleanQuery) : false;
    const catMatch = item.category ? item.category.toLowerCase().includes(cleanQuery) : false;

    const matchesQuery = cleanQuery === '' || titleMatch || descEnMatch || descUrMatch || catMatch;
    const matchesCategory = currentCat === 'All' || item.category === currentCat;

    return matchesQuery && matchesCategory;
  });

  // ڈائنامک میٹا سرچ لنکس جنریٹر (براہِ راست سرچ رزلٹس)
  const encodedQuery = encodeURIComponent(search.trim());
  const metaEngines = [
    {
      name: "Upwork Jobs",
      badge: isUr ? "فری لانس جابز" : "Freelance Jobs",
      icon: "💼",
      url: `https://www.upwork.com/nx/search/jobs/?q=${encodedQuery}`,
      descUr: `اپ ورک پر "${search.trim()}" کی تصدیق شدہ براہِ راست جابز دیکھیں۔`,
      descEn: `Explore direct verified job posts for "${search.trim()}" on Upwork.`
    },
    {
      name: "Coursera Certifications",
      badge: isUr ? "کورسز و اسناد" : "Courses & Degrees",
      icon: "🎓",
      url: `https://www.coursera.org/search?query=${encodedQuery}`,
      descUr: `کورسیرا پر "${search.trim()}" کے سرٹیفیکیشنز اور ماہرانہ ٹریننگ۔`,
      descEn: `Direct university courses & certifications for "${search.trim()}".`
    },
    {
      name: "Fiverr Marketplace",
      badge: isUr ? "سروسز اور گگز" : "Gigs & Tasks",
      icon: "⚡",
      url: `https://www.fiverr.com/search/gigs?query=${encodedQuery}`,
      descUr: `فائیور پر "${search.trim()}" سے متعلق ریٹ اور خدمات دیکھیں۔`,
      descEn: `View high-demand gigs and pricing for "${search.trim()}" on Fiverr.`
    },
    {
      name: "Google Remote Careers",
      badge: isUr ? "گلوبل جابز" : "Global Openings",
      icon: "🌐",
      url: `https://www.google.com/search?q=${encodedQuery}+remote+jobs&ibp=htl;jobs`,
      descUr: `گوگل جابز انجن پر "${search.trim()}" کی گلوبل اوپننگز براؤز کریں۔`,
      descEn: `Direct Google Jobs feed for "${search.trim()}" remote openings.`
    }
  ];

  // Admin View
  if (isAdminOpen) {
    if (!isLoggedIn) {
      return (
        <div className={`min-h-screen ${isDark ? 'bg-[#0b0f19] text-white' : 'bg-slate-50 text-slate-900'} flex items-center justify-center p-4`} dir={isUr ? 'rtl' : 'ltr'}>
          <div className={`max-w-md w-full ${isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200'} border rounded-3xl p-8 shadow-2xl`}>
            <h2 className="text-2xl font-black text-center mb-2">
              {isUr ? 'ایڈمن ڈیش بورڈ رسائی' : 'Admin Dashboard Login'}
            </h2>
            <p className={`text-xs text-center mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {isUr ? 'خفیہ 4 ہندسوں کا PIN درج کریں' : 'Enter 4-digit secret PIN'}
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="****"
                className={`w-full text-center text-2xl tracking-[0.5em] py-3 rounded-2xl border ${
                  isDark ? 'bg-[#0b0f19] border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                } focus:outline-none focus:border-indigo-500`}
                autoFocus
              />
              {loginError && <p className="text-rose-500 text-xs text-center font-bold">{loginError}</p>}
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/30"
              >
                {isUr ? 'لاگ ان کریں' : 'Unlock Dashboard'}
              </button>
              <button
                type="button"
                onClick={() => setIsAdminOpen(false)}
                className={`w-full py-2 text-xs font-semibold ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {isUr ? '← ہوم پیج پر واپس جائیں' : '← Back to Home'}
              </button>
            </form>
          </div>
        </div>
      );
    }

    return (
      <div className={`min-h-screen ${isDark ? 'bg-[#0b0f19] text-white' : 'bg-slate-50 text-slate-900'} p-6 md:p-12`} dir={isUr ? 'rtl' : 'ltr'}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black">
                {isUr ? 'اسمارٹ ہب ایڈمن روم' : 'SmartHub Management'}
              </h1>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {isUr ? 'نئے ٹولز، افیلیئٹ لنکس اور اسپانسرڈ سلاٹ مینیجر' : 'Add new items, modify links and featured listings'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAdminOpen(false)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border ${isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-300 text-slate-800'}`}
              >
                {isUr ? 'سائٹ دیکھیں' : 'View Live Site'}
              </button>
              <button
                onClick={() => { setIsLoggedIn(false); setIsAdminOpen(false); }}
                className="px-4 py-2 bg-rose-600/20 text-rose-400 hover:bg-rose-600/30 border border-rose-500/30 rounded-xl text-xs font-bold"
              >
                {isUr ? 'لاگ آؤٹ' : 'Log Out'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className={`lg:col-span-1 p-6 rounded-3xl border h-fit ${isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200'}`}>
              <h3 className="font-bold text-base mb-4">{isUr ? 'نیا آئٹم شامل کریں' : 'Add New Directory Entry'}</h3>
              <form onSubmit={handleAddItem} className="space-y-4 text-xs font-medium">
                <div>
                  <label className="block mb-1 opacity-70">{isUr ? 'نام / ٹائٹل' : 'Platform / Tool Title'}</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder={isUr ? 'مثلاً Coursera Plus' : 'e.g. Perplexity Pro'}
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-[#0b0f19] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} focus:outline-none focus:border-indigo-500`}
                  />
                </div>

                <div>
                  <label className="block mb-1 opacity-70">{isUr ? 'کیٹیگری' : 'Category'}</label>
                  <select
                    value={formCat}
                    onChange={(e) => setFormCat(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-[#0b0f19] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} focus:outline-none focus:border-indigo-500`}
                  >
                    <option value="AI Tools">AI Tools</option>
                    <option value="Courses">Courses</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Remote Jobs">Remote Jobs</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 opacity-70">{isUr ? 'افیلیئٹ / ٹارگٹ URL' : 'Target / Affiliate URL'}</label>
                  <input
                    type="url"
                    required
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    placeholder="https://..."
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-[#0b0f19] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} focus:outline-none focus:border-indigo-500`}
                  />
                </div>

                <div>
                  <label className="block mb-1 opacity-70">{isUr ? 'مختصر تفصیل' : 'Description'}</label>
                  <textarea
                    rows={3}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder={isUr ? 'ٹول کے بارے میں تفصیل درج کریں...' : 'Short brief about platform benefits...'}
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-[#0b0f19] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} focus:outline-none focus:border-indigo-500`}
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="adminSponsor"
                    checked={formSponsored}
                    onChange={(e) => setFormSponsored(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="adminSponsor" className="cursor-pointer font-bold text-amber-500">
                    {isUr ? 'Sponsored (ٹاپ پر نمایاں رکھیں)' : 'Featured Partner Slot'}
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all mt-2"
                >
                  {isUr ? 'ویب سائٹ میں شامل کریں' : 'Publish Listing'}
                </button>
              </form>
            </div>

            <div className={`lg:col-span-2 p-6 rounded-3xl border ${isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200'}`}>
              <h3 className="font-bold text-base mb-4">
                {isUr ? `موجودہ لسٹنگز (${items.length})` : `All Verified Items (${items.length})`}
              </h3>
              <div className="space-y-3">
                {items.map(item => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isDark ? 'bg-[#0b0f19] border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{item.title}</span>
                        {item.isSponsored && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            SPONSORED
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-400 font-bold">
                          {item.category}
                        </span>
                      </div>
                      <p className={`text-xs mt-1 line-clamp-1 opacity-70`}>{isUr ? (item.descUr || item.descEn) : item.descEn}</p>
                      <a href={item.url} target="_blank" rel="noreferrer" className="text-[11px] text-indigo-400 hover:underline">
                        {item.url}
                      </a>
                    </div>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg text-xs font-bold self-end sm:self-center"
                    >
                      {isUr ? 'ڈیلیٹ' : 'Delete'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Home Screen
  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0b0f19] text-white' : 'bg-[#f8fafc] text-slate-900'} flex flex-col transition-colors duration-200`} dir={isUr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-md px-4 sm:px-8 py-3.5 ${
        isDark ? 'bg-[#0b0f19]/80 border-slate-800/80' : 'bg-white/80 border-slate-200'
      }`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-indigo-500/20">
              S
            </div>
            <div>
              <span className="text-lg font-black tracking-tight block leading-none">SmartHub</span>
              <span className="text-[10px] text-indigo-400 tracking-wider font-bold uppercase">Meta Search & Discovery</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(isUr ? 'en' : 'ur')}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                isDark ? 'bg-[#111827] border-slate-700 text-slate-200 hover:border-slate-500' : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400'
              }`}
            >
              {isUr ? 'English' : 'اردو'}
            </button>

            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-2 rounded-xl border text-sm transition-all ${
                isDark ? 'bg-[#111827] border-slate-700 text-amber-400 hover:border-slate-500' : 'bg-white border-slate-300 text-indigo-600 hover:border-slate-400'
              }`}
              title="Toggle Theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <span>{isUr ? 'ایڈمن' : 'Admin'}</span>
              <span>🔒</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-12">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            {isUr ? (
              <>مطلوبہ جابز، کورسز اور <span className="text-indigo-500">AI ٹولز</span> تلاش کریں</>
            ) : (
              <>Search Direct Jobs, Certifications & <span className="text-indigo-500">AI Tools</span></>
            )}
          </h1>
          <p className={`text-sm sm:text-base font-medium max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {isUr
              ? 'کسی بھی مخصوص ہنر یا کورس کا نام لکھیں، ہم تمام تصدیق شدہ پورٹلز سے براہِ راست سرچ لنکس سامنے لائیں گے۔'
              : 'Type any skill, task or certification to access direct deep-search queries across verified platforms.'}
          </p>

          {/* سرچ ان پٹ */}
          <div className="mt-8 relative max-w-2xl mx-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isUr ? 'مثلاً: Online Excel Jobs یا Python AI Course...' : 'e.g. Online Excel Jobs, Prompt Engineering...'}
              className={`w-full py-4 px-6 rounded-2xl border text-sm sm:text-base shadow-xl focus:outline-none focus:border-indigo-500 transition-all ${
                isDark ? 'bg-[#111827] border-slate-800 placeholder-slate-500 text-white' : 'bg-white border-slate-300 placeholder-slate-400 text-slate-900'
              }`}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute top-1/2 -translate-y-1/2 end-4 text-xs opacity-50 hover:opacity-100 bg-slate-800 text-white px-2 py-1 rounded-md"
              >
                ✕ {isUr ? 'صاف کریں' : 'Clear'}
              </button>
            )}
          </div>

          {/* کیٹیگریز */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            {[
              { id: 'All', ur: 'تمام', en: 'All' },
              { id: 'AI Tools', ur: 'AI ٹولز', en: 'AI Tools' },
              { id: 'Courses', ur: 'کورسز', en: 'Courses' },
              { id: 'Productivity', ur: 'پروڈکٹیوٹی', en: 'Productivity' },
              { id: 'Remote Jobs', ur: 'ریموٹ جابز', en: 'Remote Jobs' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setCurrentCat(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  currentCat === cat.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : isDark
                      ? 'bg-[#111827] border border-slate-800 text-slate-400 hover:text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {isUr ? cat.ur : cat.en}
              </button>
            ))}
          </div>
        </div>

        {/* ڈائنامک میٹا رزلٹس (جب صارف کچھ بھی ٹائپ کرے) */}
        {cleanQuery.length > 1 && (
          <div className="mb-12 animate-fadeIn">
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-base sm:text-lg font-black text-indigo-400 flex items-center gap-2">
                <span>⚡</span>
                <span>{isUr ? `"${search}" کے براہِ راست سرچ نتائج (Deep Links)` : `Direct Search Engines for "${search}"`}</span>
              </h2>
              <span className="text-[11px] opacity-60">
                {isUr ? 'خودکار طور پر تیار کردہ' : 'Auto Generated'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {metaEngines.map((engine, idx) => (
                <a
                  key={idx}
                  href={engine.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-1 block ${
                    isDark
                      ? 'bg-gradient-to-b from-[#151c2e] to-[#0f172a] border-indigo-500/30 hover:border-indigo-400 shadow-lg shadow-indigo-950/40'
                      : 'bg-white border-indigo-200 hover:border-indigo-500 shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">{engine.icon}</span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400">
                      {engine.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm mb-1">{engine.name}</h3>
                  <p className="text-xs opacity-70 line-clamp-2 leading-relaxed mb-4">
                    {isUr ? engine.descUr : engine.descEn}
                  </p>
                  <div className="text-xs font-black text-indigo-400 inline-flex items-center gap-1">
                    <span>{isUr ? 'براہِ راست اوپن کریں' : 'Open Search'}</span>
                    <span>{isUr ? '←' : '→'}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* عام فہرست و فلٹرز */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-sm font-bold opacity-70 uppercase tracking-wider">
              {isUr ? 'منتخب ڈائریکٹری اور تصدیق شدہ پلیٹ فارمز' : 'Verified Directory & Listings'}
            </h2>
            <span className="text-xs opacity-50">
              {filteredList.length} {isUr ? 'نتائج' : 'items'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredList.map(item => (
              <div
                key={item.id}
                className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                  item.isSponsored
                    ? isDark
                      ? 'bg-[#111827]/90 border-indigo-500/40 shadow-xl shadow-indigo-600/5'
                      : 'bg-indigo-50/40 border-indigo-200 shadow-xl shadow-indigo-500/5'
                    : isDark
                      ? 'bg-[#111827]/40 border-slate-800/80 hover:border-slate-700'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-lg ${
                      isDark ? 'bg-slate-800/70 text-slate-300' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.category}
                    </span>
                    {item.isSponsored && (
                      <span className="text-[11px] font-black px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        {isUr ? 'نمایاں پارٹنر' : 'Featured Partner'}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2 tracking-tight">{item.title}</h3>
                  <p className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {isUr ? (item.descUr || item.descEn) : item.descEn}
                  </p>
                </div>

                <div className={`mt-6 pt-4 border-t flex items-center justify-between ${
                  isDark ? 'border-slate-800/80' : 'border-slate-100'
                }`}>
                  <span className="text-[11px] font-semibold opacity-50">
                    {isUr ? 'تصدیق شدہ پلیٹ فارم' : 'Verified Partner'}
                  </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/20 inline-flex items-center gap-1.5"
                  >
                    <span>{isUr ? 'ابھی وزٹ کریں' : 'Explore Now'}</span>
                    <span>{isUr ? '←' : '→'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredList.length === 0 && cleanQuery.length <= 1 && (
            <div className="text-center py-20">
              <p className="text-sm font-semibold opacity-50">
                {isUr ? 'کوئی ٹول یا کورس نہیں ملا۔' : 'No directory items found.'}
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className={`border-t py-6 text-center text-xs opacity-60 ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        © 2026 SmartHub Search. {isUr ? 'جملہ حقوق محفوظ ہیں۔' : 'All rights reserved.'}
      </footer>
    </div>
  );
}
