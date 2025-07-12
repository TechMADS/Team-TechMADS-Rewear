
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { Search, Filter, Star, ShoppingBag } from 'lucide-react';

const Browse = () => {
  const { items } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'men', name: 'Men' },
    { id: 'women', name: 'Women' },
    { id: 'kids', name: 'Kids' },
    { id: 'accessories', name: 'Accessories' },
  ];

  const filteredItems = items
    .filter(item => item.approved && item.status === 'available')
    .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
    .filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.pointsValue - b.pointsValue;
        case 'price-high':
          return b.pointsValue - a.pointsValue;
        case 'newest':
          return parseInt(b.id) - parseInt(a.id);
        default:
          return 0;
      }
    });

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'text-green-600 bg-green-100';
      case 'like-new': return 'text-blue-600 bg-blue-100';
      case 'good': return 'text-yellow-600 bg-yellow-100';
      case 'fair': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Items</h1>
          <p className="text-gray-600">Discover amazing pre-loved fashion from our community</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">{filteredItems.length} items</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-green-100 text-green-800 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Items Grid */}
          <div className="flex-1">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map(item => (
                  <Link
                    key={item.id}
                    to={`/item/${item.id}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">Size: {item.size}</p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-green-600 font-semibold text-lg">{item.pointsValue} pts</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
                          {item.condition}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-sm">by {item.uploaderName}</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{item.condition}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
