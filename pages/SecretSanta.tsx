import React, { useEffect, useState } from 'react';
import { SANTA_FAQS, TARGET_SANTA_DEADLINE } from '../constants';
import { CountdownTime } from '../types';
import { supabase } from '../supabaseClient';

const SecretSanta: React.FC = () => {
  const calculateTimeLeft = (): CountdownTime => {
    const difference = +new Date(TARGET_SANTA_DEADLINE) - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [deadlineLeft, setDeadlineLeft] = useState<CountdownTime>(calculateTimeLeft());
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [names, setNames] = useState<string[]>([]);
  const supabaseReady = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

  useEffect(() => {
    const timer = setInterval(() => {
      setDeadlineLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchNames = async () => {
      if (!supabaseReady) return;
      const { data, error } = await supabase
        .from('secret_santa_signups')
        .select('name')
        .order('created_at', { ascending: true });
      if (!error && data) {
        setNames(data.map((d) => d.name).filter(Boolean));
      }
    };
    fetchNames();
  }, [supabaseReady]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact) return;
    const save = async () => {
      if (supabaseReady) {
        const { error } = await supabase
          .from('secret_santa_signups')
          .insert({ name, contact });
        if (!error) {
          setNames((prev) => [...prev, name]);
        }
      }
      setSuccessMsg('Terima kasih! Kamu terdaftar di Secret Santa 🎁');
      setTimeout(() => setSuccessMsg(''), 2500);
      setName('');
      setContact('');
      setShowModal(false);
    };
    save();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      {/* Hero */}
      <div className="relative bg-primary py-20 px-4">
        <div className="absolute inset-0 overflow-hidden">
           <div 
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=2938&auto=format&fit=crop')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            L305 Secret Santa:<br/><span className="text-secondary">Tukar Kado Paling Seru!</span>
          </h1>
          <p className="text-cream/80 max-w-2xl mx-auto text-lg">
            Ikuti keseruan tukar kado misteri di kelas kita. Biar momen ini jadi kenangan yang susah dilupakan!
          </p>
          <div className="pt-6">
            <button
              onClick={() => setShowModal(true)}
              className="bg-tertiary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              Daftar Secret Santa Sekarang
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-background-light dark:bg-background-dark">
        <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
          
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'menu_book', title: 'Cara Main', text: 'Daftar, undi nama secara rahasia, lalu siapkan kado terbaikmu.' },
              { icon: 'card_giftcard', title: 'Bujet Kado', text: 'Pastikan harga kado di bawah Rp100.000 supaya adil untuk semua.' },
              { icon: 'calendar_month', title: 'Tanggal Tukar Kado', text: 'Tukar kado dilakukan saat perayaan Natal kelas: Jumat, 12 Desember 2025 di Ruang F208.' },
            ].map((card, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow">
                <span className="material-symbols-outlined text-primary text-4xl">{card.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">{card.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                 <h2 className="text-2xl font-bold text-gray-900 mb-6">Pendaftaran Ditutup Dalam</h2>
                 <div className="grid grid-cols-4 gap-2 sm:gap-4">
                    {[
                      { val: deadlineLeft.days, label: 'Hari' },
                      { val: deadlineLeft.hours, label: 'Jam' },
                      { val: deadlineLeft.minutes, label: 'Menit' },
                      { val: deadlineLeft.seconds, label: 'Detik' }
                    ].map((t, idx) => (
                      <div key={idx} className="flex flex-col gap-2">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg py-4">
                          <span className="text-2xl font-bold text-gray-900 block">{String(t.val).padStart(2, '0')}</span>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{t.label}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cara Bergabung</h2>
              <div className="space-y-0">
                {[
                  { icon: 'looks_one', title: 'Daftarkan Dirimu', desc: 'Klik tombol daftar sebelum batas waktu berakhir.', last: false },
                  { icon: 'looks_two', title: 'Undi Nama Teman', desc: 'Sistem akan memilihkan penerima kado secara rahasia.', last: false },
                  { icon: 'looks_3', title: 'Siapkan & Beri', desc: 'Cari kado terbaik dan bawa saat perayaan kelas!', last: true },
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span className="material-symbols-outlined text-primary text-3xl bg-white relative z-10">{step.icon}</span>
                      {!step.last && <div className="w-0.5 bg-gray-200 flex-1 my-1 min-h-[40px]"></div>}
                    </div>
                    <div className="pb-8">
                      <h4 className="text-lg font-bold text-gray-900">{step.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Pertanyaan yang Sering Ditanyakan</h2>
            <div className="space-y-4">
              {SANTA_FAQS.map((faq, idx) => (
                <details key={idx} className="group bg-white rounded-lg border border-gray-200 p-4 cursor-pointer [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between font-medium text-gray-900">
                    {faq.question}
                    <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180 text-gray-400">expand_more</span>
                  </summary>
                  <p className="mt-3 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3 animate-fade-in">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {names.length > 0 && (
            <div className="mt-10 bg-primary/10 border border-secondary/30 rounded-2xl p-4 overflow-hidden">
              <div className="text-center text-sm text-secondary font-semibold mb-2">Yang sudah daftar:</div>
              <div className="relative overflow-hidden h-10">
                <div
                  className="absolute whitespace-nowrap flex gap-8 text-white text-lg font-bold animate-[marquee_12s_linear_infinite]"
                  style={{ width: '200%' }}
                >
                  {[...names, ...names].map((n, idx) => (
                    <span key={idx} className="drop-shadow">{n}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative overflow-hidden"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=1400&auto=format&fit=crop')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              aria-label="Tutup"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="relative z-10 flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                <span className="text-3xl">🎅</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white drop-shadow">Daftar Secret Santa</h3>
                <p className="text-sm text-white/90">Lengkapi data singkatmu di bawah ini.</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div>
                <label className="block text-sm font-semibold text-white mb-1">Namamu</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-white/40 px-3 py-2 bg-white/90 focus:border-secondary focus:ring-secondary text-gray-900"
                  placeholder="Nama lengkap"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-1">Kontak (Email/WA)</label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  className="w-full rounded-lg border border-white/40 px-3 py-2 bg-white/90 focus:border-secondary focus:ring-secondary text-gray-900"
                  placeholder="email@example.com / 08xxxx"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-md"
              >
                Kirim Pendaftaran
              </button>
            </form>
            {successMsg && (
              <div className="mt-4 text-center text-green-100 font-semibold relative z-10">
                {successMsg}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SecretSanta;
