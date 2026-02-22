import { useState, useRef, useEffect } from 'react';
import { Send, CheckCheck, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WaMessage {
  id: string;
  from: 'user' | 'bot';
  text: string;
  time: string;
  isLink?: boolean;
  extracted?: {
    title: string;
    bucket: string;
    summary: string;
    takeaways: string[];
    action?: string;
  };
  delivered?: boolean;
}

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const DEMO_FLOW: Array<{
  trigger: string;
  response: WaMessage['extracted'] & { text: string; followUp?: string };
}> = [
  {
    trigger: 'instagram.com/reel',
    response: {
      text: '✅ Saved to *Fitness*!',
      title: '30-Min Full Body HIIT Workout',
      bucket: 'Fitness',
      summary: 'Complete HIIT session, zero equipment, 40s on / 20s off format.',
      takeaways: [
        '🏋️ Focus on: burpees, jump squats, mountain climbers',
        '❤️ Target: 75–85% max heart rate',
        '⏱️ Complete: 6 rounds total',
      ],
      action: 'Want me to turn this into a 3-day workout plan?',
      followUp: 'yes',
    },
  },
  {
    trigger: 'twitter.com',
    response: {
      text: '✅ Saved to *Coding*!',
      title: '10 VSCode Tricks That 10x Your Coding Speed',
      bucket: 'Coding',
      summary: '@levelsio\'s viral thread on underrated VSCode shortcuts.',
      takeaways: [
        '💡 Main claim: Most devs use < 20% of VSCode features',
        '⌨️ Cmd+D: select next identical word for batch edits',
        '🔍 GitLens: see who broke what, inline',
      ],
      action: 'Reply *shortcuts* to see the full list on your dashboard.',
    },
  },
  {
    trigger: 'hubermanlab',
    response: {
      text: '✅ Saved to *Productivity*!',
      title: 'The Science-Backed Morning Routine',
      bucket: 'Productivity',
      summary: 'Andrew Huberman\'s morning protocol backed by neuroscience.',
      takeaways: [
        '🌅 Sunlight within 30min of waking — sets cortisol correctly',
        '☕ Delay caffeine 90 min — prevents afternoon crashes',
        '🥶 2-min cold shower = adrenaline equivalent to exercise',
      ],
      action: 'Tag me: *try this week* to add it to your action list!',
    },
  },
];

const PREDEFINED_MESSAGES: WaMessage[] = [
  {
    id: 'intro-1',
    from: 'bot',
    text: '👋 Hey! I\'m *SAVR Bot*. Send me any Instagram reel, tweet, or article URL — I\'ll extract the key insights and add it to your second brain.\n\nTry sending a link below! 👇',
    time: '09:00',
  },
];

const SAMPLE_LINKS = [
  { label: '🏋️ Fitness Reel', url: 'https://instagram.com/reel/workout123' },
  { label: '💻 Tweet Thread', url: 'https://twitter.com/levelsio/coding-tips' },
  { label: '🧠 Article', url: 'https://hubermanlab.com/morning-routine' },
];

const QUICK_REPLIES = [
  'show my fitness saves',
  'make a workout plan',
  'what did I save this week?',
];

function formatBotMessage(msg: WaMessage) {
  const lines = msg.text.split('\n').map((line, i) => {
    // Bold (*text*)
    const formatted = line.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
    return <span key={i} dangerouslySetInnerHTML={{ __html: formatted }} />;
  });
  return lines.reduce((acc: React.ReactNode[], el, i) => {
    if (i > 0) acc.push(<br key={`br-${i}`} />);
    acc.push(el);
    return acc;
  }, []);
}

export default function WhatsAppSim() {
  const [messages, setMessages] = useState<WaMessage[]>(PREDEFINED_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: WaMessage = {
      id: Date.now().toString(),
      from: 'user',
      text: messageText,
      time: now(),
      delivered: true,
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Find matching demo flow
    const match = DEMO_FLOW.find(flow =>
      messageText.toLowerCase().includes(flow.trigger.toLowerCase())
    );

    setTimeout(() => {
      setIsTyping(false);

      if (match) {
        const botMsg: WaMessage = {
          id: (Date.now() + 1).toString(),
          from: 'bot',
          text: match.response.text,
          time: now(),
          extracted: {
            title: match.response.title,
            bucket: match.response.bucket,
            summary: match.response.summary,
            takeaways: match.response.takeaways,
            action: match.response.action,
          },
        };
        setMessages(prev => [...prev, botMsg]);
      } else if (messageText.toLowerCase().includes('yes') || messageText.toLowerCase().includes('plan') || messageText.toLowerCase().includes('workout')) {
        const botMsg: WaMessage = {
          id: (Date.now() + 1).toString(),
          from: 'bot',
          text: '💪 *3-Day Workout Plan* (from your fitness saves):\n\n*Day 1 — Full Body HIIT*\n→ 6 rounds: 40s on, 20s off\n→ Burpees • Jump squats • Mountain climbers\n\n*Day 2 — Active Recovery*\n→ 10,000 steps + 10min NSDR\n\n*Day 3 — Repeat + Progress*\n→ Track: add 1 rep per movement vs Day 1\n\nAdded to your dashboard! Open SAVR to see it 🚀',
          time: now(),
        };
        setMessages(prev => [...prev, botMsg]);
      } else if (messageText.toLowerCase().includes('show') || messageText.toLowerCase().includes('saves') || messageText.toLowerCase().includes('saved')) {
        const botMsg: WaMessage = {
          id: (Date.now() + 1).toString(),
          from: 'bot',
          text: '🧠 *Your Recent Saves:*\n\n1. 30-Min HIIT Workout — _Fitness_\n2. VSCode Tricks Thread — _Coding_\n3. Huberman Morning Routine — _Productivity_\n4. Tuscan Pasta Recipe — _Food_\n5. Thailand $800 Trip — _Travel_\n\n12 total saves. Open dashboard: savr.app/dashboard 🔗',
          time: now(),
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        const botMsg: WaMessage = {
          id: (Date.now() + 1).toString(),
          from: 'bot',
          text: '🤔 I didn\'t quite catch that.\n\nTry sending:\n→ An Instagram/Twitter/article link\n→ *show saves* — see recent saves\n→ *make a plan* — generate an action plan\n\nOr open your dashboard to explore everything: savr.app 🚀',
          time: now(),
        };
        setMessages(prev => [...prev, botMsg]);
      }
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="min-h-screen bg-[#07070f] text-white">
      {/* Page Header */}
      <div className="sticky top-0 z-20 bg-[#07070f]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white">WhatsApp Simulator</h1>
            <p className="text-xs text-gray-500 mt-0.5">See how SAVR works on WhatsApp</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span>Bot Active</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* How it works banner */}
        <div className="mb-6 bg-gradient-to-r from-violet-900/30 to-purple-900/20 border border-violet-500/20 rounded-2xl p-4">
          <h3 className="text-sm text-violet-300 mb-2">🚀 How SAVR Works on WhatsApp</h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { step: '1', label: 'Send any link', icon: '🔗' },
              { step: '2', label: 'AI extracts insights', icon: '🤖' },
              { step: '3', label: 'Appears in dashboard', icon: '🧠' },
            ].map(s => (
              <div key={s.step} className="flex flex-col items-center gap-1.5">
                <div className="text-2xl">{s.icon}</div>
                <div className="text-[10px] text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Phone Mockup */}
          <div className="flex-shrink-0 flex justify-center lg:justify-start">
            <div className="w-[320px] bg-[#111b21] rounded-[40px] border-4 border-[#1a2a33] shadow-2xl shadow-black/60 overflow-hidden">
              {/* Phone Top Bar */}
              <div className="bg-[#202c33] px-4 pt-10 pb-3 flex items-center gap-3">
                <button className="text-[#aebac1] hover:text-white">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-xs text-white">
                  S
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[#e9edef]">SAVR Bot</div>
                  <div className="text-[10px] text-[#8696a0]">
                    {isTyping ? 'typing...' : 'online'}
                  </div>
                </div>
              </div>

              {/* Chat Area */}
              <div
                className="h-[480px] overflow-y-auto px-3 py-4 space-y-2"
                style={{ backgroundColor: '#0b141a' }}
              >
                {/* Wallpaper overlay */}
                <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiLz48L2c+PC9zdmc+')]" />

                <AnimatePresence initial={false}>
                  {messages.map(msg => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl px-3 py-2 text-[12px] leading-relaxed ${
                          msg.from === 'user'
                            ? 'bg-[#005c4b] text-[#e9edef] rounded-tr-sm'
                            : 'bg-[#202c33] text-[#e9edef] rounded-tl-sm'
                        }`}
                      >
                        <div>{formatBotMessage(msg)}</div>

                        {/* Extracted Card */}
                        {msg.extracted && (
                          <div className="mt-2.5 bg-[#111b21] rounded-lg overflow-hidden border border-white/10">
                            <div className="h-1.5 bg-gradient-to-r from-violet-600 to-cyan-500" />
                            <div className="p-2.5">
                              <div className="text-[9px] text-violet-400 mb-1">{msg.extracted.bucket}</div>
                              <div className="text-[11px] text-white mb-1.5">{msg.extracted.title}</div>
                              <div className="text-[10px] text-[#8696a0] mb-2">{msg.extracted.summary}</div>
                              <div className="space-y-1">
                                {msg.extracted.takeaways.map((t, i) => (
                                  <div key={i} className="text-[10px] text-[#e9edef]">{t}</div>
                                ))}
                              </div>
                              {msg.extracted.action && (
                                <div className="mt-2 pt-2 border-t border-white/10 text-[10px] text-violet-300">
                                  {msg.extracted.action}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Timestamp */}
                        <div className={`flex items-center gap-1 mt-1 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <span className="text-[9px] text-[#8696a0]">{msg.time}</span>
                          {msg.from === 'user' && msg.delivered && (
                            <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-[#202c33] rounded-xl rounded-tl-sm px-3 py-2.5 flex items-center gap-1">
                        {[0, 1, 2].map(i => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-[#8696a0]"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="bg-[#202c33] px-3 py-3 flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Message"
                  className="flex-1 bg-[#2a3942] text-[#e9edef] placeholder-[#8696a0] rounded-full px-4 py-2 text-[12px] focus:outline-none"
                />
                <button
                  onClick={() => sendMessage()}
                  className="w-9 h-9 bg-[#00a884] rounded-full flex items-center justify-center"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel — Quick Try */}
          <div className="flex-1 space-y-5">
            {/* Sample Links */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
              <h3 className="text-white text-sm mb-1">Try Sample Links</h3>
              <p className="text-xs text-gray-500 mb-4">Click to send a sample link to the bot</p>
              <div className="space-y-2.5">
                {SAMPLE_LINKS.map(link => (
                  <button
                    key={link.label}
                    onClick={() => sendMessage(link.url)}
                    className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/8 hover:border-violet-500/30 rounded-xl px-4 py-3 transition-all text-left"
                  >
                    <span className="text-lg">{link.label.split(' ')[0]}</span>
                    <div>
                      <div className="text-sm text-white">{link.label.slice(2)}</div>
                      <div className="text-[10px] text-gray-500 truncate">{link.url}</div>
                    </div>
                    <div className="ml-auto text-xs text-violet-400">Send →</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Replies */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-5">
              <h3 className="text-white text-sm mb-1">Ask the Bot</h3>
              <p className="text-xs text-gray-500 mb-4">Try natural language queries</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_REPLIES.map(reply => (
                  <button
                    key={reply}
                    onClick={() => sendMessage(reply)}
                    className="text-xs bg-white/5 hover:bg-violet-500/20 border border-white/8 hover:border-violet-500/30 text-gray-300 hover:text-violet-300 px-3 py-2 rounded-xl transition-all"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Tech Stack Note */}
            <div className="bg-gradient-to-br from-violet-900/20 to-cyan-900/10 border border-violet-500/15 rounded-2xl p-5">
              <h3 className="text-sm text-violet-300 mb-3">⚙️ How This Works in Production</h3>
              <div className="space-y-2.5">
                {[
                  { icon: '📱', label: 'WhatsApp', desc: 'Twilio Sandbox / Meta Cloud API' },
                  { icon: '🔌', label: 'Webhook', desc: 'FastAPI → POST /webhook/whatsapp' },
                  { icon: '🔍', label: 'Extraction', desc: 'yt-dlp → OpenGraph → User fallback' },
                  { icon: '🤖', label: 'AI Layer', desc: 'OpenAI / Gemini → summary + tags + plan' },
                  { icon: '🗄️', label: 'Database', desc: 'Supabase → with vector embeddings' },
                  { icon: '🔎', label: 'Search', desc: 'Semantic search via cosine similarity' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="text-base">{item.icon}</span>
                    <div>
                      <span className="text-xs text-white">{item.label}</span>
                      <span className="text-xs text-gray-500"> — {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
