import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Mail, ArrowRight, CheckCircle, Users, Star, Clock } from "lucide-react";

interface GeometricNewsletterHeroProps {
  email: string;
  setEmail: (email: string) => void;
  isSubscribed: boolean;
  isLoading: boolean;
  handleSubscribe: (e: React.FormEvent) => void;
}

export function GeometricNewsletterHero({ 
  email, 
  setEmail, 
  isSubscribed, 
  isLoading, 
  handleSubscribe 
}: GeometricNewsletterHeroProps) {
  return (
    <section className="relative border-b border-border/50">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        
        {/* Header Grid */}
        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          
          {/* Left Column - Content */}
          <div className="col-span-12 lg:col-span-7 space-y-8">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-3 border border-foreground/20 px-6 py-3 relative overflow-hidden">
              <div className="absolute inset-0 border border-foreground/10 transform skew-x-6"></div>
              <Mail className="w-4 h-4 text-foreground/70 relative z-10" />
              <span className="text-sm text-foreground/70 uppercase tracking-wider relative z-10">
                Magyarország #1 pénzügyi hírlevele
              </span>
            </div>
            
            {/* Title Stack */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-6xl">
                  <span className="text-foreground">TF</span>
                  <span className="text-foreground/60"> Hírlevél</span>
                </h1>
                <div className="flex items-center space-x-4">
                  <div className="h-px bg-foreground/20 flex-1"></div>
                  <span className="text-foreground/50 uppercase tracking-widest text-xs">DAILY FINANCE</span>
                  <div className="h-px bg-foreground/20 flex-1"></div>
                </div>
              </div>
              
              <h2 className="text-xl lg:text-2xl text-foreground/70 max-w-2xl">
                A napi dozis pénzügyi tudás, amit több mint 12,000 szakember olvas
              </h2>
            </div>
            
            {/* Subscription Form */}
            {!isSubscribed ? (
              <div className="max-w-lg">
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-12 sm:col-span-8">
                      <Input
                        type="email"
                        placeholder="Add meg az email címed"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-14 border-foreground/20 bg-background focus:border-foreground/40"
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-4">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="w-full h-14 bg-foreground hover:bg-foreground/90 text-background border border-foreground relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 border border-foreground/20 transform skew-x-12 group-hover:skew-x-6 transition-transform duration-300"></div>
                        <span className="relative z-10 uppercase tracking-wider">
                          {isLoading ? "..." : "Iratkozom"}
                        </span>
                        {!isLoading && <ArrowRight className="ml-2 w-4 h-4 relative z-10" />}
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/60">
                    Ingyenes. Bármikor leiratkozható. Adatai biztonságban vannak.
                  </p>
                </form>
              </div>
            ) : (
              <div className="max-w-lg border border-foreground/20 p-6 bg-foreground/5">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-foreground" />
                  <div>
                    <h3 className="font-medium text-foreground">Sikeres feliratkozás!</h3>
                    <p className="text-sm text-foreground/60">Hamarosan megkapja az első hírlevelünket.</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-foreground/10">
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl text-foreground mb-1">12K+</div>
                <div className="text-sm text-foreground/60 uppercase tracking-wider">Feliratkozó</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl text-foreground mb-1">68%</div>
                <div className="text-sm text-foreground/60 uppercase tracking-wider">Megnyitás</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl text-foreground mb-1">4.9</div>
                <div className="text-sm text-foreground/60 uppercase tracking-wider">Elégedettség</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Newsletter Preview */}
          <div className="col-span-12 lg:col-span-5">
            <div className="relative">
              
              {/* Geometric Frame */}
              <div className="absolute inset-0 border border-foreground/10 transform rotate-2"></div>
              <div className="absolute inset-0 border border-foreground/20 transform -rotate-1"></div>
              
              {/* Newsletter Preview Card */}
              <div className="relative bg-background border border-foreground/20 p-6 space-y-4">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-foreground/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-foreground flex items-center justify-center">
                      <Mail className="w-4 h-4 text-background" />
                    </div>
                    <div>
                      <div className="text-sm text-foreground uppercase tracking-wider">TF Hírlevél</div>
                      <div className="text-xs text-foreground/60">2025.01.06 - Hétfő</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-foreground/20 text-foreground/70">
                    Mai szám
                  </Badge>
                </div>
                
                {/* Content Preview */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg text-foreground mb-2">🇭🇺 Magyar piac összefoglaló</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground/70">BUX index:</span>
                        <span className="text-foreground">+1.2% (72,450)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">OTP:</span>
                        <span className="text-foreground">+2.1% (18,920 Ft)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-px bg-foreground/10"></div>
                  
                  <div>
                    <h3 className="text-lg text-foreground mb-2">🌍 Nemzetközi trendek</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground/70">S&P 500:</span>
                        <span className="text-foreground">+0.9% (5,892)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">EUR/HUF:</span>
                        <span className="text-foreground">392.85</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-px bg-foreground/10"></div>
                  
                  <div className="bg-foreground/5 p-4 border-l-2 border-foreground">
                    <h4 className="text-sm text-foreground mb-1 uppercase tracking-wider">Szakértői elemzés</h4>
                    <p className="text-xs text-foreground/70">
                      Az MNB várakozásoknak megfelelően 6.75%-on tartotta az alapkamatot...
                    </p>
                  </div>
                </div>
                
                {/* Footer */}
                <div className="pt-4 border-t border-foreground/10 flex items-center justify-between text-xs text-foreground/60">
                  <span>Minden reggel 7:00-kor</span>
                  <span>2 perc olvasás</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}