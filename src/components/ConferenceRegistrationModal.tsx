import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Alert, AlertDescription } from "./ui/alert";
import { CheckCircle, X, Loader2, User, Phone, Mail } from "lucide-react";
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface ConferenceRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  conferenceId: string;
  conferenceName: string;
  onSuccess: () => void;
}

export function ConferenceRegistrationModal({ 
  isOpen, 
  onClose, 
  conferenceId, 
  conferenceName,
  onSuccess 
}: ConferenceRegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    newsletterConsent: false,
    privacyConsent: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'A teljes név megadása kötelező';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'A telefonszám megadása kötelező';
    } else {
      // Magyar telefonszám formátum ellenőrzés (+36 XX XXX XXXX vagy 06 XX XXX XXXX)
      const phoneRegex = /^(\+36|06)\s?\d{2}\s?\d{3}\s?\d{4}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        errors.phone = 'Helytelen telefonszám formátum (pl. +36 30 123 4567)';
      }
    }

    if (!formData.email.trim()) {
      errors.email = 'Az email cím megadása kötelező';
    } else {
      // Email formátum ellenőrzés
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Helytelen email formátum';
      }
    }

    if (!formData.privacyConsent) {
      errors.privacyConsent = 'Az adatkezelési tájékoztató elfogadása kötelező';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Supabase backend hívás
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4ed24ea8/conference/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          newsletterConsent: formData.newsletterConsent,
          conferenceId
        })
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        onSuccess();
        
        // Esemény küldése a RegistrationCounter frissítéséhez
        window.dispatchEvent(new CustomEvent('registration-success', { 
          detail: { conferenceId } 
        }));
        
        // Hírlevél eredmény kezelése
        if (formData.newsletterConsent && data.newsletterResult === 'subscribed') {
          console.log('Sikeres hírlevél feliratkozás');
        } else if (formData.newsletterConsent && data.newsletterResult === 'already_subscribed') {
          console.log('Már feliratkozott a hírlevelre');
        }
        
        // Automatikus bezárás 3 másodperc után
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        setError(data.error || 'Hiba történt a regisztráció során');
      }
    } catch (err) {
      console.error('Regisztrációs hiba:', err);
      setError('Hiba történt a regisztráció során. Kérjük próbálja újra később.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      newsletterConsent: false,
      privacyConsent: false
    });
    setIsSuccess(false);
    setError('');
    setValidationErrors({});
    setIsSubmitting(false);
    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Töröljük a mezőhöz tartozó hibaüzenetet
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center space-y-4 p-6">
            <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-foreground">Sikeres regisztráció!</h3>
            <p className="text-sm text-muted-foreground">
              Köszönjük a regisztrációját a "{conferenceName}" konferenciára. 
              Várjuk Önt a rendezvényen!
            </p>
            <Button onClick={handleClose} className="bg-blue-600 hover:bg-blue-700 text-white">
              Bezárás
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-foreground">Konferencia regisztráció</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Regisztráljon a "{conferenceName}" konferenciára. Kérjük, töltse ki az alábbi mezőket.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {error && (
            <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
              <AlertDescription className="text-red-700 dark:text-red-300">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Teljes név *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Kovács János"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={validationErrors.name ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {validationErrors.name && (
              <p className="text-xs text-red-600 dark:text-red-400">{validationErrors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-foreground flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Telefonszám *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+36 30 123 4567"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={validationErrors.phone ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {validationErrors.phone && (
              <p className="text-xs text-red-600 dark:text-red-400">{validationErrors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Email cím *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="kovacs.janos@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={validationErrors.email ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {validationErrors.email && (
              <p className="text-xs text-red-600 dark:text-red-400">{validationErrors.email}</p>
            )}
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="newsletter"
                checked={formData.newsletterConsent}
                onCheckedChange={(checked) => handleInputChange('newsletterConsent', !!checked)}
                disabled={isSubmitting}
                className="mt-1"
              />
              <Label 
                htmlFor="newsletter" 
                className="text-sm text-foreground leading-relaxed cursor-pointer"
              >
                Részt veszek a sorsoláson és ezzel feliratkozom a Tozsdeforum hírlevélre
              </Label>
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="privacy"
                  checked={formData.privacyConsent}
                  onCheckedChange={(checked) => handleInputChange('privacyConsent', !!checked)}
                  disabled={isSubmitting}
                  className="mt-1"
                />
                <Label 
                  htmlFor="privacy" 
                  className="text-sm text-foreground leading-relaxed cursor-pointer"
                >
                  Elfogadom az{' '}
                  <a 
                    href="https://tozsdeforum.hu/adatvedelem/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    adatkezelési tájékoztatót
                  </a>{' '}
                  *
                </Label>
              </div>
              {validationErrors.privacyConsent && (
                <p className="text-xs text-red-600 dark:text-red-400 ml-7">{validationErrors.privacyConsent}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Mégse
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.privacyConsent}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Regisztráció...
                </>
              ) : (
                'Regisztrálok'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}