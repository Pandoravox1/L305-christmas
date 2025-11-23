import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SecretSanta from './pages/SecretSanta';
import Potluck from './pages/Potluck';
import RSVP from './pages/RSVP';
import { AdminProvider } from './components/AdminContext';

// Scroll to top wrapper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <AdminProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/secret-santa" element={<SecretSanta />} />
              <Route path="/potluck" element={<Potluck />} />
              <Route path="/rsvp" element={<RSVP />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AdminProvider>
  );
};

export default App;
