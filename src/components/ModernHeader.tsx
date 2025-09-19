import React, { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { ModernRovatDropdown } from "./ModernRovatDropdown";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { Menu, ChevronDown, Mail, Calendar, Layers, Bell } from "lucide-react";
import logoImage from "figma:asset/89ffdb3215e1f765b892fc8a10623d4e60a4389b.png";

interface ModernHeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

export function ModernHeader({ currentPage, onNavigate, isDark, onThemeToggle }: ModernHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRovatOpen, setIsRovatOpen] = useState(false);
  
  const navItems = [
    { label: "Konferenciák", value: "konferenciak", icon: Calendar },
    { label: "Hírlevél", value: "hirlevel", icon: Mail },
  ];
  
  const rovatCategories = [
    { label: "Tőzsde", value: "tőzsde" },
    { label: "Kriptovaluták", value: "kripto" },
    { label: "Fintech", value: "fintech" },
    { label: "ESG", value: "esg" },
    { label: "Makrogazdaság", value: "makrogazdaság" },
    { label: "Szabályozás", value: "szabályozás" },
    { label: "Venture Capital", value: "venture capital" },
    { label: "Deviza", value: "deviza" },
    { label: "Ingatlan", value: "ingatlan" },
    { label: "Biztosítás", value: "biztosítás" },
    { label: "Technológia", value: "technológia" },
  ];

  const handleMobileNavigate = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
    setIsRovatOpen(false);
  };

  return (
    <>
      {/* Glassmorphism Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            
            {/* Bal oldali navigáció - floating pills */}
            <nav className="hidden lg:flex items-center space-x-2">
              {/* Rovatok floating pill */}
              <div className="relative group">
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 rounded-full px-6 py-3 backdrop-blur-sm border border-white/10 dark:border-gray-700/30 hover:border-blue-300/30 dark:hover:border-blue-500/30 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center space-x-2 text-sm">
                    <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Rovatok
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
                
                {/* Modern Rovatok Dropdown */}
                <div className="absolute top-full left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <ModernRovatDropdown 
                    currentPage={currentPage}
                    onNavigate={onNavigate}
                  />
                </div>
              </div>

              {/* Navigation items */}
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.value;
                
                return (
                  <button
                    key={item.value}
                    onClick={() => onNavigate(item.value)}
                    className={`relative group px-6 py-3 rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/20 dark:to-purple-400/20 text-blue-600 dark:text-blue-400' 
                        : 'hover:bg-gray-100/50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    <div className="flex items-center space-x-2 text-sm">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Középső logó - floating design */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <button 
                onClick={() => onNavigate("home")}
                className="group relative"
              >
                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl p-4 shadow-xl group-hover:shadow-2xl group-hover:scale-105 transition-all duration-500">
                  <ImageWithFallback 
                    src={logoImage}
                    alt="Tőzsdéfórum"
                    className="h-8 w-auto object-contain dark:invert group-hover:brightness-110 transition-all duration-300"
                  />
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
                </div>
              </button>
            </div>

            {/* Jobb oldali elemek - floating design */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <button className="relative p-3 rounded-full bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-300 group">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </button>

              <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
              
              {/* Feliratkozás button - premium design */}
              <button 
                onClick={() => onNavigate('hirlevel')}
                className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Feliratkozás</span>
              </button>
              
              {/* Mobile Menu Button */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button className="lg:hidden p-3 rounded-full bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-300">
                    <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[320px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-l border-white/20 dark:border-gray-800/20">
                  <SheetTitle className="sr-only">Navigációs menü</SheetTitle>
                  <SheetDescription className="sr-only">
                    Böngésszen az oldal különböző szakaszai között
                  </SheetDescription>
                  
                  <div className="mt-8 space-y-3">
                    {/* Főoldal gomb */}
                    <button
                      onClick={() => handleMobileNavigate("home")}
                      className={`w-full flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 ${
                        currentPage === "home" 
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400' 
                          : 'hover:bg-gray-100/50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <ImageWithFallback 
                          src={logoImage}
                          alt="Home"
                          className="h-4 w-4 dark:invert"
                        />
                      </div>
                      <span>Főoldal</span>
                    </button>

                    {/* Navigation Items */}
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentPage === item.value;
                      
                      return (
                        <button
                          key={item.value}
                          onClick={() => handleMobileNavigate(item.value)}
                          className={`w-full flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 ${
                            isActive 
                              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400' 
                              : 'hover:bg-gray-100/50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isActive ? 'bg-blue-500/20' : 'bg-gray-100 dark:bg-gray-800'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                    
                    {/* Rovatok Section */}
                    <div className="space-y-2">
                      <button
                        onClick={() => setIsRovatOpen(!isRovatOpen)}
                        className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300 text-gray-700 dark:text-gray-300"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <Layers className="w-4 h-4" />
                          </div>
                          <span>Rovatok</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isRovatOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isRovatOpen && (
                        <div className="ml-4 space-y-1 max-h-64 overflow-y-auto scrollbar-thin">
                          {rovatCategories.map((category) => (
                            <button
                              key={category.value}
                              onClick={() => handleMobileNavigate(category.value)}
                              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 text-sm ${
                                currentPage === category.value 
                                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' 
                                  : 'hover:bg-gray-100/30 dark:hover:bg-gray-800/30 text-gray-600 dark:text-gray-400'
                              }`}
                            >
                              {category.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      
      {/* Spacer for fixed header */}
      <div className="h-20"></div>
    </>
  );
}