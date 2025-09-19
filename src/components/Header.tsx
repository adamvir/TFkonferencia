import React, { useState } from "react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { ModernRovatDropdown } from "./ModernRovatDropdown";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import logoImage from "figma:asset/89ffdb3215e1f765b892fc8a10623d4e60a4389b.png";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

export function Header({ currentPage, onNavigate, isDark, onThemeToggle }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRovatOpen, setIsRovatOpen] = useState(false);
  
  const navItems = [
    { label: "Konferenciák", value: "konferenciak" },
    { label: "Hírlevél", value: "hirlevel" },
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
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center py-6 relative">
          {/* Bal oldali navigáció - csak desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {/* Modern Rovatok Dropdown */}
            <ModernRovatDropdown 
              currentPage={currentPage}
              onNavigate={onNavigate}
            />
            
            {navItems.map((item) => (
              <Button
                key={item.value}
                variant={currentPage === item.value ? "secondary" : "ghost"}
                onClick={() => onNavigate(item.value)}
                className="px-4 py-2"
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Középső logó - főoldal gomb */}
          <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
            <button 
              onClick={() => onNavigate("home")}
              className="flex items-center hover:scale-105 transition-all duration-300 ease-out group"
            >
              <ImageWithFallback 
                src={logoImage}
                alt="Tozsdeforum"
                className="h-12 w-auto object-contain dark:invert group-hover:drop-shadow-lg transition-all duration-300"
              />
            </button>
          </div>

          {/* Jobb oldali elemek */}
          <div className="flex items-center space-x-2 ml-auto">
            <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Feliratkozás
            </Button>
            
            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <SheetTitle className="sr-only">Navigációs menü</SheetTitle>
                <SheetDescription className="sr-only">
                  Böngésszen az oldal különböző szakaszai között
                </SheetDescription>
                <div className="mt-6 space-y-4">
                  {/* Főoldal gomb a mobil menüben */}
                  <Button
                    variant={currentPage === "home" ? "secondary" : "ghost"}
                    onClick={() => handleMobileNavigate("home")}
                    className="w-full justify-start"
                  >
                    Főoldal
                  </Button>

                  {/* Navigation Items */}
                  {navItems.map((item) => (
                    <Button
                      key={item.value}
                      variant={currentPage === item.value ? "secondary" : "ghost"}
                      onClick={() => handleMobileNavigate(item.value)}
                      className="w-full justify-start"
                    >
                      {item.label}
                    </Button>
                  ))}
                  
                  {/* Rovatok Section */}
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      onClick={() => setIsRovatOpen(!isRovatOpen)}
                      className="w-full justify-between"
                    >
                      Rovatok
                      <ChevronDown className={`h-4 w-4 transition-transform ${isRovatOpen ? 'rotate-180' : ''}`} />
                    </Button>
                    
                    {isRovatOpen && (
                      <div className="ml-4 space-y-1">
                        {rovatCategories.map((category) => (
                          <Button
                            key={category.value}
                            variant={currentPage === category.value ? "secondary" : "ghost"}
                            onClick={() => handleMobileNavigate(category.value)}
                            className="w-full justify-start text-sm"
                            size="sm"
                          >
                            {category.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Feliratkozás gomb mobilon */}
                  <Button 
                    variant="outline" 
                    className="w-full mt-6"
                    onClick={() => handleMobileNavigate('hirlevel')}
                  >
                    Feliratkozás
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}