export type Platform = 'instagram' | 'twitter' | 'article' | 'youtube';
export type Bucket =
  | 'Fitness'
  | 'Food'
  | 'Coding'
  | 'Travel'
  | 'Productivity'
  | 'Finance'
  | 'Design'
  | 'Mindset';

export interface SavedItem {
  id: string;
  platform: Platform;
  url: string;
  title: string;
  summary: string;
  bucket: Bucket;
  tags: string[];
  takeaways: string[];
  actionSteps?: string[];
  // Twitter specific
  mainClaim?: string;
  supportingPoints?: string[];
  counterpoint?: string;
  // Article specific
  tldr?: string;
  highlights?: string[];
  whatToRemember?: string;
  thumbnail: string;
  savedAt: string;
  author?: string;
  authorHandle?: string;
  likes?: number;
  views?: number;
  isStarred?: boolean;
  readTime?: number;
}

export const MOCK_ITEMS: SavedItem[] = [
  {
    id: '1',
    platform: 'instagram',
    url: 'https://instagram.com/reel/abc123',
    title: '30-Min Full Body HIIT Workout — No Equipment',
    summary:
      'A complete full-body HIIT session targeting all major muscle groups with zero equipment. Designed for fat loss and muscle endurance in under 30 minutes.',
    bucket: 'Fitness',
    tags: ['HIIT', 'No Equipment', 'Fat Loss', 'Home Workout'],
    takeaways: [
      'Work-to-rest ratio: 40 seconds on, 20 seconds off for maximum burn',
      'Focus on compound movements: burpees, jump squats, and mountain climbers',
      'Warm-up for 3 minutes before starting to prevent injury',
    ],
    actionSteps: [
      'Day 1: Complete workout A (upper body focus) — 6 rounds',
      'Day 2: Rest or light walk (10,000 steps)',
      'Day 3: Complete workout B (lower body focus) — 6 rounds',
      'Track heart rate during sets, aim for 75–85% max HR',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1766287453739-c3ffc3f37d05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    savedAt: '2026-02-20T08:30:00Z',
    author: 'FitWithAlex',
    authorHandle: '@fitwithalex',
    likes: 284000,
    views: 1200000,
    isStarred: true,
    readTime: 30,
  },
  {
    id: '2',
    platform: 'instagram',
    url: 'https://instagram.com/reel/def456',
    title: 'Creamy Tuscan Pasta in 20 Minutes — Under 600 Cals',
    summary:
      'A high-protein, creamy Tuscan pasta with sun-dried tomatoes, spinach, and garlic. Under 600 calories and ready in 20 minutes. Perfect for weekly meal prep.',
    bucket: 'Food',
    tags: ['Pasta', 'High Protein', 'Meal Prep', 'Italian', 'Quick Cook'],
    takeaways: [
      'Use Greek yogurt instead of heavy cream to cut calories by 40%',
      'Sun-dried tomatoes add umami depth without extra cooking time',
      'Cook pasta al dente — it continues cooking in the sauce',
    ],
    actionSteps: [
      'Ingredients: 200g pasta, 1 cup Greek yogurt, sun-dried tomatoes, spinach, garlic, chicken breast',
      'Brown chicken first (7 min), add garlic + tomatoes, deglaze with pasta water',
      'Fold in yogurt OFF heat to prevent curdling',
      'Can be prepped for 4 days in the fridge',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1708514193930-2977def8669a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    savedAt: '2026-02-18T12:00:00Z',
    author: 'Chef Marco',
    authorHandle: '@chefmarco',
    likes: 156000,
    views: 890000,
    isStarred: false,
    readTime: 20,
  },
  {
    id: '3',
    platform: 'twitter',
    url: 'https://twitter.com/levelsio/status/thread123',
    title: '10 VSCode Tricks That 10x Your Coding Speed',
    summary:
      'A viral thread by @levelsio covering underrated VSCode shortcuts and extensions that dramatically reduce time spent on repetitive coding tasks.',
    bucket: 'Coding',
    tags: ['VSCode', 'Productivity', 'Developer Tools', 'Shortcuts'],
    mainClaim:
      'Most developers use less than 20% of VSCode features, leaving massive efficiency gains on the table.',
    supportingPoints: [
      'Multi-cursor editing (Alt+Click) eliminates 80% of repetitive edits',
      'Live Share lets you pair program without screen sharing overhead',
      'The Command Palette (Cmd+Shift+P) replaces all menu navigation',
    ],
    counterpoint:
      'Over-reliance on shortcuts can make you helpless in other editors. Learn fundamentals too.',
    takeaways: [
      'Use Cmd+D to select next identical word — fastest way to batch-rename variables',
      'GitLens extension shows "who broke this" inline — saves hours of git blame',
      'Fold all code (Cmd+K, Cmd+0) to get bird-eye view of file structure',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1763568258143-904ea924ac53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    savedAt: '2026-02-17T10:15:00Z',
    author: 'Pieter Levels',
    authorHandle: '@levelsio',
    likes: 42300,
    isStarred: true,
  },
  {
    id: '4',
    platform: 'article',
    url: 'https://hubermanlab.com/morning-routine',
    title: 'The Science-Backed Morning Routine That Changed My Life',
    summary:
      'Andrew Huberman\'s detailed breakdown of his morning protocol — grounded in neuroscience — that optimizes alertness, focus, and mood for the entire day.',
    bucket: 'Productivity',
    tags: ['Morning Routine', 'Neuroscience', 'Focus', 'Sleep', 'Habits'],
    tldr: 'Get sunlight in eyes within 30 min of waking, delay caffeine 90 min, and do exercise before 10am to set your circadian rhythm for peak productivity.',
    highlights: [
      'Sunlight exposure in the morning sets the cortisol pulse correctly, giving energy peak 1–3 hours later',
      'Delaying caffeine 90 minutes prevents afternoon crashes by not blocking adenosine too early',
      'Cold exposure (2–3 min cold shower) releases adrenaline equivalent to moderate exercise',
    ],
    whatToRemember:
      'The order matters: light → movement → caffeine. Not caffeine first!',
    takeaways: [
      'Morning sunlight is 50,000x more effective at setting circadian rhythm than indoor light',
      'NSDR (non-sleep deep rest) for 10 min mid-day can restore focus levels by 40%',
      'The first 90 minutes of wakefulness determine the neurological tone for the whole day',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1537444399873-da0fea0cf4b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    savedAt: '2026-02-15T07:00:00Z',
    author: 'Andrew Huberman',
    isStarred: true,
    readTime: 14,
  },
  {
    id: '5',
    platform: 'instagram',
    url: 'https://instagram.com/reel/ghi789',
    title: 'Designing Apps Like a Senior Designer in 2026',
    summary:
      'Key UI/UX principles that separate mediocre apps from ones that feel effortless. Covers visual hierarchy, micro-interactions, and the "0.1s rule" for perceived performance.',
    bucket: 'Design',
    tags: ['UI/UX', 'Design Systems', 'Micro-interactions', 'Visual Hierarchy'],
    takeaways: [
      'Start with 8px grid — everything aligns and the design feels inherently "clean"',
      'Micro-interactions under 200ms feel instant; over 500ms feel broken',
      'Use max 2 typefaces and 5 colors — constraints breed creativity',
    ],
    actionSteps: [
      'Audit your last 3 designs: does each screen have a single primary action?',
      'Add hover states and transition to all interactive elements (0.15s ease)',
      'Test your designs on a real device — never trust simulator only',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1752524722694-e0976575a993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    savedAt: '2026-02-19T14:00:00Z',
    author: 'DesignWithTimmy',
    authorHandle: '@designwithtimmy',
    likes: 98200,
    views: 620000,
    isStarred: false,
    readTime: 8,
  },
  {
    id: '6',
    platform: 'article',
    url: 'https://investopedia.com/index-funds-guide',
    title: 'Index Funds: Why Buffett Thinks You\'re Overthinking This',
    summary:
      'A deep-dive into why Warren Buffett has repeatedly recommended index funds for most investors, backed by 20-year performance data vs actively managed funds.',
    bucket: 'Finance',
    tags: ['Investing', 'Index Funds', 'Passive Income', 'Warren Buffett', 'Wealth'],
    tldr: '96% of active fund managers underperform the S&P 500 index over 20 years. Just buy the index and don\'t touch it.',
    highlights: [
      'A $10K investment in S&P 500 in 2000 would be $65K today with zero effort',
      'Average expense ratio of 0.03% vs 1.2% for active funds — that gap compounds dramatically',
      'Time in the market beats timing the market — missing the 10 best days reduces returns by 50%',
    ],
    whatToRemember: 'Set up auto-invest on payday. Never check the portfolio more than quarterly.',
    takeaways: [
      'Dollar-cost averaging removes the emotional burden of "timing" the market',
      'Tax-advantaged accounts (Roth IRA, 401k) should be maxed BEFORE taxable investing',
      'Rebalance once a year — not more',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1716279083223-006db39251e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    savedAt: '2026-01-28T09:00:00Z',
    author: 'Morgan Housel',
    isStarred: false,
    readTime: 18,
  },
  {
    id: '7',
    platform: 'twitter',
    url: 'https://twitter.com/nomadlist/status/thread789',
    title: '2 Weeks in Thailand for $800 — Full Breakdown',
    summary:
      'A detailed cost breakdown for a 2-week Thailand trip including flights, accommodation, food, and activities — with pro tips for visa and SIM card setup.',
    bucket: 'Travel',
    tags: ['Thailand', 'Budget Travel', 'Digital Nomad', 'Southeast Asia', 'Try Soon'],
    mainClaim: 'Thailand is still the best value destination in the world for long-term travelers in 2026.',
    supportingPoints: [
      'Accommodation in Chiang Mai: $15/night for a private room with pool access',
      'Street food meals average $1.50 — quality rivals $25 restaurants back home',
      'Thailand Elite Visa now gives 5 years of access for ~$15K (worth it for full-timers)',
    ],
    counterpoint:
      'Tourist areas are increasingly crowded and prices in Bangkok have risen 30% since 2023.',
    takeaways: [
      'Fly into Bangkok, take overnight train to Chiang Mai — saves $80 on accommodation night',
      'Get a DTAC or AIS SIM at the airport: 30 days unlimited data for $12',
      'Avoid peak season (Dec–Jan) — same destinations, 40% cheaper',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    savedAt: '2026-02-10T11:30:00Z',
    author: 'Pieter Levels',
    authorHandle: '@levelsio',
    likes: 18900,
    isStarred: false,
  },
  {
    id: '8',
    platform: 'instagram',
    url: 'https://instagram.com/reel/jkl012',
    title: 'Build a Full-Stack App in a Weekend — React + Supabase',
    summary:
      'A walkthrough of building a production-ready full-stack app in 48 hours using React, Supabase for backend, and Vercel for deployment. Zero backend code required.',
    bucket: 'Coding',
    tags: ['React', 'Supabase', 'Full Stack', 'Weekend Project', 'Vercel'],
    takeaways: [
      'Supabase replaces an entire backend: auth, database, storage, and realtime in one SDK',
      'Row-level security in Supabase means you can expose your API key in frontend code safely',
      'Deploy to Vercel in under 2 minutes — push to GitHub, auto-deploys on every commit',
    ],
    actionSteps: [
      'Saturday AM: Set up Supabase project, design schema, configure auth',
      'Saturday PM: Build core CRUD features with React Query for data fetching',
      'Sunday AM: Add styling with Tailwind + shadcn/ui component library',
      'Sunday PM: Deploy, add custom domain, set up error monitoring with Sentry',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1763568258143-904ea924ac53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    savedAt: '2026-02-21T16:45:00Z',
    author: 'TechWithTim',
    authorHandle: '@techwithTim',
    likes: 67400,
    views: 430000,
    isStarred: true,
    readTime: 45,
  },
  {
    id: '9',
    platform: 'article',
    url: 'https://calnewport.com/deep-work',
    title: 'Deep Work Is Becoming a Superpower — Here\'s How to Build It',
    summary:
      'Cal Newport\'s framework for developing the rare ability to focus without distraction, and why it\'s the most valuable skill in the distracted economy.',
    bucket: 'Productivity',
    tags: ['Deep Work', 'Focus', 'Cal Newport', 'Career', 'Cognitive Performance'],
    tldr: 'Schedule 2–4 hour distraction-free blocks daily. Your ability to do deep work is your biggest career differentiator in the AI age.',
    highlights: [
      'Knowledge workers check email/Slack every 6 minutes on average — destroying flow state',
      'It takes 23 minutes to fully return to a task after any interruption',
      'Deep work sessions compound: 1 hour of deep work = 3 hours of shallow work output',
    ],
    whatToRemember:
      'Treat deep work blocks like surgery hours — non-negotiable, no interruptions allowed.',
    takeaways: [
      'Shut down ritual: write tomorrow\'s top 3 tasks, close all apps, say "shutdown complete"',
      'Use time-blocking: assign specific tasks to specific time slots the night before',
      'The 4-hour rule: you can only do ~4 hours of truly deep work per day — use them wisely',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1537444399873-da0fea0cf4b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    savedAt: '2026-01-22T08:00:00Z',
    author: 'Cal Newport',
    isStarred: false,
    readTime: 12,
  },
  {
    id: '10',
    platform: 'twitter',
    url: 'https://twitter.com/paulg/status/threadXYZ',
    title: '12 Counterintuitive Lessons From Scaling a Startup to $10M ARR',
    summary:
      'Paul Graham-style breakdown of lessons learned scaling from 0 to $10M ARR — focused on avoiding common founder mistakes around hiring, pricing, and growth.',
    bucket: 'Finance',
    tags: ['Startup', 'Growth', 'SaaS', 'Fundraising', 'Deep Learning'],
    mainClaim:
      'Most startups fail not from building the wrong product, but from poor founder psychology around money, hiring, and momentum.',
    supportingPoints: [
      'Raise prices earlier — you\'re 80% likely charging too little right now',
      'Hire for learning speed, not skill level — skills age fast, curiosity doesn\'t',
      'Your first 100 customers should come from founder-led sales, zero delegation',
    ],
    counterpoint:
      'Scaling advice is highly context-dependent. B2C growth playbooks fail spectacularly in B2B enterprise.',
    takeaways: [
      'Talk to 5 churned customers every month — they tell you truth your active users won\'t',
      'Default Alive vs Default Dead: calculate your runway with current burn right now',
      'The best time to raise funding is when you don\'t need it',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1758873268131-a2636b120d81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    savedAt: '2026-02-05T13:00:00Z',
    author: 'Paul Graham',
    authorHandle: '@paulg',
    likes: 92000,
    isStarred: true,
  },
  {
    id: '11',
    platform: 'instagram',
    url: 'https://instagram.com/reel/mno345',
    title: 'Meal Prep Sunday: 5 Meals in 90 Minutes',
    summary:
      'A complete weekly meal prep routine that covers breakfast, lunch, and dinner for 5 days in under 2 hours. High protein, macro-balanced, and actually delicious.',
    bucket: 'Food',
    tags: ['Meal Prep', 'Batch Cooking', 'High Protein', 'Recipes I\'ll Actually Cook'],
    takeaways: [
      'Cook grains and proteins in parallel — rice cooker running while you grill chicken',
      'Portion into containers immediately after cooking to lock in macros',
      'Roasted veggies as a universal side — works with any protein, meal preps for 5 days',
    ],
    actionSteps: [
      'Week 1 plan: Chicken + rice bowl (Mon/Tue), Salmon + quinoa (Wed/Thu), Flex day (Fri)',
      'Buy in bulk: 2kg chicken breast, 1kg salmon, 500g mixed grains',
      'Prep sauces separately to keep meals from getting soggy',
      'Label containers with day + macros (use masking tape hack)',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1708514193930-2977def8669a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    savedAt: '2026-02-09T10:00:00Z',
    author: 'MealPrepKing',
    authorHandle: '@mealprepking',
    likes: 203000,
    views: 1050000,
    isStarred: false,
    readTime: 90,
  },
  {
    id: '12',
    platform: 'article',
    url: 'https://sleepfoundation.org/optimize-sleep',
    title: 'Optimize Your Sleep in 7 Days — The Evidence-Based Protocol',
    summary:
      'A week-long protocol backed by sleep science to completely reset your sleep quality. Covers sleep debt, temperature, blue light, and the often-ignored role of eating timing.',
    bucket: 'Mindset',
    tags: ['Sleep', 'Recovery', 'Biohacking', 'Health Optimization', 'Deep Learning'],
    tldr: 'Lower your room to 65–67°F, cut screens 2 hours before bed, and eat dinner 3 hours before sleep. These 3 changes add 45 minutes of deep sleep per night.',
    highlights: [
      'Core body temperature must drop 2–3°F to initiate sleep — room temperature is your biggest lever',
      'Blue light from screens delays melatonin production by 3 hours on average',
      'Eating within 3 hours of bed redirects blood flow from brain to gut, reducing sleep quality',
    ],
    whatToRemember:
      'Sleep is the single highest ROI health intervention — it affects everything else.',
    takeaways: [
      'Consistent wake time (even weekends) is more important than consistent bed time',
      'Magnesium glycinate 30 min before bed improves deep sleep by 17% in studies',
      'A 10–20 min nap before 3pm can restore afternoon performance without disrupting night sleep',
    ],
    thumbnail:
      'https://images.unsplash.com/photo-1758273239813-cecda76c6c19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    savedAt: '2026-01-15T22:00:00Z',
    author: 'Matthew Walker',
    isStarred: false,
    readTime: 16,
  },
];

export const BUCKET_COLORS: Record<Bucket, { bg: string; text: string; border: string }> = {
  Fitness: { bg: 'bg-orange-500/15', text: 'text-orange-400', border: 'border-orange-500/30' },
  Food: { bg: 'bg-green-500/15', text: 'text-green-400', border: 'border-green-500/30' },
  Coding: { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30' },
  Travel: { bg: 'bg-cyan-500/15', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  Productivity: { bg: 'bg-violet-500/15', text: 'text-violet-400', border: 'border-violet-500/30' },
  Finance: { bg: 'bg-yellow-500/15', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  Design: { bg: 'bg-pink-500/15', text: 'text-pink-400', border: 'border-pink-500/30' },
  Mindset: { bg: 'bg-teal-500/15', text: 'text-teal-400', border: 'border-teal-500/30' },
};

export const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: 'Instagram',
  twitter: 'X (Twitter)',
  article: 'Article',
  youtube: 'YouTube',
};

export const ANALYTICS_WEEKLY_DATA = [
  { day: 'Mon', saves: 2 },
  { day: 'Tue', saves: 5 },
  { day: 'Wed', saves: 1 },
  { day: 'Thu', saves: 4 },
  { day: 'Fri', saves: 7 },
  { day: 'Sat', saves: 3 },
  { day: 'Sun', saves: 6 },
];

export const ANALYTICS_MONTHLY_DATA = [
  { week: 'Week 1', saves: 12 },
  { week: 'Week 2', saves: 19 },
  { week: 'Week 3', saves: 8 },
  { week: 'Week 4', saves: 15 },
];

export const ANALYTICS_BUCKET_DATA = [
  { name: 'Coding', value: 4, color: '#3b82f6' },
  { name: 'Fitness', value: 3, color: '#f97316' },
  { name: 'Food', value: 2, color: '#22c55e' },
  { name: 'Productivity', value: 2, color: '#8b5cf6' },
  { name: 'Finance', value: 2, color: '#eab308' },
  { name: 'Travel', value: 1, color: '#06b6d4' },
  { name: 'Design', value: 1, color: '#ec4899' },
  { name: 'Mindset', value: 1, color: '#14b8a6' },
];
