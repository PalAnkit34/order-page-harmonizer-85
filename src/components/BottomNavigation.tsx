
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Plus, FileText, Printer } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around z-50">
      <button 
        onClick={() => navigate('/')}
        className={`flex flex-col items-center justify-center w-1/4 h-full ${isActive('/') ? 'text-primary' : 'text-gray-500'}`}
      >
        <Home size={22} />
        <span className="text-xs mt-1">Home</span>
      </button>
      
      <button 
        onClick={() => navigate('/create-order')}
        className={`flex flex-col items-center justify-center w-1/4 h-full ${isActive('/create-order') ? 'text-primary' : 'text-gray-500'}`}
      >
        <Plus size={22} />
        <span className="text-xs mt-1">New</span>
      </button>
      
      <button 
        onClick={() => navigate('/orders')}
        className={`flex flex-col items-center justify-center w-1/4 h-full ${isActive('/orders') ? 'text-primary' : 'text-gray-500'}`}
      >
        <FileText size={22} />
        <span className="text-xs mt-1">Orders</span>
      </button>

      <button 
        onClick={() => navigate('/printing')}
        className={`flex flex-col items-center justify-center w-1/4 h-full ${isActive('/printing') ? 'text-primary' : 'text-gray-500'}`}
      >
        <Printer size={22} />
        <span className="text-xs mt-1">Printing</span>
      </button>
    </div>
  );
};

export default BottomNavigation;
