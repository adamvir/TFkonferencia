import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { AnimatedCounter } from './AnimatedCounter';
import { RegistrationCounter } from './RegistrationCounter';
import { ConferenceRegistrationModal } from './ConferenceRegistrationModal';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Star,
  CheckCircle,
  ArrowRight,
  Award,
  Zap,
  Building,
  Gift
} from "lucide-react";
import { mockConferences, Conference } from "../data/mockConferences";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface ConferencePageProps {
  registrations: number;
  onRegister: () => void;
}

export function ConferencePage({ registrations, onRegister }: ConferencePageProps) {
  const [selectedConference, setSelectedConference] = useState<string | null>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [currentConferenceId, setCurrentConferenceId] = useState<string>('');
  const [currentRegistrations, setCurrentRegistrations] = useState<Record<string, number>>({});
  
  // Segédfüggvény a cég URL-jének meghatározásához
  const getCompanyUrl = (companyName: string) => {
    if (companyName.includes('Épduferr')) {
      return 'https://www.epduferr.hu/';
    } else if (companyName.includes('Tozsdeforum')) {
      return 'https://www.tozsdeforum.hu/';
    }
    return null;
  };
  
  // Regisztrációk lekérdezése minden konferenciához
  const fetchRegistrations = async () => {
    const counts: Record<string, number> = {};
    
    for (const conference of mockConferences) {
      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4ed24ea8/conference/${conference.id}/registrations`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        });
        
        const data = await response.json();
        if (data.success) {
          counts[conference.id] = data.count;
        }
      } catch (error) {
        console.error(`Hiba a ${conference.id} konferencia regisztrációinak lekérdezésekor:`, error);
        counts[conference.id] = 0;
      }
    }
    
    setCurrentRegistrations(counts);
  };

  // Komponens betöltésekor és regisztráció után frissítjük a számokat
  useEffect(() => {
    fetchRegistrations();
  }, [registrations]);

  // Scroll a részletekhez amikor megnyílik
  useEffect(() => {
    if (selectedConference) {
      // Kis késleltetés hogy az animáció elkezdődhessen
      setTimeout(() => {
        const detailsElement = document.getElementById(`details-${selectedConference}`);
        if (detailsElement) {
          // Header magasság figyelembevétele (64px + extra margin)
          const headerHeight = 64; // h-16 = 64px
          const extraOffset = 16; // További térköz
          const elementPosition = detailsElement.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerHeight - extraOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 150); // Az animáció elején scroll
    }
  }, [selectedConference]);
  
  const handleRegister = (conferenceId: string) => {
    // Ellenőrizzük a regisztrációs limitet
    const currentCount = currentRegistrations[conferenceId] || 0;
    if (currentCount >= 150) {
      alert('A konferencia elérte a maximális résztvevői létszámot (150 fő).');
      return;
    }
    
    setCurrentConferenceId(conferenceId);
    setShowRegistrationModal(true);
  };

  const handleRegistrationSuccess = () => {
    onRegister();
    fetchRegistrations(); // Frissítjük a számokat azonnal
  };

  const handleEventSelect = (conferenceId: string) => {
    setSelectedConference(selectedConference === conferenceId ? null : conferenceId);
  };

  const upcomingConference = mockConferences[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 dark:from-black dark:via-slate-900 dark:to-amber-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-amber-500/5 to-transparent"></div>
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
        <div className="relative container mx-auto px-4 lg:px-6 xl:px-8 py-32 lg:py-48">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 dark:bg-amber-400/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-amber-100 border border-amber-400/30">
              <Award className="w-4 h-4 text-amber-300" />
              Exkluzív tőzsdei esemény
            </div>
            <h1 className="text-4xl lg:text-6xl leading-tight text-white">
              <span className="text-amber-300 dark:text-amber-400 drop-shadow-sm">Jövőbe tekintő konferencia</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 dark:text-white/80 max-w-2xl mx-auto">
              Ne csak kövesd a piacot, értsd is meg mi mozgatja!
            </p>
            <Button 
              size="lg" 
              className="mt-8 bg-amber-400 text-slate-900 hover:bg-amber-300 dark:bg-amber-500 dark:text-slate-900 dark:hover:bg-amber-400 px-8 py-3 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById('featured-event')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Esemény részletek
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section id="featured-event" className="py-16">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-blue-200 text-blue-700 dark:border-blue-700 dark:text-blue-300">Kiemelt esemény</Badge>
            <h2 className="text-3xl lg:text-4xl mb-4 text-foreground">Következő eseményünk</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Kattintson az eseményre a részletes információkért
            </p>
          </div>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            {mockConferences.filter(conference => conference.title === "Jövőbe tekintő").map((conference) => {
              const currentCount = currentRegistrations[conference.id] || 0;
              const isFullyBooked = currentCount >= 150;
              
              return (
                <Card key={conference.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300" onClick={() => handleEventSelect(conference.id)}>
                  <div className="lg:flex">
                    <div className="lg:w-1/2">
                      <ImageWithFallback 
                        src={conference.imageUrl} 
                        alt={conference.title}
                        className="w-full h-48 lg:h-full object-cover"
                      />
                    </div>
                    <div className="lg:w-1/2 p-6 lg:p-8 space-y-4">
                      <div>

                        <h3 className="text-xl lg:text-2xl mb-2">Jövőbe tekintő konferencia</h3>

                        
                        {isFullyBooked && (
                          <div className="mt-2 inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-sm">
                            <Users className="w-4 h-4" />
                            Betelt - Regisztráció lezárva
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-sm">
                          <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-foreground">{conference.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-foreground">{conference.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-foreground">
                            <a 
                              href="https://www.google.com/maps/place/Kimpton+BEM+Budapest/@47.5121956,19.035791,1089m/data=!3m1!1e3!4m20!1m10!3m9!1s0x4741dd9602c5773b:0x466074bff9930099!2sKimpton+BEM+Budapest!5m2!4m1!1i2!8m2!3d47.5120631!4d19.0379298!16s%2Fg%2F11vw_99ybn!3m8!1s0x4741dd9602c5773b:0x466074bff9930099!5m2!4m1!1i2!8m2!3d47.5120631!4d19.0379298!16s%2Fg%2F11vw_99ybn?entry=ttu&g_ep=EgoyMDI1MDkxNS4wIKXMDSoASAFQAw%3D%3D"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors underline hover:no-underline"
                            >
                              {conference.venue}, {conference.location}
                            </a>
                          </span>
                        </div>
                        <RegistrationCounter conferenceId="1" />
                        <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          Az esemény ingyenes, de regisztrációhoz kötött
                        </div>
                      </div>

                      {/* Előadó cégek - mindig látható */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium flex items-center gap-2 text-foreground">
                          <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          Előadó cégek
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {conference.speakers.map((speaker) => {
                            const companyUrl = getCompanyUrl(speaker.company);
                            
                            if (companyUrl) {
                              return (
                                <a 
                                  key={speaker.id}
                                  href={companyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-2 py-1 text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                  <Avatar className="w-5 h-5">
                                    <AvatarImage src={speaker.imageUrl} alt={speaker.company} />
                                    <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs">{speaker.company.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{speaker.company}</span>
                                </a>
                              );
                            } else {
                              return (
                                <div key={speaker.id} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-2 py-1 text-xs">
                                  <Avatar className="w-5 h-5">
                                    <AvatarImage src={speaker.imageUrl} alt={speaker.company} />
                                    <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs">{speaker.company.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium text-foreground">{speaker.company}</span>
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>

                      {/* Statisztikai adatok - mindig látható */}
                      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                          <div className="space-y-1">
                            <AnimatedCounter 
                              end={2} 
                              className="text-lg lg:text-xl text-blue-600 dark:text-blue-400 font-bold" 
                              duration={1500}
                            />
                            <p className="text-xs text-gray-600 dark:text-gray-300">Előadók</p>
                          </div>
                          <div className="space-y-1">
                            <AnimatedCounter 
                              end={150} 
                              className="text-lg lg:text-xl text-blue-600 dark:text-blue-400 font-bold" 
                              duration={2000}
                            />
                            <p className="text-xs text-gray-600 dark:text-gray-300">Max. résztvevő</p>
                          </div>
                          <div className="space-y-1">
                            <AnimatedCounter 
                              end={2} 
                              className="text-lg lg:text-xl text-blue-600 dark:text-blue-400 font-bold" 
                              duration={1500}
                            />
                            <p className="text-xs text-gray-600 dark:text-gray-300">Óra időtartam</p>
                          </div>
                          <div className="space-y-1">
                            <AnimatedCounter 
                              end={3} 
                              className="text-lg lg:text-xl text-blue-600 dark:text-blue-400 font-bold" 
                              duration={1800}
                            />
                            <p className="text-xs text-gray-600 dark:text-gray-300">AirPods</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Button 
                          className={`${isFullyBooked 
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRegister(conference.id);
                          }}
                          disabled={isFullyBooked}
                        >
                          {isFullyBooked ? 'Regisztráció lezárva' : 'Ingyenes regisztráció'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEventSelect(conference.id);
                          }}
                          className="flex items-center gap-2"
                        >
                          {selectedConference === conference.id ? 'Bezárás' : 'Részletek'}
                          <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${selectedConference === conference.id ? 'rotate-90' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Details with Animation */}
                  <AnimatePresence>
                    {selectedConference === conference.id && (
                      <motion.div 
                        id={`details-${conference.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          ease: "easeInOut",
                          opacity: { duration: 0.3 }
                        }}
                        className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 overflow-hidden"
                      >
                        <motion.div 
                          initial={{ y: -20 }}
                          animate={{ y: 0 }}
                          exit={{ y: -20 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="p-6 lg:p-8 space-y-8"
                        >
                          {/* Tudnivalók az eseményről */}
                          <div className="space-y-4">
                            <h4 className="font-medium flex items-center gap-2 text-foreground">
                              <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              Tudnivalók az eseményről
                            </h4>
                            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 space-y-4">
                              {/* Bevezetés */}
                              <div className="space-y-2">
                                <h5 className="text-sm font-medium text-foreground">Az esemény célja</h5>
                                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                  A Jövőbe Tekintő Konferencia októberben kerül megrendezésre, és a piaci élet aktuális, valamint jövő betekintő dolgait helyezi a középpontba. A program célja, hogy egy aktuális tőzsdei sztorit ismerjenek meg a résztvevők, illetve átfogó képet kapjanak a piaci trendekről, szakértők előadásából.
                                </p>
                              </div>
                              
                              {/* Első előadás */}
                              <div className="space-y-2">
                                <h5 className="text-sm font-medium text-foreground">Első előadás - Épduferr Nyrt.</h5>
                                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                  A konferencia első részében az Épduferr Nyrt. leányvállalata, a GeoAkku Kft. lesz a fókuszban. Az előadó a találmány feltalálója, Meleghegyi András.
                                </p>
                              </div>
                              
                              {/* Második előadás */}
                              <div className="space-y-2">
                                <h5 className="text-sm font-medium text-foreground">Második előadás - Tozsdeforum.hu</h5>
                                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                  Ezután a Tozsdeforum.hu előadásában egy tapasztalt tőzsdei szakember osztja meg gondolatait az aktuális piaci folyamatokról. A résztvevők első kézből kaphatnak betekintést a legfontosabb trendekbe, kockázatokba és lehetőségekbe. Az előadás célja, hogy a hallgatók szakértői szemszögből értsék meg, mi mozgatja jelenleg a piacokat, és milyen összefüggések rajzolódnak ki a befektetők számára.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Előadó cégek szekció */}
                          <div className="space-y-4">
                            <h4 className="font-medium flex items-center gap-2 text-foreground">
                              <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              Előadó cégek
                            </h4>
                            <div className="flex flex-wrap gap-3">
                              {conference.speakers.map((speaker) => {
                                const companyUrl = getCompanyUrl(speaker.company);
                                
                                if (companyUrl) {
                                  return (
                                    <a 
                                      key={speaker.id}
                                      href={companyUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-lg px-3 py-2 shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
                                    >
                                      <Avatar className="w-8 h-8">
                                        <AvatarImage src={speaker.imageUrl} alt={speaker.company} />
                                        <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">{speaker.company.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <span className="text-sm font-medium text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{speaker.company}</span>
                                    </a>
                                  );
                                } else {
                                  return (
                                    <div key={speaker.id} className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-lg px-3 py-2 shadow-sm">
                                      <Avatar className="w-8 h-8">
                                        <AvatarImage src={speaker.imageUrl} alt={speaker.company} />
                                        <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">{speaker.company.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <span className="text-sm font-medium text-foreground">{speaker.company}</span>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          </div>

                          {/* Részletes program */}
                          <div className="space-y-4">
                            <h4 className="font-medium flex items-center gap-2 text-foreground">
                              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              Részletes program
                            </h4>
                            <div className="space-y-3">
                              {conference.agenda.map((item, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                                  <div className="flex items-center justify-center w-6 h-6 bg-blue-600 dark:bg-blue-500 text-white rounded-full text-xs font-medium">
                                    {index + 1}
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-foreground">{item}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Helyszín és térkép */}
                          <div className="space-y-4">
                            <h4 className="font-medium flex items-center gap-2 text-foreground">
                              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              Helyszín és megközelíthetőség
                            </h4>
                            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 space-y-4">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="flex-1">
                                  <h5 className="font-medium text-foreground mb-2">
                                    <a 
                                      href="https://www.google.com/maps/place/Kimpton+BEM+Budapest/@47.5121956,19.035791,1089m/data=!3m1!1e3!4m20!1m10!3m9!1s0x4741dd9602c5773b:0x466074bff9930099!2sKimpton+BEM+Budapest!5m2!4m1!1i2!8m2!3d47.5120631!4d19.0379298!16s%2Fg%2F11vw_99ybn!3m8!1s0x4741dd9602c5773b:0x466074bff9930099!5m2!4m1!1i2!8m2!3d47.5120631!4d19.0379298!16s%2Fg%2F11vw_99ybn?entry=ttu&g_ep=EgoyMDI1MDkxNS4wIKXMDSoASAFQAw%3D%3D"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors underline hover:no-underline"
                                    >
                                      Kimpton Bem Budapest
                                    </a>
                                  </h5>
                                  <p className="text-sm text-gray-600 dark:text-gray-300">1027 Budapest, Bem rakpart 16-19.</p>
                                </div>
                              </div>
                              
                              {/* Google Maps embed */}
                              <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                                <iframe
                                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2782.094887776!2d19.035791!3d47.5121956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dd9602c5773b%3A0x466074bff9930099!2sKimpton%20BEM%20Budapest!5e0!3m2!1sen!2shu!4v1642000000000!5m2!1sen!2shu"
                                  width="100%"
                                  height="300"
                                  style={{ border: 0 }}
                                  allowFullScreen
                                  loading="lazy"
                                  referrerPolicy="no-referrer-when-downgrade"
                                  className="w-full"
                                ></iframe>
                              </div>
                            </div>
                          </div>

                          {/* AirPods nyereményjáték */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                              <Gift className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
                              <h4 className="font-medium text-foreground">Nyerjen AirPods-t!</h4>
                            </div>
                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-600/30 rounded-lg p-4">
                              <div className="grid md:grid-cols-3 gap-4 text-center">
                                <div className="space-y-2">
                                  <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                                    <Gift className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                                  </div>
                                  <h5 className="text-sm font-medium text-foreground">3 db AirPods</h5>
                                  <p className="text-xs text-gray-600 dark:text-gray-300">
                                    A legújabb Apple AirPods
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <h5 className="text-sm font-medium text-foreground">Minden résztvevő</h5>
                                  <p className="text-xs text-gray-600 dark:text-gray-300">
                                    Automatikus részvétel
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full">
                                    <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
                                  </div>
                                  <h5 className="text-sm font-medium text-foreground">18:50-kor</h5>
                                  <p className="text-xs text-gray-600 dark:text-gray-300">
                                    Sorsolás az esemény végén
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>



                          <Button 
                            size="lg" 
                            className={`w-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0 font-bold font-normal ${
                              isFullyBooked 
                                ? 'bg-gray-400 text-gray-600 cursor-not-allowed hover:scale-100' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRegister(conference.id);
                            }}
                            disabled={isFullyBooked}
                          >
                            {isFullyBooked ? 'Regisztráció lezárva - Betelt' : 'Regisztrálok most'}
                            {!isFullyBooked && <ArrowRight className="ml-2 w-4 h-4" />}
                          </Button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Regisztrációs Modal */}
      <ConferenceRegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        conferenceId={currentConferenceId}
        conferenceName="Jövőbe tekintő - Innovatív megoldások"
        onSuccess={handleRegistrationSuccess}
      />
    </div>
  );
}