import { useState, useMemo } from 'react';
import { Search, Sparkles, Plus, Star, Filter, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_ITEMS, BUCKET_COLORS, type SavedItem, type Bucket } from '../data/mockData';
import { SaveCard } from '../components/SaveCard';
import { ItemDetailModal } from '../components/ItemDetailModal';

const ALL_BUCKETS: Bucket[] = ['Fitness', 'Food', 'Coding', 'Travel', 'Productivity', 'Finance', 'Design', 'Mindset'];

export default function Dashboard() {
  const [search, setSearch] = useState('');
  const [activeBucket, setActiveBucket] = useState<Bucket | 'All' | 'Starred'>('All');
  const [selectedItem, setSelectedItem] = useState<SavedItem | null>(null);
  const [showTimeCapsule, setShowTimeCapsule] = useState(true);

  const timeCapsuleItem = MOCK_ITEMS.find(i => i.id === '9'); // Deep Work article from Jan

  const filtered = useMemo(() => {
    return MOCK_ITEMS.filter(item => {
      const matchesBucket =
        activeBucket === 'All'
          ? true
          : activeBucket === 'Starred'
          ? item.isStarred
          : item.bucket === activeBucket;
      const matchesSearch =
        search === ''
          ? true
          : item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.summary.toLowerCase().includes(search.toLowerCase()) ||
            item.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
            item.bucket.toLowerCase().includes(search.toLowerCase());
      return matchesBucket && matchesSearch;
    });
  }, [activeBucket, search]);

  const stats = [
    { label: 'Total Saves', value: MOCK_ITEMS.length, icon: '🧠', color: 'text-violet-400' },
    { label: 'This Week', value: 8, icon: '📅', color: 'text-cyan-400' },
    { label: 'Categories', value: ALL_BUCKETS.length, icon: '🗂', color: 'text-orange-400' },
    { label: 'Streak', value: '14d', icon: '🔥', color: 'text-pink-400' },
  ];

  const randomItem = () => {
    const starred = MOCK_ITEMS.filter(i => i.isStarred);
    setSelectedItem(starred[Math.floor(Math.random() * starred.length)]);
  };

  return (
    <div className="min-h-screen bg-[#07070f] text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#07070f]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search your second brain..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all"
            />
          </div>
          <button
            onClick={randomItem}
            className="flex items-center gap-2 bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 text-violet-300 px-4 py-2.5 rounded-xl text-sm transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Random Spark</span>
          </button>
          <button className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white px-4 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-violet-900/30">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Save</span>
          </button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map(s => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/4 border border-white/8 rounded-2xl px-5 py-4 flex items-center gap-3"
            >
              <span className="text-2xl">{s.icon}</span>
              <div>
                <div className={`text-xl font-semibold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Time Capsule Banner */}
        <AnimatePresence>
          {showTimeCapsule && timeCapsuleItem && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="bg-gradient-to-r from-amber-900/30 to-orange-900/20 border border-amber-500/20 rounded-2xl p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-amber-400 mb-0.5">⏳ Time Capsule — 31 days ago</div>
                <div className="text-sm text-white truncate">You saved: "{timeCapsuleItem.title}"</div>
                <div className="text-xs text-gray-400 mt-0.5 truncate">{timeCapsuleItem.tldr}</div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => setSelectedItem(timeCapsuleItem)}
                  className="text-xs text-amber-400 hover:text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 px-3 py-1.5 rounded-lg transition-all"
                >
                  Revisit
                </button>
                <button
                  onClick={() => setShowTimeCapsule(false)}
                  className="text-xs text-gray-500 hover:text-gray-400 px-2 py-1.5 rounded-lg transition-all"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {(['All', 'Starred', ...ALL_BUCKETS] as const).map(bucket => {
            const isActive = activeBucket === bucket;
            const colors = bucket !== 'All' && bucket !== 'Starred' ? BUCKET_COLORS[bucket] : null;
            return (
              <button
                key={bucket}
                onClick={() => setActiveBucket(bucket)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap transition-all border ${
                  isActive
                    ? bucket === 'All'
                      ? 'bg-white text-black border-white'
                      : bucket === 'Starred'
                      ? 'bg-yellow-400 text-black border-yellow-400'
                      : `${colors!.bg} ${colors!.text} ${colors!.border}`
                    : 'bg-white/5 text-gray-400 border-white/8 hover:bg-white/10 hover:text-white'
                }`}
              >
                {bucket === 'Starred' && <Star className="w-3 h-3" />}
                {bucket}
                {bucket !== 'All' && bucket !== 'Starred' && (
                  <span className={`text-[10px] ${isActive ? '' : 'text-gray-600'}`}>
                    {MOCK_ITEMS.filter(i => i.bucket === bucket).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {filtered.length === MOCK_ITEMS.length
              ? `${MOCK_ITEMS.length} saves in your second brain`
              : `${filtered.length} of ${MOCK_ITEMS.length} saves`}
          </p>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <Filter className="w-3 h-3" />
            <span>Newest first</span>
          </div>
        </div>

        {/* Card Grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeBucket + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <SaveCard item={item} onClick={() => setSelectedItem(item)} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-400 text-sm">No saves match your search</p>
              <p className="text-gray-600 text-xs mt-1">Try different keywords or clear the filter</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
