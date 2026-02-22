import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard';
import AskSavr from './pages/AskSavr';
import Analytics from './pages/Analytics';
import WhatsAppSim from './pages/WhatsAppSim';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'ask', Component: AskSavr },
      { path: 'analytics', Component: Analytics },
      { path: 'simulate', Component: WhatsAppSim },
    ],
  },
]);
