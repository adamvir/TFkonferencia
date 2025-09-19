import React, { useState, useEffect } from 'react';
import { GeometricHeader } from './components/GeometricHeader';
import { ConferencePage } from './components/ConferencePage';
import { NewsletterPage } from './components/NewsletterPage';
import { SubscribeModal } from './components/SubscribeModal';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';
import { projectId, publicAnonKey } from './utils/supabase/info';

export default function App() {
  const [currentPage, setCurrentPage] = useState('konferenciak');
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [registrations, setRegistrations] = useState(0);
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) {
        return saved === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleThemeToggle = () => {
    setIsDark(!isDark);
  };

  const handleSubscribeOpen = () => {
    setIsSubscribeModalOpen(true);
  };

  const handleSubscribeClose = () => {
    setIsSubscribeModalOpen(false);
  };

  const fetchRegistrations = async () => {
    try {
      // "1" konferencia ID alapján lekérdezzük a regisztrációkat (Jövőbe tekintő konferencia)
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4ed24ea8/conference/1/registrations`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setRegistrations(data.count);
      }
    } catch (error) {
      console.error('Hiba a regisztrációk lekérdezésekor:', error);
      // Ha hiba van, megtartjuk a jelenlegi értéket
    }
  };

  const handleRegistration = () => {
    // Regisztráció után frissítjük a számot
    fetchRegistrations();
  };

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  // Regisztrációk betöltése az alkalmazás indulásakor
  useEffect(() => {
    fetchRegistrations();
  }, []);

  const renderContent = () => {
    if (currentPage === "konferenciak") {
      return <ConferencePage registrations={registrations} onRegister={handleRegistration} />;
    }
    
    if (currentPage === "hirlevel") {
      return <NewsletterPage />;
    }
    
    // Default to conferences
    return <ConferencePage registrations={registrations} onRegister={handleRegistration} />;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <GeometricHeader 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
        onSubscribeOpen={handleSubscribeOpen}
      />
      
      <main className="flex-1">
        {renderContent()}
      </main>
      
      <Footer />
      
      <SubscribeModal 
        isOpen={isSubscribeModalOpen}
        onClose={handleSubscribeClose}
      />
      
      <Toaster position="top-right" />
    </div>
  );
}