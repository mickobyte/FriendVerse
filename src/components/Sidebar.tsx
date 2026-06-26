import React from 'react';
import { TabType, Friend } from '../types';
import {
  Home, BookOpen, MessageCircle, Camera, Gift, ImageIcon, User, Sparkles
} from 'lucide-react';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  currentUser: Friend;
  isMobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: 'Home', icon: <Home size={20} /> },
  { id: 'diary', label: 'Diary', icon: <BookOpen size={20} /> },
  { id: 'chat', label: 'Group Chat', icon: <MessageCircle size={20} /> },
  { id: 'memories', label: 'Memories', icon: <Camera size={20} /> },
  { id: 'birthdays', label: 'Birthdays', icon: <Gift size={20} /> },
  { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={20} /> },
  { id: 'profile', label: 'Friends', icon: <User size={20} /> },
];

export default function Sidebar({ activeTab, setActiveTab, currentUser, isMobileOpen, setMobileOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      
      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-white/90 backdrop-blur-xl border-r border-border z-50 flex flex-col
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <Sparkles className="text-white" size={22} />
            </div>
            <div>
              <h1 className="font-pacifico text-xl text-gradient">FriendVerse</h1>
              <p className="text-xs text-text-secondary">Our Digital Diary</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto pb-24">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setMobileOpen(false); }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold
                ${activeTab === tab.id
                  ? 'gradient-primary text-white shadow-lg shadow-primary/30'
                  : 'text-text-secondary hover:bg-primary/5 hover:text-primary'
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Current User */}
        <div className="sticky bottom-0 left-0 right-0 p-4 border-t border-border bg-white/90 backdrop-blur-xl mt-auto">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-primary/5">
            <span className="text-2xl">{currentUser?.avatar ?? '👤'}</span>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate">{currentUser?.name ?? 'Guest'}</p>
              <p className="text-xs text-text-secondary">Online ● Active</p>
            </div>
            <div className="w-2.5 h-2.5 bg-success rounded-full ml-auto flex-shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}
