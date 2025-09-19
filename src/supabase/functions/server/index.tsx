import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Email validation helper
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// CORS middleware
app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// Logger csak development környezetben
const isDev = Deno.env.get('DENO_ENV') !== 'production';
if (isDev) {
  app.use('*', logger(console.log));
}

// Konferencia regisztráció endpoint
app.post('/make-server-4ed24ea8/conference/register', async (c) => {
  try {
    const body = await c.req.json();
    const { name, phone, email, newsletterConsent, conferenceId } = body;

    if (isDev) console.log(`Regisztrációs kísérlet: ${email}`);

    // Alapvető validáció
    if (!name?.trim() || !phone?.trim() || !email?.trim() || !conferenceId) {
      return c.json({ 
        success: false, 
        error: 'Minden kötelező mező kitöltése szükséges' 
      }, 400);
    }

    // Email formátum ellenőrzés
    if (!isValidEmail(email)) {
      return c.json({ 
        success: false, 
        error: 'Helytelen email formátum' 
      }, 400);
    }

    // Regisztráció ID generálása
    const registrationId = `reg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Egyszerű duplikáció ellenőrzés - csak email alapján
    try {
      const existingRegistrations = await kv.getByPrefix(`conference_registration:`);
      const emailExists = existingRegistrations.some(
        reg => reg?.email?.toLowerCase() === email.trim().toLowerCase()
      );

      if (emailExists) {
        return c.json({ 
          success: false, 
          error: 'Hiba. Ezzel az email-el már regisztráltál' 
        }, 400);
      }

      // Telefonszám duplikáció ellenőrzés
      const normalizedPhone = phone.replace(/\s/g, '').replace(/^\+36/, '06');
      const phoneExists = existingRegistrations.some(
        reg => {
          if (!reg?.phone) return false;
          const existingPhone = reg.phone.replace(/\s/g, '').replace(/^\+36/, '06');
          return existingPhone === normalizedPhone;
        }
      );

      if (phoneExists) {
        return c.json({ 
          success: false, 
          error: 'Már regisztráltál ezzel a telefonszámmal' 
        }, 400);
      }

      // 150 fős limit ellenőrzés
      const conferenceRegistrations = existingRegistrations.filter(
        reg => reg?.conferenceId === conferenceId
      );
      
      if (conferenceRegistrations.length >= 150) {
        return c.json({ 
          success: false, 
          error: 'A konferencia elérte a maximális résztvevői létszámot (150 fő).' 
        }, 400);
      }
    } catch (error) {
      if (isDev) console.log(`Duplikáció ellenőrzési hiba: ${error}`);
      // Folytatjuk a regisztrációt ha az ellenőrzés hibázik
    }
    
    // Regisztrációs adatok tárolása
    const registrationData = {
      id: registrationId,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      newsletterConsent: !!newsletterConsent,
      conferenceId,
      registeredAt: new Date().toISOString(),
      status: 'confirmed'
    };

    await kv.set(`conference_registration:${registrationId}`, registrationData);
    if (isDev) console.log(`Regisztráció mentve: ${registrationId} - ${email}`);

    // Mailchimp feliratkozás ha kérte
    let newsletterResult = null;
    if (newsletterConsent) {
      try {
        const MAILCHIMP_API_KEY = Deno.env.get('MAILCHIMP_API_KEY');
        const MAILCHIMP_SERVER = Deno.env.get('MAILCHIMP_SERVER_PREFIX');
        const AUDIENCE_ID = Deno.env.get('MAILCHIMP_AUDIENCE_ID');

        if (MAILCHIMP_API_KEY && MAILCHIMP_SERVER && AUDIENCE_ID) {
          const url = `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;
          
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${btoa(`any:${MAILCHIMP_API_KEY}`)}`,
            },
            body: JSON.stringify({
              email_address: email.trim(),
              status: 'subscribed'
            }),
          });

          if (response.ok) {
            newsletterResult = 'subscribed';
          } else {
            const data = await response.json();
            if (response.status === 400 && data.title === 'Member Exists') {
              newsletterResult = 'already_subscribed';
            }
          }
        }
      } catch (error) {
        if (isDev) console.log(`Mailchimp hiba: ${error}`);
      }
    }

    return c.json({ 
      success: true, 
      registrationId,
      newsletterResult,
      message: 'Sikeres regisztráció! Várjuk Önt a rendezvényen!' 
    });

  } catch (error) {
    if (isDev) console.log(`Regisztrációs hiba: ${error}`);
    return c.json({ 
      success: false, 
      error: 'Szerver hiba történt. Kérjük próbálja újra később.' 
    }, 500);
  }
});



// Regisztrációk lekérdezése konferencia szerint
app.get('/make-server-4ed24ea8/conference/:conferenceId/registrations', async (c) => {
  try {
    const conferenceId = c.req.param('conferenceId');
    
    const registrations = await kv.getByPrefix(`conference_registration:`);
    const conferenceRegistrations = registrations.filter(
      reg => reg.conferenceId === conferenceId
    );

    return c.json({ 
      success: true, 
      count: conferenceRegistrations.length,
      registrations: conferenceRegistrations 
    });

  } catch (error) {
    if (isDev) console.log(`Regisztrációk lekérdezési hiba: ${error}`);
    return c.json({ 
      success: false, 
      error: 'Szerver hiba történt' 
    }, 500);
  }
});

// Mailchimp hírlevél feliratkozás endpoint
app.post('/make-server-4ed24ea8/mailchimp-subscribe', async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;

    if (!email) {
      return c.json({ 
        success: false, 
        error: 'E-mail cím kötelező' 
      }, 400);
    }

    // Email validáció
    if (!isValidEmail(email)) {
      return c.json({ 
        success: false, 
        error: 'Érvénytelen email cím' 
      }, 400);
    }

    const MAILCHIMP_API_KEY = Deno.env.get('MAILCHIMP_API_KEY');
    const MAILCHIMP_SERVER = Deno.env.get('MAILCHIMP_SERVER_PREFIX');
    const AUDIENCE_ID = Deno.env.get('MAILCHIMP_AUDIENCE_ID');

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER || !AUDIENCE_ID) {
      if (isDev) console.log('Mailchimp environment variables missing');
      return c.json({ 
        success: false, 
        error: 'Szerver konfiguráció hiba' 
      }, 500);
    }

    const url = `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

    const mailchimpBody = {
      email_address: email,
      status: 'subscribed'
    };

    if (isDev) console.log(`Mailchimp feliratkozási kísérlet: ${email}`);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`any:${MAILCHIMP_API_KEY}`)}`,
      },
      body: JSON.stringify(mailchimpBody),
    });

    const data = await response.json();

    if (!response.ok) {
      if (isDev) console.log(`Mailchimp API hiba: ${response.status} - ${JSON.stringify(data)}`);
      
      // Már létező feliratkozó esetén specifikus üzenet
      if (response.status === 400 && data.title === 'Member Exists') {
        return c.json({ 
          success: false, 
          error: 'Ez az email cím már fel van iratkozva a hírlevelünkre' 
        }, 400);
      }
      
      return c.json({ 
        success: false, 
        error: data.detail || data.title || 'Mailchimp hiba történt' 
      }, response.status);
    }

    if (isDev) console.log(`Sikeres Mailchimp feliratkozás: ${email}`);

    return c.json({ 
      success: true, 
      message: 'Sikeresen feliratkozott a hírlevelünkre!' 
    });

  } catch (error) {
    if (isDev) console.log(`Mailchimp feliratkozási hiba: ${error}`);
    return c.json({ 
      success: false, 
      error: 'Szerver hiba történt. Kérjük próbálja újra később.' 
    }, 500);
  }
});

Deno.serve(app.fetch);