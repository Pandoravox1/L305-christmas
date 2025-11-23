import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const RSVP: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<number[]>([]);
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'yes' | 'no' | ''>('');
  const [comment, setComment] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    // Generate static snowflakes array for rendering
    setSnowflakes(Array.from({ length: 30 }, (_, i) => i));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name || !attendance) {
      setErrorMsg('Nama dan konfirmasi kehadiran wajib diisi.');
      return;
    }
    if (attendance === 'no' && !comment.trim()) {
      setErrorMsg('Alasan wajib diisi jika tidak bisa hadir.');
      return;
    }

    const { error } = await supabase
      .from('rsvps')
      .insert({
        name,
        attendance,
        comment: attendance === 'no' ? comment : '',
      });

    if (error) {
      setErrorMsg(`Gagal menyimpan konfirmasi: ${error.message}`);
      return;
    }

    setSuccessMsg('Data konfirmasi berhasil dikirim. Terima kasih!');
    setTimeout(() => setSuccessMsg(''), 2500);
    setName('');
    setAttendance('');
    setComment('');
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f8f6f6] dark:bg-[#212121] overflow-hidden flex flex-col">
      {successMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-primary text-white px-6 py-4 rounded-2xl shadow-2xl pointer-events-auto transform transition-all duration-300 ease-out scale-100 opacity-100 animate-pulse">
            {successMsg}
          </div>
        </div>
      )}
      {errorMsg && (
        <div className="fixed top-4 inset-x-0 z-40 flex justify-center px-4">
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-2 shadow-sm text-sm">
            {errorMsg}
          </div>
        </div>
      )}
      {/* Snow Effect Container */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {snowflakes.map((i) => {
          const size = Math.random() * 4 + 2;
          const left = Math.random() * 100;
          const duration = Math.random() * 5 + 5;
          const delay = Math.random() * 5;
          
          return (
            <div
              key={i}
              className="snowflake"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 py-20">
        <div className="max-w-lg w-full space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-black text-primary dark:text-secondary tracking-tight">
              L305 Christmas Celebration RSVP
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Konfirmasi kehadiranmu untuk perayaan Natal terakhir kita.<br/>
              <span className="font-semibold text-primary dark:text-white">Jumat, 12 Desember 2025, pukul 12.00 WIB di Ruang F208.</span>
            </p>
          </div>

          {/* Form Card */}
            <div className="bg-white/80 dark:bg-black/40 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 dark:border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className="w-full px-4 py-3.5 rounded-lg bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Konfirmasi Kehadiran
                </label>
                <div className="grid grid-cols-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="attendance"
                      value="yes"
                      checked={attendance === 'yes'}
                      onChange={() => setAttendance('yes')}
                      className="peer sr-only"
                    />
                    <div className="text-center py-2.5 rounded-md text-sm font-medium text-gray-500 transition-all peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm dark:peer-checked:bg-gray-700 dark:peer-checked:text-secondary">
                      Hadir
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="attendance"
                      value="no"
                      checked={attendance === 'no'}
                      onChange={() => setAttendance('no')}
                      className="peer sr-only"
                    />
                    <div className="text-center py-2.5 rounded-md text-sm font-medium text-gray-500 transition-all peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm dark:peer-checked:bg-gray-700 dark:peer-checked:text-secondary">
                      Tidak Bisa Hadir
                    </div>
                  </label>
                </div>
              </div>

              {attendance === 'no' && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Alasan Tidak Hadir (wajib)
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    rows={3}
                    placeholder="Tuliskan alasanmu"
                    className="w-full px-4 py-3.5 rounded-lg bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Kirim Konfirmasi
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RSVP;
