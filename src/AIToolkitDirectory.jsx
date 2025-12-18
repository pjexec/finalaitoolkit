import React, { useState, useMemo, useEffect } from 'react';

const tools = [
  // === CORE LLMs ===
  {
    name: "ChatGPT (Pro)",
    category: "Core LLM",
    rating: 5,
    capabilities: ["reasoning", "strategy", "ideation", "prompt engineering", "code scaffolding", "copywriting", "negotiation scripts", "design iteration", "PRDs", "legal structuring", "memory hub", "thinking", "synthesis", "image generation", "video generation"],
    notes: "Primary AI operating system. Co-founder level. Central memory hub. Image gen recently upgraded to Nano Banana level.",
    status: "primary"
  },
  {
    name: "Claude",
    category: "Core LLM",
    rating: 4,
    capabilities: ["deep reasoning", "long-form synthesis", "alternative perspective", "thinking", "analysis"],
    notes: "Strong at reasoning and synthesis. Secondary to ChatGPT but valued for different thinking style.",
    status: "active"
  },
  {
    name: "Gemini 3 Pro",
    category: "Core LLM",
    rating: 4,
    capabilities: ["reasoning", "image generation", "app building", "structured output"],
    notes: "Powers Nano Banana Pro. Strong execution engine.",
    status: "active"
  },
  {
    name: "Grok",
    category: "Core LLM",
    rating: 2,
    capabilities: ["comparative awareness", "ecosystem familiarity"],
    notes: "Not a core daily tool. More observational than relied upon.",
    status: "occasional"
  },

  // === IMAGE GENERATION ===
  {
    name: "Nano Banana Pro",
    category: "Image Generation",
    rating: 5,
    capabilities: ["AI image generation", "ad creative", "scroll-stopper visuals", "image prompting", "visual ads", "image from text"],
    notes: "Powered by Gemini 3 Pro. Primary for AI images. Has pros/cons vs ChatGPT—need both.",
    status: "primary"
  },
  {
    name: "ChatGPT Image Gen",
    category: "Image Generation",
    rating: 5,
    capabilities: ["AI image generation", "image from text", "image creation", "visual content"],
    notes: "Just upgraded (Dec 2024). Now competitive with Nano Banana. Has different strengths—need both.",
    status: "primary"
  },

  // === VIDEO GENERATION ===
  {
    name: "Veo3 (via Flow)",
    category: "Video Generation",
    rating: 5,
    capabilities: ["AI video generation", "video from text", "video from image", "image to video", "video creation"],
    notes: "Google's video gen. Accessed via Flow website. Has pros/cons vs Sora—need both.",
    status: "primary"
  },
  {
    name: "Sora (ChatGPT)",
    category: "Video Generation",
    rating: 5,
    capabilities: ["AI video generation", "video from text", "video from image", "image to video", "video creation"],
    notes: "ChatGPT's video gen. Has different strengths than Veo3—need both.",
    status: "primary"
  },

  // === APP / WEBSITE BUILDERS ===
  {
    name: "Google AI Studio (Anti-Gravity)",
    category: "App Builder",
    rating: 5,
    capabilities: ["app building", "web app generation", "CRM prototypes", "internal tools", "website apps", "website building", "Mac app"],
    notes: "Mac app. Primary for app building recently. Also proficient for websites. Execution engine.",
    status: "primary"
  },
  {
    name: "Lovable",
    category: "App Builder",
    rating: 5,
    capabilities: ["website design", "app UI generation", "vibe-coding", "rapid prototyping", "web development", "landing pages", "websites"],
    notes: "Fast with strong aesthetics. Primary for websites. Replaced Bolt and Netlify.",
    status: "primary"
  },
  {
    name: "Base44",
    category: "App Builder",
    rating: 3,
    capabilities: ["website building", "app building", "web development"],
    notes: "Recently tested. Has pros/cons. Still evaluating.",
    status: "testing"
  },
  {
    name: "Aura.build",
    category: "App Builder",
    rating: 3,
    capabilities: ["website building", "app building", "web development"],
    notes: "Recently tested. Has pros/cons. Still evaluating.",
    status: "testing"
  },
  {
    name: "Bolt.new",
    category: "App Builder",
    rating: 2,
    capabilities: ["site deployment", "hosting"],
    notes: "Moved away from. Not flexible enough long-term.",
    status: "abandoned"
  },

  // === VOICE AI ===
  {
    name: "Retell AI",
    category: "Voice AI Platform",
    rating: 5,
    capabilities: ["voice receptionist", "voice agent", "web call widgets", "hero demos", "restaurant AI", "HVAC AI", "phone answering", "voice AI"],
    notes: "Primary voice platform. Trusted for real sales demos. Strong UX control. Beats Vapi for production.",
    status: "primary"
  },
  {
    name: "Vapi.ai",
    category: "Voice AI Platform",
    rating: 3,
    capabilities: ["voice agent templates", "prototyping", "voice AI comparison"],
    notes: "Template-oriented. Useful for comparison but not primary stack.",
    status: "secondary"
  },

  // === MEMORY / TRANSCRIPTION ===
  {
    name: "Limitless AI",
    category: "Memory / Lifelogging",
    rating: 5,
    capabilities: ["life-logging", "meeting capture", "transcript generation", "memory ingestion", "conversation recording"],
    notes: "Primary raw memory tool. Highly valued. Beats Fathom for continuous capture.",
    status: "primary"
  },
  {
    name: "Fathom",
    category: "Meeting Transcription",
    rating: 3,
    capabilities: ["video meeting transcripts", "call summaries", "meeting recording"],
    notes: "Utility-focused. Secondary to Limitless.",
    status: "secondary"
  },

  // === AUTOMATION ===
  {
    name: "n8n",
    category: "Automation Platform",
    rating: 5,
    capabilities: ["advanced automation", "API-less workarounds", "POS integrations", "event-driven workflows", "complex logic", "custom automation"],
    notes: "Preferred when control is required. Systems-level tool. Beats Zapier for complex work.",
    status: "primary"
  },
  {
    name: "Zapier",
    category: "Automation Platform",
    rating: 4,
    capabilities: ["trigger automation", "quick connections", "data movement", "simple automation"],
    notes: "Reliable but limiting. Used when speed matters more than flexibility.",
    status: "active"
  },
  {
    name: "Pipedream",
    category: "Automation / Integration",
    rating: 4,
    capabilities: ["syncing transcripts", "custom pipelines", "API glue", "developer automation"],
    notes: "Developer-friendly. Useful glue between systems.",
    status: "active"
  },
  {
    name: "Rube",
    category: "Automation Platform",
    rating: 3,
    capabilities: ["automation triggers", "workflow experimentation"],
    notes: "Part of experimentation stack.",
    status: "experimental"
  },

  // === KNOWLEDGE / STORAGE ===
  {
    name: "Notion",
    category: "Knowledge Management",
    rating: 4,
    capabilities: ["knowledge storage", "project tracking", "reference material", "documentation"],
    notes: "Knowledge warehouse, not thinking engine. Wants AI-readable exports.",
    status: "active"
  },
  {
    name: "Google Docs / Sheets",
    category: "Documentation / Data",
    rating: 4,
    capabilities: ["transcripts", "spreadsheets", "CRM tracking", "exports", "data storage"],
    notes: "Chosen for interoperability. Neutral infrastructure.",
    status: "active"
  },
  {
    name: "NotebookLM",
    category: "AI Research Tool",
    rating: 3,
    capabilities: ["MD file ingestion", "secondary reasoning", "research synthesis"],
    notes: "Consumer of memory, not a source.",
    status: "planned"
  },

  // === EMAIL ===
  {
    name: "ManyReach",
    category: "Cold Email Platform",
    rating: 4,
    capabilities: ["cold email sending", "account warm-up", "throttle control", "outreach campaigns", "email outreach"],
    notes: "Extreme caution on deliverability. Focus on safe sending and reputation.",
    status: "primary"
  },
  {
    name: "Klaviyo",
    category: "Email Service Provider",
    rating: 5,
    capabilities: ["ESP integration", "email marketing", "flows", "automation", "deliverability"],
    notes: "Deep expertise. Infrastructure, not strategy tool.",
    status: "expert"
  },
  {
    name: "Mailchimp",
    category: "Email Service Provider",
    rating: 4,
    capabilities: ["ESP integration", "email marketing", "campaigns"],
    notes: "Deep familiarity. No tolerance for shallow deliverability advice.",
    status: "expert"
  },
  {
    name: "SendGrid",
    category: "Email Service Provider",
    rating: 4,
    capabilities: ["ESP integration", "transactional email", "sending infrastructure"],
    notes: "Treated as sending infrastructure.",
    status: "active"
  },

  // === DESIGN ===
  {
    name: "Canva",
    category: "Design Platform",
    rating: 4,
    capabilities: ["presentations", "documents", "social content", "visual assets", "quick design"],
    notes: "Utility-focused. Speed over design purity.",
    status: "active"
  },

  // === VIDEO OUTREACH ===
  {
    name: "Venna AI",
    category: "Personalized Video",
    rating: 4,
    capabilities: ["templated video", "personalized outreach video", "video prospecting", "cold outreach video"],
    notes: "Used for cold email video outreach.",
    status: "active"
  },

  // === HOSTING ===
  {
    name: "Netlify",
    category: "Hosting / Deployment",
    rating: 3,
    capabilities: ["hosting", "site deployment", "DNS"],
    notes: "Infrastructure-only. DNS/SSL friction experienced.",
    status: "secondary"
  },

  // === POS / RESTAURANT ===
  {
    name: "FoodTec POS",
    category: "POS System",
    rating: 2,
    capabilities: ["POS integration", "restaurant orders"],
    notes: "Closed ecosystem frustration. Actively seeking API-less hacks.",
    status: "problematic"
  },
  {
    name: "Chowly",
    category: "POS Middleware",
    rating: 3,
    capabilities: ["POS connectivity", "middleware bridge"],
    notes: "Considered a bridge, not ideal.",
    status: "evaluated"
  },

  // === MISC / MOCKUPS ===
  {
    name: "BotMockups",
    category: "Chat UI Mockup Tool",
    rating: 2,
    capabilities: ["web chat mockups", "chatbot previews"],
    notes: "Platform limitations. Template duplication issues. Building from scratch is easier.",
    status: "abandoned"
  },

  // === CONCEPTUAL ===
  {
    name: "Atlas",
    category: "Agent / OS Layer",
    rating: 3,
    capabilities: ["agent thinking", "AI OS concepts"],
    notes: "Conceptual OS thinking rather than finished product.",
    status: "conceptual"
  },
  {
    name: "QuickSilver OS",
    category: "Agent / OS Layer",
    rating: 3,
    capabilities: ["workflow acceleration", "agent orchestration"],
    notes: "Mental model more than concrete tool.",
    status: "conceptual"
  }
];

const categories = [...new Set(tools.map(t => t.category))].sort();

const statusColors = {
  primary: "bg-primary/10 text-primary border-primary/20",
  active: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  secondary: "bg-secondary text-secondary-foreground border-transparent",
  expert: "bg-violet-500/10 text-violet-700 border-violet-500/20",
  experimental: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  testing: "bg-orange-500/10 text-orange-700 border-orange-500/20",
  occasional: "bg-muted text-muted-foreground border-transparent",
  planned: "bg-indigo-500/10 text-indigo-700 border-indigo-500/20",
  evaluated: "bg-slate-500/10 text-slate-700 border-slate-500/20",
  abandoned: "bg-destructive/10 text-destructive border-destructive/20",
  problematic: "bg-destructive/10 text-destructive border-destructive/20",
  conceptual: "bg-pink-500/10 text-pink-700 border-pink-500/20"
};

const StarRating = ({ rating, onRate }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate && onRate(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className={`text-lg transition-colors ${star <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'
            } ${onRate ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-card text-card-foreground rounded-xl border border-border shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-2xl leading-none">×</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

const ToolForm = ({ tool, onSave, onCancel, categories }) => {
  const [form, setForm] = useState(tool || { name: '', category: '', rating: 3, capabilities: [], notes: '', status: 'active' });
  const [capInput, setCapInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.category.trim()) { alert('Name and category are required'); return; }
    onSave({ ...form, id: form.id || Date.now() });
  };

  const addCapability = () => {
    const cap = capInput.trim().toLowerCase();
    if (cap && !form.capabilities.includes(cap)) {
      setForm({ ...form, capabilities: [...form.capabilities, cap] });
      setCapInput('');
    }
  };

  const removeCapability = (cap) => {
    setForm({ ...form, capabilities: form.capabilities.filter(c => c !== cap) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">Tool Name *</label>
        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-foreground" placeholder="e.g., ChatGPT" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Category *</label>
          <input type="text" list="category-list" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-foreground" placeholder="e.g., Core LLM" />
          <datalist id="category-list">{categories.map(c => <option key={c} value={c} />)}</datalist>
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Status</label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-foreground">
            {Object.keys(statusColors).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">Rating</label>
        <StarRating rating={form.rating} onRate={(r) => setForm({ ...form, rating: r })} size="text-2xl" />
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">Notes</label>
        <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-foreground" rows={2} placeholder="Your notes about this tool..." />
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">Capabilities (for search)</label>
        <div className="flex gap-2 mb-2">
          <input type="text" value={capInput} onChange={(e) => setCapInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCapability())}
            className="flex-1 px-3 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-foreground" placeholder="Add capability..." />
          <button type="button" onClick={addCapability} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80">Add</button>
        </div>
        <div className="flex flex-wrap gap-1">
          {form.capabilities.map((cap, i) => (
            <span key={i} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded flex items-center gap-1">
              {cap}
              <button type="button" onClick={() => removeCapability(cap)} className="text-muted-foreground hover:text-destructive">×</button>
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-2 pt-4 border-t border-border">
        <button type="submit" className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">Save Tool</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80">Cancel</button>
      </div>
    </form>
  );
};

const ToolCard = ({ tool, onUpdateRating, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-card-foreground text-base leading-tight">{tool.name}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ml-2 ${statusColors[tool.status] || statusColors.active}`}>
          {tool.status}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <StarRating rating={tool.rating} onRate={(r) => onUpdateRating(tool.name, r)} />
        <span className="text-xs text-muted-foreground truncate">{tool.category}</span>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{tool.notes}</p>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-medium text-primary hover:underline hover:text-primary/80 transition-colors"
          >
            {expanded ? '− Hide capabilities' : '+ Show capabilities'}
          </button>
        </div>
        {(onEdit || onDelete) && (
          <div className="flex items-center gap-2">
            <button onClick={() => onEdit && onEdit(tool)} className="text-xs text-muted-foreground hover:text-primary transition-colors">Edit</button>
            <button onClick={() => onDelete && onDelete(tool.name)} className="text-xs text-muted-foreground hover:text-destructive transition-colors">Delete</button>
          </div>
        )}
      </div>

      {expanded && (
        <div className="mt-2 flex flex-wrap gap-1">
          {tool.capabilities.map((cap, i) => (
            <span key={i} className="text-[10px] bg-secondary text-secondary-foreground px-2 py-1 rounded-md font-medium">
              {cap}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default function AIToolkitDirectory() {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minRating, setMinRating] = useState(1);
  const [showPrimaryOnly, setShowPrimaryOnly] = useState(false);
  const [toolRatings, setToolRatings] = useState({});

  // State for Modals and Management
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTool, setEditingTool] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [importText, setImportText] = useState('');

  // Initialize state with imported constants but allow modifications
  const [allTools, setAllTools] = useState(tools);

  const handleUpdateRating = (toolName, newRating) => {
    // Update local state for rendering
    setToolRatings(prev => ({ ...prev, [toolName]: newRating }));
    // Also update the main list
    setAllTools(prev => prev.map(t => t.name === toolName ? { ...t, rating: newRating } : t));
  };

  const getToolRating = (tool) => {
    return toolRatings[tool.name] ?? tool.rating;
  };

  // Management Handlers
  const handleSaveTool = (tool) => {
    if (editingTool) {
      setAllTools(allTools.map(t => t.name === tool.name ? tool : t));
      setEditingTool(null);
    } else {
      setAllTools([...allTools, tool]);
      setShowAddModal(false);
    }
  };

  const handleDeleteTool = (name) => {
    if (confirm('Delete this tool?')) {
      setAllTools(allTools.filter(t => t.name !== name));
    }
  };

  const handleExport = () => {
    const json = JSON.stringify(allTools, null, 2);
    navigator.clipboard.writeText(json);
    alert('Copied to clipboard!');
  };

  const handleImport = () => {
    try {
      const imported = JSON.parse(importText);
      if (Array.isArray(imported)) {
        setAllTools(imported);
        setShowExportModal(false);
        setImportText('');
        alert('Imported successfully!');
      } else {
        alert('Invalid format—expected an array of tools');
      }
    } catch (e) {
      alert('Invalid JSON');
    }
  };

  const filteredTools = useMemo(() => {
    return allTools.filter(tool => {
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) return false;
      if (getToolRating(tool) < minRating) return false;
      if (showPrimaryOnly && tool.status !== 'primary') return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = tool.name.toLowerCase().includes(query);
        const matchesCapability = tool.capabilities.some(cap =>
          cap.toLowerCase().includes(query)
        );
        const matchesNotes = tool.notes.toLowerCase().includes(query);
        const matchesCategory = tool.category.toLowerCase().includes(query);

        if (!matchesName && !matchesCapability && !matchesNotes && !matchesCategory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => getToolRating(b) - getToolRating(a));
  }, [searchQuery, selectedCategory, minRating, showPrimaryOnly, toolRatings, allTools]);

  const taskExamples = [
    "image to video",
    "voice receptionist",
    "app building",
    "website",
    "automation",
    "image generation",
    "email outreach",
    "transcription"
  ];

  return (
    <div className="min-h-screen bg-background font-sans p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-start">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">AI Toolkit Directory</h1>
            <p className="text-muted-foreground text-lg">Search by task. Click stars to update ratings. {allTools.length} tools indexed.</p>
          </div>
          <div className="flex gap-2 items-center">
            <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm">+ Add Tool</button>
            <button onClick={() => setShowExportModal(true)} className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-lg hover:bg-secondary/80 transition-colors shadow-sm">Import/Export</button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              What do you want to do?
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., create video from images, build landing page, automate workflow..."
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            />
            <div className="flex flex-wrap gap-2 items-center pt-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Try:</span>
              {taskExamples.map((example) => (
                <button
                  key={example}
                  onClick={() => setSearchQuery(example)}
                  className="text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground px-2.5 py-1 rounded-md transition-colors font-medium"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Min Rating</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              >
                <option value={1}>Any</option>
                <option value={3}>3+ ★</option>
                <option value={4}>4+ ★</option>
                <option value={5}>5 ★</option>
              </select>
            </div>

            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPrimaryOnly}
                  onChange={(e) => setShowPrimaryOnly(e.target.checked)}
                  className="w-4 h-4 text-primary rounded border-input focus:ring-primary"
                />
                <span className="text-sm font-medium text-foreground">Primary only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm font-medium text-muted-foreground pl-1">
          {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
          {searchQuery && ` for "${searchQuery}"`}
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.name}
              tool={{ ...tool, rating: getToolRating(tool) }}
              onUpdateRating={handleUpdateRating}
              onEdit={setEditingTool}
              onDelete={handleDeleteTool}
            />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No tools match your search. Try different keywords or clear filters.
          </div>
        )}

        {/* Legend */}
        <div className="pt-8 border-t border-border">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Status Key</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(statusColors).map(([status, colors]) => (
              <span key={status} className={`text-xs px-2 py-1 rounded-full border ${colors}`}>
                {status}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Tool">
        <ToolForm onSave={handleSaveTool} onCancel={() => setShowAddModal(false)} categories={categories} />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editingTool} onClose={() => setEditingTool(null)} title="Edit Tool">
        {editingTool && <ToolForm tool={editingTool} onSave={handleSaveTool} onCancel={() => setEditingTool(null)} categories={categories} />}
      </Modal>

      {/* Export/Import Modal */}
      <Modal isOpen={showExportModal} onClose={() => setShowExportModal(false)} title="Import / Export Data">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2 text-foreground">Export (copy to clipboard)</h3>
            <button onClick={handleExport} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 w-full md:w-auto">Copy JSON to Clipboard</button>
            <p className="text-xs text-muted-foreground mt-2">Paste this into Claude/ChatGPT to backup or share.</p>
          </div>
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold mb-2 text-foreground">Import (paste JSON)</h3>
            <textarea value={importText} onChange={(e) => setImportText(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-foreground" rows={6} placeholder="Paste JSON array here..." />
            <button onClick={handleImport} className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full md:w-auto">Import</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
