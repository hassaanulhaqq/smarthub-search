import React, { useState, useEffect } from 'react';

const ADMIN_PIN = "2580";

export default function Admin({ onBack }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [items, setItems] = useState([]);
  
  // New Item Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('AI Tools');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isSponsored, setIsSponsored] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('smarthub_custom_items');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        setItems([]);
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
      isSponsored,
      createdAt: new Date().toLocaleDateString()
    };

    const updated = [newItem, ...items];
    setItems(updated);
    localStorage.setItem('smarthub_custom_items', JSON.stringify(updated));

    // Reset Form
    setTitle('');
    setUrl('');
    setDescription('');
    setIsSponsored(false);
  };

  const handleDelete = (id) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    localStorage.setItem('smarthub_custom_items', JSON.stringify(updated));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">SmartHub Admin Access</h1>
            <p className="text-sm text-slate-400">کنٹرول پینل کھولنے کے لیے خفیہ پاس ورڈ درج کریں</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="خفیہ PIN درج کریں"
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
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="w-full text-slate-400 hover:text-white text-sm py-2"
              >
                ← ہوم پیج پر واپس جائیں
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-slate-800 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">SmartHub ایڈمن ڈیش بورڈ</h1>
            <p className="text-slate-400 text-sm mt-1">نئے ٹولز، اسپانسرڈ لسٹنگز اور افیلیئٹ لنکس کا انتظام</p>
          </div>
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl border border-slate-700"
              >
                ویب سائٹ دیکھیں
              </button>
            )}
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 text-sm font-medium rounded-xl border border-rose-500/30"
            >
              لاگ آؤٹ
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Add Item Form */}
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
                  placeholder="ٹول یا کورس کے بارے میں ایک دو جملے..."
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
                شامل کریں (Add to Website)
              </button>
            </form>
          </div>

          {/* Manage Items Table */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">
              موجودہ لنکس و ٹولز ({items.length})
            </h2>

            {items.length === 0 ? (
              <div className="text-center py-16 text-slate-500 text-sm">
                ابھی تک کوئی کسٹم آئٹم شامل نہیں کیا گیا۔ بائیں جانب سے نیا لنک شامل کریں۔
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
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
