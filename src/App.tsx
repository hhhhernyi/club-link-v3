import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SinglePlayerPage from './pages/SinglePlayerPage';
import LobbyPage from './pages/LobbyPage';
import MatchmakingPage from './pages/MatchmakingPage';
import GamePage from './pages/GamePage';
import { ThemeToggle } from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggle } = useTheme();
  return (
    <BrowserRouter>
      <ThemeToggle theme={theme} onToggle={toggle} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/single" element={<SinglePlayerPage />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="/matchmaking" element={<MatchmakingPage />} />
        <Route path="/game/:roomId" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}
