"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Button } from "@/components/ui/button";
import { History, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import SystemClock from './SystemClock';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isDraws = location.pathname === "/draws";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Logo 
              imgClassName="h-8 md:h-10" 
              alt="Lucky Engine Logo" 
              ariaLabel="Lucky Engine Logo" 
            />
          </Link>
          
          <div className="hidden md:block">
            <SystemClock />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/">
            <Button 
              variant="ghost" 
              size="sm"
              className={cn(
                "text-xs sm:text-sm font-medium transition-all duration-200",
                isHome 
                  ? "text-emerald bg-emerald/10 hover:bg-emerald/20 hover:text-emerald" 
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              <Sparkles size={16} className="mr-2" />
              <span className="hidden sm:inline">Generator</span>
              <span className="sm:hidden">Home</span>
            </Button>
          </Link>
          
          <Link to="/draws">
            <Button 
              variant="ghost" 
              size="sm"
              className={cn(
                "text-xs sm:text-sm font-medium transition-all duration-200",
                isDraws 
                  ? "text-emerald bg-emerald/10 hover:bg-emerald/20 hover:text-emerald" 
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              <History size={16} className="mr-2" />
              <span className="hidden sm:inline">Trekkingen</span>
              <span className="sm:hidden">Archief</span>
            </Button>
          </Link>
        </div>
      </div>
      {/* Mobile Clock */}
      <div className="md:hidden flex justify-center pb-2 bg-background/80 backdrop-blur-md border-b border-border/5">
        <SystemClock />
      </div>
    </nav>
  );
};

export default Navbar;