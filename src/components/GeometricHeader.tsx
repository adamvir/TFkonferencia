import React, { useState, useEffect, useRef } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { ModernRovatDropdown } from "./ModernRovatDropdown";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { Menu, ChevronRight, Calendar, Mail, Grid3X3, ChevronDown } from "lucide-react";
import logoImage from "figma:asset/a057787a3831ed1d53ac8b38ddc0957e507cd404.png";

interface GeometricHeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isDark: boolean;
  onThemeToggle: () => void;
  onSubscribeOpen: () => void;
}

export function GeometricHeader({ currentPage, onNavigate, isDark, onThemeToggle, onSubscribeOpen }: GeometricHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRovatOpen, setIsRovatOpen] = useState(false);
  const [isDesktopRovatOpen, setIsDesktopRovatOpen] = useState(false);
  const rovatDropdownRef = useRef<HTMLDivElement>(null);
  
  const navItems = [
    { label: "Konferenciák", value: "konferenciak", icon: Calendar },
    { label: "Hírlevél", value: "hirlevel", icon: Mail },
  ];

  const handleMobileNavigate = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
    setIsRovatOpen(false);
  };

  const handleDesktopRovatClick = () => {
    setIsDesktopRovatOpen(!isDesktopRovatOpen);
  };

  // Bezárja a desktop dropdown-ot ha máshová kattintanak
  const handleNavigateAndCloseDropdown = (page: string) => {
    onNavigate(page);
    setIsDesktopRovatOpen(false);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rovatDropdownRef.current && !rovatDropdownRef.current.contains(event.target as Node)) {
        setIsDesktopRovatOpen(false);
      }
    };

    if (isDesktopRovatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDesktopRovatOpen]);

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6 xl:px-8">
        {/* Split Header Layout */}
        <div className="grid grid-cols-12 h-16 items-center">
          
          {/* Left Section - Navigation */}
          <div className="col-span-5 flex items-center justify-center space-x-1">
            <div className="hidden lg:flex items-center space-x-1">
              {/* Navigation Items - Both on left */}
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.value;
                
                return (
                  <button
                    key={item.value}
                    onClick={() => onNavigate(item.value)}
                    className={`relative px-4 py-3 text-sm transition-all duration-200 group ${
                      isActive 
                        ? 'text-foreground' 
                        : 'text-foreground/60 hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5">
                      <Icon className="w-3.5 h-3.5" />
                      <span className="uppercase tracking-wider">{item.label}</span>
                    </div>
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground"></div>
                    )}
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 border border-transparent group-hover:border-foreground/10 transform group-hover:skew-x-3 transition-all duration-200"></div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Section - Logo */}
          <div className="col-span-2 flex items-center justify-center">
            <button 
              onClick={() => onNavigate("konferenciak")}
              className="p-1 group"
            >
              <ImageWithFallback 
                src={logoImage}
                alt="Tozsdeforum"
                className="h-12 w-auto object-contain dark:invert transition-transform duration-300 group-hover:scale-110"
              />
            </button>
          </div>

          {/* Right Section - Action Buttons */}
          <div className="col-span-5 flex items-center justify-center space-x-3">
            <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
            
            {/* Register Button - More prominent */}

            
            {/* Subscribe Button - More prominent */}
            <button 
              onClick={onSubscribeOpen}
              className="hidden sm:flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-200 group relative overflow-hidden border-0 text-[16px] rounded-md"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
              <Mail className="w-4 h-4 relative z-10" />
              <span className="text-sm uppercase tracking-wider relative z-10">Feliratkozás</span>
            </button>
            
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 border border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 transition-all duration-200">
                  <Menu className="h-4 w-4 text-foreground/70" />
                </button>
              </SheetTrigger>
              
              <SheetContent side="right" className="w-80 bg-background border-l border-foreground/10">
                <SheetTitle className="sr-only">Navigációs menü</SheetTitle>
                <SheetDescription className="sr-only">
                  Böngésszen az oldal különböző szakaszai között
                </SheetDescription>
                
                {/* Mobile Menu Content */}
                <div className="mt-8 space-y-1">
                  {/* Navigation Items */}
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.value;
                    
                    return (
                      <button
                        key={item.value}
                        onClick={() => handleMobileNavigate(item.value)}
                        className={`w-full flex items-center justify-between p-4 border-b border-foreground/10 transition-all duration-200 ${
                          isActive 
                            ? 'bg-foreground/5 text-foreground' 
                            : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-4 h-4" />
                          <span className="uppercase tracking-wide">{item.label}</span>
                        </div>
                        {isActive && <div className="w-2 h-2 bg-foreground"></div>}
                      </button>
                    );
                  })}
                  
                  {/* Separator */}
                  <div className="border-t-2 border-foreground/20 my-2"></div>
                  

                  
                  {/* Mobile Subscribe Button */}
                  <button
                    onClick={() => {
                      onSubscribeOpen();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4" />
                      <span className="uppercase tracking-wide">Feliratkozás</span>
                    </div>
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}