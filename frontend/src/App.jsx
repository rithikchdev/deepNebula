import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Detector from './pages/Detector';
import Documentation from './pages/Documentation';
import AIInsights from './pages/AIInsights';

export default function App() {
  return (
    <Router>
      <Box display="flex" minH="100vh">
        <Sidebar />
        <Box ml="240px" flex="1" p={8}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detector" element={<Detector />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/ai-insights" element={<AIInsights />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}