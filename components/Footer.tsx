import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-cream/80 py-8 border-t border-secondary/20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center gap-2">
        <p className="text-sm font-normal">(c) 2025 Perayaan Natal L305. Semua hak dilindungi.</p>
        <p className="text-xs font-light opacity-70">
          Dirancang dengan semangat kebersamaan untuk tahun terakhir kita.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
