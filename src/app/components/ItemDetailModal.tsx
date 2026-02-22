import { X, ExternalLink, Star, Copy, CheckSquare, Calendar, Zap, Instagram, FileText, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { BUCKET_COLORS, PLATFORM_LABELS, type SavedItem } from '../data/mockData';
import { toast } from 'sonner';

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function PlatformIcon({ platform, className }: { platform: string; className?: string }) {
  switch (platform) {
    case 'instagram': return <Instagram className={className} />;
    case 'twitter': return <XIcon className={className} />;
    default: return <FileText className={className} />;
  }
}

const PLATFORM_COLORS: Record<string, string> = {
  instagram: 'from-pink-600 to-purple-600',
  twitter: 'from-gray-700 to-gray-600',
  article: 'from-emerald-700 to-teal-700',
  youtube: 'from-red-700 to-rose-600',
};

interface ItemDetailModalProps {
  item: SavedItem;
  onClose: () => void;
}

export function ItemDetailModal({ item, onClose }: ItemDetailModalProps) {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const colors = BUCKET_COLORS[item.bucket];

  const handleAction = (action: string) => {
    setActiveAction(action);
    toast.success(`"${action}" generated!`, {
      description: 'Check the action steps below',
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${item.title}\n\n${item.summary}\n\nKey Takeaways:\n${item.takeaways.map((t, i) => `${i + 1}. ${t}`).join('\n')}`);
    toast.success('Copied to clipboard!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-2xl max-h-[90vh] bg-[#0f0f1e] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl shadow-black/50"
      >
        {/* Hero Image */}
        <div className="relative h-52 flex-shrink-0">
          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1e] via-[#0f0f1e]/40 to-transparent" />

          {/* Top bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div
              className={`flex items-center gap-1.5 bg-gradient-to-r ${PLATFORM_COLORS[item.platform]} px-3 py-1.5 rounded-full`}
            >
              <PlatformIcon platform={item.platform} className="w-3.5 h-3.5 text-white" />
              <span className="text-xs text-white">{PLATFORM_LABELS[item.platform]}</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom hero info */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                {item.bucket}
              </span>
              {item.isStarred && (
                <span className="flex items-center gap-1 text-[10px] text-yellow-400">
                  <Star className="w-3 h-3 fill-yellow-400" /> Starred
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          {/* Title + Author */}
          <div>
            <h2 className="text-white leading-snug mb-2">{item.title}</h2>
            {item.author && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-[10px] text-white">
                  {item.author[0]}
                </div>
                <span className="text-xs text-gray-400">
                  {item.author} {item.authorHandle && <span className="text-gray-600">{item.authorHandle}</span>}
                </span>
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            <div className="text-xs text-violet-400 mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              Summary
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{item.summary}</p>
          </div>

          {/* Article-specific: TL;DR */}
          {item.tldr && (
            <div className="bg-gradient-to-r from-violet-900/30 to-purple-900/20 border border-violet-500/20 rounded-2xl p-4">
              <div className="text-xs text-violet-400 mb-1.5">⚡ TL;DR</div>
              <p className="text-sm text-white">{item.tldr}</p>
            </div>
          )}

          {/* Twitter-specific: Main claim */}
          {item.mainClaim && (
            <div className="bg-white/4 border border-white/8 rounded-2xl p-4">
              <div className="text-xs text-blue-400 mb-1.5">💡 Main Claim</div>
              <p className="text-sm text-white">{item.mainClaim}</p>
            </div>
          )}

          {/* Key Takeaways */}
          <div>
            <div className="text-xs text-cyan-400 mb-3 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Key Takeaways
            </div>
            <div className="space-y-2.5">
              {item.takeaways.map((t, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-[10px] text-cyan-400 flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Supporting Points (Twitter) */}
          {item.supportingPoints && (
            <div>
              <div className="text-xs text-blue-400 mb-3">Supporting Points</div>
              <div className="space-y-2">
                {item.supportingPoints.map((p, i) => (
                  <div key={i} className="flex gap-2.5 items-start">
                    <span className="text-blue-500 mt-1">→</span>
                    <p className="text-sm text-gray-300">{p}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Counterpoint (Twitter) */}
          {item.counterpoint && (
            <div className="bg-red-900/20 border border-red-500/20 rounded-2xl p-4">
              <div className="text-xs text-red-400 mb-1.5">⚠️ Counterpoint / Risk</div>
              <p className="text-sm text-gray-300">{item.counterpoint}</p>
            </div>
          )}

          {/* Article Highlights */}
          {item.highlights && (
            <div>
              <div className="text-xs text-emerald-400 mb-3">Highlights</div>
              <div className="space-y-2">
                {item.highlights.map((h, i) => (
                  <div key={i} className="flex gap-2.5 items-start bg-emerald-900/10 border border-emerald-500/15 rounded-xl p-3">
                    <span className="text-emerald-500 text-sm flex-shrink-0">✦</span>
                    <p className="text-sm text-gray-300">{h}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What to Remember */}
          {item.whatToRemember && (
            <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/20 border border-amber-500/20 rounded-2xl p-4">
              <div className="text-xs text-amber-400 mb-1.5">🧠 What to Remember</div>
              <p className="text-sm text-white">{item.whatToRemember}</p>
            </div>
          )}

          {/* Action Steps */}
          {item.actionSteps && item.actionSteps.length > 0 && (
            <div>
              <div className="text-xs text-orange-400 mb-3 flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5" />
                Action Plan
              </div>
              <div className="space-y-2">
                {item.actionSteps.map((step, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-sm bg-orange-500/50" />
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div>
            <div className="text-xs text-gray-600 mb-2">Tags</div>
            <div className="flex flex-wrap gap-2">
              {item.tags.map(tag => (
                <span key={tag} className="text-xs bg-white/5 text-gray-400 border border-white/8 px-2.5 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-white/8 bg-[#0a0a15]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-gray-500">Make it actionable:</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleAction('Turn into Checklist')}
              className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl border transition-all ${
                activeAction === 'Turn into Checklist'
                  ? 'bg-violet-600 text-white border-violet-500'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              Checklist
            </button>
            <button
              onClick={() => handleAction('Turn into 7-Day Plan')}
              className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl border transition-all ${
                activeAction === 'Turn into 7-Day Plan'
                  ? 'bg-violet-600 text-white border-violet-500'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              7-Day Plan
            </button>
            <button
              onClick={() => handleAction('Turn into Flashcards')}
              className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl border transition-all ${
                activeAction === 'Turn into Flashcards'
                  ? 'bg-violet-600 text-white border-violet-500'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Flashcards
            </button>
            <div className="flex-1" />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl border bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 transition-all"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy
            </button>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Original
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
