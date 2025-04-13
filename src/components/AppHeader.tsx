
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from '@/hooks/use-mobile';

const AppHeader = () => {
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
  
  if (!user || isMobile) return null;
  
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-6 hidden md:flex justify-between items-center">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">Bag Manufacturing</h1>
      </div>
      
      <div className="flex items-center gap-6">
        {user.role === 'admin' && (
          <>
            <Button variant="ghost" asChild>
              <Link to="/">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/orders">Orders</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/create-order">New Order</Link>
            </Button>
          </>
        )}
        
        {(user.role === 'admin' || user.role === 'printing') && (
          <Button variant="ghost" asChild>
            <Link to="/printing">Printing</Link>
          </Button>
        )}
        
        {(user.role === 'admin' || user.role === 'cutting') && (
          <Button variant="ghost" asChild>
            <Link to="/cutting">Cutting</Link>
          </Button>
        )}
        
        {user.role === 'admin' && (
          <Button variant="ghost" asChild>
            <Link to="/assembly">Assembly</Link>
          </Button>
        )}
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <User size={16} />
            {user.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span className="font-medium">Role: </span>
            <span className="ml-2 capitalize">{user.role}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default AppHeader;
