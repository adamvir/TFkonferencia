// Mock backend localStorage-al a konferencia regisztrációkhoz
interface RegistrationData {
  id: string;
  name: string;
  conferenceId: string;
  registeredAt: string;
  status: string;
}

export class MockBackend {
  private static getRegistrations(): RegistrationData[] {
    const registrations = localStorage.getItem('conference_registrations');
    return registrations ? JSON.parse(registrations) : [];
  }

  private static saveRegistrations(registrations: RegistrationData[]): void {
    localStorage.setItem('conference_registrations', JSON.stringify(registrations));
  }

  static async register(name: string, conferenceId: string): Promise<{
    success: boolean;
    error?: string;
    registrationId?: string;
    currentCount?: number;
    message?: string;
  }> {
    try {
      // Validáció
      if (!name || !conferenceId) {
        return {
          success: false,
          error: 'A név megadása kötelező'
        };
      }

      if (!name.trim()) {
        return {
          success: false,
          error: 'A név megadása kötelező'
        };
      }

      // Jelenlegi regisztrációk lekérése
      const registrations = this.getRegistrations();
      const conferenceRegistrations = registrations.filter(
        reg => reg.conferenceId === conferenceId
      );

      // 150 fős limit ellenőrzése
      if (conferenceRegistrations.length >= 150) {
        return {
          success: false,
          error: 'A konferencia elérte a maximális résztvevői létszámot (150 fő). További regisztráció nem lehetséges.'
        };
      }

      // Regisztráció ID generálása
      const registrationId = `reg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Új regisztráció létrehozása
      const newRegistration: RegistrationData = {
        id: registrationId,
        name: name.trim(),
        conferenceId,
        registeredAt: new Date().toISOString(),
        status: 'confirmed'
      };

      // Regisztráció mentése
      registrations.push(newRegistration);
      this.saveRegistrations(registrations);

      console.log(`Konferencia regisztráció mentve: ${registrationId} - ${name} - Jelenlegi létszám: ${conferenceRegistrations.length + 1}/150`);

      return {
        success: true,
        registrationId,
        currentCount: conferenceRegistrations.length + 1,
        message: 'Sikeres regisztráció! Várjuk Önt a rendezvényen!'
      };

    } catch (error) {
      console.log(`Regisztrációs hiba: ${error}`);
      return {
        success: false,
        error: 'Hiba történt a regisztráció során. Kérjük próbálja újra később.'
      };
    }
  }

  static async getRegistrationCount(conferenceId: string): Promise<{
    success: boolean;
    count: number;
    registrations?: RegistrationData[];
  }> {
    try {
      const registrations = this.getRegistrations();
      const conferenceRegistrations = registrations.filter(
        reg => reg.conferenceId === conferenceId
      );

      return {
        success: true,
        count: conferenceRegistrations.length,
        registrations: conferenceRegistrations
      };

    } catch (error) {
      console.log(`Regisztrációk lekérdezési hiba: ${error}`);
      return {
        success: false,
        count: 0
      };
    }
  }

  // Mailchimp mock (későbbi valós implementációhoz)
  static async subscribeToNewsletter(email: string, firstName?: string, lastName?: string): Promise<{
    success: boolean;
    error?: string;
    message?: string;
  }> {
    try {
      if (!email) {
        return {
          success: false,
          error: 'E-mail cím kötelező'
        };
      }

      // Email validáció
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return {
          success: false,
          error: 'Érvénytelen email cím'
        };
      }

      // Ellenőrizzük, hogy már fel van-e iratkozva
      const subscribers = localStorage.getItem('newsletter_subscribers');
      const subscriberList: string[] = subscribers ? JSON.parse(subscribers) : [];
      
      if (subscriberList.includes(email)) {
        return {
          success: false,
          error: 'Ez az email cím már fel van iratkozva a hírlevelünkre'
        };
      }

      // Feliratkozás mentése
      subscriberList.push(email);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscriberList));

      console.log(`Sikeres hírlevél feliratkozás: ${email}`);

      return {
        success: true,
        message: 'Sikeresen feliratkozott a hírlevelünkre!'
      };

    } catch (error) {
      console.log(`Hírlevél feliratkozási hiba: ${error}`);
      return {
        success: false,
        error: 'Hiba történt a feliratkozás során. Kérjük próbálja újra később.'
      };
    }
  }
}