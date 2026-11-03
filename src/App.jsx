import React, { useState, useEffect } from 'react';
import Admin from './Admin';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [customItems, setCustomItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('smarthub_custom_items');
    if (saved) {
      try {
        setCustomItems(JSON.parse(saved));
      } catch (e) {
        setCustomItems([]);
      }
    }
  }, [isAdminView]);

  if (isAdminView) {
    return <Admin onBack={() => setIsAdminView(false)} />;
  }

  const allItems = [...customItems, ...BASE_ITEMS];

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
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
            className="text-xs bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 transition-colors"
          >
            Admin 🔒
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Verify & Discover Leading <span className="text-indigo-400">AI Tools</span> and Courses
          </h1>
          <p className="text-slate-400 text-base">
            Curated, high-value web directory for remote professionals and independent learners.
          </p>

          {/* Search Box */}
          <div className="mt-8 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AI tools, courses, remote workflows..."
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 shadow-xl"
            />
          </div>

          {/* Category Tabs */}
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

        {/* Directory Grid */}
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

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © 2026 SmartHub Search. All rights reserved.
      </footer>
    </div>
  );
}
