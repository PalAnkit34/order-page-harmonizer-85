
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
  
  if (!user) return null;
  
  // Hide full header on mobile devices since we use bottom navigation
  if (isMobile) return null;
  
  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-200 py-2 px-4 md:px-6">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Bag Manufacturing</h1>
        </div>
        
        <div className="flex items-center gap-3 md:gap-6 overflow-x-auto hide-scrollbar">
          {user.role === 'admin' && (
            <>
              <Button variant="ghost" size="sm" asChild className="whitespace-nowrap">
                <Link to="/">Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="whitespace-nowrap">
                <Link to="/orders">Orders</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="whitespace-nowrap">
                <Link to="/create-order">New Order</Link>
              </Button>
            </>
          )}
          
          {(user.role === 'admin' || user.role === 'printing') && (
            <Button variant="ghost" size="sm" asChild className="whitespace-nowrap">
              <Link to="/printing">Printing</Link>
            </Button>
          )}
          
          {(user.role === 'admin' || user.role === 'cutting') && (
            <Button variant="ghost" size="sm" asChild className="whitespace-nowrap">
              <Link to="/cutting">Cutting</Link>
            </Button>
          )}
          
          {user.role === 'admin' && (
            <Button variant="ghost" size="sm" asChild className="whitespace-nowrap">
              <Link to="/assembly">Assembly</Link>
            </Button>
          )}
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <User size={16} />
              <span className="hidden sm:inline">{user.name}</span>
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
      </div>
    </header>
  );
};

export default AppHeader;
