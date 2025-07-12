
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { User, LogOut, ShoppingBag, Plus } from 'lucide-react';

const Header = () => {
  const { currentUser, logout } = useApp();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ReWear</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link to="/browse" className="text-gray-600 hover:text-green-600 transition-colors">
              Browse Items
            </Link>
            {currentUser && (
              <>
                <Link to="/add-item" className="text-gray-600 hover:text-green-600 transition-colors flex items-center">
                  <Plus className="w-4 h-4 mr-1" />
                  List Item
                </Link>
                <Link to="/dashboard" className="text-gray-600 hover:text-green-600 transition-colors">
                  Dashboard
                </Link>
                {currentUser.isAdmin && (
                  <Link to="/admin" className="text-gray-600 hover:text-green-600 transition-colors">
                    Admin
                  </Link>
                )}
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">{currentUser.points} pts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">{currentUser.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
