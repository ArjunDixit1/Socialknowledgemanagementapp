import { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import {
  LayoutDashboard,
  Sparkles,
  BarChart3,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Brain,
  Bell,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_ITEMS } from '../data/mockData';
import { Toaster } from 'sonner';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/ask', label: 'Ask SAVR', icon: Sparkles },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/simulate', label: 'WhatsApp Sim', icon: MessageSquare },
];

export function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#07070f] overflow-hidden" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 220 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="flex-shrink-0 bg-[#0a0a16] border-r border-white/5 flex flex-col overflow-hidden relative z-20"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-900/40">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden"
              >
                <div className="text-white font-semibold tracking-wide">SAVR</div>
                <div className="text-[10px] text-gray-600 -mt-0.5">Second Brain</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-2 space-y-0.5">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative ${
                  isActive
                    ? 'bg-violet-600/20 text-violet-300 border border-violet-500/20'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`w-4 h-4 flex-shrink-0 transition-colors ${
                      isActive ? 'text-violet-400' : 'text-gray-600 group-hover:text-gray-400'
                    }`}
                  />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {/* Collapsed tooltip */}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-[#1a1a2e] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap border border-white/10 transition-opacity z-50">
                      {item.label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Stats badge (not collapsed) */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-3 mb-3 bg-gradient-to-br from-violet-900/40 to-cyan-900/20 border border-violet-500/15 rounded-xl p-3"
            >
              <div className="text-[10px] text-gray-500 mb-1">Second Brain</div>
              <div className="text-lg text-violet-300 font-semibold">{MOCK_ITEMS.length}</div>
              <div className="text-[10px] text-gray-600">knowledge saves</div>
              <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full" />
              </div>
              <div className="text-[10px] text-gray-600 mt-1">75% of monthly goal</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom: Settings + User */}
        <div className="flex-shrink-0 px-2 py-3 border-t border-white/5 space-y-0.5">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:text-gray-400 hover:bg-white/5 transition-all group">
            <Bell className="w-4 h-4 flex-shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm whitespace-nowrap overflow-hidden"
                >
                  Notifications
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:text-gray-400 hover:bg-white/5 transition-all group">
            <Settings className="w-4 h-4 flex-shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm whitespace-nowrap overflow-hidden"
                >
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* User */}
          <div className="flex items-center gap-2.5 px-3 py-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center text-xs text-white flex-shrink-0">
              A
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="text-xs text-gray-300 whitespace-nowrap">Alex Chen</div>
                  <div className="text-[10px] text-gray-600 whitespace-nowrap">Free Plan</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-16 w-6 h-6 bg-[#1a1a2e] border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-violet-500/40 transition-all z-30"
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </button>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <Outlet />
      </main>

      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: '#1a1a2e',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'white',
          },
        }}
      />
    </div>
  );
}
