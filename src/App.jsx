import React, { useState, useEffect } from 'react';

const ADMIN_PIN = "2580";

const BASE_ITEMS = [
  {
    id: 1,
    title: "Google AI Essentials",
    category: "Courses",
    url: "https://coursera.org",
    description: "Learn foundational AI concepts and productivity tools from Google experts.",
    isSponsored: true
  },
  {
    id: 2,
    title: "DeepLearning.AI Prompt Engineering",
    category: "Courses",
    url: "https://coursera.org",
    description: "Master LLM prompting techniques and workflows directly from Andrew Ng.",
    isSponsored: false
  },
  {
    id: 3,
    title: "Perplexity Pro Research Suite",
    category: "AI Tools",
    url: "https://perplexity.ai",
    description: "Real-time discovery and multi-source verified search engine for professionals.",
    isSponsored: true
  },
  {
    id: 4,
    title: "Claude 3.5 Sonnet Ecosystem",
    category: "AI Tools",
    url: "https://anthropic.com",
    description: "Advanced coding, analytical reasoning, and long-form document processing.",
    isSponsored: false
  }
];

export default function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [customItems, setCustomItems] = useState([]);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('AI Tools');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isSponsored, setIsSponsored] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('smarthub_custom_items');
    if (saved) {
      try {
        setCustomItems(JSON.parse(saved));
      } catch (e) {
        setCustomItems([]);
      }
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('غلط پاس ورڈ! دوبارہ کوشش کریں۔');
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!title || !url) return;

    const newItem = {
      id: Date.now(),
      title,
      category,
      url,
      description,
      isSponsored
    };

    const updated = [newItem, ...customItems];
    setCustomItems(updated);
    localStorage.setItem('smarthub_custom_items', JSON.stringify(updated));

    setTitle('');
    setUrl('');
    setDescription('');
    setIsSponsored(false);
  };

  const handleDelete = (id) => {
    const updated = customItems.filter(item => item.id !== id);
    setCustomItems(updated);
    localStorage.setItem('smarthub_custom_items', JSON.stringify(updated));
  };

  // Admin View
  if (isAdminView) {
    if (!isAuthenticated) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">SmartHub Admin Access</h1>
              <p className="text-sm text-slate-400">کنٹرول پینل کھولنے کے لیے خفیہ PIN درج کریں</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="خفیہ PIN"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-center text-xl tracking-widest text-white focus:outline-none focus:border-indigo-500"
                  autoFocus
                />
              </div>
              {errorMsg && <p className="text-rose-500 text-sm text-center font-medium">{errorMsg}</p>}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/30"
              >
                لاگ ان کریں
              </button>
              <button
                type="button"
                onClick={() => setIsAdminView(false)}
                className="w-full text-slate-400 hover:text-white text-sm py-2"
              >
                ← ہوم پیج پر واپس جائیں
              </button>
            </form>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-slate-800 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">SmartHub ایڈمن ڈیش بورڈ</h1>
              <p className="text-slate-400 text-sm mt-1">نئے لنکس، اسپانسرز اور افیلیئٹ لسٹنگز کا انتظام</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAdminView(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl border border-slate-700"
              >
                ویب سائٹ دیکھیں
              </button>
              <button
                onClick={() => { setIsAuthenticated(false); setIsAdminView(false); }}
                className="px-4 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 text-sm font-medium rounded-xl border border-rose-500/30"
              >
                لاگ آؤٹ
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit">
              <h2 className="text-lg font-bold text-white mb-4">نیا ٹول یا لنک شامل کریں</h2>
              <form onSubmit={handleAddItem} className="space-y-4 text-sm">
                <div>
                  <label className="block text-slate-400 mb-1">ٹائٹل / نام</label>
                  <input
                    type="text"
                    required
                    placeholder="مثلاً Coursera Google IT"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">کیٹیگری</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="AI Tools">AI Tools</option>
                    <option value="Courses">Courses</option>
                    <option value="Remote Jobs">Remote Jobs</option>
                    <option value="Productivity">Productivity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">لنک / URL (افیلیئٹ لنک)</label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">مختصر تفصیل</label>
                  <textarea
                    rows="3"
                    placeholder="مختصر تفصیل درج کریں..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  ></textarea>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="sponsoredCheck"
                    checked={isSponsored}
                    onChange={(e) => setIsSponsored(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="sponsoredCheck" className="text-slate-300 text-sm font-medium cursor-pointer">
                    Sponsored Slot (ٹاپ پر نمایاں کریں)
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/30"
                >
                  شامل کریں (Add Item)
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">
                موجودہ لسٹنگز ({customItems.length})
              </h2>

              {customItems.length === 0 ? (
                <div className="text-center py-16 text-slate-500 text-sm">
                  ابھی تک کوئی نیا کسٹم لنک شامل نہیں کیا گیا۔ بائیں جانب سے نیا لنک شامل کریں۔
                </div>
              ) : (
                <div className="space-y-3">
                  {customItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl gap-4 hover:border-slate-700 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{item.title}</span>
                          {item.isSponsored && (
                            <span className="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-md font-bold">
                              Sponsored
                            </span>
                          )}
                          <span className="px-2 py-0.5 text-xs bg-slate-800 text-slate-300 rounded-md">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1">{item.description}</p>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-indigo-400 hover:underline mt-0.5 inline-block"
                        >
                          {item.url}
                        </a>
                      </div>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-xs px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg self-end sm:self-center"
                      >
                        ڈیلیٹ کریں
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Public View
  const allItems = [...customItems, ...BASE_ITEMS];

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center font-black text-white shadow-lg shadow-indigo-500/20">
              S
            </div>
            <span className="text-xl font-bold tracking-tight text-white">SmartHub Search</span>
          </div>
          <button
            onClick={() => setIsAdminView(true)}
            className="text-xs bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 px-3 py-1.5 rounded-lg transition-colors font-semibold"
          >
            Admin Panel 🔒
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Verify & Discover Leading <span className="text-indigo-400">AI Tools</span> and Courses
          </h1>
          <p className="text-slate-400 text-base">
            Curated, high-value web directory for remote professionals and independent learners.
          </p>

          <div className="mt-8 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AI tools, courses, remote workflows..."
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 shadow-xl"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {['All', 'AI Tools', 'Courses', 'Productivity', 'Remote Jobs'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                item.isSponsored
                  ? 'bg-slate-900/90 border-indigo-500/40 shadow-lg shadow-indigo-500/5 hover:border-indigo-500/60'
                  : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">
                    {item.category}
                  </span>
                  {item.isSponsored && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Featured Partner
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-1.5">{item.title}</h3>
                <p className="text-sm text-slate-400 line-clamp-2">{item.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-xs text-slate-500">Verified Platform</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl transition-all shadow-sm"
                >
                  Explore Now →
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © 2026 SmartHub Search. All rights reserved.
      </footer>
    </div>
  );
}
