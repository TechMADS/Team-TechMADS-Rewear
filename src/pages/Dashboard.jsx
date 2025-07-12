import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { Plus, Package, Star, TrendingUp, Eye, Edit, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const { currentUser, items } = useApp();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const userItems = items.filter(item => item.uploaderId === currentUser.id);
  const pendingItems = userItems.filter(item => !item.approved);
  const activeItems = userItems.filter(item => item.approved && item.status === 'available');
  const swappedItems = userItems.filter(item => item.status === 'swapped');

  const stats = [
    { label: 'Total Points', value: currentUser.points, icon: Star, color: 'text-yellow-600' },
    { label: 'Items Listed', value: userItems.length, icon: Package, color: 'text-blue-600' },
    { label: 'Successful Swaps', value: swappedItems.length, icon: TrendingUp, color: 'text-green-600' },
    { label: 'Pending Approval', value: pendingItems.length, icon: Eye, color: 'text-orange-600' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'swapped': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {currentUser.name}!</h1>
          <p className="text-gray-600">Manage your items and track your sustainable fashion journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="text-gray-900">{currentUser.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{currentUser.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Member Since</label>
                <p className="text-gray-900">January 2024</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Points Balance</label>
                <p className="text-2xl font-bold text-green-600">{currentUser.points} points</p>
              </div>
            </div>
            <button className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md transition-colors">
              Edit Profile
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/add-item"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                List New Item
              </Link>
              <Link
                to="/browse"
                className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 py-3 px-4 rounded-md transition-colors text-center block"
              >
                Browse Items
              </Link>
              <button className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-4 rounded-md transition-colors">
                View Swap History
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-gray-600">Welcome bonus: +100 points</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-gray-600">Profile created</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <p className="text-sm text-gray-600">Account verified</p>
              </div>
            </div>
          </div>
        </div>

        {/* My Items */}
        <div className="mt-8 bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">My Items</h2>
              <Link
                to="/add-item"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            {userItems.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No items yet</h3>
                <p className="text-gray-500 mb-4">Start by listing your first item to earn points!</p>
                <Link
                  to="/add-item"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors"
                >
                  List Your First Item
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userItems.map(item => (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-green-600 font-semibold">{item.pointsValue} pts</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.approved ? item.status : 'pending approval'}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          to={`/item/${item.id}`}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded text-center text-sm transition-colors flex items-center justify-center"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Link>
                        <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-3 rounded text-sm transition-colors flex items-center justify-center">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded text-sm transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
