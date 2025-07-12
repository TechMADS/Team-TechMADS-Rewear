
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { Upload, X, Plus } from 'lucide-react';

const AddItem = () => {
  const { currentUser, addItem } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'women' as 'men' | 'women' | 'kids' | 'accessories',
    type: '',
    size: '',
    condition: 'good' as 'new' | 'like-new' | 'good' | 'fair',
    pointsValue: 20,
    tags: [] as string[],
    images: [] as string[],
    status: 'available' as 'available' | 'pending' | 'swapped',
  });
  
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.title || !formData.description || !formData.type || !formData.size) {
      alert('Please fill in all required fields');
      setLoading(false);
      return;
    }

    // Add default image if none provided
    const itemImages = formData.images.length > 0 ? formData.images : [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'
    ];

    addItem({
      ...formData,
      images: itemImages,
    });

    alert('Item submitted for approval! You will receive points once it\'s approved.');
    navigate('/dashboard');
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'pointsValue' ? parseInt(value) || 0 : value,
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim().toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim().toLowerCase()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const addImageUrl = () => {
    const url = prompt('Enter image URL:');
    if (url && url.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, url.trim()],
      }));
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">List a New Item</h1>
          <p className="text-gray-600">Share your pre-loved fashion with the community</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Item Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Vintage Denim Jacket"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe the item, its condition, and any special features..."
              />
            </div>

            {/* Category and Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="women">Women</option>
                  <option value="men">Men</option>
                  <option value="kids">Kids</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Item Type *
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., jacket, dress, shoes"
                />
              </div>
            </div>

            {/* Size and Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                  Size *
                </label>
                <input
                  type="text"
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., M, L, 8, 32"
                />
              </div>

              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="new">New (with tags)</option>
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>
            </div>

            {/* Points Value */}
            <div>
              <label htmlFor="pointsValue" className="block text-sm font-medium text-gray-700 mb-2">
                Points Value
              </label>
              <input
                type="number"
                id="pointsValue"
                name="pointsValue"
                value={formData.pointsValue}
                onChange={handleChange}
                min="1"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">How many points should this item cost? (1-100)</p>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Add a tag..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Item ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageUrl}
                  className="h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-500 hover:border-green-500 hover:text-green-500 transition-colors"
                >
                  <div className="text-center">
                    <Plus className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-sm">Add Image</span>
                  </div>
                </button>
              </div>
              <p className="text-sm text-gray-500">Click "Add Image" to add image URLs. If no images are added, a default placeholder will be used.</p>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? 'Submitting...' : 'Submit Item for Approval'}
                <Upload className="w-5 h-5 ml-2" />
              </button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Your item will be reviewed by our team</li>
              <li>• Once approved, it will appear in the marketplace</li>
              <li>• You'll earn points when someone swaps for your item</li>
              <li>• Keep items accurate and photos clear for faster approval</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
