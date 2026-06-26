import { Friend, DiaryEntry, ChatMessage, Memory, BirthdayWish } from './types';

export const friends: Friend[] = [
  {
    id: '1',
    name: 'You (Admin)',
    avatar: '😎',
    birthday: '06-15',
    bio: 'The creator of this awesome diary! 🚀',
    color: '#6C63FF',
    joinedDate: '2024-01-01',
  },
  {
    id: '2',
    name: 'Alex',
    avatar: '🧑‍🎤',
    birthday: '03-22',
    bio: 'Music lover & adventure seeker 🎸',
    color: '#FF6B9D',
    joinedDate: '2024-01-05',
  },
  {
    id: '3',
    name: 'Sam',
    avatar: '🧑‍🍳',
    birthday: '08-10',
    bio: 'Foodie who loves cooking for the squad 🍕',
    color: '#FFD93D',
    joinedDate: '2024-01-10',
  },
  {
    id: '4',
    name: 'Jordan',
    avatar: '🧑‍💻',
    birthday: '11-30',
    bio: 'Tech nerd & gaming enthusiast 🎮',
    color: '#4CAF50',
    joinedDate: '2024-02-01',
  },
  {
    id: '5',
    name: 'Riley',
    avatar: '🧑‍🎨',
    birthday: '05-04',
    bio: 'Artist & dreamer ✨',
    color: '#2196F3',
    joinedDate: '2024-02-15',
  },
];

export const sampleDiaryEntries: DiaryEntry[] = [
  {
    id: 'd1',
    authorId: '1',
    content: 'Started this digital diary for all of us! 🎉 Can\'t wait to fill it with memories. This is going to be our special place to share everything!',
    mood: '🥳',
    timestamp: '2024-06-15T10:00:00Z',
    likes: ['2', '3', '4', '5'],
    comments: [
      { id: 'c1', authorId: '2', content: 'This is amazing!! Love it! 💜', timestamp: '2024-06-15T10:30:00Z' },
      { id: 'c2', authorId: '3', content: 'Best idea ever!!! 🙌', timestamp: '2024-06-15T11:00:00Z' },
    ],
    tags: ['friendship', 'new-beginnings'],
  },
  {
    id: 'd2',
    authorId: '2',
    content: 'Just had the best jam session ever! 🎸🎤 Wish you all could have been there. The vibes were immaculate!',
    media: [{ type: 'image', url: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600' }],
    mood: '🎶',
    timestamp: '2024-06-20T15:00:00Z',
    likes: ['1', '3', '5'],
    comments: [
      { id: 'c3', authorId: '5', content: 'Next time invite us!! 😤💕', timestamp: '2024-06-20T16:00:00Z' },
    ],
    tags: ['music', 'vibes'],
  },
  {
    id: 'd3',
    authorId: '3',
    content: 'Made homemade pizza for everyone today! 🍕 Here\'s the recipe squad – you\'re welcome 😏',
    media: [{ type: 'image', url: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600' }],
    mood: '😋',
    timestamp: '2024-07-01T18:00:00Z',
    likes: ['1', '2', '4', '5'],
    comments: [
      { id: 'c4', authorId: '4', content: 'OMG that looks SO good 🤤', timestamp: '2024-07-01T18:30:00Z' },
      { id: 'c5', authorId: '1', content: 'Save me a slice!! 🍕', timestamp: '2024-07-01T19:00:00Z' },
    ],
    tags: ['food', 'cooking'],
  },
  {
    id: 'd4',
    authorId: '4',
    content: 'Finally beat the final boss in Elden Ring after 47 attempts! 🎮⚔️ The squad watched me on stream. Team effort!! 💪',
    mood: '🏆',
    timestamp: '2024-07-10T23:00:00Z',
    likes: ['1', '2', '3'],
    comments: [
      { id: 'c6', authorId: '2', content: 'LETS GOOOO!! 🔥🔥🔥', timestamp: '2024-07-10T23:05:00Z' },
    ],
    tags: ['gaming', 'achievement'],
  },
  {
    id: 'd5',
    authorId: '5',
    content: 'Painted something for our friend group! 🎨 Each color represents one of us. We\'re like a rainbow together 🌈',
    media: [{ type: 'image', url: 'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600' }],
    mood: '🎨',
    timestamp: '2024-07-15T14:00:00Z',
    likes: ['1', '2', '3', '4'],
    comments: [
      { id: 'c7', authorId: '1', content: 'This is SO beautiful Riley!! 😭💜', timestamp: '2024-07-15T14:30:00Z' },
      { id: 'c8', authorId: '3', content: 'I\'m crying rn this is too sweet 🥺', timestamp: '2024-07-15T15:00:00Z' },
    ],
    tags: ['art', 'friendship'],
  },
];

export const sampleChatMessages: ChatMessage[] = [
  { id: 'm1', authorId: '1', content: 'Hey everyone! Welcome to our group chat 🎉', timestamp: '2024-06-15T10:00:00Z' },
  { id: 'm2', authorId: '2', content: 'Yooo this is so cool!', timestamp: '2024-06-15T10:01:00Z' },
  { id: 'm3', authorId: '3', content: 'Who wants pizza tonight? 🍕', timestamp: '2024-06-15T10:02:00Z' },
  { id: 'm4', authorId: '4', content: 'ME! Also can we game after?', timestamp: '2024-06-15T10:03:00Z' },
  { id: 'm5', authorId: '5', content: 'Count me in for both! 🙋‍♀️', timestamp: '2024-06-15T10:04:00Z' },
  { id: 'm6', authorId: '1', content: 'Perfect Friday night plan! ❤️', timestamp: '2024-06-15T10:05:00Z' },
  { id: 'm7', authorId: '2', content: 'I\'ll bring my guitar 🎸', timestamp: '2024-06-15T10:06:00Z' },
  { id: 'm8', authorId: '3', content: 'And I\'ll handle the food obviously 😏', timestamp: '2024-06-15T10:07:00Z' },
  { id: 'm9', authorId: '4', content: 'Lol Sam always the chef 👨‍🍳', timestamp: '2024-06-15T10:08:00Z' },
  { id: 'm10', authorId: '5', content: 'That\'s why we love them! 💕', timestamp: '2024-06-15T10:09:00Z' },
];

export const sampleMemories: Memory[] = [
  {
    id: 'mem1',
    title: 'The Night We All Met 🌟',
    description: 'Remember when we all ended up at the same coffee shop and couldn\'t stop talking? That\'s where it all began!',
    date: '2024-01-01',
    photos: [
      'https://images.pexels.com/photos/6950675/pexels-photo-6950675.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
    ],
    taggedFriends: ['1', '2', '3', '4', '5'],
    type: 'milestone',
  },
  {
    id: 'mem2',
    title: 'Alex\'s Birthday Bash 🎂',
    description: 'We surprised Alex with a karaoke party! The singing was terrible but the love was real 😂🎤',
    date: '2024-03-22',
    photos: [
      'https://images.pexels.com/photos/7803650/pexels-photo-7803650.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
    ],
    taggedFriends: ['1', '2', '3', '4', '5'],
    type: 'birthday',
  },
  {
    id: 'mem3',
    title: 'Beach Day Adventure 🏖️',
    description: 'Sun, sand, and the best squad. Jordan got sunburned but said it was worth it 😂',
    date: '2024-05-20',
    photos: [
      'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
    ],
    taggedFriends: ['1', '2', '3', '4', '5'],
    type: 'hangout',
  },
  {
    id: 'mem4',
    title: 'Riley\'s Art Exhibition 🎨',
    description: 'So proud of Riley! Their first art show was INCREDIBLE. We were the loudest cheerers there!',
    date: '2024-04-15',
    photos: [
      'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
    ],
    taggedFriends: ['1', '2', '3', '4', '5'],
    type: 'celebration',
  },
  {
    id: 'mem5',
    title: 'Game Night Marathon 🎮',
    description: '12 hours of non-stop gaming. Sam kept us fed, Alex provided the soundtrack, and Jordan carried us all 😤',
    date: '2024-06-01',
    photos: [
      'https://images.pexels.com/photos/8275698/pexels-photo-8275698.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
    ],
    taggedFriends: ['1', '2', '3', '4', '5'],
    type: 'hangout',
  },
];

export const sampleBirthdayWishes: BirthdayWish[] = [
  { id: 'bw1', fromId: '1', toId: '2', message: 'Happy Birthday Alex! 🎂🎸 Keep rocking! You\'re the best!', timestamp: '2024-03-22T00:00:00Z' },
  { id: 'bw2', fromId: '3', toId: '2', message: 'HBD Alex!! I made you a special cake 🎂🍰', timestamp: '2024-03-22T00:05:00Z' },
  { id: 'bw3', fromId: '4', toId: '2', message: 'Happy bday legend! Let\'s game all day! 🎮🎉', timestamp: '2024-03-22T00:10:00Z' },
  { id: 'bw4', fromId: '5', toId: '2', message: 'Painted something special for you! Happy birthday!! 🎨💜', timestamp: '2024-03-22T00:15:00Z' },
];

export const moods = ['😊', '😢', '😡', '🥳', '😴', '🤔', '😍', '🎶', '🏆', '😋', '🎨', '💪', '🌈', '🔥', '❤️', '😂'];

export const galleryImages = [
  { id: 'g1', url: 'https://images.pexels.com/photos/6950675/pexels-photo-6950675.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600', caption: 'Squad goals! 💜', uploadedBy: '1' },
  { id: 'g2', url: 'https://images.pexels.com/photos/1269029/pexels-photo-1269029.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600', caption: 'Coffee time ☕', uploadedBy: '2' },
  { id: 'g3', url: 'https://images.pexels.com/photos/7803650/pexels-photo-7803650.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600', caption: 'Party vibes 🎉', uploadedBy: '3' },
  { id: 'g4', url: 'https://images.pexels.com/photos/8275698/pexels-photo-8275698.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600', caption: 'Fun times! 🥳', uploadedBy: '4' },
  { id: 'g5', url: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600', caption: 'Concert night 🎸', uploadedBy: '2' },
  { id: 'g6', url: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600', caption: 'Food is love 🍕', uploadedBy: '3' },
  { id: 'g7', url: 'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600', caption: 'Art vibes 🎨', uploadedBy: '5' },
  { id: 'g8', url: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600', caption: 'Beach day! 🏖️', uploadedBy: '1' },
];
