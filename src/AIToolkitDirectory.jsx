import React, { useState, useMemo } from 'react';

const tools = [
  // === CORE LLMs ===
  { name: "ChatGPT (Pro)", category: "Core LLM", rating: 5, capabilities: ["reasoning", "strategy", "ideation", "prompt engineering", "code scaffolding", "copywriting", "negotiation scripts", "design iteration", "PRDs", "legal structuring", "memory hub", "thinking", "synthesis", "image generation", "video generation"], notes: "Primary AI operating system. Co-founder level. Central memory hub. Image gen recently upgraded.", status: "primary" },
  { name: "Claude", category: "Core LLM", rating: 4, capabilities: ["deep reasoning", "long-form synthesis", "alternative perspective", "thinking", "analysis"], notes: "Strong at reasoning and synthesis. Secondary to ChatGPT but valued for different thinking style.", status: "active" },
  { name: "Gemini 3 Pro", category: "Core LLM", rating: 4, capabilities: ["reasoning", "image generation", "app building", "structured output"], notes: "Powers Nano Banana Pro. Strong execution engine.", status: "active" },
  { name: "Grok", category: "Core LLM", rating: 2, capabilities: ["comparative awareness", "ecosystem familiarity"], notes: "Not a core daily tool. More observational than relied upon.", status: "occasional" },
  // === IMAGE GENERATION ===
  { name: "Nano Banana Pro", category: "Image Generation", rating: 5, capabilities: ["AI image generation", "ad creative", "scroll-stopper visuals", "image prompting", "visual ads", "image from text"], notes: "Powered by Gemini 3 Pro. Primary for AI images.", status: "primary" },
  { name: "ChatGPT Image Gen", category: "Image Generation", rating: 5, capabilities: ["AI image generation", "image from text", "image creation", "visual content"], notes: "Just upgraded (Dec 2024). Now competitive with Nano Banana.", status: "primary" },
  // === VIDEO GENERATION ===
  { name: "Veo3 (via Flow)", category: "Video Generation", rating: 5, capabilities: ["AI video generation", "video from text", "video from image", "image to video", "video creation"], notes: "Google's video gen. Accessed via Flow website.", status: "primary" },
  { name: "Sora (ChatGPT)", category: "Video Generation", rating: 5, capabilities: ["AI video generation", "video from text", "video from image", "image to video", "video creation"], notes: "ChatGPT's video gen. Has different strengths than Veo3.", status: "primary" },
  // === APP / WEBSITE BUILDERS ===
  { name: "Google AI Studio", category: "App Builder", rating: 5, capabilities: ["app building", "web app generation", "CRM prototypes", "internal tools", "website apps", "website building", "Mac app"], notes: "Mac app. Primary for app building recently. Execution engine.", status: "primary" },
  { name: "Lovable", category: "App Builder", rating: 5, capabilities: ["website design", "app UI generation", "vibe-coding", "rapid prototyping", "web development", "landing pages", "websites"], notes: "Fast with strong aesthetics. Primary for websites.", status: "primary" },
  { name: "Base44", category: "App Builder", rating: 3, capabilities: ["website building", "app building", "web development"], notes: "Recently tested. Still evaluating.", status: "testing" },
  { name: "Aura.build", category: "App Builder", rating: 3, capabilities: ["website building", "app building", "web development"], notes: "Recently tested. Still evaluating.", status: "testing" },
  { name: "Bolt.new", category: "App Builder", rating: 2, capabilities: ["site deployment", "hosting"], notes: "Moved away from. Not flexible enough.", status: "abandoned" },
  // === VOICE AI ===
  { name: "Retell AI", category: "Voice AI Platform", rating: 5, capabilities: ["voice receptionist", "voice agent", "web call widgets", "hero demos", "restaurant AI", "HVAC AI", "phone answering", "voice AI"], notes: "Primary voice platform. Trusted for real sales demos.", status: "primary" },
  { name: "Vapi.ai", category: "Voice AI Platform", rating: 3, capabilities: ["voice agent templates", "prototyping", "voice AI comparison"], notes: "Template-oriented. Useful for comparison.", status: "secondary" },
  // === MEMORY / TRANSCRIPTION ===
  { name: "Limitless AI", category: "Memory / Lifelogging", rating: 5, capabilities: ["life-logging", "meeting capture", "transcript generation", "memory ingestion", "conversation recording"], notes: "Primary raw memory tool. Highly valued.", status: "primary" },
  { name: "Fathom", category: "Meeting Transcription", rating: 3, capabilities: ["video meeting transcripts", "call summaries", "meeting recording"], notes: "Utility-focused. Secondary to Limitless.", status: "secondary" },
  // === AUTOMATION ===
  { name: "n8n", category: "Automation Platform", rating: 5, capabilities: ["advanced automation", "API-less workarounds", "POS integrations", "event-driven workflows", "complex logic", "custom automation"], notes: "Preferred when control is required. Systems-level tool.", status: "primary" },
  { name: "Zapier", category: "Automation Platform", rating: 4, capabilities: ["trigger automation", "quick connections", "data movement", "simple automation"], notes: "Reliable but limiting. Used when speed matters.", status: "active" },
  { name: "Pipedream", category: "Automation / Integration", rating: 4, capabilities: ["syncing transcripts", "custom pipelines", "API glue", "developer automation"], notes: "Developer-friendly. Useful glue between systems.", status: "active" },
  { name: "Rube", category: "Automation Platform", rating: 3, capabilities: ["automation triggers", "workflow experimentation"], notes: "Part of experimentation stack.", status: "experimental" },
  // === KNOWLEDGE / STORAGE ===
  { name: "Notion", category: "Knowledge Management", rating: 4, capabilities: ["knowledge storage", "project tracking", "reference material", "documentation"], notes: "Knowledge warehouse, not thinking engine.", status: "active" },
  { name: "Google Docs / Sheets", category: "Documentation / Data", rating: 4, capabilities: ["transcripts", "spreadsheets", "CRM tracking", "exports", "data storage"], notes: "Chosen for interoperability.", status: "active" },
  { name: "NotebookLM", category: "AI Research Tool", rating: 3, capabilities: ["MD file ingestion", "secondary reasoning", "research synthesis"], notes: "Consumer of memory, not a source.", status: "planned" },
  // === EMAIL ===
  { name: "ManyReach", category: "Cold Email Platform", rating: 4, capabilities: ["cold email sending", "account warm-up", "throttle control", "outreach campaigns", "email outreach"], notes: "Extreme caution on deliverability.", status: "primary" },
  { name: "Klaviyo", category: "Email Service Provider", rating: 5, capabilities: ["ESP integration", "email marketing", "flows", "automation", "deliverability"], notes: "Deep expertise.", status: "expert" },
  { name: "Mailchimp", category: "Email Service Provider", rating: 4, capabilities: ["ESP integration", "email marketing", "campaigns"], notes: "Deep familiarity.", status: "expert" },
  { name: "SendGrid", category: "Email Service Provider", rating: 4, capabilities: ["ESP integration", "transactional email", "sending infrastructure"], notes: "Treated as sending infrastructure.", status: "active" },
  // === DESIGN ===
  { name: "Canva", category: "Design Platform", rating: 4, capabilities: ["presentations", "documents", "social content", "visual assets", "quick design"], notes: "Utility-focused. Speed over design purity.", status: "active" },
  // === VIDEO OUTREACH ===
  { name: "Venna AI", category: "Personalized Video", rating: 4, capabilities: ["templated video", "personalized outreach video", "video prospecting", "cold outreach video"], notes: "Used for cold email video outreach.", status: "active" },
  // === HOSTING ===
  { name: "Netlify", category: "Hosting / Deployment", rating: 3, capabilities: ["hosting", "site deployment", "DNS"], notes: "Infrastructure-only.", status: "secondary" },
  // === POS / RESTAURANT ===
  { name: "FoodTec POS", category: "POS System", rating: 2, capabilities: ["POS integration", "restaurant orders"], notes: "Closed ecosystem frustration.", status: "problematic" },
  { name: "Chowly", category: "POS Middleware", rating: 3, capabilities: ["POS connectivity", "middleware bridge"], notes: "Considered a bridge, not ideal.", status: "evaluated" },
  // === MISC / MOCKUPS ===
  { name: "BotMockups", category: "Chat UI Mockup Tool", rating: 2, capabilities: ["web chat mockups", "chatbot previews"], notes: "Platform limitations.", status: "abandoned" },
  // === CONCEPTUAL ===
  { name: "Atlas", category: "Agent / OS Layer", rating: 3, capabilities: ["agent thinking", "AI OS concepts"], notes: "Conceptual OS thinking.", status: "conceptual" },
  { name: "QuickSilver OS", category: "Agent / OS Layer", rating: 3, capabilities: ["workflow acceleration", "agent orchestration"], notes: "Mental model more than concrete tool.", status: "conceptual" }
];

const categories = [...new Set(tools.map(t => t.category))].sort();

// Status configuration - warm tinted colors
const statusConfig = {
  primary: { label: "Primary", color: "#5fa052", bg: "rgba(95, 160, 82, 0.12)" },
  active: { label: "Active", color: "#4a90a4", bg: "rgba(74, 144, 164, 0.12)" },
  secondary: { label: "Secondary", color: "#8a857c", bg: "rgba(138, 133, 124, 0.12)" },
  expert: { label: "Expert", color: "#9a7bc4", bg: "rgba(154, 123, 196, 0.12)" },
  experimental: { label: "Experimental", color: "#d4a855", bg: "rgba(212, 168, 85, 0.12)" },
  testing: { label: "Testing", color: "#c49a5a", bg: "rgba(196, 154, 90, 0.12)" },
  occasional: { label: "Occasional", color: "#8a857c", bg: "rgba(138, 133, 124, 0.12)" },
  planned: { label: "Planned", color: "#7a8fa4", bg: "rgba(122, 143, 164, 0.12)" },
  evaluated: { label: "Evaluated", color: "#9a9590", bg: "rgba(154, 149, 144, 0.12)" },
  abandoned: { label: "Abandoned", color: "#c25d4e", bg: "rgba(194, 93, 78, 0.12)" },
  problematic: { label: "Problematic", color: "#c87a6e", bg: "rgba(200, 122, 110, 0.12)" },
  conceptual: { label: "Conceptual", color: "#a49a8e", bg: "rgba(164, 154, 142, 0.12)" }
};

// Star Rating
const StarRating = ({ rating, onRate }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate?.(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className={`text-base transition-colors ${star <= (hover || rating) ? 'text-[#c9a227]' : 'text-[#4a453c]'
            } ${onRate ? 'cursor-pointer' : 'cursor-default'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

// Modal
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(20, 18, 16, 0.92)' }}
      onClick={onClose}
    >
      <div
        className="panel w-full max-w-xl max-h-[85vh] overflow-y-auto animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-[rgba(255,248,235,0.08)]">
          <h2 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>{title}</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded text-[#7a756c] hover:text-[#f2efe8] hover:bg-[#383432] transition-colors"
          >
            ×
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

// Tool Form
const ToolForm = ({ tool, onSave, onCancel, allCategories }) => {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label">Tool Name *</label>
        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input w-full" placeholder="e.g., ChatGPT" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Category *</label>
          <input type="text" list="cat-list" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input w-full" placeholder="e.g., Core LLM" />
          <datalist id="cat-list">{allCategories.map(c => <option key={c} value={c} />)}</datalist>
        </div>
        <div>
          <label className="label">Status</label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input w-full">
            {Object.entries(statusConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="label">Rating</label>
        <StarRating rating={form.rating} onRate={(r) => setForm({ ...form, rating: r })} />
      </div>
      <div>
        <label className="label">Notes</label>
        <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input w-full resize-none" rows={2} placeholder="Your notes..." />
      </div>
      <div>
        <label className="label">Capabilities</label>
        <div className="flex gap-2 mb-2">
          <input type="text" value={capInput} onChange={(e) => setCapInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCapability())} className="input flex-1" placeholder="Add capability..." />
          <button type="button" onClick={addCapability} className="btn btn-secondary">Add</button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {form.capabilities.map((cap, i) => (
            <span key={i} className="tag flex items-center gap-1.5">
              {cap}
              <button type="button" onClick={() => setForm({ ...form, capabilities: form.capabilities.filter(c => c !== cap) })} className="text-[#7a756c] hover:text-[#c25d4e]">×</button>
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-2 pt-3 border-t border-[rgba(255,248,235,0.08)]">
        <button type="submit" className="btn btn-primary flex-1">Save</button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
      </div>
    </form>
  );
};

// Tool Card
const ToolCard = ({ tool, onUpdateRating, onEdit, onDelete, index }) => {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[tool.status] || statusConfig.active;

  return (
    <div className={`card p-4 animate-in delay-${Math.min(index % 8, 7) + 1}`}>
      <div className="flex justify-between items-start gap-2 mb-3">
        <h3 className="font-semibold text-[#f2efe8] leading-snug" style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem' }}>
          {tool.name}
        </h3>
        <span className="badge shrink-0" style={{ backgroundColor: status.bg, color: status.color }}>
          {status.label}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <StarRating rating={tool.rating} onRate={(r) => onUpdateRating(tool.name, r)} />
        <span className="text-xs text-[#7a756c] truncate">{tool.category}</span>
      </div>

      <p className="text-sm text-[#b5b0a6] mb-3 leading-relaxed line-clamp-2">{tool.notes}</p>

      <div className="flex items-center justify-between pt-2 border-t border-[rgba(255,248,235,0.05)]">
        <button onClick={() => setExpanded(!expanded)} className="text-xs font-medium text-[#c9a227] hover:text-[#d4b84a]">
          {expanded ? '− Hide' : '+ Show'} capabilities
        </button>
        <div className="flex gap-3">
          <button onClick={() => onEdit?.(tool)} className="text-xs text-[#7a756c] hover:text-[#f2efe8]">Edit</button>
          <button onClick={() => onDelete?.(tool.name)} className="text-xs text-[#7a756c] hover:text-[#c25d4e]">Delete</button>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 pt-2 border-t border-[rgba(255,248,235,0.05)] flex flex-wrap gap-1.5">
          {tool.capabilities.map((cap, i) => <span key={i} className="tag">{cap}</span>)}
        </div>
      )}
    </div>
  );
};

// Main Component
export default function AIToolkitDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minRating, setMinRating] = useState(1);
  const [showPrimaryOnly, setShowPrimaryOnly] = useState(false);
  const [toolRatings, setToolRatings] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTool, setEditingTool] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [importText, setImportText] = useState('');
  const [allTools, setAllTools] = useState(tools);

  const handleUpdateRating = (name, rating) => {
    setToolRatings(prev => ({ ...prev, [name]: rating }));
    setAllTools(prev => prev.map(t => t.name === name ? { ...t, rating } : t));
  };

  const getToolRating = (tool) => toolRatings[tool.name] ?? tool.rating;

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
    if (confirm('Delete this tool?')) setAllTools(allTools.filter(t => t.name !== name));
  };

  const handleExport = () => {
    navigator.clipboard.writeText(JSON.stringify(allTools, null, 2));
    alert('Copied to clipboard!');
  };

  const handleImport = () => {
    try {
      const imported = JSON.parse(importText);
      if (Array.isArray(imported)) {
        setAllTools(imported);
        setShowExportModal(false);
        setImportText('');
      } else alert('Invalid format');
    } catch { alert('Invalid JSON'); }
  };

  const filteredTools = useMemo(() => {
    return allTools.filter(tool => {
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) return false;
      if (getToolRating(tool) < minRating) return false;
      if (showPrimaryOnly && tool.status !== 'primary') return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!tool.name.toLowerCase().includes(q) &&
          !tool.capabilities.some(c => c.includes(q)) &&
          !tool.notes.toLowerCase().includes(q) &&
          !tool.category.toLowerCase().includes(q)) return false;
      }
      return true;
    }).sort((a, b) => getToolRating(b) - getToolRating(a));
  }, [searchQuery, selectedCategory, minRating, showPrimaryOnly, toolRatings, allTools]);

  const taskExamples = ["image to video", "voice receptionist", "app building", "website", "automation", "image generation", "email outreach", "transcription"];

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 animate-in">
          <div>
            <h1 className="mb-2">
              AI Toolkit <span className="text-accent">Directory</span>
            </h1>
            <p className="text-[#b5b0a6]">
              <span className="text-accent">{allTools.length}</span> tools indexed · Search by task · Click stars to rate
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowAddModal(true)} className="btn btn-primary">+ Add Tool</button>
            <button onClick={() => setShowExportModal(true)} className="btn btn-secondary">Import/Export</button>
          </div>
        </header>

        {/* Search Panel */}
        <div className="panel p-5 space-y-5 animate-in delay-1">
          <div>
            <label className="label">What do you want to do?</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., create video from images, build landing page, automate workflow..."
              className="input w-full text-base py-3"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-xs text-[#7a756c]">Try:</span>
              {taskExamples.map((ex) => (
                <button key={ex} onClick={() => setSearchQuery(ex)} className="tag cursor-pointer">{ex}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[rgba(255,248,235,0.06)]">
            <div>
              <label className="label">Category</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="input w-full">
                <option value="all">All Categories</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Min Rating</label>
              <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="input w-full">
                <option value={1}>Any</option>
                <option value={3}>3+ ★</option>
                <option value={4}>4+ ★</option>
                <option value={5}>5 ★</option>
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={showPrimaryOnly} onChange={(e) => setShowPrimaryOnly(e.target.checked)} className="w-4 h-4 rounded border-[#4a453c] bg-transparent accent-[#c9a227]" />
                <span className="text-sm text-[#b5b0a6]">Primary only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-[#7a756c] animate-in delay-2">
          {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
          {searchQuery && <> for "<span className="text-accent">{searchQuery}</span>"</>}
        </p>

        {/* Tool Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool, i) => (
            <ToolCard
              key={tool.name}
              tool={{ ...tool, rating: getToolRating(tool) }}
              onUpdateRating={handleUpdateRating}
              onEdit={setEditingTool}
              onDelete={handleDeleteTool}
              index={i}
            />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <p className="text-center py-16 text-[#7a756c]">No tools match your search.</p>
        )}

        {/* Status Legend */}
        <footer className="pt-8 border-t border-[rgba(255,248,235,0.06)]">
          <p className="label mb-3">Status Key</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(statusConfig).map(([key, cfg]) => (
              <span key={key} className="badge" style={{ backgroundColor: cfg.bg, color: cfg.color }}>{cfg.label}</span>
            ))}
          </div>
        </footer>
      </div>

      {/* Modals */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Tool">
        <ToolForm onSave={handleSaveTool} onCancel={() => setShowAddModal(false)} allCategories={categories} />
      </Modal>

      <Modal isOpen={!!editingTool} onClose={() => setEditingTool(null)} title="Edit Tool">
        {editingTool && <ToolForm tool={editingTool} onSave={handleSaveTool} onCancel={() => setEditingTool(null)} allCategories={categories} />}
      </Modal>

      <Modal isOpen={showExportModal} onClose={() => setShowExportModal(false)} title="Import / Export">
        <div className="space-y-5">
          <div>
            <p className="label mb-2">Export</p>
            <button onClick={handleExport} className="btn btn-primary w-full">Copy JSON to Clipboard</button>
          </div>
          <div className="pt-4 border-t border-[rgba(255,248,235,0.08)]">
            <p className="label mb-2">Import</p>
            <textarea value={importText} onChange={(e) => setImportText(e.target.value)} className="input w-full font-mono text-sm" rows={5} placeholder="Paste JSON array..." />
            <button onClick={handleImport} className="btn btn-primary w-full mt-2">Import</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
