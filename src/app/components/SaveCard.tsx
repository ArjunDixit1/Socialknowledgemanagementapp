import { Star, ExternalLink, Instagram, FileText } from 'lucide-react';
import { BUCKET_COLORS, PLATFORM_LABELS, type SavedItem } from '../data/mockData';

// X/Twitter icon SVG
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function PlatformIcon({ platform, className }: { platform: string; className?: string }) {
  switch (platform) {
    case 'instagram':
      return <Instagram className={className} />;
    case 'twitter':
      return <XIcon className={className} />;
    case 'youtube':
      return <YouTubeIcon className={className} />;
    default:
      return <FileText className={className} />;
  }
}

const PLATFORM_COLORS: Record<string, string> = {
  instagram: 'from-pink-600 to-purple-600',
  twitter: 'from-gray-700 to-gray-600',
  article: 'from-emerald-700 to-teal-700',
  youtube: 'from-red-700 to-rose-600',
};

function formatDate(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

function formatNumber(n?: number) {
  if (!n) return null;
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
}

interface SaveCardProps {
  item: SavedItem;
  onClick: () => void;
}

export function SaveCard({ item, onClick }: SaveCardProps) {
  const colors = BUCKET_COLORS[item.bucket];
  const gradientClass = PLATFORM_COLORS[item.platform];

  return (
    <div
      onClick={onClick}
      className="group relative bg-[#0f0f1e] border border-white/8 rounded-2xl overflow-hidden cursor-pointer hover:border-violet-500/30 hover:bg-[#111126] transition-all duration-200 hover:shadow-xl hover:shadow-violet-900/10"
    >
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1e] via-transparent to-transparent" />

        {/* Platform badge */}
        <div
          className={`absolute top-3 left-3 flex items-center gap-1.5 bg-gradient-to-r ${gradientClass} px-2.5 py-1 rounded-full`}
        >
          <PlatformIcon platform={item.platform} className="w-3 h-3 text-white" />
          <span className="text-[10px] text-white font-medium">
            {PLATFORM_LABELS[item.platform]}
          </span>
        </div>

        {/* Star */}
        {item.isStarred && (
          <div className="absolute top-3 right-3 w-7 h-7 bg-yellow-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          </div>
        )}

        {/* Stats overlay */}
        {(item.views || item.likes) && (
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            {item.views && (
              <span className="text-[10px] text-white/70 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                👁 {formatNumber(item.views)}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Bucket + date */}
        <div className="flex items-center justify-between">
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}
          >
            {item.bucket}
          </span>
          <span className="text-[10px] text-gray-600">{formatDate(item.savedAt)}</span>
        </div>

        {/* Title */}
        <h3 className="text-sm text-white leading-snug line-clamp-2 group-hover:text-violet-200 transition-colors">
          {item.title}
        </h3>

        {/* Summary */}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{item.summary}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] bg-white/5 text-gray-500 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="text-[10px] text-gray-600">+{item.tags.length - 3}</span>
          )}
        </div>

        {/* Takeaway preview */}
        <div className="bg-white/3 rounded-xl p-3 border border-white/5">
          <div className="text-[10px] text-violet-400 mb-1.5">Key Takeaway</div>
          <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">
            {item.takeaways[0]}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-[8px] text-white">
              {(item.author || 'U')[0]}
            </div>
            <span className="text-[10px] text-gray-600 truncate max-w-[100px]">
              {item.authorHandle || item.author}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {item.readTime && (
              <span className="text-[10px] text-gray-600">{item.readTime}min</span>
            )}
            <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-violet-400 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}
