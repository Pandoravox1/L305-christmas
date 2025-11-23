import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isDarkHeader = location.pathname === '/';

  return (
    <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-sm transition-colors duration-300 ${
      isDarkHeader 
        ? 'bg-primary/90 border-secondary/20 text-cream' 
        : 'bg-white/90 border-gray-200 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className={`material-symbols-outlined text-2xl transition-transform group-hover:rotate-12 ${isDarkHeader ? 'text-secondary' : 'text-primary'}`}>
              celebration
            </span>
            <h2 className={`text-lg font-bold font-serif tracking-tight ${isDarkHeader ? 'text-cream' : 'text-primary'}`}>
              L305 Christmas
            </h2>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-secondary ${
                    isDarkHeader ? 'text-cream/80' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link 
              to="/rsvp"
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105 active:scale-95 ${
                isDarkHeader 
                  ? 'bg-cream text-primary hover:bg-white' 
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              Konfirmasi
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md ${isDarkHeader ? 'text-cream hover:bg-white/10' : 'text-gray-900 hover:bg-gray-100'}`}
            >
              <span className="material-symbols-outlined">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-xl animate-fade-in-down">
          <div className="px-4 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium text-gray-700 hover:text-primary px-2 py-1"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/rsvp"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 w-full text-center bg-primary text-white py-3 rounded-lg font-bold"
            >
              Kirim RSVP
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
