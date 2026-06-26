import { useState } from 'react';
import { TabType } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import {
  friends as defaultFriends,
  sampleDiaryEntries,
  sampleChatMessages,
  sampleMemories,
  sampleBirthdayWishes,
  galleryImages as defaultGallery,
} from './store';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import DiaryPage from './components/DiaryPage';
import ChatPage from './components/ChatPage';
import MemoriesPage from './components/MemoriesPage';
import BirthdaysPage from './components/BirthdaysPage';
import GalleryPage from './components/GalleryPage';
import FriendsPage from './components/FriendsPage';
import { Menu, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUserId] = useState('1');

  // Persisted state
  const [friends, setFriends] = useLocalStorage('fv-friends', defaultFriends);
  const [entries, setEntries] = useLocalStorage('fv-entries', sampleDiaryEntries);
  const [chatMessages, setChatMessages] = useLocalStorage('fv-chat', sampleChatMessages);
  const [memories, setMemories] = useLocalStorage('fv-memories', sampleMemories);
  const [wishes, setWishes] = useLocalStorage('fv-wishes', sampleBirthdayWishes);
  const [gallery, setGallery] = useLocalStorage('fv-gallery', defaultGallery);

  const currentUser = friends.find(f => f.id === currentUserId) || friends[0];

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage friends={friends} entries={entries} memories={memories} setActiveTab={setActiveTab} />;
      case 'diary':
        return <DiaryPage friends={friends} entries={entries} setEntries={setEntries} currentUserId={currentUserId} />;
      case 'chat':
        return <ChatPage friends={friends} messages={chatMessages} setMessages={setChatMessages} currentUserId={currentUserId} />;
      case 'memories':
        return <MemoriesPage friends={friends} memories={memories} setMemories={setMemories} />;
      case 'birthdays':
        return <BirthdaysPage friends={friends} wishes={wishes} setWishes={setWishes} currentUserId={currentUserId} />;
      case 'gallery':
        return <GalleryPage friends={friends} images={gallery} setImages={setGallery} currentUserId={currentUserId} />;
      case 'profile':
        return <FriendsPage friends={friends} setFriends={setFriends} />;
      default:
        return <HomePage friends={friends} entries={entries} memories={memories} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        isMobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 glass px-4 py-3 flex items-center gap-3 border-b border-border">
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 hover:bg-primary/10 rounded-xl transition-colors">
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={16} />
            </div>
            <span className="font-pacifico text-lg text-gradient">FriendVerse</span>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
          {renderPage()}
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-sm text-text-secondary">
          <p>Made with 💜 by the squad · FriendVerse © {new Date().getFullYear()}</p>
        </footer>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass border-t border-border z-30 px-2 py-1 safe-area-bottom">
        <div className="flex justify-around">
          {([
            { id: 'home' as TabType, emoji: '🏠' },
            { id: 'diary' as TabType, emoji: '📖' },
            { id: 'chat' as TabType, emoji: '💬' },
            { id: 'memories' as TabType, emoji: '📸' },
            { id: 'birthdays' as TabType, emoji: '🎂' },
            { id: 'gallery' as TabType, emoji: '🖼️' },
            { id: 'profile' as TabType, emoji: '👥' },
          ]).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-2 px-2 rounded-xl transition-all text-xs ${
                activeTab === tab.id ? 'text-primary font-bold scale-110' : 'text-text-secondary'
              }`}
            >
              <span className="text-lg">{tab.emoji}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
