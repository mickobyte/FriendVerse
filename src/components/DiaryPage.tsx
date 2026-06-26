import { useState } from 'react';
import { Friend, DiaryEntry, Comment } from '../types';
import { Heart, MessageCircle, Send, Plus, X, Tag, Smile } from 'lucide-react';
import { format } from 'date-fns';
import { moods } from '../store';

interface DiaryPageProps {
  friends: Friend[];
  entries: DiaryEntry[];
  setEntries: (entries: DiaryEntry[]) => void;
  currentUserId: string;
}

export default function DiaryPage({ friends, entries, setEntries, currentUserId }: DiaryPageProps) {
  const [showCompose, setShowCompose] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [showMoods, setShowMoods] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [imageUrl, setImageUrl] = useState('');

  const addEntry = () => {
    if (!newContent.trim()) return;
    const entry: DiaryEntry = {
      id: `d${Date.now()}`,
      authorId: currentUserId,
      content: newContent,
      mood: selectedMood || undefined,
      timestamp: new Date().toISOString(),
      likes: [],
      comments: [],
      tags: tags.length > 0 ? tags : undefined,
      media: imageUrl ? [{ type: 'image', url: imageUrl }] : undefined,
    };
    setEntries([...entries, entry]);
    setNewContent('');
    setSelectedMood('');
    setTags([]);
    setImageUrl('');
    setShowCompose(false);
  };

  const toggleLike = (entryId: string) => {
    setEntries(entries.map(e => {
      if (e.id !== entryId) return e;
      const liked = e.likes.includes(currentUserId);
      return { ...e, likes: liked ? e.likes.filter(l => l !== currentUserId) : [...e.likes, currentUserId] };
    }));
  };

  const addComment = (entryId: string) => {
    const text = commentInputs[entryId]?.trim();
    if (!text) return;
    const comment: Comment = {
      id: `c${Date.now()}`,
      authorId: currentUserId,
      content: text,
      timestamp: new Date().toISOString(),
    };
    setEntries(entries.map(e => e.id === entryId ? { ...e, comments: [...e.comments, comment] } : e));
    setCommentInputs({ ...commentInputs, [entryId]: '' });
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const sortedEntries = [...entries].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="space-y-6 animate-fadeInUp">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">📖 Our Diary</h1>
          <p className="text-text-secondary text-sm">Share your thoughts, feelings & moments</p>
        </div>
        <button
          onClick={() => setShowCompose(!showCompose)}
          className="gradient-primary text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-primary/30 hover:shadow-xl transition-shadow"
        >
          {showCompose ? <X size={18} /> : <Plus size={18} />}
          {showCompose ? 'Cancel' : 'New Entry'}
        </button>
      </div>

      {/* Compose */}
      {showCompose && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-border animate-fadeInUp">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{friends.find(f => f.id === currentUserId)?.avatar}</span>
            <span className="font-bold">{friends.find(f => f.id === currentUserId)?.name}</span>
            {selectedMood && <span className="text-xl">{selectedMood}</span>}
          </div>
          <textarea
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
            placeholder="What's on your mind? Share with the squad... ✨"
            className="w-full h-32 p-4 border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
          />
          
          {/* Image URL */}
          <input
            type="text"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            placeholder="📷 Paste image URL (optional)"
            className="w-full mt-3 p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
          />
          {imageUrl && (
            <div className="mt-2 relative">
              <img src={imageUrl} alt="" className="h-32 rounded-lg object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map(tag => (
              <span key={tag} className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full flex items-center gap-1">
                #{tag}
                <button onClick={() => setTags(tags.filter(t => t !== tag))}><X size={12} /></button>
              </span>
            ))}
            <div className="flex items-center gap-1">
              <Tag size={14} className="text-text-secondary" />
              <input
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTag()}
                placeholder="Add tag"
                className="text-xs border-none outline-none bg-transparent w-20"
              />
            </div>
          </div>

          {/* Mood Selector */}
          <div className="mt-3">
            <button onClick={() => setShowMoods(!showMoods)} className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary">
              <Smile size={16} /> {selectedMood ? `Feeling ${selectedMood}` : 'Add mood'}
            </button>
            {showMoods && (
              <div className="flex flex-wrap gap-2 mt-2 p-3 bg-gray-50 rounded-xl">
                {moods.map(mood => (
                  <button
                    key={mood}
                    onClick={() => { setSelectedMood(mood); setShowMoods(false); }}
                    className={`text-xl p-1.5 rounded-lg hover:bg-white transition-colors ${selectedMood === mood ? 'bg-white shadow-sm ring-2 ring-primary' : ''}`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={addEntry}
              disabled={!newContent.trim()}
              className="gradient-primary text-white px-6 py-2.5 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow flex items-center gap-2"
            >
              <Send size={16} /> Post Entry
            </button>
          </div>
        </div>
      )}

      {/* Entries Feed */}
      {sortedEntries.map((entry, i) => {
        const author = friends.find(f => f.id === entry.authorId);
        const isLiked = entry.likes.includes(currentUserId);
        return (
          <div key={entry.id} className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden animate-fadeInUp" style={{ animationDelay: `${i * 80}ms` }}>
            {/* Header */}
            <div className="p-5 pb-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ backgroundColor: `${author?.color}20` }}>
                  {author?.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{author?.name}</p>
                  <p className="text-xs text-text-secondary">{format(new Date(entry.timestamp), 'MMM d, yyyy · h:mm a')}</p>
                </div>
                {entry.mood && <span className="text-2xl">{entry.mood}</span>}
              </div>
            </div>

            {/* Content */}
            <div className="px-5 py-3">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{entry.content}</p>
              {entry.tags && entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {entry.tags.map(tag => (
                    <span key={tag} className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">#{tag}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Media */}
            {entry.media && entry.media.length > 0 && (
              <div className="px-5 pb-3">
                {entry.media.map((m, mi) => (
                  <img key={mi} src={m.url} alt="" className="w-full h-64 object-cover rounded-xl" />
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="px-5 py-3 border-t border-border flex items-center gap-6">
              <button onClick={() => toggleLike(entry.id)} className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isLiked ? 'text-secondary' : 'text-text-secondary hover:text-secondary'}`}>
                <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
                {entry.likes.length > 0 && entry.likes.length}
              </button>
              <button
                onClick={() => setExpandedComments({ ...expandedComments, [entry.id]: !expandedComments[entry.id] })}
                className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
              >
                <MessageCircle size={18} />
                {entry.comments.length > 0 && entry.comments.length}
              </button>
            </div>

            {/* Comments */}
            {expandedComments[entry.id] && (
              <div className="px-5 pb-4 border-t border-border">
                <div className="space-y-3 mt-3">
                  {entry.comments.map(c => {
                    const cAuthor = friends.find(f => f.id === c.authorId);
                    return (
                      <div key={c.id} className="flex gap-2 animate-slideIn">
                        <span className="text-lg flex-shrink-0">{cAuthor?.avatar}</span>
                        <div className="bg-gray-50 rounded-xl px-3 py-2 flex-1">
                          <p className="text-xs font-bold">{cAuthor?.name}</p>
                          <p className="text-sm">{c.content}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-2 mt-3">
                  <input
                    value={commentInputs[entry.id] || ''}
                    onChange={e => setCommentInputs({ ...commentInputs, [entry.id]: e.target.value })}
                    onKeyDown={e => e.key === 'Enter' && addComment(entry.id)}
                    placeholder="Write a comment..."
                    className="flex-1 px-4 py-2 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <button onClick={() => addComment(entry.id)} className="gradient-primary text-white p-2 rounded-xl">
                    <Send size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {sortedEntries.length === 0 && (
        <div className="text-center py-16">
          <span className="text-6xl block mb-4">📝</span>
          <p className="text-text-secondary text-lg">No diary entries yet. Be the first to write!</p>
        </div>
      )}
    </div>
  );
}
