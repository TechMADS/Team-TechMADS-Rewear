
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@rewear.com',
      password: 'admin123',
      points: 500,
      isAdmin: true,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      password: 'password',
      points: 150,
      isAdmin: false,
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike@example.com',
      password: 'password',
      points: 80,
      isAdmin: false,
    },
  ]);

  const [items, setItems] = useState([
    {
      id: '1',
      title: 'Vintage Denim Jacket',
      description: 'Classic blue denim jacket in excellent condition. Perfect for casual outings.',
      category: 'women',
      type: 'jacket',
      size: 'M',
      condition: 'like-new',
      pointsValue: 45,
      tags: ['vintage', 'denim', 'casual'],
      images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400'],
      uploaderId: '2',
      uploaderName: 'Sarah Johnson',
      status: 'available',
      approved: true,
    },
    {
      id: '2',
      title: 'Designer Silk Scarf',
      description: 'Beautiful silk scarf with floral pattern. Adds elegance to any outfit.',
      category: 'accessories',
      type: 'scarf',
      size: 'One Size',
      condition: 'new',
      pointsValue: 25,
      tags: ['silk', 'designer', 'floral'],
      images: ['https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400'],
      uploaderId: '3',
      uploaderName: 'Mike Chen',
      status: 'available',
      approved: true,
    },
    {
      id: '3',
      title: 'Cozy Wool Sweater',
      description: 'Warm and comfortable wool sweater, perfect for winter days.',
      category: 'men',
      type: 'sweater',
      size: 'L',
      condition: 'good',
      pointsValue: 35,
      tags: ['wool', 'winter', 'cozy'],
      images: ['https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400'],
      uploaderId: '2',
      uploaderName: 'Sarah Johnson',
      status: 'available',
      approved: true,
    },
    {
      id: '4',
      title: 'Kids Rainbow T-Shirt',
      description: 'Bright and fun t-shirt for kids, made from organic cotton.',
      category: 'kids',
      type: 't-shirt',
      size: '8-10 years',
      condition: 'good',
      pointsValue: 15,
      tags: ['kids', 'rainbow', 'organic'],
      images: ['https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400'],
      uploaderId: '3',
      uploaderName: 'Mike Chen',
      status: 'pending',
      approved: false,
    },
  ]);

  const [swapRequests, setSwapRequests] = useState([]);

  const register = (name, email, password) => {
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      points: 100, // Welcome bonus
      isAdmin: false,
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const login = (email, password) => {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addItem = (itemData) => {
    const newItem = {
      ...itemData,
      id: Date.now().toString(),
      uploaderId: currentUser?.id,
      uploaderName: currentUser?.name,
      approved: false,
    };

    setItems([...items, newItem]);
  };

  const approveItem = (itemId) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, approved: true } : item
    ));
  };

  const rejectItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const updateItemStatus = (itemId, status) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, status } : item
    ));
  };

  const updateUserPoints = (userId, pointsChange) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, points: user.points + pointsChange } : user
    ));
    
    if (currentUser && currentUser.id === userId) {
      setCurrentUser({ ...currentUser, points: currentUser.points + pointsChange });
    }
  };

  const requestSwap = (itemId, message) => {
    const newRequest = {
      id: Date.now().toString(),
      itemId,
      requesterId: currentUser?.id,
      requesterName: currentUser?.name,
      message,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setSwapRequests([...swapRequests, newRequest]);
  };

  const value = {
    currentUser,
    users,
    items,
    swapRequests,
    register,
    login,
    logout,
    addItem,
    approveItem,
    rejectItem,
    updateItemStatus,
    updateUserPoints,
    requestSwap,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
