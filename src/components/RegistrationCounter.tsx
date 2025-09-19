import React, { useState, useEffect, useRef } from 'react';
import { Users } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface RegistrationCounterProps {
  conferenceId?: string;
  className?: string;
  onRefresh?: () => void; // Külső trigger refresh-hez
}

export function RegistrationCounter({ conferenceId = '1', className = '', onRefresh }: RegistrationCounterProps) {
  const [registrations, setRegistrations] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Regisztrációk lekérdezése a Supabase backend-ből
  const fetchRegistrations = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4ed24ea8/conference/${conferenceId}/registrations`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setRegistrations(data.count);
        console.log(`RegistrationCounter: ${data.count} regisztráció található a ${conferenceId} konferenciához`);
      } else {
        console.error('Hiba a regisztrációk lekérdezésekor');
      }
    } catch (error) {
      console.error('Hiba a regisztrációk lekérdezésekor:', error);
      // Ha hiba van, megtartjuk a jelenlegi értéket
    } finally {
      setIsLoading(false);
    }
  };

  // Komponens betöltésekor lekérdezzük az adatokat
  useEffect(() => {
    fetchRegistrations();

    // Valós idejű frissítés 15 másodpercenként (gyakoribb mint 30mp)
    intervalRef.current = setInterval(() => {
      fetchRegistrations();
    }, 15000); // 15 másodperc

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [conferenceId]);

  // Külső refresh trigger hatására
  useEffect(() => {
    if (onRefresh) {
      fetchRegistrations();
    }
  }, [onRefresh]);

  // Publikus refresh függvény hozzáadása a komponenshez
  React.useImperativeHandle(onRefresh as any, () => ({
    refresh: fetchRegistrations
  }));

  // Custom event listener a regisztrációs események figyelésére
  useEffect(() => {
    const handleRegistrationUpdate = () => {
      console.log('RegistrationCounter: Külső regisztrációs esemény észlelve');
      fetchRegistrations();
    };

    // Global event listener regisztráció
    window.addEventListener('registration-success', handleRegistrationUpdate);

    return () => {
      window.removeEventListener('registration-success', handleRegistrationUpdate);
    };
  }, []);

  return (
    <div className={`flex items-center gap-3 text-sm ${className}`}>
      <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
      <span className="text-foreground whitespace-nowrap">
        150 résztvevő
      </span>
    </div>
  );
}