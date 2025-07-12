
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  points: number;
  isAdmin?: boolean;
}

export interface ClothingItem {
  id: string;
  title: string;
  description: string;
  category: 'men' | 'women' | 'kids' | 'accessories';
  type: string;
  size: string;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  tags: string[];
  images: string[];
  uploaderId: string;
  uploaderName: string;
  status: 'available' | 'swapped' | 'pending';
  pointsValue: number;
  approved: boolean;
}

export interface SwapRequest {
  id: string;
  itemId: string;
  requesterId: string;
  requesterName: string;
  status: 'pending' | 'approved' | 'completed' | 'declined';
  message: string;
}

interface AppContextType {
  currentUser: User | null;
  users: User[];
  items: ClothingItem[];
  swapRequests: SwapRequest[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  addItem: (item: Omit<ClothingItem, 'id' | 'uploaderId' | 'uploaderName' | 'approved'>) => void;
  updateItemStatus: (itemId: string, status: ClothingItem['status']) => void;
  approveItem: (itemId: string) => void;
  rejectItem: (itemId: string) => void;
  requestSwap: (itemId: string, message: string) => void;
  updateUserPoints: (userId: string, points: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Dummy data
const initialUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@rewear.com', password: 'admin123', points: 0, isAdmin: true },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', password: 'password', points: 150 },
  { id: '3', name: 'Mike Chen', email: 'mike@example.com', password: 'password', points: 200 },
];

const initialItems: ClothingItem[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic vintage denim jacket in excellent condition. Perfect for layering.',
    category: 'women',
    type: 'jacket',
    size: 'M',
    condition: 'like-new',
    tags: ['vintage', 'denim', 'classic'],
    images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400'],
    uploaderId: '2',
    uploaderName: 'Sarah Johnson',
    status: 'available',
    pointsValue: 25,
    approved: true,
  },
  {
    id: '2',
    title: 'Cashmere Sweater',
    description: 'Luxurious cashmere sweater in navy blue. Very warm and cozy.',
    category: 'men',
    type: 'sweater',
    size: 'L',
    condition: 'good',
    tags: ['cashmere', 'luxury', 'warm'],
    images: ['https://images.unsplash.com/photo-1520970014086-2208d157c9e2?w=400'],
    uploaderId: '3',
    uploaderName: 'Mike Chen',
    status: 'available',
    pointsValue: 30,
    approved: true,
  },
  {
    id: '3',
    title: 'Summer Floral Dress',
    description: 'Light and breezy floral dress perfect for summer occasions.',
    category: 'women',
    type: 'dress',
    size: 'S',
    condition: 'new',
    tags: ['floral', 'summer', 'casual'],
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'],
    uploaderId: '2',
    uploaderName: 'Sarah Johnson',
    status: 'available',
    pointsValue: 20,
    approved: true,
  },
  {
    id: '4',
    title: 'Kids Superhero T-Shirt',
    description: 'Fun superhero themed t-shirt for kids. Great condition.',
    category: 'kids',
    type: 't-shirt',
    size: '8Y',
    condition: 'good',
    tags: ['superhero', 'fun', 'cotton'],
    images: ['https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400'],
    uploaderId: '3',
    uploaderName: 'Mike Chen',
    status: 'available',
    pointsValue: 15,
    approved: true,
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [items, setItems] = useState<ClothingItem[]>(initialItems);
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);

  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    if (users.find(u => u.email === email)) {
      return false; // User already exists
    }
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
      points: 100, // Welcome bonus
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addItem = (itemData: Omit<ClothingItem, 'id' | 'uploaderId' | 'uploaderName' | 'approved'>) => {
    if (!currentUser) return;
    
    const newItem: ClothingItem = {
      ...itemData,
      id: Date.now().toString(),
      uploaderId: currentUser.id,
      uploaderName: currentUser.name,
      approved: false,
    };
    setItems([...items, newItem]);
  };

  const updateItemStatus = (itemId: string, status: ClothingItem['status']) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, status } : item
    ));
  };

  const approveItem = (itemId: string) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, approved: true } : item
    ));
  };

  const rejectItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const requestSwap = (itemId: string, message: string) => {
    if (!currentUser) return;
    
    const newRequest: SwapRequest = {
      id: Date.now().toString(),
      itemId,
      requesterId: currentUser.id,
      requesterName: currentUser.name,
      status: 'pending',
      message,
    };
    setSwapRequests([...swapRequests, newRequest]);
  };

  const updateUserPoints = (userId: string, points: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, points: user.points + points } : user
    ));
    if (currentUser && currentUser.id === userId) {
      setCurrentUser({ ...currentUser, points: currentUser.points + points });
    }
  };

  const value: AppContextType = {
    currentUser,
    users,
    items,
    swapRequests,
    login,
    register,
    logout,
    addItem,
    updateItemStatus,
    approveItem,
    rejectItem,
    requestSwap,
    updateUserPoints,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
