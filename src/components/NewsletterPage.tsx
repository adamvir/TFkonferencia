import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Mail, 
  CheckCircle,
  Users,
  ArrowRight,
  Shield,
  Clock
} from "lucide-react";
import exampleNewsletter from 'figma:asset/b35ef781a8eb2bed205f8ca5354a12af18245fba.png';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';

export function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    try {
      console.log('Hírlevél feliratkozás indítása (NewsletterPage):', email);
      
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4ed24ea8/mailchimp-subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ email: email.trim() })
      });
      
      const result = await response.json();
      console.log('MailChimp feliratkozás válasz (NewsletterPage):', result);

      if (!result.success) {
        throw new Error(result.error || 'Ismeretlen hiba történt');
      }

      setIsSubscribed(true);
      toast.success(result.message || 'Sikeresen feliratkozott a hírlevelünkre!');
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Váratlan hiba történt. Kérjük, próbálja újra később!';
      toast.error(errorMessage);
      console.error('Hírlevél feliratkozási hiba (NewsletterPage):', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Modern blend background */}
      <section className="relative overflow-hidden">
        {/* Modern gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800/50 dark:to-blue-950/30"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Geometric shapes for modern look */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/20 dark:bg-blue-800/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-indigo-200/20 dark:bg-indigo-800/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-slate-200/30 dark:bg-slate-700/30 rounded-full blur-xl"></div>
        
        <div className="relative container mx-auto px-4 lg:px-6 xl:px-8 pt-16 pb-24 lg:pt-20 lg:pb-32">
          <div className="max-w-6xl mx-auto">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
              {/* Left Column - Content */}
              <div className="text-center lg:text-left space-y-8">
                <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/50 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50">
                  <Mail className="w-4 h-4" />
                  A magyar befektetők kedvenc hírlevele
                </div>
                
                <h1 className="text-4xl lg:text-6xl leading-tight">
                  <span className="text-blue-600 dark:text-blue-400">TF Hírlevél</span><br />
                  <span className="text-foreground">Legyél mindig egy lépéssel a piac előtt</span>
                </h1>
                
                <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl">
                  Több mint 300 szakember indítja a napját a TF Hírlevelünkkel. 
                  Csatlakozzon Ön is és legyen mindig egy lépéssel előrébb a piacokon!
                </p>

                {/* Subscription Form */}
                {!isSubscribed ? (
                  <div className="max-w-md mx-auto lg:mx-0">
                    <form onSubmit={handleSubscribe} className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Input
                          type="email"
                          placeholder="Add meg az email címed"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="flex-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-blue-200/50 dark:border-blue-800/50 focus:border-blue-400 dark:focus:border-blue-500"
                        />
                        <Button
                          type="submit"
                          size="lg"
                          disabled={isLoading}
                          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          {isLoading ? (
                            "Feliratkozás..."
                          ) : (
                            <>
                              Feliratkozom
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Ingyenes. Bármikor leiratkozható. Adatai biztonságban vannak.
                      </p>
                    </form>
                  </div>
                ) : (
                  <div className="max-w-md mx-auto lg:mx-0 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 rounded-lg p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 text-green-700 dark:text-green-300">
                      <CheckCircle className="w-6 h-6" />
                      <div>
                        <h3 className="font-medium">Sikeres feliratkozás!</h3>
                        <p className="text-sm">Hamarosan megkapja az első hírlevelünket.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Updated Stats */}
                <div className="grid grid-cols-2 gap-6 text-center lg:text-left">
                  <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-blue-100 dark:border-blue-900/50">
                    <div className="text-2xl font-medium text-blue-600 dark:text-blue-400 flex items-center justify-center lg:justify-start gap-2">
                      <Users className="w-5 h-5" />
                      300+
                    </div>
                    <div className="text-sm text-muted-foreground">Feliratkozó</div>
                  </div>
                  <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-blue-100 dark:border-blue-900/50">
                    <div className="text-2xl font-medium text-blue-600 dark:text-blue-400 flex items-center justify-center lg:justify-start gap-2">
                      <Mail className="w-5 h-5" />
                      42%
                    </div>
                    <div className="text-sm text-muted-foreground">Megnyitási arány</div>
                  </div>
                </div>

                {/* Trust indicators */}
                <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Ingyenes
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Minden reggel 9:00 kor
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-slate-600" />
                    Biztonságos
                  </div>
                </div>
              </div>

              {/* Right Column - Newsletter Preview */}
              <div className="mt-12 lg:mt-0 lg:h-full lg:flex lg:items-start">
                <div className="relative lg:sticky lg:top-8">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-slate-400/20 dark:from-blue-600/20 dark:via-indigo-600/20 dark:to-slate-600/20 rounded-2xl blur-xl"></div>
                  <Card className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50 overflow-hidden shadow-2xl">
                    <div className="h-[500px] lg:h-[700px] relative overflow-hidden">
                      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                        <img 
                          src={exampleNewsletter} 
                          alt="TF Hírlevél példa"
                          className="w-full object-cover object-top"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <Badge className="mb-2 bg-blue-400 text-white border-0">
                          Mai szám előnézet
                        </Badge>
                        <h3 className="font-medium">TF Hírlevél - 2025.01.15</h3>
                        <p className="text-sm text-gray-200">Nemzetközi és magyar piaci összefoglaló</p>
                        <p className="text-xs text-gray-300 mt-1">Görgessen a teljes tartalom megtekintéséhez</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}