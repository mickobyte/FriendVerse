export interface Friend {
  id: string;
  name: string;
  avatar: string;
  birthday: string; // MM-DD
  bio: string;
  color: string;
  joinedDate: string;
}

export interface DiaryEntry {
  id: string;
  authorId: string;
  content: string;
  media?: { type: 'image' | 'video'; url: string }[];
  mood?: string;
  timestamp: string;
  likes: string[];
  comments: Comment[];
  tags?: string[];
}

export interface Comment {
  id: string;
  authorId: string;
  content: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  authorId: string;
  content: string;
  timestamp: string;
  reactions?: { emoji: string; userId: string }[];
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  photos: string[];
  taggedFriends: string[];
  type: 'birthday' | 'hangout' | 'milestone' | 'celebration' | 'random';
}

export interface BirthdayWish {
  id: string;
  fromId: string;
  toId: string;
  message: string;
  timestamp: string;
}

export type TabType = 'home' | 'diary' | 'chat' | 'memories' | 'birthdays' | 'gallery' | 'profile';
