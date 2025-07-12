import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { ArrowLeft, Heart, Share2, Star, ShoppingBag, User, MessageCircle } from 'lucide-react';

const ItemDetail = () => {
  const { id } = useParams();
  const { items, currentUser, requestSwap, updateUserPoints, updateItemStatus } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapMessage, setSwapMessage] = useState('');

  const item = items.find(item => item.id === id);
  const relatedItems = items
    .filter(i => i.id !== id && i.category === item?.category && i.approved && i.status === 'available')
    .slice(0, 4);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Item not found</h2>
          <Link to="/browse" className="text-green-600 hover:text-green-700">
            ← Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'new': return 'text-green-600 bg-green-100';
      case 'like-new': return 'text-blue-600 bg-blue-100';
      case 'good': return 'text-yellow-600 bg-yellow-100';
      case 'fair': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleSwapRequest = () => {
    if (!currentUser) return;
    
    if (currentUser.points < item.pointsValue) {
      alert('Insufficient points for this swap!');
      return;
    }
    
    requestSwap(item.id, swapMessage);
    updateUserPoints(currentUser.id, -item.pointsValue);
    updateItemStatus(item.id, 'pending');
    setShowSwapModal(false);
    alert('Swap request sent successfully!');
  };

  const handleRedeemWithPoints = () => {
    if (!currentUser) return;
    
    if (currentUser.points < item.pointsValue) {
      alert('Insufficient points for this item!');
      return;
    }
    
    updateUserPoints(currentUser.id, -item.pointsValue);
    updateItemStatus(item.id, 'swapped');
    alert('Item redeemed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link 
          to="/browse" 
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Browse
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Image Gallery */}
            <div>
              <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                <img
                  src={item.images[selectedImage] || item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {item.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {item.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                        selectedImage === index ? 'border-green-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${item.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Item Details */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(item.condition)}`}>
                      {item.condition}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm text-gray-600">Excellent condition</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{item.pointsValue} Points</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Size:</span>
                    <span className="ml-2 font-medium">{item.size}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Category:</span>
                    <span className="ml-2 font-medium capitalize">{item.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Type:</span>
                    <span className="ml-2 font-medium capitalize">{item.type}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <span className={`ml-2 font-medium ${
                      item.status === 'available' ? 'text-green-600' : 
                      item.status === 'pending' ? 'text-yellow-600' : 'text-gray-600'
                    }`}>
                      {item.status === 'available' ? 'Available' : 
                       item.status === 'pending' ? 'Swap Pending' : 'Swapped'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>

              {item.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <User className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="font-medium">Listed by {item.uploaderName}</span>
                </div>
                <p className="text-sm text-gray-600">Community member since 2024</p>
              </div>

              {currentUser && item.status === 'available' && currentUser.id !== item.uploaderId && (
                <div className="space-y-3">
                  <button
                    onClick={() => setShowSwapModal(true)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Request Swap
                  </button>
                  <button
                    onClick={handleRedeemWithPoints}
                    className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Redeem with Points
                  </button>
                  {currentUser.points < item.pointsValue && (
                    <p className="text-sm text-red-600 text-center">
                      You need {item.pointsValue - currentUser.points} more points
                    </p>
                  )}
                </div>
              )}

              {!currentUser && (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Sign in to request this item</p>
                  <Link
                    to="/login"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-semibold transition-colors"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map(relatedItem => (
                <Link
                  key={relatedItem.id}
                  to={`/item/${relatedItem.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={relatedItem.images[0]}
                      alt={relatedItem.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{relatedItem.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-semibold">{relatedItem.pointsValue} pts</span>
                      <span className="text-gray-500 text-sm">{relatedItem.size}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Swap Request Modal */}
        {showSwapModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Request Swap</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message to seller (optional)
                </label>
                <textarea
                  value={swapMessage}
                  onChange={(e) => setSwapMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={4}
                  placeholder="Tell the seller why you want this item..."
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowSwapModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSwapRequest}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;
