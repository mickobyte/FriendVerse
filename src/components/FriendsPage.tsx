import { useState } from 'react';
import { Friend } from '../types';
import { Plus, X, Calendar, Heart, Star, Edit2, Save } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

interface FriendsPageProps {
  friends: Friend[];
  setFriends: (f: Friend[]) => void;
}

export default function FriendsPage({ friends, setFriends }: FriendsPageProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', avatar: '😀', birthday: '', bio: '', color: '#6C63FF' });

  const avatars = ['😀','😎','🤓','🧑‍🎤','🧑‍🍳','🧑‍💻','🧑‍🎨','🧑‍🚀','🧑‍🔬','🧑‍🏫','🥷','🧙','🧚','🦸','🤖','👽','🐱','🐶','🦊','🐼','🐨','🦁','🐸','🐧'];
  const colors = ['#6C63FF','#FF6B9D','#FFD93D','#4CAF50','#2196F3','#FF8A65','#9C27B0','#00BCD4','#795548','#E91E63'];

  const addFriend = () => {
    if (!form.name.trim()) return;
    const friend: Friend = {
      id: `f${Date.now()}`,
      name: form.name,
      avatar: form.avatar,
      birthday: form.birthday || '01-01',
      bio: form.bio || 'New friend! 🎉',
      color: form.color,
      joinedDate: new Date().toISOString().split('T')[0],
    };
    setFriends([...friends, friend]);
    setForm({ name: '', avatar: '😀', birthday: '', bio: '', color: '#6C63FF' });
    setShowAdd(false);
  };

  const updateFriend = (id: string) => {
    setFriends(friends.map(f => f.id === id ? { ...f, name: form.name || f.name, bio: form.bio || f.bio, avatar: form.avatar || f.avatar, color: form.color || f.color } : f));
    setEditingId(null);
  };

  const startEdit = (f: Friend) => {
    setForm({ name: f.name, avatar: f.avatar, birthday: f.birthday, bio: f.bio, color: f.color });
    setEditingId(f.id);
  };

  const today = new Date();

  return (
    <div className="space-y-6 animate-fadeInUp">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">👥 Our Squad</h1>
          <p className="text-text-secondary text-sm">{friends.length} friends in our circle</p>
        </div>
        <button
          onClick={() => { setShowAdd(!showAdd); setEditingId(null); }}
          className="gradient-primary text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-primary/30"
        >
          {showAdd ? <X size={18} /> : <Plus size={18} />}
          {showAdd ? 'Cancel' : 'Add Friend'}
        </button>
      </div>

      {/* Add Friend Form */}
      {showAdd && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-border animate-fadeInUp">
          <h3 className="font-bold mb-4">Add a Friend ✨</h3>
          <div className="space-y-4">
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Friend's name..."
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />

            {/* Avatar Picker */}
            <div>
              <p className="text-sm font-medium mb-2">Pick an avatar</p>
              <div className="flex flex-wrap gap-2">
                {avatars.map(a => (
                  <button key={a} onClick={() => setForm({ ...form, avatar: a })}
                    className={`text-2xl p-2 rounded-xl transition-all ${form.avatar === a ? 'bg-primary/10 ring-2 ring-primary scale-110' : 'hover:bg-gray-100'}`}>
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Picker */}
            <div>
              <p className="text-sm font-medium mb-2">Pick a color</p>
              <div className="flex gap-2">
                {colors.map(c => (
                  <button key={c} onClick={() => setForm({ ...form, color: c })}
                    className={`w-8 h-8 rounded-full transition-transform ${form.color === c ? 'scale-125 ring-2 ring-offset-2 ring-gray-300' : 'hover:scale-110'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <input
              value={form.birthday}
              onChange={e => setForm({ ...form, birthday: e.target.value })}
              placeholder="Birthday (MM-DD, e.g., 06-15)"
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
            <input
              value={form.bio}
              onChange={e => setForm({ ...form, bio: e.target.value })}
              placeholder="Short bio..."
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
            <button onClick={addFriend} disabled={!form.name.trim()}
              className="gradient-primary text-white px-6 py-2.5 rounded-xl font-semibold disabled:opacity-50 hover:shadow-lg transition-shadow">
              Add Friend 🎉
            </button>
          </div>
        </div>
      )}

      {/* Friends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {friends.map((friend, i) => {
          const [m, d] = friend.birthday.split('-').map(Number);
          let bday = new Date(today.getFullYear(), m - 1, d);
          if (bday < today) bday = new Date(today.getFullYear() + 1, m - 1, d);
          const daysUntilBday = differenceInDays(bday, today);
          const isEditing = editingId === friend.id;

          return (
            <div key={friend.id}
              className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all animate-fadeInUp"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Color Banner */}
              <div className="h-20 relative" style={{ background: `linear-gradient(135deg, ${friend.color}, ${friend.color}80)` }}>
                <div className="absolute -bottom-8 left-5 w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-lg border-4 border-white">
                  {friend.avatar}
                </div>
              </div>

              <div className="pt-12 px-5 pb-5">
                {isEditing ? (
                  <div className="space-y-2">
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-sm font-bold" />
                    <input value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-sm" />
                    <div className="flex gap-2 flex-wrap">
                      {avatars.slice(0, 12).map(a => (
                        <button key={a} onClick={() => setForm({ ...form, avatar: a })}
                          className={`text-lg p-1 rounded ${form.avatar === a ? 'bg-primary/10 ring-1 ring-primary' : ''}`}>
                          {a}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => updateFriend(friend.id)}
                      className="gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1">
                      <Save size={14} /> Save
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg">{friend.name}</h3>
                        <p className="text-sm text-text-secondary">{friend.bio}</p>
                      </div>
                      <button onClick={() => startEdit(friend)} className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                        <Edit2 size={14} />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 mt-4 text-xs text-text-secondary">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {format(bday, 'MMM d')} ({daysUntilBday === 0 ? '🎂 Today!' : `${daysUntilBday}d`})
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={12} />
                        Since {format(new Date(friend.joinedDate), 'MMM yyyy')}
                      </span>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full flex items-center gap-1">
                        <Heart size={10} /> Friend
                      </span>
                      {daysUntilBday <= 7 && (
                        <span className="bg-secondary/10 text-secondary text-xs px-3 py-1 rounded-full">
                          🎂 Birthday soon!
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
