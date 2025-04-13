
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Plus, FileText, Printer, Scissors, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
  
  if (!user || !isMobile) return null;
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around z-50 pb-safe">
      <button 
        onClick={() => navigate('/')}
        className={`flex flex-col items-center justify-center w-1/5 h-full ${isActive('/') ? 'text-primary' : 'text-gray-500'}`}
      >
        <Home size={20} />
        <span className="text-[10px] mt-1">Home</span>
      </button>
      
      {(user?.role === 'admin') && (
        <button 
          onClick={() => navigate('/create-order')}
          className={`flex flex-col items-center justify-center w-1/5 h-full ${isActive('/create-order') ? 'text-primary' : 'text-gray-500'}`}
        >
          <Plus size={20} />
          <span className="text-[10px] mt-1">New</span>
        </button>
      )}
      
      {(user?.role === 'admin') && (
        <button 
          onClick={() => navigate('/orders')}
          className={`flex flex-col items-center justify-center w-1/5 h-full ${isActive('/orders') ? 'text-primary' : 'text-gray-500'}`}
        >
          <FileText size={20} />
          <span className="text-[10px] mt-1">Orders</span>
        </button>
      )}

      {(user?.role === 'admin' || user?.role === 'printing') && (
        <button 
          onClick={() => navigate('/printing')}
          className={`flex flex-col items-center justify-center w-1/5 h-full ${isActive('/printing') ? 'text-primary' : 'text-gray-500'}`}
        >
          <Printer size={20} />
          <span className="text-[10px] mt-1">Printing</span>
        </button>
      )}

      {(user?.role === 'admin' || user?.role === 'cutting') && (
        <button 
          onClick={() => navigate('/cutting')}
          className={`flex flex-col items-center justify-center w-1/5 h-full ${isActive('/cutting') ? 'text-primary' : 'text-gray-500'}`}
        >
          <Scissors size={20} />
          <span className="text-[10px] mt-1">Cutting</span>
        </button>
      )}
      
      <button 
        onClick={handleLogout}
        className="flex flex-col items-center justify-center w-1/5 h-full text-gray-500"
      >
        <LogOut size={20} />
        <span className="text-[10px] mt-1">Logout</span>
      </button>
    </div>
  );
};

export default BottomNavigation;
