import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { useAdmin } from './AdminContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdmin, login, logout } = useAdmin();
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminUserInput, setAdminUserInput] = useState('');
  const [adminPassInput, setAdminPassInput] = useState('');
  const [adminError, setAdminError] = useState('');

  const isDarkHeader = location.pathname === '/';

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(adminUserInput, adminPassInput);
    if (ok) {
      setAdminError('');
      setShowAdminModal(false);
      setAdminPassInput('');
    } else {
      setAdminError('Username atau password salah.');
    }
  };

  const closeAdminModal = () => {
    setShowAdminModal(false);
    setAdminError('');
  };

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
            <button
              onClick={() => setShowAdminModal(true)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105 active:scale-95 border ${
                isDarkHeader
                  ? 'border-cream/40 text-cream hover:bg-white/10'
                  : 'border-primary/40 text-primary hover:bg-primary/5'
              }`}
            >
              {isAdmin ? 'Admin Aktif' : 'Login Admin'}
            </button>
            {isAdmin && (
              <button
                onClick={logout}
                className="text-xs text-red-600 hover:text-red-700 font-semibold"
              >
                Keluar
              </button>
            )}
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
                <button
                  onClick={() => { setShowAdminModal(true); setIsMenuOpen(false); }}
                  className="text-base font-medium text-gray-700 hover:text-primary px-2 py-1 text-left"
                >
                  {isAdmin ? 'Admin Aktif' : 'Login Admin'}
                </button>
                {isAdmin && (
                  <button
                    onClick={() => { logout(); setIsMenuOpen(false); }}
                    className="text-sm text-red-600 hover:text-red-700 text-left px-2"
                  >
                    Keluar Admin
                  </button>
                )}
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

      {showAdminModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-6 bg-black/70 backdrop-blur-2xl min-h-screen">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-[modalPop_0.25s_ease] max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeAdminModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              aria-label="Tutup"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary animate-bounce">celebration</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Login Admin</h3>
                <p className="text-sm text-gray-600">Masuk untuk mengelola data potluck (hapus item).</p>
              </div>
            </div>
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Username</label>
                <input
                  value={adminUserInput}
                  onChange={(e) => setAdminUserInput(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-gray-50 focus:border-primary focus:ring-primary text-gray-900 placeholder:text-gray-500"
                  placeholder="Masukkan username admin"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
                <input
                  type="password"
                  value={adminPassInput}
                  onChange={(e) => setAdminPassInput(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-gray-50 focus:border-primary focus:ring-primary text-gray-900 placeholder:text-gray-500"
                  placeholder="Masukkan password admin"
                />
              </div>
              {adminError && <p className="text-xs text-red-600">{adminError}</p>}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={closeAdminModal}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
