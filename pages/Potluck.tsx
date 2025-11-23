import React, { useEffect, useState } from 'react';
import { INITIAL_POTLUCK_ITEMS } from '../constants';
import { PotluckItem, PotluckCategory } from '../types';
import { useAdmin } from '../components/AdminContext';
import { supabase } from '../supabaseClient';

const CATEGORIES: { id: PotluckCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'Semua', icon: 'restaurant' },
  { id: 'appetizer', label: 'Hidangan Pembuka', icon: 'tapas' },
  { id: 'main-course', label: 'Hidangan Utama', icon: 'dinner_dining' },
  { id: 'dessert', label: 'Pencuci Mulut', icon: 'cake' },
  { id: 'beverage', label: 'Minuman', icon: 'liquor' },
];

const Potluck: React.FC = () => {
  const [items, setItems] = useState<PotluckItem[]>(INITIAL_POTLUCK_ITEMS);
  const [activeCategory, setActiveCategory] = useState<PotluckCategory>('all');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Form State
  const [newName, setNewName] = useState('');
  const [newFood, setNewFood] = useState('');
  const [newCategory, setNewCategory] = useState<Exclude<PotluckCategory, 'all'>>('main-course');
  const { isAdmin } = useAdmin();
  const supabaseReady = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setErrorMsg('');
      if (!supabaseReady) {
        setErrorMsg('Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.');
        setItems([]);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('potluck_items')
        .select('id, bringer_name, food_name, category')
        .order('created_at', { ascending: true });

      if (error) {
        setErrorMsg(`Gagal memuat data potluck: ${error.message}`);
        setItems([]);
      } else if (data) {
        const mapped = data.map((row) => ({
          id: row.id?.toString?.() ?? `${Date.now()}`,
          bringerName: (row as any).bringer_name || 'Tanpa Nama',
          foodName: (row as any).food_name || 'Hidangan',
          category: (row.category as PotluckItem['category']) || 'main-course',
        }));
        setItems(mapped);
      }
      setLoading(false);
    };

    fetchItems();
  }, []);

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newFood) return;
    if (!supabaseReady) {
      setErrorMsg('Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.');
      return;
    }

    const addItem = async () => {
      setLoading(true);
      setErrorMsg('');
      const { data, error } = await supabase
        .from('potluck_items')
        .insert({ bringer_name: newName, food_name: newFood, category: newCategory })
        .select('id, bringer_name, food_name, category')
        .single();

      if (error) {
        setErrorMsg(`Gagal menambahkan data: ${error.message}`);
      } else if (data) {
        const newItem: PotluckItem = {
          id: data.id?.toString?.() ?? Date.now().toString(),
          bringerName: (data as any).bringer_name,
          foodName: (data as any).food_name,
          category: data.category as PotluckItem['category'],
        };
        setItems((prev) => [...prev, newItem]);
        setNewName('');
        setNewFood('');
        setSuccessMsg('Terima kasih sudah berkontribusi! Hidanganmu telah ditambahkan.');
        setTimeout(() => setSuccessMsg(''), 2500);
      }
      setLoading(false);
    };

    addItem();
  };

  const getCategoryIcon = (cat: string) => CATEGORIES.find(c => c.id === cat)?.icon || 'restaurant';
  const getCategoryLabel = (cat: string) => CATEGORIES.find(c => c.id === cat)?.label || cat;
  const handleDelete = (id: string, foodName: string, bringerName: string) => {
    if (!isAdmin) return;
    if (!supabaseReady) {
      setErrorMsg('Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.');
      return;
    }
    const confirmed = window.confirm(
      `Peringatan: Anda akan menghapus data potluck milik ${bringerName} untuk menu "${foodName}". Lanjutkan?`
    );
    if (!confirmed) return;
    const removeItem = async () => {
      setLoading(true);
      setErrorMsg('');
      const { error } = await supabase.from('potluck_items').delete().eq('id', id);
      if (error) {
        setErrorMsg('Gagal menghapus data. Coba lagi.');
      } else {
        setItems(current => current.filter(item => item.id !== id));
      }
      setLoading(false);
    };
    removeItem();
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-20">
      {successMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-primary text-white px-6 py-4 rounded-2xl shadow-2xl pointer-events-auto transform transition-all duration-300 ease-out scale-100 opacity-100 animate-pulse">
            {successMsg}
          </div>
        </div>
      )}
      <div className="bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="font-script text-secondary text-5xl md:text-6xl mb-4">Jamuan yang Berkesan</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Koordinasi Potluck</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Biar jamuan Natal kita makin seru! Lihat apa yang dibawa teman-teman dan tambahkan hidanganmu ke daftar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* List Section */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Menu Kita</h3>
              
              {/* Category Filters */}
              <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      activeCategory === cat.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Items List */}
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {loading && (
                  <div className="py-6 text-center text-gray-500">Memuat data potluck...</div>
                )}
                {!loading && filteredItems.length === 0 ? (
                  <div className="py-8 text-center text-gray-500">Belum ada menu di kategori ini. Yuk jadi yang pertama!</div>
                ) : (
                  filteredItems.map((item) => (
                    <div key={item.id} className="py-4 flex items-start gap-4 animate-fade-in">
                      <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-secondary text-2xl">
                          {getCategoryIcon(item.category)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                          {item.foodName}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Dibawa oleh {item.bringerName}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          {getCategoryLabel(item.category)}
                        </span>
                        {isAdmin && (
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id, item.foodName, item.bringerName)}
                            className="text-xs text-red-600 hover:text-red-700 font-semibold"
                          >
                            Hapus
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {isAdmin && (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 text-sm shadow-sm">
                Mode admin aktif. Tombol hapus tersedia di daftar potluck.
              </div>
            )}
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm">
                {errorMsg}
              </div>
            )}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Apa yang akan kamu bawa?</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Namamu</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="mis. Budi Santoso"
                    className="w-full rounded-lg border-gray-300 bg-gray-50 focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="food" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama makanan/minuman</label>
                  <input
                    type="text"
                    id="food"
                    required
                    value={newFood}
                    onChange={(e) => setNewFood(e.target.value)}
                    placeholder="mis. Lasagna"
                    className="w-full rounded-lg border-gray-300 bg-gray-50 focus:border-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kategori</label>
                  <div className="grid grid-cols-2 gap-3">
                    {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                      <label key={cat.id} className="cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={cat.id}
                          checked={newCategory === cat.id}
                          onChange={(e) => setNewCategory(e.target.value as any)}
                          className="peer sr-only"
                        />
                        <div className="text-center py-2 px-3 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all peer-checked:border-primary peer-checked:text-primary peer-checked:bg-primary/5 peer-checked:font-bold">
                          {cat.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95"
                >
                  Tambahkan ke Daftar
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Potluck;
