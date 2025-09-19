import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { 
  TrendingUp, 
  Bitcoin, 
  Smartphone, 
  Leaf, 
  BarChart3, 
  Shield, 
  Rocket, 
  DollarSign,
  Home,
  Umbrella,
  Cpu
} from "lucide-react";
import { Button } from "./ui/button";

interface RovatItem {
  label: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

interface ModernRovatDropdownProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function ModernRovatDropdown({ currentPage, onNavigate }: ModernRovatDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const rovatItems: RovatItem[] = [
    { 
      label: "Tőzsde", 
      value: "tőzsde", 
      icon: <TrendingUp className="w-5 h-5" />,
      description: "Részvények és tőzsdei hírek"
    },
    { 
      label: "Kriptovaluták", 
      value: "kripto", 
      icon: <Bitcoin className="w-5 h-5" />,
      description: "Bitcoin, altcoin hírek"
    },
    { 
      label: "Fintech", 
      value: "fintech", 
      icon: <Smartphone className="w-5 h-5" />,
      description: "Pénzügyi technológia"
    },
    { 
      label: "ESG", 
      value: "esg", 
      icon: <Leaf className="w-5 h-5" />,
      description: "Fenntartható befektetés"
    },
    { 
      label: "Makrogazdaság", 
      value: "makrogazdaság", 
      icon: <BarChart3 className="w-5 h-5" />,
      description: "Gazdasági elemzések"
    },
    { 
      label: "Szabályozás", 
      value: "szabályozás", 
      icon: <Shield className="w-5 h-5" />,
      description: "Jogi és szabályozási hírek"
    },
    { 
      label: "Venture Capital", 
      value: "venture capital", 
      icon: <Rocket className="w-5 h-5" />,
      description: "Startup befektetések"
    },
    { 
      label: "Deviza", 
      value: "deviza", 
      icon: <DollarSign className="w-5 h-5" />,
      description: "Valutaárfolyamok"
    },
    { 
      label: "Ingatlan", 
      value: "ingatlan", 
      icon: <Home className="w-5 h-5" />,
      description: "Ingatlanpiaci hírek"
    },
    { 
      label: "Biztosítás", 
      value: "biztosítás", 
      icon: <Umbrella className="w-5 h-5" />,
      description: "Biztosítási szektor"
    },
    { 
      label: "Technológia", 
      value: "technológia", 
      icon: <Cpu className="w-5 h-5" />,
      description: "Tech és innováció"
    },
  ];

  const isActive = rovatItems.some(rovat => currentPage === rovat.value);

  const handleItemClick = (value: string) => {
    onNavigate(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className="px-4 py-2 gap-2"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={(e) => {
          // Close dropdown when focus leaves, but not if clicking on dropdown content
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setTimeout(() => setIsOpen(false), 150);
          }
        }}
      >
        Rovatok
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[680px] bg-popover border border-border rounded-lg shadow-lg z-50 p-6 animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">Rovatok</h3>
            <p className="text-sm text-muted-foreground">Válasszon egy kategóriát a legfrissebb hírekhez</p>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {rovatItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleItemClick(item.value)}
                className={`p-4 rounded-lg border border-border/50 hover:border-border hover:bg-accent/50 transition-all duration-200 text-left group ${
                  currentPage === item.value ? 'bg-accent border-border' : 'bg-card hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 p-2 rounded-md transition-colors ${
                    currentPage === item.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground group-hover:text-foreground">
                      {item.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {item.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                Összes kategória megtekintése
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  onNavigate('home');
                  setIsOpen(false);
                }}
              >
                Főoldal
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}