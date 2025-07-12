
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { LogOut, User, ShoppingBag, Plus } from 'lucide-react';

const Header = () => {
  const { currentUser, logout } = useApp();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            ReWear
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`hover:text-green-200 transition-colors ${isActive('/') ? 'text-green-200' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/browse" 
              className={`hover:text-green-200 transition-colors ${isActive('/browse') ? 'text-green-200' : ''}`}
            >
              Browse Items
            </Link>
            {currentUser && (
              <Link 
                to="/add-item" 
                className={`hover:text-green-200 transition-colors flex items-center ${isActive('/add-item') ? 'text-green-200' : ''}`}
              >
                <Plus className="w-4 h-4 mr-1" />
                List an Item
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-2 hover:text-green-200 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">{currentUser.name}</span>
                </Link>
                <div className="flex items-center space-x-1 bg-green-700 px-3 py-1 rounded-full">
                  <ShoppingBag className="w-4 h-4" />
                  <span className="text-sm font-medium">{currentUser.points} pts</span>
                </div>
                {currentUser.isAdmin && (
                  <Link 
                    to="/admin" 
                    className="bg-green-700 hover:bg-green-800 px-3 py-1 rounded transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <button 
                  onClick={logout}
                  className="flex items-center space-x-1 hover:text-green-200 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="hover:text-green-200 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded transition-colors"
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
