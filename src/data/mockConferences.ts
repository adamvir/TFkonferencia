export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  imageUrl: string;
  bio: string;
}

export interface Conference {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  price: string;
  earlyBirdPrice?: string;
  category: string;
  description: string;
  imageUrl: string;
  speakers: Speaker[];
  agenda: string[];
  capacity: number;
  registered: number;
  highlights: string[];
}

import epduferrLogo from "figma:asset/bbeca7a6de705d26c58b57ebdf298f4324c8b0f6.png";
import conferenceVenueImage from "figma:asset/8be3b4162e401577b54217bb2156d6895d18f937.png";
import tozsdeLogo from "figma:asset/4643a0429a1b8ddebd0dc8739aa15b1a49a6a074.png";

export const mockSpeakers: Speaker[] = [
  {
    id: "1",
    name: "Dr. Kovács Péter",
    title: "Vezető elemző",
    company: "Magyar Nemzeti Bank",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    bio: "20+ éves tapasztalat a monetáris politika területén",
  },
  {
    id: "2",
    name: "Nagy Katalin",
    title: "CEO",
    company: "FinTech Hungary",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b332c5ab?w=300&h=300&fit=crop&crop=face",
    bio: "A magyar fintech szektor egyik vezető alakja",
  },
  {
    id: "3",
    name: "Szabó András",
    title: "Portfolio Manager",
    company: "OTP Asset Management",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    bio: "ESG befektetési stratégiák specialistája",
  },
  {
    id: "4",
    name: "Varga Eszter",
    title: "Blockchain Lead",
    company: "Revolut",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    bio: "Kriptovaluta és blockchain technológiai szakértő",
  },
  {
    id: "5",
    name: "Épduferr Szakértői Csapat",
    title: "Vezető előadók",
    company: "Épduferr Nyrt.",
    imageUrl: epduferrLogo,
    bio: "Építőipari és fejlesztési projektek szakértői",
  },
  {
    id: "6",
    name: "Tozsdeforum Szakértői",
    title: "Pénzügyi elemzők",
    company: "Tozsdeforum.hu",
    imageUrl: tozsdeLogo,
    bio: "Tőzsdei és pénzügyi piaci szakértők",
  },
];

export const mockConferences: Conference[] = [
  {
    id: "1",
    title: "Jövőbe tekintő",
    subtitle: "Innovatív megoldások a pénzügyi szektorban",
    date: "2025. október 16. - Csütörtök",
    time: "17:00 - 19:00",
    location: "Budapest",
    venue: "Kimpton Bem Budapest",
    price: "Ingyenes",
    category: "Szakmai esemény",
    description:
      "Exkluzív networking esemény vezető cégekkel a pénzügyi szektor jövőjéről. Ismerje meg az Épduferr és Tozsdeforum.hu innovatív megközelítését.",
    imageUrl: conferenceVenueImage,
    speakers: [mockSpeakers[4], mockSpeakers[5]],
    agenda: [
      "17:00 - 17:30 - Regisztráció és érkezés",
      "17:30 - 18:10 - Épduferr előadás",
      "18:10 - 18:50 - Tozsdeforum.hu előadás",
      "18:50 - 19:00 - Sorsolás: 3 db AirPods Pro",
      "19:00 - Esemény zárása",
    ],
    capacity: 150,
    registered: 0,
    highlights: [
      "Két vezető cég előadása",
      "AirPods Pro sorsolás (3 db)",
      "Prémium networking lehetőség",
      "Professzionális venue",
    ],
  },
  {
    id: "2",
    title: "FinTech Innovation Summit",
    subtitle: "Digitális pénzügyek forradalma",
    date: "2025. április 22.",
    time: "10:00 - 17:00",
    location: "Budapest",
    venue: "Design Terminal",
    price: "65.000 Ft",
    earlyBirdPrice: "49.000 Ft",
    category: "Technológia",
    description:
      "A pénzügyi technológia legújabb trendjei és innovációi egy helyen. Startupok, befektetők és nagyvállalatok találkozása.",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
    speakers: [mockSpeakers[1], mockSpeakers[3]],
    agenda: [
      "FinTech ökoszisztéma Magyarországon",
      "Startup bemutatkozások",
      "Befektetői panel",
      "Networking kávészünet",
      "Digitális fizetési megoldások",
      "Jövő technológiái",
    ],
    capacity: 300,
    registered: 156,
    highlights: [
      "Startup bemutatkozók",
      "Befektetői networking",
      "Demo zone",
      "Pitch competition",
    ],
  },
  {
    id: "3",
    title: "Crypto & Blockchain Conference",
    subtitle: "A decentralizált jövő",
    date: "2025. május 10.",
    time: "09:30 - 16:30",
    location: "Budapest",
    venue: "Akvárium Klub",
    price: "55.000 Ft",
    category: "Kriptovaluta",
    description:
      "Kriptovaluták, blockchain technológia és DeFi megoldások részletes áttekintése szakértőktől és gyakorlati alkalmazóktól.",
    imageUrl:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop",
    speakers: [mockSpeakers[3]],
    agenda: [
      "Kriptopiaci kilátások 2025",
      "Blockchain alkalmazások",
      "DeFi és hagyományos pénzügyek",
      "Kávészünet és networking",
      "Szabályozási kihívások",
      "Jövőbeli technológiák",
    ],
    capacity: 250,
    registered: 98,
    highlights: [
      "Kriptopiaci elemzések",
      "Blockchain workshopok",
      "Trading szimulációk",
      "Networking a közösséggel",
    ],
  },
  {
    id: "4",
    title: "ESG Investment Forum",
    subtitle: "Fenntartható befektetések kora",
    date: "2025. június 5.",
    time: "09:00 - 16:00",
    location: "Budapest",
    venue: "InterContinental Budapest",
    price: "72.000 Ft",
    earlyBirdPrice: "59.000 Ft",
    category: "ESG",
    description:
      "A fenntartható befektetések, ESG kritériumok és zöld pénzügyek komplex világának feltárása nemzetközi és hazai szakértőkkel.",
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
    speakers: [mockSpeakers[2]],
    agenda: [
      "ESG trendek globálisan",
      "Zöld kötvények és finanszírozás",
      "Fenntarthatósági jelentések",
      "Networking ebéd",
      "ESG befektetési stratégiák",
      "Jövő kihívásai és lehetőségei",
    ],
    capacity: 200,
    registered: 134,
    highlights: [
      "Nemzetközi előadók",
      "ESG benchmark eszközök",
      "Zöld finanszírozás",
      "Fenntarthatósági audit",
    ],
  },
  {
    id: "5",
    title: "Makrogazdasági Kilátások 2025",
    subtitle: "Infláció, kamatok, növekedés",
    date: "2025. szeptember 18.",
    time: "08:30 - 15:00",
    location: "Budapest",
    venue: "Budapesti Corvinus Egyetem",
    price: "45.000 Ft",
    category: "Makrogazdaság",
    description:
      "A magyar és nemzetközi makrogazdasági környezet részletes elemzése vezető közgazdászokkal és elemzőkkel.",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
    speakers: [mockSpeakers[0]],
    agenda: [
      "Globális makrogazdasági kilátások",
      "Magyar gazdaság helyzete",
      "Inflációs környezet",
      "Kávészünet",
      "Kamatpolitika és hatások",
      "Q&A és zárás",
    ],
    capacity: 150,
    registered: 89,
    highlights: [
      "MNB szakértők",
      "Gazdasági előrejelzések",
      "Kamatdöntések háttere",
      "Befektetési tanácsok",
    ],
  },
  {
    id: "6",
    title: "Venture Capital & Startup Day",
    subtitle: "Az innováció finanszírozása",
    date: "2025. október 12.",
    time: "10:00 - 18:30",
    location: "Budapest",
    venue: "LOFT - Design Center",
    price: "38.000 Ft",
    category: "Startup",
    description:
      "Startupok, befektetők és vállalkozók találkozója. Pitch versenyek, networking és befektetési lehetőségek.",
    imageUrl:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
    speakers: [mockSpeakers[1]],
    agenda: [
      "VC piac Magyarországon",
      "Startup pitch sessions",
      "Befektetői értékelés",
      "Networking ebéd",
      "Scale-up stratégiák",
      "Afterparty networking",
    ],
    capacity: 350,
    registered: 203,
    highlights: [
      "Pitch competition",
      "1-on-1 befektetői találkozók",
      "Startup showcase",
      "Networking afterparty",
    ],
  },
];

export const getConferenceById = (
  id: string,
): Conference | undefined => {
  return mockConferences.find((conf) => conf.id === id);
};