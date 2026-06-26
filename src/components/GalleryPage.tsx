import { useState } from 'react';
import { Friend } from '../types';
import { Plus, X, Download, ZoomIn, Heart } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  uploadedBy: string;
}

interface GalleryPageProps {
  friends: Friend[];
  images: GalleryImage[];
  setImages: (imgs: GalleryImage[]) => void;
  currentUserId: string;
}

export default function GalleryPage({ friends, images, setImages, currentUserId }: GalleryPageProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [likes, setLikes] = useState<Record<string, boolean>>({});

  const addImage = () => {
    if (!newUrl.trim()) return;
    const img: GalleryImage = {
      id: `g${Date.now()}`,
      url: newUrl,
      caption: newCaption || 'No caption',
      uploadedBy: currentUserId,
    };
    setImages([...images, img]);
    setNewUrl('');
    setNewCaption('');
    setShowAdd(false);
  };

  return (
    <div className="space-y-6 animate-fadeInUp">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">🖼️ Gallery</h1>
          <p className="text-text-secondary text-sm">Our photo collection – {images.length} photos</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="gradient-primary text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-primary/30"
        >
          {showAdd ? <X size={18} /> : <Plus size={18} />}
          {showAdd ? 'Cancel' : 'Add Photo'}
        </button>
      </div>

      {/* Add Photo */}
      {showAdd && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-border animate-fadeInUp">
          <h3 className="font-bold mb-4">Add a Photo 📷</h3>
          <div className="space-y-3">
            <input
              value={newUrl}
              onChange={e => setNewUrl(e.target.value)}
              placeholder="Paste image URL..."
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
            <input
              value={newCaption}
              onChange={e => setNewCaption(e.target.value)}
              placeholder="Add a caption... ✨"
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
            {newUrl && (
              <img src={newUrl} alt="" className="h-40 rounded-xl object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
            )}
            <button onClick={addImage} disabled={!newUrl.trim()}
              className="gradient-primary text-white px-6 py-2.5 rounded-xl font-semibold disabled:opacity-50 hover:shadow-lg transition-shadow">
              Upload Photo
            </button>
          </div>
        </div>
      )}

      {/* Photo Grid */}
      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {images.map((img, i) => {
          const uploader = friends.find(f => f.id === img.uploadedBy);
          return (
            <div
              key={img.id}
              className="break-inside-avoid bg-white rounded-2xl border border-border overflow-hidden group hover:shadow-lg transition-all cursor-pointer animate-fadeInUp"
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => setSelectedImage(img)}
            >
              <div className="relative overflow-hidden">
                <img src={img.url} alt={img.caption} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium truncate">{img.caption}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <span>{uploader?.avatar}</span>
                    {uploader?.name?.split(' ')[0]}
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); setLikes({ ...likes, [img.id]: !likes[img.id] }); }}
                    className={`transition-colors ${likes[img.id] ? 'text-secondary' : 'text-gray-300 hover:text-secondary'}`}
                  >
                    <Heart size={16} fill={likes[img.id] ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {images.length === 0 && (
        <div className="text-center py-16">
          <span className="text-6xl block mb-4">🖼️</span>
          <p className="text-text-secondary text-lg">No photos yet. Add some memories!</p>
        </div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-end gap-2 mb-3">
              <a href={selectedImage.url} target="_blank" rel="noopener noreferrer"
                className="bg-white/20 text-white p-2 rounded-lg hover:bg-white/30 transition-colors">
                <Download size={20} />
              </a>
              <button onClick={() => setSelectedImage(null)}
                className="bg-white/20 text-white p-2 rounded-lg hover:bg-white/30 transition-colors">
                <X size={20} />
              </button>
            </div>
            <img src={selectedImage.url} alt={selectedImage.caption} className="w-full rounded-2xl max-h-[75vh] object-contain" />
            <p className="text-white text-center mt-4 text-lg">{selectedImage.caption}</p>
            <p className="text-white/60 text-center text-sm mt-1">
              Uploaded by {friends.find(f => f.id === selectedImage.uploadedBy)?.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
