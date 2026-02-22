import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { MOCK_ITEMS, ANALYTICS_WEEKLY_DATA, ANALYTICS_BUCKET_DATA, BUCKET_COLORS } from '../data/mockData';
import { motion } from 'motion/react';
import { TrendingUp, BookOpen, Zap, Flame } from 'lucide-react';

const PLATFORM_DATA = [
  { name: 'Instagram', count: 5, color: '#ec4899' },
  { name: 'X (Twitter)', count: 3, color: '#60a5fa' },
  { name: 'Articles', count: 4, color: '#34d399' },
];

const TOP_TAGS = [
  { tag: 'High Protein', count: 3 },
  { tag: 'Deep Learning', count: 3 },
  { tag: 'Productivity', count: 2 },
  { tag: 'Try Soon', count: 2 },
  { tag: 'Morning Routine', count: 2 },
  { tag: 'Investing', count: 2 },
];

const ACTIVITY_DAYS = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  saves: Math.random() > 0.5 ? Math.floor(Math.random() * 4) + 1 : 0,
}));

// Color by intensity
function getActivityColor(saves: number) {
  if (saves === 0) return 'bg-white/5';
  if (saves === 1) return 'bg-violet-900/50';
  if (saves === 2) return 'bg-violet-700/60';
  if (saves === 3) return 'bg-violet-600';
  return 'bg-violet-500';
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a2e] border border-white/10 rounded-xl px-3 py-2 text-xs">
        <p className="text-gray-400">{label}</p>
        <p className="text-violet-400">{payload[0].value} saves</p>
      </div>
    );
  }
  return null;
}

function PieCustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a2e] border border-white/10 rounded-xl px-3 py-2 text-xs">
        <p className="text-white">{payload[0].name}</p>
        <p style={{ color: payload[0].payload.color }}>{payload[0].value} saves</p>
      </div>
    );
  }
  return null;
}

export default function Analytics() {
  const totalSaves = MOCK_ITEMS.length;
  const starredCount = MOCK_ITEMS.filter(i => i.isStarred).length;
  const articlesRead = MOCK_ITEMS.filter(i => i.platform === 'article').length;

  return (
    <div className="min-h-screen bg-[#07070f] text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#07070f]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white">Knowledge Analytics</h1>
            <p className="text-xs text-gray-500 mt-0.5">Your learning patterns & insights</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+34% this month</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Total Saves', value: totalSaves, icon: <BookOpen className="w-4 h-4" />, color: 'text-violet-400', sub: 'All time' },
            { label: 'Starred', value: starredCount, icon: <Zap className="w-4 h-4" />, color: 'text-yellow-400', sub: 'High value' },
            { label: 'This Month', value: 16, icon: <TrendingUp className="w-4 h-4" />, color: 'text-cyan-400', sub: 'Feb 2026' },
            { label: 'Streak', value: '14d', icon: <Flame className="w-4 h-4" />, color: 'text-orange-400', sub: 'Personal best!' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/4 border border-white/8 rounded-2xl p-4"
            >
              <div className={`${stat.color} mb-3`}>{stat.icon}</div>
              <div className={`text-2xl ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-white mt-0.5">{stat.label}</div>
              <div className="text-[10px] text-gray-600 mt-0.5">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Area Chart - weekly saves */}
          <div className="lg:col-span-2 bg-white/4 border border-white/8 rounded-2xl p-5">
            <h3 className="text-white text-sm mb-1">Saves This Week</h3>
            <p className="text-xs text-gray-500 mb-4">Daily save activity</p>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={ANALYTICS_WEEKLY_DATA}>
                <defs>
                  <linearGradient id="savesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="saves"
                  stroke="#7c3aed"
                  strokeWidth={2}
                  fill="url(#savesGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - by bucket */}
          <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
            <h3 className="text-white text-sm mb-1">By Category</h3>
            <p className="text-xs text-gray-500 mb-4">Your knowledge distribution</p>
            <ResponsiveContainer width="100%" height={130}>
              <PieChart>
                <Pie
                  data={ANALYTICS_BUCKET_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={58}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {ANALYTICS_BUCKET_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieCustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1.5 mt-3">
              {ANALYTICS_BUCKET_DATA.slice(0, 6).map(d => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-[10px] text-gray-400 truncate">{d.name}</span>
                  <span className="text-[10px] text-gray-600 ml-auto">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform + Tags Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Platform breakdown bar chart */}
          <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
            <h3 className="text-white text-sm mb-1">By Platform</h3>
            <p className="text-xs text-gray-500 mb-4">Where your saves come from</p>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={PLATFORM_DATA} layout="vertical" barCategoryGap="30%">
                <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                  {PLATFORM_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Tags */}
          <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
            <h3 className="text-white text-sm mb-1">Top Tags</h3>
            <p className="text-xs text-gray-500 mb-4">Your most recurring topics</p>
            <div className="space-y-3">
              {TOP_TAGS.map(({ tag, count }) => (
                <div key={tag} className="flex items-center gap-3">
                  <span className="text-xs text-gray-300 w-32 truncate">#{tag}</span>
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full"
                      style={{ width: `${(count / 3) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 w-4 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Heatmap */}
        <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
          <h3 className="text-white text-sm mb-1">Activity — February 2026</h3>
          <p className="text-xs text-gray-500 mb-4">Daily save heatmap</p>
          <div className="flex flex-wrap gap-1.5">
            {ACTIVITY_DAYS.map(({ day, saves }) => (
              <div
                key={day}
                title={`Day ${day}: ${saves} save${saves !== 1 ? 's' : ''}`}
                className={`w-7 h-7 rounded-lg ${getActivityColor(saves)} flex items-center justify-center cursor-default transition-all hover:scale-110`}
              >
                <span className="text-[9px] text-white/30">{day}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-[10px] text-gray-600">Less</span>
            {['bg-white/5', 'bg-violet-900/50', 'bg-violet-700/60', 'bg-violet-600', 'bg-violet-500'].map((c, i) => (
              <div key={i} className={`w-4 h-4 rounded ${c}`} />
            ))}
            <span className="text-[10px] text-gray-600">More</span>
          </div>
        </div>

        {/* Category breakdown cards */}
        <div>
          <h3 className="text-white text-sm mb-3">Category Deep Dive</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ANALYTICS_BUCKET_DATA.map(bucket => {
              const colors = BUCKET_COLORS[bucket.name as keyof typeof BUCKET_COLORS];
              return (
                <div key={bucket.name} className="bg-white/4 border border-white/8 rounded-2xl p-4">
                  <div className={`text-xs mb-1 ${colors?.text || 'text-gray-400'}`}>{bucket.name}</div>
                  <div className="text-2xl text-white">{bucket.value}</div>
                  <div className="text-[10px] text-gray-600 mt-1">save{bucket.value !== 1 ? 's' : ''}</div>
                  <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(bucket.value / MOCK_ITEMS.length) * 100}%`,
                        backgroundColor: bucket.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
