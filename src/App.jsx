import React, { useState, useEffect } from 'react';

const ADMIN_PIN = "2580";

const TRANSLATIONS = {
  en: {
    title: "SmartHub Search",
    adminBtn: "Admin Panel 🔒",
    heroTitle: "Verify & Discover Leading",
    heroSubtitle: "Curated, high-value web directory for remote professionals and independent learners.",
    searchPlaceholder: "Search AI tools, courses, remote workflows...",
    verified: "Verified Platform",
    explore: "Explore Now →",
    featured: "Featured Partner",
    all: "All",
    aiTools: "AI Tools",
    courses: "Courses",
    productivity: "Productivity",
    remoteJobs: "Remote Jobs",
    footer: "© 2026 SmartHub Search. All rights reserved.",
    adminTitle: "SmartHub Admin Dashboard",
    adminSubtitle: "Manage new links, sponsored placements, and affiliate listings.",
    viewSite: "View Website",
    logout: "Log Out",
    addNew: "Add New Tool or Link",
    titleLabel: "Title / Name",
    catLabel: "Category",
    urlLabel: "Target URL / Affiliate Link",
    descLabel: "Short Description",
    sponsoredLabel: "Sponsored Slot (Featured on top)",
    addButton: "Add to Website",
    existingItems: "Current Listings",
    noItems: "No custom listings added yet.",
    deleteBtn: "Delete",
    loginTitle: "SmartHub Admin Access",
    loginDesc: "Enter secret PIN to unlock the control panel",
    pinPlaceholder: "Secret PIN",
    loginBtn: "Log In",
    backHome: "← Back to Website",
    wrongPin: "Incorrect PIN! Please try again."
  },
  ur: {
    title: "اسمارٹ ہب سرچ",
    adminBtn: "ایڈمن پینل 🔒",
    heroTitle: "بہترین AI ٹولز اور کورسز",
    heroSubtitle: "فری لانسرز، طلبہ اور پروفیشنلز کے لیے تصدیق شدہ ویب ڈائریکٹری اور وسائل۔",
    searchPlaceholder: "ٹولز، کورسز، یا ریموٹ جابز تلاش کریں...",
    verified: "تصدیق شدہ پلیٹ فارم",
    explore: "ابھی وزٹ کریں ←",
    featured: "نمایاں پارٹنر",
    all: "تمام",
    aiTools: "AI ٹولز",
    courses: "کورسز",
    productivity: "پروڈکٹیوٹی",
    remoteJobs: "ریموٹ جابز",
    footer: "© 2026 SmartHub Search۔ جملہ حقوق محفوظ ہیں۔",
    adminTitle: "SmartHub ایڈمن ڈیش بورڈ",
    adminSubtitle: "نئے لنکس، اسپانسرز اور افیلیئٹ لسٹنگز کا مکمل انتظام۔",
    viewSite: "ویب سائٹ دیکھیں",
    logout: "لاگ آؤٹ",
    addNew: "نیا ٹول یا لنک شامل کریں",
    titleLabel: "ٹائٹل / نام",
    catLabel: "کیٹیگری",
    urlLabel: "لنک / URL (افیلیئٹ لنک)",
    descLabel: "مختصر تفصیل",
    sponsoredLabel: "اسپانسرڈ سلاٹ (ٹاپ پر نمایاں کریں)",
    addButton: "ویب سائٹ میں شامل کریں",
    existingItems: "موجودہ لسٹنگز",
    noItems: "ابھی تک کوئی نیا کسٹم لنک شامل نہیں کیا گیا۔",
    deleteBtn: "ڈیلیٹ کریں",
    loginTitle: "SmartHub ایڈمن رسائی",
    loginDesc: "کنٹرول پینل کھولنے کے لیے خفیہ PIN درج کریں",
    pinPlaceholder: "خفیہ PIN",
    loginBtn: "لاگ ان کریں",
    backHome: "← ہوم پیج پر واپس جائیں",
    wrongPin: "غلط PIN! دوبارہ کوشش کریں۔"
  }
};

const BASE_ITEMS = [
  {
    id: 1,
    title: "Google AI Essentials",
    category: "Courses",
    url: "https://coursera.org",
    descriptionEn: "Learn foundational AI concepts and productivity tools from Google experts.",
    descriptionUr: "گوگل کے ماہرین سے بنیادی AI کے تصورات اور ٹولز سیکھیں۔",
    isSponsored: true
  },
  {
    id: 2,
    title: "DeepLearning.AI Prompt Engineering",
    category: "Courses",
    url: "https://coursera.org",
    descriptionEn: "Master LLM prompting techniques and workflows directly from Andrew Ng.",
    descriptionUr: "اینڈریو این جی سے جدید پرامپٹ انجینئرنگ اور طریقے سیکھیں۔",
    isSponsored: false
  },
  {
    id: 3,
    title: "Perplexity Pro Research Suite",
    category: "AI Tools",
    url: "https://perplexity.ai",
    descriptionEn: "Real-time discovery and multi-source verified search engine for professionals.",
    descriptionUr: "پیشہ ور افراد کے لیے جدید، ریئل ٹائم اور تصدیق شدہ ریسرچ انجن۔",
    isSponsored: true
  },
  {
    id: 4,
    title: "Claude 3.5 Sonnet Ecosystem",
    category: "AI Tools",
    url: "https://anthropic.com",
    descriptionEn: "Advanced coding, analytical reasoning, and long-form document processing.",
    descriptionUr: "جدید کوڈنگ، تفصیلی تجزیہ اور طویل دستاویزات پروسیسنگ کے لیے بہترین۔",
    isSponsored: false
  }
];

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState('en');
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

  const t = TRANSLATIONS[lang];

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
      setErrorMsg(t.wrongPin);
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
      descriptionEn: description,
      descriptionUr: description,
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

  const allItems = [...customItems, ...BASE_ITEMS];

  const filteredItems = allItems.filter(item => {
    const desc = lang === 'ur' ? (item.descriptionUr || item.descriptionEn) : item.descriptionEn;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (desc && desc.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Admin View
  if (isAdminView) {
    if (!isAuthenticated) {
      return (
        <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} flex items-center justify-center p-4`} dir={lang === 'ur' ? 'rtl' : 'ltr'}>
          <div className={`max-w-md w-full ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border rounded-2xl p-8 shadow-2xl`}>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">{t
