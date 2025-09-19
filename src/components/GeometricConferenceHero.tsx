import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Award, ArrowRight, Calendar, Clock, MapPin, Users, Building } from "lucide-react";
import { Conference } from "../data/mockConferences";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { AnimatedCounter } from "./AnimatedCounter";

interface GeometricConferenceHeroProps {
  upcomingConference: Conference;
  handleRegister: (conferenceId: string) => void;
}

export function GeometricConferenceHero({ upcomingConference, handleRegister }: GeometricConferenceHeroProps) {
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
              <Award className="w-4 h-4 text-foreground/70 relative z-10" />
              <span className="text-sm text-foreground/70 uppercase tracking-wider relative z-10">
                Exkluzív szakmai esemény
              </span>
            </div>
            
            {/* Title Stack */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-6xl">
                  <span className="text-foreground">Jövőbe</span>
                  <span className="text-foreground/60"> tekintő</span>
                </h1>
                <div className="flex items-center space-x-4">
                  <div className="h-px bg-foreground/20 flex-1"></div>
                  <span className="text-foreground/50 uppercase tracking-widest text-xs">INNOVATION EVENT</span>
                  <div className="h-px bg-foreground/20 flex-1"></div>
                </div>
              </div>
              
              <h2 className="text-xl lg:text-2xl text-foreground/70 max-w-2xl">
                Innovatív projektek, exkluzív networking és értékes nyeremények várják
              </h2>
            </div>
            
            {/* Event Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 border border-foreground/10 relative overflow-hidden">
                <div className="absolute inset-0 border border-foreground/5 transform skew-x-3"></div>
                <Calendar className="w-5 h-5 text-foreground/70 relative z-10" />
                <div className="relative z-10">
                  <div className="text-sm text-foreground/60 uppercase tracking-wider">Dátum</div>
                  <div className="text-foreground">{upcomingConference.date}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 border border-foreground/10 relative overflow-hidden">
                <div className="absolute inset-0 border border-foreground/5 transform skew-x-3"></div>
                <Clock className="w-5 h-5 text-foreground/70 relative z-10" />
                <div className="relative z-10">
                  <div className="text-sm text-foreground/60 uppercase tracking-wider">Időpont</div>
                  <div className="text-foreground">{upcomingConference.time}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 border border-foreground/10 relative overflow-hidden">
                <div className="absolute inset-0 border border-foreground/5 transform skew-x-3"></div>
                <MapPin className="w-5 h-5 text-foreground/70 relative z-10" />
                <div className="relative z-10">
                  <div className="text-sm text-foreground/60 uppercase tracking-wider">Helyszín</div>
                  <div className="text-foreground">{upcomingConference.venue}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 border border-foreground/10 relative overflow-hidden">
                <div className="absolute inset-0 border border-foreground/5 transform skew-x-3"></div>
                <Users className="w-5 h-5 text-foreground/70 relative z-10" />
                <div className="relative z-10">
                  <div className="text-sm text-foreground/60 uppercase tracking-wider">Limitált</div>
                  <div className="text-foreground">Max. 150 fő</div>
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                size="lg" 
                onClick={() => handleRegister(upcomingConference.id)}
                className="h-16 px-12 bg-foreground hover:bg-foreground/90 text-background border border-foreground relative overflow-hidden group"
              >
                <div className="absolute inset-0 border border-foreground/20 transform skew-x-12 group-hover:skew-x-6 transition-transform duration-300"></div>
                <span className="relative z-10 uppercase tracking-wider text-lg">Regisztrálok most</span>
                <ArrowRight className="ml-3 w-5 h-5 relative z-10" />
              </Button>
            </div>
          </div>
          
          {/* Right Column - Event Stats & Companies */}
          <div className="col-span-12 lg:col-span-5 space-y-8">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-foreground/10 p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 border border-foreground/5 transform rotate-1"></div> 
                <AnimatedCounter 
                  end={2} 
                  className="text-3xl text-foreground mb-2 relative z-10" 
                  duration={1500}
                />
                <p className="text-sm text-foreground/60 uppercase tracking-wider relative z-10">Előadó cég</p>
              </div>
              
              <div className="border border-foreground/10 p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 border border-foreground/5 transform -rotate-1"></div>
                <AnimatedCounter 
                  end={150} 
                  className="text-3xl text-foreground mb-2 relative z-10" 
                  duration={2000}
                />
                <p className="text-sm text-foreground/60 uppercase tracking-wider relative z-10">Max. résztvevő</p>
              </div>
              
              <div className="border border-foreground/10 p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 border border-foreground/5 transform rotate-1"></div>
                <AnimatedCounter 
                  end={2} 
                  className="text-3xl text-foreground mb-2 relative z-10" 
                  duration={1500}
                />
                <p className="text-sm text-foreground/60 uppercase tracking-wider relative z-10">Óra időtartam</p>
              </div>
              
              <div className="border border-foreground/10 p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 border border-foreground/5 transform -rotate-1"></div>
                <AnimatedCounter 
                  end={3} 
                  className="text-3xl text-foreground mb-2 relative z-10" 
                  duration={1800}
                />  
                <p className="text-sm text-foreground/60 uppercase tracking-wider relative z-10">AirPods Pro</p>
              </div>
            </div>
            
            {/* Companies Section */}
            <div className="border border-foreground/10 p-6 relative overflow-hidden">
              <div className="absolute inset-0 border border-foreground/5 transform skew-y-1"></div>
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-foreground/70" />
                  <h3 className="text-lg text-foreground uppercase tracking-wider">Előadó cégek</h3>
                </div>
                
                <div className="space-y-3">
                  {upcomingConference.speakers.map((speaker) => (
                    <div key={speaker.id} className="flex items-center gap-4 p-3 bg-foreground/5">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={speaker.imageUrl} alt={speaker.company} />
                        <AvatarFallback className="bg-foreground/10 text-foreground border border-foreground/20">
                          {speaker.company.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-foreground font-medium">{speaker.company}</div>
                        <div className="text-sm text-foreground/60">{speaker.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Price Section */}
            <div className="text-center border border-foreground/10 p-6 relative overflow-hidden bg-foreground/5">
              <div className="absolute inset-0 border border-foreground/10 transform skew-x-2"></div>
              <div className="relative z-10">
                <div className="text-sm text-foreground/60 uppercase tracking-wider mb-2">Belépődíj</div>
                <div className="text-3xl text-foreground mb-2">
                  {upcomingConference.earlyBirdPrice || upcomingConference.price}
                </div>
                {upcomingConference.price === "Ingyenes" && (
                  <Badge variant="outline" className="border-foreground/20 text-foreground/70">
                    Ingyenes esemény
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}