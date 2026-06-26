import { useState, useRef, useEffect, type Dispatch, type SetStateAction } from 'react';
import { Friend, ChatMessage } from '../types';
import { Send, Smile, Hash } from 'lucide-react';
import { format } from 'date-fns';

interface ChatPageProps {
  friends: Friend[];
  messages: ChatMessage[];
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  currentUserId: string;
}

const quickEmojis = ['❤️', '😂', '🔥', '👍', '💜', '🎉', '😍', '🤯'];

export default function ChatPage({ friends, messages, setMessages, currentUserId }: ChatPageProps) {
  const [input, setInput] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg: ChatMessage = {
      id: `m${Date.now()}`,
      authorId: currentUserId,
      content: input,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, msg]);
    setInput('');
    setShowEmoji(false);
  };

  const addReaction = (msgId: string, emoji: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id !== msgId) return m;
      const reactions = m.reactions || [];
      const existing = reactions.find(r => r.userId === currentUserId && r.emoji === emoji);
      if (existing) {
        return { ...m, reactions: reactions.filter(r => !(r.userId === currentUserId && r.emoji === emoji)) };
      }
      return { ...m, reactions: [...reactions, { emoji, userId: currentUserId }] };
    }));
  };

  // Group messages
  let lastAuthor = '';
  let lastDate = '';

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] animate-fadeInUp">
      {/* Header */}
      <div className="bg-white rounded-t-2xl p-4 border border-border border-b-0 flex items-center gap-3">
        <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white">
          <Hash size={20} />
        </div>
        <div>
          <h1 className="font-bold">Squad Chat 💬</h1>
          <p className="text-xs text-text-secondary">{friends.length} friends · Always here for each other</p>
        </div>
        <div className="ml-auto flex -space-x-2">
          {friends.slice(0, 5).map(f => (
            <div key={f.id} className="w-8 h-8 rounded-full bg-white border-2 border-white flex items-center justify-center text-lg shadow-sm" style={{ backgroundColor: `${f.color}15` }}>
              {f.avatar}
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-white border-x border-border p-4 space-y-1">
        {messages.map((msg) => {
          const author = friends.find(f => f.id === msg.authorId);
          const isMe = msg.authorId === currentUserId;
          const showAvatar = lastAuthor !== msg.authorId;
          const msgDate = format(new Date(msg.timestamp), 'MMM d, yyyy');
          const showDate = lastDate !== msgDate;
          lastAuthor = msg.authorId;
          lastDate = msgDate;

          return (
            <div key={msg.id}>
              {showDate && (
                <div className="text-center my-4">
                  <span className="text-xs text-text-secondary bg-gray-100 px-4 py-1 rounded-full">{msgDate}</span>
                </div>
              )}
              <div className={`flex gap-2 ${isMe ? 'flex-row-reverse' : ''} ${showAvatar ? 'mt-4' : 'mt-0.5'} group`}>
                {showAvatar ? (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0" style={{ backgroundColor: `${author?.color}15` }}>
                    {author?.avatar}
                  </div>
                ) : (
                  <div className="w-8 flex-shrink-0" />
                )}
                <div className={`max-w-[75%] ${isMe ? 'items-end' : 'items-start'}`}>
                  {showAvatar && (
                    <p className={`text-xs font-semibold mb-1 ${isMe ? 'text-right' : ''}`} style={{ color: author?.color }}>
                      {author?.name}
                    </p>
                  )}
                  <div className={`
                    px-4 py-2.5 rounded-2xl text-sm relative
                    ${isMe
                      ? 'bg-primary text-white rounded-br-md'
                      : 'bg-gray-100 text-text-primary rounded-bl-md'
                    }
                  `}>
                    {msg.content}
                    <p className={`text-[10px] mt-1 ${isMe ? 'text-white/60' : 'text-text-secondary'}`}>
                      {format(new Date(msg.timestamp), 'h:mm a')}
                    </p>
                  </div>
                  {/* Reactions */}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className={`flex gap-1 mt-1 ${isMe ? 'justify-end' : ''}`}>
                      {Array.from(new Set(msg.reactions.map(r => r.emoji))).map(emoji => {
                        const count = msg.reactions!.filter(r => r.emoji === emoji).length;
                        return (
                          <button key={emoji} onClick={() => addReaction(msg.id, emoji)}
                            className="text-xs bg-gray-100 hover:bg-gray-200 px-1.5 py-0.5 rounded-full transition-colors">
                            {emoji} {count > 1 && count}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {/* Quick react on hover */}
                  <div className={`hidden group-hover:flex gap-1 mt-1 ${isMe ? 'justify-end' : ''}`}>
                    {quickEmojis.slice(0, 4).map(emoji => (
                      <button key={emoji} onClick={() => addReaction(msg.id, emoji)}
                        className="text-xs hover:scale-125 transition-transform">
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white rounded-b-2xl border border-border border-t-0 p-4">
        {showEmoji && (
          <div className="flex flex-wrap gap-2 mb-3 p-3 bg-gray-50 rounded-xl">
            {['😀','😂','😍','🥳','😎','🤔','😢','😡','🔥','💜','❤️','🎉','👍','👋','🙏','✨','💪','🎶','🍕','🎮','🎨','🏆','🌈','⭐'].map(e => (
              <button key={e} onClick={() => { setInput(input + e); setShowEmoji(false); }}
                className="text-xl hover:scale-125 transition-transform p-1">
                {e}
              </button>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <button onClick={() => setShowEmoji(!showEmoji)} className="p-2.5 rounded-xl text-text-secondary hover:bg-gray-100 transition-colors">
            <Smile size={20} />
          </button>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="gradient-primary text-white p-2.5 rounded-xl disabled:opacity-50 hover:shadow-lg transition-shadow"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
