import { } from 'react';
import { Friend, DiaryEntry, Memory } from '../types';
import { Heart, MessageCircle, Camera, Gift, Star, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

interface HomePageProps {
  friends: Friend[];
  entries: DiaryEntry[];
  memories: Memory[];
  setActiveTab: (tab: any) => void;
}

export default function HomePage({ friends, entries, memories, setActiveTab }: HomePageProps) {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  const upcomingBirthdays = friends
    .map(f => {
      const [m, d] = f.birthday.split('-').map(Number);
      let bday = new Date(today.getFullYear(), m - 1, d);
      if (bday < today) bday = new Date(today.getFullYear() + 1, m - 1, d);
      return { friend: f, date: bday, daysUntil: differenceInDays(bday, today) };
    })
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 3);

  const todayBirthday = friends.filter(f => {
    const [m, d] = f.birthday.split('-').map(Number);
    return m === currentMonth && d === currentDay;
  });

  const stats = [
    { label: 'Friends', value: friends.length, icon: <Heart size={20} />, color: 'from-pink-500 to-rose-500' },
    { label: 'Diary Entries', value: entries.length, icon: <MessageCircle size={20} />, color: 'from-violet-500 to-purple-500' },
    { label: 'Memories', value: memories.length, icon: <Camera size={20} />, color: 'from-amber-500 to-orange-500' },
    { label: 'Days Together', value: Math.max(1, differenceInDays(today, new Date('2024-01-01'))), icon: <Star size={20} />, color: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <div className="space-y-6 animate-fadeInUp">
      {/* Birthday Banner */}
      {todayBirthday.length > 0 && (
        <div className="relative overflow-hidden rounded-2xl gradient-warm p-6 text-white">
          <div className="absolute top-0 right-0 text-8xl opacity-20 animate-birthday-bounce">🎂</div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">🎉 Happy Birthday!</h2>
            {todayBirthday.map(f => (
              <p key={f.id} className="text-lg">
                {f.avatar} {f.name} is celebrating today! Send them love! 💕
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-2xl gradient-primary p-8 text-white">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-white/10 rounded-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={24} />
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">Welcome back!</span>
          </div>
          <h1 className="font-pacifico text-3xl md:text-4xl mb-3">FriendVerse</h1>
          <p className="text-white/80 text-lg max-w-lg">
            Your special place to share moments, celebrate together, and keep your friendship alive forever ✨
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-border hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-3`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-text-secondary">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setActiveTab('diary')}
          className="group bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-md hover:border-primary/30 transition-all text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <MessageCircle size={24} />
          </div>
          <h3 className="font-bold mb-1">Write in Diary</h3>
          <p className="text-sm text-text-secondary">Share your thoughts & feelings</p>
          <ArrowRight size={16} className="mt-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className="group bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-md hover:border-secondary/30 transition-all text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <TrendingUp size={24} />
          </div>
          <h3 className="font-bold mb-1">Group Chat</h3>
          <p className="text-sm text-text-secondary">Talk with your squad</p>
          <ArrowRight size={16} className="mt-3 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <button
          onClick={() => setActiveTab('memories')}
          className="group bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-md hover:border-accent-dark/30 transition-all text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Camera size={24} />
          </div>
          <h3 className="font-bold mb-1">Memories</h3>
          <p className="text-sm text-text-secondary">Relive your best moments</p>
          <ArrowRight size={16} className="mt-3 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* Upcoming Birthdays */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Gift size={20} className="text-secondary" /> Upcoming Birthdays
          </h2>
          <button onClick={() => setActiveTab('birthdays')} className="text-sm text-primary font-semibold hover:underline">
            View all →
          </button>
        </div>
        <div className="space-y-3">
          {upcomingBirthdays.map(({ friend, date, daysUntil }) => (
            <div key={friend.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary/5 transition-colors">
              <span className="text-3xl">{friend.avatar}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{friend.name}</p>
                <p className="text-sm text-text-secondary">{format(date, 'MMMM do')}</p>
              </div>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                daysUntil === 0 ? 'bg-secondary text-white animate-birthday-bounce' : 
                daysUntil <= 7 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {daysUntil === 0 ? '🎂 Today!' : `${daysUntil} days`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-primary" /> Recent Activity
        </h2>
        <div className="space-y-4">
          {entries.slice(-3).reverse().map(entry => {
            const author = friends.find(f => f.id === entry.authorId);
            return (
              <div key={entry.id} className="flex gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors cursor-pointer"
                onClick={() => setActiveTab('diary')}
              >
                <span className="text-2xl flex-shrink-0">{author?.avatar}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm">
                    <span className="font-bold">{author?.name}</span>{' '}
                    <span className="text-text-secondary">posted in diary</span>
                  </p>
                  <p className="text-sm text-text-secondary truncate mt-1">{entry.content}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Heart size={12} className="text-secondary" /> {entry.likes.length}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={12} className="text-primary" /> {entry.comments.length}
                    </span>
                  </div>
                </div>
                {entry.mood && <span className="text-xl flex-shrink-0">{entry.mood}</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Friend Circles */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
        <h2 className="text-lg font-bold mb-4">Our Squad 💜</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {friends.map((friend, i) => (
            <div key={friend.id} className="flex flex-col items-center gap-2 animate-fadeInUp" style={{ animationDelay: `${i * 100}ms` }}>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl border-3 shadow-lg animate-float"
                style={{ borderColor: friend.color, animationDelay: `${i * 0.5}s` }}
              >
                {friend.avatar}
              </div>
              <p className="text-xs font-semibold text-center">{friend.name.split(' ')[0]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
