import React from 'react';
import { Link } from 'react-router-dom';
import Countdown from '../components/Countdown';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center px-4 pt-20 pb-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1576612628666-4e588b503023?q=80&w=2835&auto=format&fit=crop')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary z-0" />

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6 animate-fade-in-up">
          <h1 className="text-5xl sm:text-7xl font-serif font-black text-cream tracking-tight drop-shadow-lg">
            Desember yang Tak Terlupakan
          </h1>
          <h2 className="text-xl sm:text-3xl font-serif text-secondary italic">
            Perayaan Natal Terakhir L305
          </h2>
          <p className="text-cream/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Mari rayakan tahun terakhir kita bersama dengan malam penuh tawa, makanan enak, dan persahabatan. 
            Kita jadikan Natal ini kenangan terbaik!
          </p>
        </div>
      </section>

      {/* Countdown - Negative Margin to overlap Hero */}
      <section className="px-4 mb-16">
        <Countdown />
      </section>

      {/* Details Grid */}
      <section id="details" className="max-w-6xl mx-auto px-4 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: 'calendar_month', title: 'Tanggal', text: 'Jumat, 12 Desember 2025' },
            { icon: 'schedule', title: 'Waktu', text: '12.00 WIB - selesai' },
            { icon: 'location_on', title: 'Lokasi', text: 'Ruang F208' },
          ].map((item, idx) => (
            <div key={idx} className="bg-cream/5 border border-secondary/20 rounded-xl p-8 flex flex-col items-center text-center gap-4 hover:bg-cream/10 transition-colors cursor-default group">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </div>
              <h3 className="text-secondary font-bold text-xl">{item.title}</h3>
              <p className="text-cream/90 text-lg">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-secondary/20 max-w-6xl mx-auto my-8" />

      {/* Potluck Teaser */}
      <section className="max-w-6xl mx-auto px-4 py-16 w-full">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-secondary">
              Bagikan Kebahagiaan: Makan Malam Potluck
            </h2>
            <p className="text-cream/80 text-lg leading-relaxed">
              Perayaan tanpa makanan enak rasanya kurang lengkap. Kita adakan potluck supaya semua bisa berbagi hidangan favorit. 
              Bawa satu menu andalan dan mari kita santap bersama!
            </p>
            <Link 
              to="/potluck" 
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-tertiary hover:bg-tertiary/90 text-cream font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Lihat Daftar Potluck
            </Link>
          </div>
          <div className="flex-1 w-full">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-secondary/10 group">
              <img 
                src="https://images.unsplash.com/photo-1576867757603-05b134ebc379?q=80&w=2940&auto=format&fit=crop" 
                alt="Festive Dinner" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-secondary/20 max-w-6xl mx-auto my-8" />

      {/* Secret Santa Teaser */}
      <section className="max-w-6xl mx-auto px-4 py-16 w-full mb-12">
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-secondary">
              Rahasia di Balik Hadiah: Secret Santa
            </h2>
            <p className="text-cream/80 text-lg leading-relaxed">
              Bersiap untuk tukar kado Secret Santa tahunan kita! Serunya menebak, bahagianya memberi.
            </p>
            <ul className="space-y-3 text-cream/70 ml-2">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Daftar sebelum 10 Desember
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Bujet kado: Rp100.000
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Jaga identitasmu tetap rahasia!
              </li>
            </ul>
            <div className="pt-4">
              <Link 
                to="/secret-santa" 
                className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-tertiary hover:bg-tertiary/90 text-cream font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Gabung Secret Santa
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-secondary/10 group">
              <img 
                src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=2897&auto=format&fit=crop" 
                alt="Secret Santa Gifts" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
