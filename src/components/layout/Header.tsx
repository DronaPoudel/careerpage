
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.includes('/admin');

  return (
    <header className="w-full bg-white bg-opacity-90 backdrop-blur-md z-50 fixed top-0 shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="flex items-center space-x-2 transition-opacity duration-300 hover:opacity-80">
          <div className="text-3xl font-semibold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
            Nabil Bank
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-all duration-200 hover:text-primary ${
              location.pathname === '/' ? 'text-primary' : 'text-gray-700'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/career-form" 
            className={`text-sm font-medium transition-all duration-200 hover:text-primary ${
              location.pathname.includes('/career-form') ? 'text-primary' : 'text-gray-700'
            }`}
          >
            Career Form
          </Link>
          <Link 
            to="/admin" 
            className={`text-sm font-medium transition-all duration-200 hover:text-primary ${
              isAdmin ? 'text-primary' : 'text-gray-700'
            }`}
          >
            Admin Panel
          </Link>
        </nav>
        
        <div className="md:hidden">
          <button className="text-gray-700 hover:text-primary focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
