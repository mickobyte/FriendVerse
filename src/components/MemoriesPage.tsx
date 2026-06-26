import { useState, type Dispatch, type SetStateAction } from 'react';
import { Friend, Memory } from '../types';
import { Plus, X, Calendar, Users } from 'lucide-react';
import { format } from 'date-fns';

interface MemoriesPageProps {
  friends: Friend[];
  memories: Memory[];
  setMemories: Dispatch<SetStateAction<Memory[]>>;
}

const memoryTypes: { value: Memory['type']; label: string; emoji: string }[] = [
  { value: 'hangout', label: 'Hangout', emoji: '🎯' },
  { value: 'birthday', label: 'Birthday', emoji: '🎂' },
  { value: 'milestone', label: 'Milestone', emoji: '🌟' },
  { value: 'celebration', label: 'Celebration', emoji: '🎉' },
  { value: 'random', label: 'Random', emoji: '✨' },
];

const typeColors: Record<string, string> = {
  birthday: 'bg-pink-100 text-pink-700',
  hangout: 'bg-blue-100 text-blue-700',
  milestone: 'bg-amber-100 text-amber-700',
  celebration: 'bg-green-100 text-green-700',
  random: 'bg-purple-100 text-purple-700',
};

export default function MemoriesPage({ friends, memories, setMemories }: MemoriesPageProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [form, setForm] = useState({ title: '', description: '', date: '', type: 'hangout' as Memory['type'], photoUrl: '' });
  const [filter, setFilter] = useState<string>('all');

  const addMemory = () => {
    if (!form.title.trim()) return;
    const mem: Memory = {
      id: `mem${Date.now()}`,
      title: form.title,
      description: form.description,
      date: form.date || new Date().toISOString().split('T')[0],
      photos: form.photoUrl ? [form.photoUrl] : [],
      taggedFriends: friends.map(f => f.id),
      type: form.type,
    };
    setMemories(prev => [...prev, mem]);
    setForm({ title: '', description: '', date: '', type: 'hangout', photoUrl: '' });
    setShowAdd(false);
  };

  const filtered = filter === 'all' ? memories : memories.filter(m => m.type === filter);
  const sorted = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6 animate-fadeInUp">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">📸 Memories</h1>
          <p className="text-text-secondary text-sm">Our favorite moments together</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="gradient-primary text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-primary/30"
        >
          {showAdd ? <X size={18} /> : <Plus size={18} />}
          {showAdd ? 'Cancel' : 'Add Memory'}
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === 'all' ? 'gradient-primary text-white' : 'bg-white border border-border hover:bg-primary/5'}`}>
          All
        </button>
        {memoryTypes.map(t => (
          <button key={t.value} onClick={() => setFilter(t.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === t.value ? 'gradient-primary text-white' : 'bg-white border border-border hover:bg-primary/5'}`}>
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* Add Memory Form */}
      {showAdd && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-border animate-fadeInUp">
          <h3 className="font-bold mb-4">Create New Memory ✨</h3>
          <div className="space-y-3">
            <input
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="Memory title..."
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="What happened? Tell the story..."
              className="w-full h-24 px-4 py-3 border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              />
              <select
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value as Memory['type'] })}
                className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              >
                {memoryTypes.map(t => (
                  <option key={t.value} value={t.value}>{t.emoji} {t.label}</option>
                ))}
              </select>
              <input
                value={form.photoUrl}
                onChange={e => setForm({ ...form, photoUrl: e.target.value })}
                placeholder="📷 Photo URL (optional)"
                className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              />
            </div>
            <button onClick={addMemory} disabled={!form.title.trim()}
              className="gradient-primary text-white px-6 py-2.5 rounded-xl font-semibold disabled:opacity-50 hover:shadow-lg transition-shadow">
              Save Memory 💾
            </button>
          </div>
        </div>
      )}

      {/* Memory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sorted.map((mem, i) => (
          <div
            key={mem.id}
            className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-all cursor-pointer group animate-fadeInUp"
            style={{ animationDelay: `${i * 80}ms` }}
            onClick={() => setSelectedMemory(mem)}
          >
            {mem.photos.length > 0 && (
              <div className="relative h-48 overflow-hidden">
                <img src={mem.photos[0]} alt={mem.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${typeColors[mem.type]}`}>
                  {memoryTypes.find(t => t.value === mem.type)?.emoji} {memoryTypes.find(t => t.value === mem.type)?.label}
                </span>
              </div>
            )}
            <div className="p-5">
              <h3 className="font-bold text-lg mb-1">{mem.title}</h3>
              <p className="text-sm text-text-secondary line-clamp-2 mb-3">{mem.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                  <Calendar size={14} />
                  {format(new Date(mem.date), 'MMM d, yyyy')}
                </div>
                <div className="flex -space-x-2">
                  {mem.taggedFriends.slice(0, 4).map(fid => {
                    const f = friends.find(fr => fr.id === fid);
                    return (
                      <div key={fid} className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs border-2 border-white">
                        {f?.avatar}
                      </div>
                    );
                  })}
                  {mem.taggedFriends.length > 4 && (
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold border-2 border-white">
                      +{mem.taggedFriends.length - 4}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="text-center py-16">
          <span className="text-6xl block mb-4">📷</span>
          <p className="text-text-secondary text-lg">No memories yet. Create one!</p>
        </div>
      )}

      {/* Memory Detail Modal */}
      {selectedMemory && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedMemory(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {selectedMemory.photos.length > 0 && (
              <img src={selectedMemory.photos[0]} alt="" className="w-full h-64 object-cover rounded-t-2xl" />
            )}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-bold">{selectedMemory.title}</h2>
                <button onClick={() => setSelectedMemory(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${typeColors[selectedMemory.type]}`}>
                {memoryTypes.find(t => t.value === selectedMemory.type)?.emoji} {memoryTypes.find(t => t.value === selectedMemory.type)?.label}
              </span>
              <p className="text-sm text-text-secondary mb-4">{selectedMemory.description}</p>
              <div className="flex items-center gap-2 text-sm text-text-secondary mb-3">
                <Calendar size={16} />
                {format(new Date(selectedMemory.date), 'MMMM d, yyyy')}
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Users size={16} />
                <span>With: </span>
                {selectedMemory.taggedFriends.map(fid => {
                  const f = friends.find(fr => fr.id === fid);
                  return <span key={fid} className="inline-flex items-center gap-1">{f?.avatar} {f?.name?.split(' ')[0]}</span>;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
