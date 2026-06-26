import { useState } from 'react';
import { Friend, BirthdayWish } from '../types';
import { Gift, Send, Cake, Heart } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

interface BirthdaysPageProps {
  friends: Friend[];
  wishes: BirthdayWish[];
  setWishes: (w: BirthdayWish[]) => void;
  currentUserId: string;
}

export default function BirthdaysPage({ friends, wishes, setWishes, currentUserId }: BirthdaysPageProps) {
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [wishMessage, setWishMessage] = useState('');

  const today = new Date();

  const birthdayList = friends.map(f => {
    const [m, d] = f.birthday.split('-').map(Number);
    let bday = new Date(today.getFullYear(), m - 1, d);
    if (bday < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
      bday = new Date(today.getFullYear() + 1, m - 1, d);
    }
    const daysUntil = differenceInDays(bday, new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    return { friend: f, date: bday, daysUntil };
  }).sort((a, b) => a.daysUntil - b.daysUntil);

  const sendWish = () => {
    if (!wishMessage.trim() || !selectedFriend) return;
    const wish: BirthdayWish = {
      id: `bw${Date.now()}`,
      fromId: currentUserId,
      toId: selectedFriend,
      message: wishMessage,
      timestamp: new Date().toISOString(),
    };
    setWishes([...wishes, wish]);
    setWishMessage('');
  };

  const quickMessages = [
    'Happy Birthday! 🎂🎉 You\'re amazing!',
    'Wishing you the best day ever! 🥳💕',
    'Another year of being awesome! 🌟🎈',
    'Happy bday legend! Love you! 💜🎊',
  ];

  return (
    <div className="space-y-6 animate-fadeInUp">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🎂 Birthdays
        </h1>
        <p className="text-text-secondary text-sm">Celebrate each other's special days!</p>
      </div>

      {/* Birthday Timeline */}
      <div className="space-y-4">
        {birthdayList.map(({ friend, date, daysUntil }, i) => {
          const isToday = daysUntil === 0;
          const isSoon = daysUntil <= 7 && daysUntil > 0;
          const friendWishes = wishes.filter(w => w.toId === friend.id);
          const isSelected = selectedFriend === friend.id;

          return (
            <div key={friend.id} className="animate-fadeInUp" style={{ animationDelay: `${i * 80}ms` }}>
              <div
                className={`bg-white rounded-2xl border overflow-hidden transition-all ${
                  isToday ? 'border-secondary shadow-lg shadow-secondary/20 animate-pulse-glow' :
                  isSoon ? 'border-amber-300 shadow-md' : 'border-border shadow-sm'
                }`}
              >
                {/* Birthday Card */}
                <div className="p-5">
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center text-3xl
                      ${isToday ? 'gradient-warm animate-birthday-bounce' : 'bg-gray-100'}
                    `}>
                      {friend.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">{friend.name}</h3>
                        {isToday && <span className="text-sm animate-birthday-bounce">🎂🎉🎊</span>}
                      </div>
                      <p className="text-sm text-text-secondary flex items-center gap-1.5">
                        <Cake size={14} />
                        {format(date, 'MMMM do')}
                      </p>
                    </div>
                    <div className="text-right">
                      {isToday ? (
                        <span className="gradient-warm text-white px-4 py-2 rounded-xl font-bold text-sm animate-birthday-bounce inline-block">
                          🎂 TODAY!
                        </span>
                      ) : isSoon ? (
                        <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl font-bold text-sm">
                          {daysUntil} day{daysUntil !== 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl font-medium text-sm">
                          {daysUntil} days
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Send Wish Button */}
                  <button
                    onClick={() => setSelectedFriend(isSelected ? null : friend.id)}
                    className={`mt-4 w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                      isSelected ? 'gradient-primary text-white' : 'bg-primary/5 text-primary hover:bg-primary/10'
                    }`}
                  >
                    <Gift size={16} />
                    {isSelected ? 'Close' : `Send Birthday Wish (${friendWishes.length} wishes)`}
                  </button>
                </div>

                {/* Wishes Section */}
                {isSelected && (
                  <div className="border-t border-border p-5 bg-gray-50/50 animate-fadeInUp">
                    {/* Quick Messages */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {quickMessages.map((msg, mi) => (
                        <button key={mi} onClick={() => setWishMessage(msg)}
                          className="text-xs bg-white border border-border px-3 py-1.5 rounded-full hover:bg-primary/5 hover:border-primary/30 transition-colors">
                          {msg.slice(0, 30)}...
                        </button>
                      ))}
                    </div>

                    {/* Write Wish */}
                    <div className="flex gap-2 mb-4">
                      <input
                        value={wishMessage}
                        onChange={e => setWishMessage(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && sendWish()}
                        placeholder={`Write a birthday wish for ${friend.name}...`}
                        className="flex-1 px-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                      <button onClick={sendWish} disabled={!wishMessage.trim()}
                        className="gradient-primary text-white px-4 py-2.5 rounded-xl disabled:opacity-50 hover:shadow-lg transition-shadow">
                        <Send size={16} />
                      </button>
                    </div>

                    {/* Existing Wishes */}
                    {friendWishes.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Birthday Wishes</p>
                        {friendWishes.map(wish => {
                          const from = friends.find(f => f.id === wish.fromId);
                          return (
                            <div key={wish.id} className="flex gap-3 bg-white rounded-xl p-3 border border-border animate-slideIn">
                              <span className="text-xl">{from?.avatar}</span>
                              <div>
                                <p className="text-xs font-bold">{from?.name}</p>
                                <p className="text-sm">{wish.message}</p>
                              </div>
                              <Heart size={14} className="text-secondary ml-auto flex-shrink-0 mt-1" />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
