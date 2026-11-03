import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Globe, ExternalLink, Bookmark, BookmarkCheck, Sparkles, 
  Moon, Sun, Compass, GraduationCap, Briefcase, Wrench, BookOpen, 
  Tag, CheckCircle2, ChevronRight, Zap, Shield, ArrowUpRight, Plus, 
  Send, Layers, ThumbsUp, HelpCircle
} from 'lucide-react';

// Categories Configuration
const CATEGORIES = [
  { id: 'all', name: 'All Categories', urduName: 'تمام کیٹیگریز', icon: Compass },
  { id: 'education', name: 'Education & Courses', urduName: 'تعلیم اور کورسز', icon: GraduationCap },
  { id: 'ai-tools', name: 'AI Tools', urduName: 'مصنوعی ذہانت کے ٹولز', icon: Sparkles },
  { id: 'jobs-careers', name: 'Jobs & Freelancing', urduName: 'ملازمت اور فری لانسنگ', icon: Briefcase },
  { id: 'useful-tools', name: 'Useful Utilities', urduName: 'کارآمد یوٹیلٹیز', icon: Wrench },
  { id: 'research', name: 'Research & Knowledge', urduName: 'تحقیق اور علم', icon: BookOpen },
];

// Curated Seed Data
const INITIAL_RESOURCES = [
  // AI Tools
  {
    id: 'ai-1',
    name: 'DeepSeek',
    url: 'https://www.deepseek.com',
    description: 'Advanced open-weight reasoning and high-performance coding model offering cutting-edge AI capabilities.',
    urduDesc: 'کوڈنگ اور گہرے تجزیاتی کاموں کے لیے بہترین اور تیز رفتار اوپن سورس AI ماڈل۔',
    category: 'ai-tools',
    pricing: 'Free',
    tags: ['Reasoning', 'Coding', 'Open Weights', 'Chatbot'],
    featured: true,
    verified: true,
    clicks: 1420
  },
  {
    id: 'ai-2',
    name: 'Perplexity AI',
    url: 'https://www.perplexity.ai',
    description: 'Conversational answer engine with direct citations and real-time internet research capabilities.',
    urduDesc: 'حوالہ جات اور انٹرنیٹ کی لائیو ریسرچ کے ساتھ جوابات فراہم کرنے والا جدید سرچ انجن۔',
    category: 'ai-tools',
    pricing: 'Freemium',
    tags: ['Search', 'Research', 'Citations', 'Productivity'],
    featured: true,
    verified: true,
    clicks: 2150
  },
  {
    id: 'ai-3',
    name: 'Claude by Anthropic',
    url: 'https://claude.ai',
    description: 'Leading AI assistant specializing in nuanced writing, document analysis, and safe complex task execution.',
    urduDesc: 'تحریر، دستاویزات کے جائزے اور پیچیدہ کاموں کے لیے بہترین اسسٹنٹ۔',
    category: 'ai-tools',
    pricing: 'Freemium',
    tags: ['Writing', 'Coding', 'Long Context', 'Analysis'],
    featured: false,
    verified: true,
    clicks: 1890
  },
  {
    id: 'ai-4',
    name: 'ElevenLabs',
    url: 'https://elevenlabs.io',
    description: 'Industry-leading natural voice generation and realistic AI speech synthesis software.',
    urduDesc: 'حیرت انگیز قدرتی آوازوں اور آڈیو ڈبنگ کے لیے نمبر ون وائس جنریشن ٹول۔',
    category: 'ai-tools',
    pricing: 'Freemium',
    tags: ['Voice AI', 'Text to Speech', 'Audio', 'Dubbing'],
    featured: false,
    verified: true,
    clicks: 890
  },

  // Education
  {
    id: 'edu-1',
    name: 'Coursera',
    url: 'https://www.coursera.org',
    description: 'Learn in-demand skills from leading universities like Stanford, Google, and IBM with financial aid options.',
    urduDesc: 'دنیا کی بہترین یونیورسٹیوں اور کمپنیوں کے آن لائن سرٹیفکیٹس اور کورسز۔',
    category: 'education',
    pricing: 'Freemium',
    tags: ['Certifications', 'Degrees', 'Tech', 'University'],
    featured: true,
    verified: true,
    clicks: 3100
  },
  {
    id: 'edu-2',
    name: 'Khan Academy',
    url: 'https://www.khanacademy.org',
    description: 'A 100% free world-class educational resource for mathematics, computing, and natural sciences.',
    urduDesc: 'ریاضی، سائنس اور کمپیوٹر کی مفت بنیادی و اعلیٰ تعلیم کے لیے عالمی پلیٹ فارم۔',
    category: 'education',
    pricing: 'Free',
    tags: ['Math', 'Science', 'K-12', 'Free Always'],
    featured: false,
    verified: true,
    clicks: 1650
  },
  {
    id: 'edu-3',
    name: 'MIT OpenCourseWare',
    url: 'https://ocw.mit.edu',
    description: 'Direct, open publication of virtually all MIT course content for self-learners worldwide.',
    urduDesc: 'ایم آئی ٹی یونیورسٹی کے تمام نصابی کورسز اور لکچرز بالکل مفت۔',
    category: 'education',
    pricing: 'Free',
    tags: ['MIT', 'Engineering', 'Computer Science', 'Academic'],
    featured: true,
    verified: true,
    clicks: 1980
  },

  // Jobs & Freelancing
  {
    id: 'job-1',
    name: 'We Work Remotely',
    url: 'https://weworkremotely.com',
    description: 'The largest remote work community to find global programming, design, spreadsheet, and support jobs.',
    urduDesc: 'دنیا بھر سے ریموٹ اور گھر بیٹھے کام کرنے والی نوکریوں کا سب سے بڑا پورٹل۔',
    category: 'jobs-careers',
    pricing: 'Free',
    tags: ['Remote', 'Developer', 'Design', 'Global Jobs'],
    featured: true,
    verified: true,
    clicks: 2780
  },
  {
    id: 'job-2',
    name: 'RemoteOK',
    url: 'https://remoteok.com',
    description: 'Trusted job board with verified digital opportunities across engineering, marketing, and operations.',
    urduDesc: 'ڈیجیٹل پروفیشنلز، مارکیٹرز اور ڈویلپرز کے لیے تصدیق شدہ ریموٹ ملازمتیں۔',
    category: 'jobs-careers',
    pricing: 'Free',
    tags: ['Remote', 'Tech Jobs', 'Startup', 'High Pay'],
    featured: false,
    verified: true,
    clicks: 1540
  },
  {
    id: 'job-3',
    name: 'Upwork',
    url: 'https://www.upwork.com',
    description: 'Global freelancing marketplace connect businesses with independent professionals across all digital trades.',
    urduDesc: 'دنیا کی سب سے بڑی فری لانسنگ مارکیٹ پلیس برائے کلائنٹس اور فری لانسرز۔',
    category: 'jobs-careers',
    pricing: 'Freemium',
    tags: ['Freelance', 'Excel', 'Coding', 'Writing'],
    featured: true,
    verified: true,
    clicks: 3450
  },
  {
    id: 'job-4',
    name: 'FlowCV',
    url: 'https://flowcv.com',
    description: 'Modern, high-conversion resume builder with ATS-friendly templates and cover letter customization.',
    urduDesc: 'بین الاقوامی معیار کی پیشہ ورانہ سی وی اور ریزیومے بنانے کا بہترین ٹول۔',
    category: 'jobs-careers',
    pricing: 'Freemium',
    tags: ['Resume', 'CV Maker', 'Careers', 'Design'],
    featured: false,
    verified: true,
    clicks: 1120
  },

  // Useful Utilities
  {
    id: 'util-1',
    name: 'TinyWow',
    url: 'https://tinywow.com',
    description: 'Completely free toolbox offering 200+ utilities for PDF editing, video conversion, and image manipulation.',
    urduDesc: 'پی ڈی ایف، ویڈیو، اور امیج کنورژن کے سینکڑوں کارآمد ٹولز بغیر کسی فیس کے۔',
    category: 'useful-tools',
    pricing: 'Free',
    tags: ['PDF', 'Video Converter', 'No Sign-up', 'Utilities'],
    featured: true,
    verified: true,
    clicks: 2210
  },
  {
    id: 'util-2',
    name: 'iLovePDF',
    url: 'https://www.ilovepdf.com',
    description: 'Fast online tools to merge, split, compress, convert, and sign PDF documents seamlessly.',
    urduDesc: 'پی ڈی ایف فائلوں کو جوڑنے، چھوٹا کرنے اور ورڈ میں بدلنے کا بہترین ذریعہ۔',
    category: 'useful-tools',
    pricing: 'Freemium',
    tags: ['PDF Tools', 'Compress', 'Merge', 'Document'],
    featured: false,
    verified: true,
    clicks: 1870
  },

  // Research
  {
    id: 'res-1',
    name: 'arXiv.org',
    url: 'https://arxiv.org',
    description: 'Open-access distribution service for scientific e-prints in computer science, mathematics, and physics.',
    urduDesc: 'سائنسی اور کمپیوٹر مضامین کے تحقیقی پیپرز کا عالمی اوپن سورس خزانہ۔',
    category: 'research',
    pricing: 'Free',
    tags: ['Preprints', 'Physics', 'Computer Science', 'AI Research'],
    featured: true,
    verified: true,
    clicks: 980
  },
  {
    id: 'res-2',
    name: 'Semantic Scholar',
    url: 'https://www.semanticscholar.org',
    description: 'AI-backed research tool that extracts key findings and connections across global academic papers.',
    urduDesc: 'تحقیقی مقالوں کے تجزیے اور سائنسی ڈیٹا تلاش کرنے کا مصنوعی ذہانت والا ٹول۔',
    category: 'research',
    pricing: 'Free',
    tags: ['Academic', 'Literature Review', 'AI Papers', 'Citations'],
    featured: false,
    verified: true,
    clicks: 1340
  }
];

export default function App() {
  const [lang, setLang] = useState('en'); // 'en' or 'ur'
  const [darkMode, setDarkMode] = useState(true);
  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem('smarthub_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiMode, setAiMode] = useState(true);
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('smarthub_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  const [pricingFilter, setPricingFilter] = useState('all'); // all, free, freemium
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // New Resource Form State
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    urduDesc: '',
    category: 'education',
    pricing: 'Free',
    tags: ''
  });

  // Save changes locally
  useEffect(() => {
    localStorage.setItem('smarthub_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('smarthub_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // AI Intent Matchmaker Analysis
  const aiAnalysis = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!aiMode || query.length < 5) return null;

    // Excel and Spreadsheet Job Intent
    if (query.includes('excel') || query.includes('spreadsheet') || (query.includes('job') && query.includes('excel'))) {
      return {
        matched: true,
        detectedGoal: lang === 'en' 
          ? 'Excel Automation & Data Analysis Career Opportunity' 
          : 'ایکسل ماسٹر، فارمولا آٹومیشن اور ڈیٹا اینالیسس جاب کی تلاش',
        recommendedAction: lang === 'en'
          ? 'Target freelance platforms (Upwork) for custom spreadsheet modeling, and remote job boards (We Work Remotely) for financial/data operations.'
          : 'اپ ورک پر ایکسل ڈیش بورڈز اور آٹومیشن کے پروجیکٹس تلاش کریں، اور وی ورک ریموٹلی پر ڈیٹا آپریشنز کی ملازمتوں کے لیے درخواست دیں۔',
        suggestedKeywords: ['Excel Automation', 'Financial Modeler', 'Spreadsheet Expert', 'Data Analyst'],
        targetCategory: 'jobs-careers',
        directRankIds: ['job-3', 'job-1', 'job-2', 'job-4', 'edu-1']
      };
    }

    // PDF Utilities Intent
    if (query.includes('pdf') || query.includes('convert') || query.includes('compress')) {
      return {
        matched: true,
        detectedGoal: lang === 'en' ? 'Online PDF Conversion & Management' : 'پی ڈی ایف کنورژن، سائز چھوٹا کرنا اور ترمیم',
        recommendedAction: lang === 'en' 
          ? 'Use TinyWow for completely free processing without limits, or iLovePDF for fast bulk document merges.' 
          : 'بغیر کسی فیس کے لامحدود کام کے لیے ٹائنی واؤ (TinyWow) اور فائلیں جوڑنے کے لیے آئی لو پی ڈی ایف استعمال کریں۔',
        suggestedKeywords: ['PDF to Word', 'Compress PDF', 'Merge PDF', 'Free Utilities'],
        targetCategory: 'useful-tools',
        directRankIds: ['util-1', 'util-2']
      };
    }

    // Scholarship / Learning Intent
    if (query.includes('scholarship') || query.includes('free course') || query.includes('degree') || query.includes('learn')) {
      return {
        matched: true,
        detectedGoal: lang === 'en' ? 'Free Academic & Skill Certification' : 'مفت بین الاقوامی سرٹیفیکیشنز اور یونیورسٹی تعلیم',
        recommendedAction: lang === 'en'
          ? 'Apply for Coursera Financial Aid to get 100% free certificates, or access MIT OCW for complete university coursework.'
          : 'کورسیرا پر Financial Aid کی درخواست دے کر مفت سرٹیفکیٹ حاصل کریں یا ایم آئی ٹی او سی ڈبلیو سے براہ راست پڑھیں۔',
        suggestedKeywords: ['Financial Aid', 'Free Online Courses', 'MIT Courseware', 'CS50'],
        targetCategory: 'education',
        directRankIds: ['edu-1', 'edu-3', 'edu-2']
      };
    }

    return null;
  }, [searchQuery, aiMode, lang]);

  // Filtered & Ranked Resources
  const filteredResources = useMemo(() => {
    let list = [...resources];

    // Category Filter
    if (activeCategory !== 'all') {
      list = list.filter(r => r.category === activeCategory);
    }

    // Pricing Filter
    if (pricingFilter !== 'all') {
      list = list.filter(r => r.pricing.toLowerCase() === pricingFilter.toLowerCase());
    }

    // Query Search + AI Matcher
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      
      // If AI matched specific IDs, boost them to the very top
      if (aiAnalysis && aiAnalysis.directRankIds) {
        list.sort((a, b) => {
          const aIndex = aiAnalysis.directRankIds.indexOf(a.id);
          const bIndex = aiAnalysis.directRankIds.indexOf(b.id);
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          return 0;
        });
      }

      list = list.filter(item => {
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesUrduDesc = (item.urduDesc || '').includes(q);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(q));
        const isAiRanked = aiAnalysis?.directRankIds?.includes(item.id);
        return matchesName || matchesDesc || matchesUrduDesc || matchesTags || isAiRanked;
      });
    }

    return list;
  }, [resources, activeCategory, pricingFilter, searchQuery, aiAnalysis]);

  // Click Tracker
  const handleVisit = (id) => {
    setResources(prev => prev.map(item => item.id === id ? { ...item, clicks: (item.clicks || 0) + 1 } : item));
  };

  // Bookmark Toggle
  const toggleBookmark = (id) => {
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  // Add Resource Handler
  const handleAddResource = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.url) return;

    const newRes = {
      id: 'res-' + Date.now(),
      name: formData.name,
      url: formData.url.startsWith('http') ? formData.url : `https://${formData.url}`,
      description: formData.description || 'Discovered and submitted via SmartHub Community.',
      urduDesc: formData.urduDesc || 'سمارٹ ہب کے ذریعے شامل کیا گیا کارآمد ذریعہ۔',
      category: formData.category,
      pricing: formData.pricing,
      tags: formData.tags ? formData.tags.split(',').map(s => s.trim()) : ['Utility'],
      featured: false,
      verified: true,
      clicks: 1
    };

    setResources(prev => [newRes, ...prev]);
    setIsSubmitModalOpen(false);
    setFormData({ name: '', url: '', description: '', urduDesc: '', category: 'education', pricing: 'Free', tags: '' });
  };

  const isRtl = lang === 'ur';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top Navigation Bar */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md ${darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400">
                SmartHub
              </span>
              <span className="text-xs uppercase tracking-widest block font-semibold text-slate-400">Search Engine</span>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Submit Resource */}
            <button 
              onClick={() => setIsSubmitModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-sm shadow-indigo-500/20"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{lang === 'en' ? 'Submit Tool' : 'نیا لنک شامل کریں'}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(l => l === 'en' ? 'ur' : 'en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${darkMode ? 'border-slate-800 hover:bg-slate-900 text-slate-300' : 'border-slate-300 hover:bg-slate-100 text-slate-700'}`}
            >
              {lang === 'en' ? 'اردو' : 'English'}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg border transition-colors ${darkMode ? 'border-slate-800 hover:bg-slate-900 text-amber-400' : 'border-slate-300 hover:bg-slate-100 text-slate-600'}`}
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero & Central Discovery Section */}
      <section className="relative pt-12 pb-8 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 bg-indigo-500/10 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4">
          <Zap className="h-3.5 w-3.5" />
          <span>{lang === 'en' ? 'Next-Gen Curated Search Experience' : 'بہترین اور تصدیق شدہ ویب لنکس کا ذخیرہ'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          {lang === 'en' ? (
            <>Find The Web's Most <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">Valuable Resources</span></>
          ) : (
            <>انٹرنیٹ کے سب سے قیمتی <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">ٹولز اور لنکس</span> تلاش کریں</>
          )}
        </h1>

        <p className={`text-sm sm:text-base max-w-2xl mx-auto mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {lang === 'en' 
            ? 'Access verified AI tools, accredited online learning, international remote jobs, and free utilities in one central platform.'
            : 'تصدیق شدہ مصنوعی ذہانت کے ٹولز، مفت کورسز، ریموٹ نوکریاں، اور ضروری یوٹیلٹیز ایک ہی جگہ۔'}
        </p>

        {/* Central Search Box */}
        <div className="relative max-w-3xl mx-auto mb-4">
          <div className={`flex items-center rounded-2xl border-2 transition-all p-2 sm:p-2.5 shadow-2xl ${
            darkMode 
              ? 'bg-slate-900/90 border-indigo-500/30 focus-within:border-indigo-500 focus-within:shadow-indigo-500/10' 
              : 'bg-white border-slate-300 focus-within:border-indigo-500 focus-within:shadow-indigo-500/10'
          }`}>
            <Search className={`h-6 w-6 ml-2 mr-2 shrink-0 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'en' ? 'Search tools or type any need (e.g. "Need a job for Excel Master")...' : 'تلاش کریں یا اپنا مقصد لکھیں (مثلاً "Need a job for Excel Master")...'}
              className="w-full bg-transparent border-none outline-none text-base sm:text-lg font-medium placeholder:text-slate-500"
            />

            {/* AI Toggle */}
            <button
              onClick={() => setAiMode(!aiMode)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                aiMode 
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md' 
                  : (darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600')
              }`}
              title="Toggle AI Intent Assistant"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">AI Copilot</span>
            </button>
          </div>
        </div>

        {/* Trending Suggestions */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-400">
          <span className="font-semibold text-slate-500">{lang === 'en' ? 'Trending Searches:' : 'مشہور تلاش:'}</span>
          {['Need a job for Excel Master', 'Free PDF Converter', 'DeepSeek', 'MIT Courses', 'Remote Jobs'].map((keyword) => (
            <button
              key={keyword}
              onClick={() => setSearchQuery(keyword)}
              className={`px-2.5 py-1 rounded-full border transition-colors ${
                darkMode ? 'border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 text-slate-300' : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-100 text-slate-700'
              }`}
            >
              {keyword}
            </button>
          ))}
        </div>
      </section>

      {/* AI Intent Matchmaker Banner (Activates upon specific prompts) */}
      {aiAnalysis && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="rounded-2xl p-5 border border-cyan-500/30 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-cyan-950/60 shadow-xl relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-lg shrink-0">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">SmartHub AI Copilot</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Intent Matched</span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-1">
                  {aiAnalysis.detectedGoal}
                </h3>
                
                <p className="text-sm text-slate-300 mb-3">
                  {aiAnalysis.recommendedAction}
                </p>

                {/* Tag Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800">
                  <span className="text-xs font-semibold text-slate-400">Suggested Focus:</span>
                  {aiAnalysis.suggestedKeywords.map(k => (
                    <span key={k} className="text-xs px-2.5 py-0.5 rounded-md bg-slate-800 text-cyan-300 border border-slate-700 font-mono">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shrink-0 transition-all ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                    : (darkMode ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white' : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900')
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{lang === 'en' ? cat.name : cat.urduName}</span>
              </button>
            );
          })}
        </div>

        {/* Filters and Counters Bar */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-400 border-b pb-4 border-slate-800">
          <div>
            <span>{lang === 'en' ? 'Showing' : 'موجودہ نتائج:'} </span>
            <strong className="text-indigo-400 font-bold">{filteredResources.length}</strong>
            <span> {lang === 'en' ? 'curated resources' : 'تصدیق شدہ لنکس'}</span>
          </div>

          {/* Pricing filter */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline font-medium">{lang === 'en' ? 'Pricing:' : 'قیمت:'}</span>
            <select
              value={pricingFilter}
              onChange={(e) => setPricingFilter(e.target.value)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-semibold outline-none cursor-pointer ${
                darkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <option value="all">{lang === 'en' ? 'All Types' : 'تمام'}</option>
              <option value="free">{lang === 'en' ? '100% Free' : 'مفت'}</option>
              <option value="freemium">{lang === 'en' ? 'Freemium' : 'فری میم'}</option>
            </select>
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredResources.map((item) => {
              const isBookmarked = bookmarks.includes(item.id);
              return (
                <div 
                  key={item.id}
                  className={`group relative rounded-2xl p-5 border flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                    darkMode 
                      ? 'bg-slate-900/60 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900' 
                      : 'bg-white border-slate-200 hover:border-indigo-400 hover:shadow-indigo-500/5'
                  }`}
                >
                  <div>
                    {/* Header: Name, Pricing Badge & Bookmark */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-sm">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-base tracking-tight flex items-center gap-1.5">
                            {item.name}
                            {item.verified && (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" title="Verified Resource" />
                            )}
                          </h4>
                          <span className="text-[11px] text-slate-500 font-mono block">
                            {new URL(item.url).hostname.replace('www.', '')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          item.pricing.toLowerCase() === 'free' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {item.pricing}
                        </span>

                        <button 
                          onClick={() => toggleBookmark(item.id)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isBookmarked 
                              ? 'bg-indigo-600 text-white border-indigo-600' 
                              : (darkMode ? 'border-slate-800 hover:bg-slate-800 text-slate-400' : 'border-slate-200 hover:bg-slate-100 text-slate-500')
                          }`}
                          title="Save to bookmarks"
                        >
                          {isBookmarked ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    <p className={`text-xs leading-relaxed mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {lang === 'en' ? item.description : (item.urduDesc || item.description)}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tags.map((tag, idx) => (
                        <span 
                          key={idx}
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                            darkMode ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer & Action Link */}
                  <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500">
                      {item.clicks || 0} visits
                    </span>

                    <a 
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleVisit(item.id)}
                      className="inline-flex items-center gap-1 font-semibold text-indigo-400 hover:text-indigo-300 group-hover:underline"
                    >
                      <span>{lang === 'en' ? 'Visit Website' : 'ویب سائٹ دیکھیں'}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <HelpCircle className="h-12 w-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold mb-1">{lang === 'en' ? 'No Resources Found' : 'کوئی نتیجہ نہیں ملا'}</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              {lang === 'en' ? 'Try searching different keywords or check out all categories.' : 'مختلف الفاظ سے تلاش کریں یا تمام کیٹیگریز دیکھیں۔'}
            </p>
            <button 
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
            >
              {lang === 'en' ? 'Reset Search' : 'تلاش دوبارہ شروع کریں'}
            </button>
          </div>
        )}
      </main>

      {/* Submit Resource Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`relative w-full max-w-lg rounded-2xl border p-6 shadow-2xl ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h3 className="text-lg font-bold mb-1">
              {lang === 'en' ? 'Submit a Curated Resource' : 'نیا تصدیق شدہ لنک شامل کریں'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              {lang === 'en' ? 'Add high-value tools, learning sites, or job boards to the index.' : 'انڈیکس میں نیا AI ٹول، فری لانسنگ پورٹل یا کورس ویب سائٹ شامل کریں۔'}
            </p>

            <form onSubmit={handleAddResource} className="space-y-3">
              <div>
                <label className="text-xs font-semibold block mb-1">Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Kaggle"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                    darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Website URL</label>
                <input 
                  type="url" 
                  required
                  placeholder="https://example.com"
                  value={formData.url}
                  onChange={e => setFormData({ ...formData, url: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                    darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold block mb-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                      darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <option value="education">Education</option>
                    <option value="ai-tools">AI Tools</option>
                    <option value="jobs-careers">Jobs & Careers</option>
                    <option value="useful-tools">Useful Utilities</option>
                    <option value="research">Research</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Pricing Model</label>
                  <select 
                    value={formData.pricing}
                    onChange={e => setFormData({ ...formData, pricing: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                      darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <option value="Free">100% Free</option>
                    <option value="Freemium">Freemium</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">English Description</label>
                <input 
                  type="text" 
                  placeholder="Short explanation of what it does..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                    darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Urdu Description (اردو میں تفصیل)</label>
                <input 
                  type="text" 
                  placeholder="اس ویب سائٹ کا مختصر تعارف اردو میں..."
                  value={formData.urduDesc}
                  onChange={e => setFormData({ ...formData, urduDesc: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                    darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Tags (Comma Separated)</label>
                <input 
                  type="text" 
                  placeholder="ai, python, remote, tools"
                  value={formData.tags}
                  onChange={e => setFormData({ ...formData, tags: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                    darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Clean Footer */}
      <footer className={`border-t py-8 text-center text-xs ${darkMode ? 'border-slate-800/80 text-slate-500' : 'border-slate-200 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 SmartHub Search. Built for students, researchers, and digital professionals.</p>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="hover:text-indigo-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-indigo-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-indigo-400 cursor-pointer">API Integration</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
