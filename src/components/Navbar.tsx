"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Button } from "@/components/ui/button";
import { History, Sparkles, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import SystemClock from './SystemClock';
import { getNextDrawDate } from "@/lib/seo-utils";
import { isSameDay } from "date-fns";
import DisclaimerBanner from './DisclaimerBanner';
import { ModeToggle } from './ModeToggle';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isDraws = location.pathname === "/draws";
  const isWiki = location.pathname === "/wiki";
  
  const nextDraw = getNextDrawDate();
  const isDrawDay = isSameDay(new Date(), nextDraw);

  return (
    <div className="sticky top-0 z-50 flex flex-col w-full">
      <DisclaimerBanner />
      
      <nav className="w-full border-b border-border/5 bg-background/80 backdrop-blur-md">
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
            
            {isDrawDay && (
              <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald/10 border border-emerald/20 animate-pulse">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald">Vandaag Trekking!</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link to="/">
              <Button 
                variant="ghost" 
                size="sm"
                className={cn(
                  "text-xs sm:text-sm font-medium transition-all duration-200",
                  isHome 
                    ? "text-emerald bg-emerald/10 hover:bg-emerald/20 hover:text-emerald" 
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
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
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                )}
              >
                <History size={16} className="mr-2" />
                <span className="hidden sm:inline">Trekkingen</span>
                <span className="sm:hidden">Archief</span>
              </Button>
            </Link>

            <Link to="/wiki">
              <Button 
                variant="ghost" 
                size="sm"
                className={cn(
                  "text-xs sm:text-sm font-medium transition-all duration-200",
                  isWiki 
                    ? "text-emerald bg-emerald/10 hover:bg-emerald/20 hover:text-emerald" 
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                )}
              >
                <BookOpen size={16} className="mr-2" />
                <span className="hidden sm:inline">Wiki</span>
                <span className="sm:hidden">Wiki</span>
              </Button>
            </Link>

            <div className="pl-2 border-l border-border/10 ml-1">
              <ModeToggle />
            </div>
          </div>
        </div>
        
        {/* Mobile Clock & Status */}
        <div className="md:hidden flex justify-between items-center px-4 py-2 bg-background/80 backdrop-blur-md border-b border-border/5">
          <SystemClock />
          {isDrawDay && (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald/10 border border-emerald/20">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald"></span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald">Vandaag!</span>
              </div>
            )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;