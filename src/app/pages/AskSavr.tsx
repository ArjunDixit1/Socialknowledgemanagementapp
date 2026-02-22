import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_ITEMS } from '../data/mockData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  cards?: string[];
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  'Show my saved fitness reels',
  'What coding tips did I save?',
  'Make a 3-day workout from my fitness saves',
  'Summarize my productivity saves',
  'What were the best finance tips I saved?',
  'Create a weekly meal plan from my food saves',
];

function generateResponse(query: string): { content: string; cards?: string[] } {
  const q = query.toLowerCase();

  if (q.includes('fitness') || q.includes('workout') || q.includes('exercise') || q.includes('hiit')) {
    const items = MOCK_ITEMS.filter(i => i.bucket === 'Fitness');
    if (q.includes('plan') || q.includes('3 day') || q.includes('week')) {
      return {
        content: `Based on your **${items.length} fitness saves**, here's a 3-day workout plan I've generated:\n\n**Day 1 — Full Body HIIT**\n→ 30-min no-equipment HIIT session (from @FitWithAlex)\n→ 40s on / 20s off: burpees, mountain climbers, jump squats\n→ 6 rounds, track HR at 75–85% max\n\n**Day 2 — Active Recovery**\n→ 10,000 steps light walk\n→ 10 min NSDR (from your Huberman save)\n→ Focus on sleep: 65–67°F room, no screens before bed\n\n**Day 3 — Repeat + Track**\n→ Same HIIT routine, aim to improve 1 rep per movement\n→ Fuel: high-protein prep from your @MealPrepKing save\n\n💡 Pro tip from your saves: Combine the HIIT workout with the meal prep Sunday routine for maximum efficiency!`,
        cards: ['1', '11'],
      };
    }
    return {
      content: `You have **${items.length} fitness save${items.length !== 1 ? 's' : ''}** in your second brain:\n\n${items.map(i => `**${i.title}**\n→ ${i.takeaways[0]}`).join('\n\n')}\n\n💪 Want me to turn these into a weekly workout plan?`,
      cards: items.map(i => i.id),
    };
  }

  if (q.includes('food') || q.includes('recipe') || q.includes('cook') || q.includes('pasta') || q.includes('meal')) {
    const items = MOCK_ITEMS.filter(i => i.bucket === 'Food');
    if (q.includes('meal plan') || q.includes('week') || q.includes('prep')) {
      return {
        content: `Here's a **weekly meal plan** built from your ${items.length} food saves:\n\n**Mon / Tue** — Creamy Tuscan Pasta\n→ 200g pasta, Greek yogurt, sun-dried tomatoes, chicken\n→ ~580 cals, prep takes 20 min\n\n**Wed / Thu** — Meal Prep Sunday carry-over\n→ Chicken + rice bowl (from @MealPrepKing)\n→ Roasted veggies as universal side\n\n**Fri** — Flex day / leftover remix\n\n**Prep Sunday 90-min ritual:**\n1. Cook grains + proteins in parallel\n2. Portion immediately after cooking\n3. Label with day + macros\n\n🥗 Your saves suggest prioritizing high-protein, macro-balanced meals. Keep it up!`,
        cards: items.map(i => i.id),
      };
    }
    return {
      content: `You've saved **${items.length} food/recipe saves**:\n\n${items.map(i => `**${i.title}**\n→ ${i.takeaways[0]}`).join('\n\n')}\n\n🍴 Want a full weekly meal plan from these?`,
      cards: items.map(i => i.id),
    };
  }

  if (q.includes('cod') || q.includes('dev') || q.includes('vscode') || q.includes('react') || q.includes('programming')) {
    const items = MOCK_ITEMS.filter(i => i.bucket === 'Coding');
    return {
      content: `Your **${items.length} coding saves** — here's what you should apply this week:\n\n${items.map((i, idx) => `**${idx + 1}. ${i.title}**\n${i.takeaways.map(t => `  → ${t}`).join('\n')}`).join('\n\n')}\n\n🚀 Quick win: Start with the VSCode shortcuts from @levelsio — Cmd+D alone will save you 30 min/day.`,
      cards: items.map(i => i.id),
    };
  }

  if (q.includes('productiv') || q.includes('focus') || q.includes('morning') || q.includes('deep work') || q.includes('habit')) {
    const items = MOCK_ITEMS.filter(i => i.bucket === 'Productivity');
    return {
      content: `You have **${items.length} productivity saves** — let me summarize the core themes:\n\n**🌅 Morning Protocol (Huberman)**\nOrder matters: light → movement → caffeine. Delay coffee 90 min after waking.\n\n**🧠 Deep Work (Cal Newport)**\n4 hours max deep work/day. Use time-blocking. Shutdown ritual every evening.\n\n**The synergy between your saves:**\nHuberman's morning routine ENABLES Newport's deep work blocks. Do Huberman first, then schedule your 2 deep work blocks between 9–1pm.\n\n🎯 Your single biggest leverage point: implement the 90-min caffeine delay starting tomorrow.`,
      cards: items.map(i => i.id),
    };
  }

  if (q.includes('financ') || q.includes('invest') || q.includes('money') || q.includes('startup') || q.includes('fund')) {
    const items = MOCK_ITEMS.filter(i => i.bucket === 'Finance');
    return {
      content: `Your **${items.length} finance saves** — actionable summary:\n\n**💰 Investing (Morgan Housel)**\nJust buy index funds. 96% of active managers underperform S&P 500 over 20 years.\nSet up auto-invest on payday, don't check more than quarterly.\n\n**🚀 Startup (Paul Graham)**\nRaise prices earlier. Talk to 5 churned customers monthly. Calculate Default Alive/Dead NOW.\n\n**Your to-do list from these saves:**\n1. Max tax-advantaged accounts first (Roth IRA, 401k)\n2. Set up $X/month auto-invest to index fund\n3. If you have a startup: run Default Alive calculation today\n\n📈 Combined wisdom: boring investing + relentless execution on your startup.`,
      cards: items.map(i => i.id),
    };
  }

  if (q.includes('travel') || q.includes('thailand') || q.includes('trip') || q.includes('nomad')) {
    const items = MOCK_ITEMS.filter(i => i.bucket === 'Travel');
    return {
      content: `Your **${items.length} travel save${items.length !== 1 ? 's' : ''}**:\n\n**🌏 Thailand Trip (from @levelsio)**\n→ 2 weeks for $800 total (inc. flights)\n→ Best value: Chiang Mai — $15/night private room + pool\n→ Street food: $1.50/meal, rivaling $25 restaurants\n\n**Your "Try Soon" tag reminder:**\nYou marked Thailand as "Try Soon" — have you booked it yet? Flight prices from US to Bangkok are currently around $650 return.\n\n✈️ Action: Check Google Flights for March–April dates (shoulder season, 40% cheaper than Dec–Jan).`,
      cards: items.map(i => i.id),
    };
  }

  if (q.includes('summar') || q.includes('all') || q.includes('overview') || q.includes('brain')) {
    return {
      content: `Here's a **full overview of your Second Brain** — ${MOCK_ITEMS.length} saves across ${8} categories:\n\n${[
        ['🏋️ Fitness', 'Fitness'],
        ['🍴 Food', 'Food'],
        ['💻 Coding', 'Coding'],
        ['✈️ Travel', 'Travel'],
        ['⚡ Productivity', 'Productivity'],
        ['💰 Finance', 'Finance'],
        ['🎨 Design', 'Design'],
        ['🧘 Mindset', 'Mindset'],
      ]
        .map(([emoji, bucket]) => {
          const count = MOCK_ITEMS.filter(i => i.bucket === bucket).length;
          return `${emoji} **${bucket}** — ${count} save${count !== 1 ? 's' : ''}`;
        })
        .join('\n')}\n\n🔥 **Your streak:** 14 days\n⭐ **Starred saves:** ${MOCK_ITEMS.filter(i => i.isStarred).length}\n\n💡 Top insight this week: Your Productivity saves (Huberman + Newport) are begging to be combined into one morning system.`,
      cards: MOCK_ITEMS.filter(i => i.isStarred).map(i => i.id),
    };
  }

  if (q.includes('sleep') || q.includes('design') || q.includes('mindset')) {
    const bucket = q.includes('sleep') || q.includes('mindset') ? 'Mindset' : 'Design';
    const items = MOCK_ITEMS.filter(i => i.bucket === bucket);
    return {
      content: `Your **${bucket}** saves:\n\n${items.map(i => `**${i.title}**\n${i.takeaways.map(t => `→ ${t}`).join('\n')}`).join('\n\n')}`,
      cards: items.map(i => i.id),
    };
  }

  // Default
  return {
    content: `I searched your second brain for **"${query}"** but couldn't find an exact match.\n\nHere's what I can help you with:\n\n→ Ask about a specific **bucket**: "show my fitness saves"\n→ Ask for a **plan**: "make a 3-day workout from my saves"\n→ Ask for a **summary**: "summarize my productivity saves"\n→ Ask across categories: "what's the most actionable thing from all my saves?"\n\n🧠 Your brain has ${MOCK_ITEMS.length} saves ready to explore!`,
  };
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'init',
    role: 'assistant',
    content: `Hey! 👋 I'm **SAVR**, your personal second brain assistant.\n\nYou have **${MOCK_ITEMS.length} saves** across 8 categories. Ask me anything — I can:\n\n→ Find and summarize your saves\n→ Build actionable plans from your content\n→ Connect insights across different saves\n→ Turn a reel into a checklist or 7-day plan\n\nWhat would you like to explore?`,
    timestamp: new Date(),
  },
];

function renderMarkdown(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    // Bold
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Arrow bullets
    if (line.startsWith('→ ')) {
      return (
        <div key={i} className="flex gap-2 items-start">
          <span className="text-violet-400 flex-shrink-0 mt-0.5">→</span>
          <span dangerouslySetInnerHTML={{ __html: line.slice(2) }} />
        </div>
      );
    }
    if (line === '') return <div key={i} className="h-1.5" />;
    return <div key={i} dangerouslySetInnerHTML={{ __html: line }} />;
  });
}

export default function AskSavr() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const send = (query?: string) => {
    const text = query || input.trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const { content, cards } = generateResponse(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content,
        cards,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 900 + Math.random() * 600);
  };

  const getItemsForCards = (cardIds: string[]) =>
    cardIds.map(id => MOCK_ITEMS.find(i => i.id === id)).filter(Boolean) as typeof MOCK_ITEMS;

  return (
    <div className="flex flex-col h-screen bg-[#07070f] text-white">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-white/5 px-6 py-4 bg-[#07070f]/90 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-white text-sm">Ask SAVR</h1>
            <p className="text-[11px] text-gray-500">Chat with your {MOCK_ITEMS.length} saved items</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-gray-500">AI Ready</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map(msg => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${
                msg.role === 'assistant'
                  ? 'bg-gradient-to-br from-violet-600 to-cyan-600'
                  : 'bg-gradient-to-br from-gray-700 to-gray-600'
              }`}
            >
              {msg.role === 'assistant' ? (
                <Bot className="w-4 h-4 text-white" />
              ) : (
                <User className="w-4 h-4 text-white" />
              )}
            </div>

            <div className={`flex-1 max-w-lg ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
              {/* Bubble */}
              <div
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed space-y-0.5 ${
                  msg.role === 'user'
                    ? 'bg-violet-600 text-white rounded-tr-sm'
                    : 'bg-white/5 border border-white/8 text-gray-200 rounded-tl-sm'
                }`}
              >
                {renderMarkdown(msg.content)}
              </div>

              {/* Linked Cards */}
              {msg.cards && msg.cards.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {getItemsForCards(msg.cards).map(item => (
                    <div
                      key={item.id}
                      className="flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-3 py-2 max-w-[200px]"
                    >
                      <img
                        src={item.thumbnail}
                        alt=""
                        className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-[10px] text-white truncate">{item.title}</p>
                        <p className="text-[9px] text-gray-500">{item.bucket}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <span className="text-[10px] text-gray-700">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </motion.div>
        ))}

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full flex-shrink-0 bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/5 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-violet-400"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length <= 1 && (
        <div className="px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {SUGGESTED_PROMPTS.map(p => (
              <button
                key={p}
                onClick={() => send(p)}
                className="flex-shrink-0 text-xs bg-white/5 hover:bg-violet-500/20 border border-white/8 hover:border-violet-500/30 text-gray-400 hover:text-violet-300 px-3 py-2 rounded-xl transition-all"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex-shrink-0 px-4 pb-6 pt-2 border-t border-white/5">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder="Ask anything about your saves..."
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 transition-all"
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-violet-900/30"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
