import { LuSailboat, LuPlane, LuArrowDownToLine, LuWaves, LuHotel, LuFish, LuWind, LuCableCar, LuTreePalm, LuCat } from "react-icons/lu";

export const CONTACT = { phone: "+66 61 376 7464", tel: "+66613767464", email: "tripnesttraveltech@gmail.com" };

export const SERVICES = [
  { id: "yacht", title: "Yacht Party", icon: LuSailboat, cat: "Water", desc: "Private and group yacht charters with music, food and sunset cruises across the Andaman Sea.", from: "฿8,500" },
  { id: "flights", title: "Flight Tickets", icon: LuPlane, cat: "Travel", desc: "Domestic and international fares with flexible dates, instant e-tickets and 24/7 support.", from: "฿1,990" },
  { id: "skydive", title: "Skydiving", icon: LuArrowDownToLine, cat: "Sky", desc: "Tandem jumps with certified instructors, GoPro footage and complete safety briefing.", from: "฿12,000" },
  { id: "jetski", title: "Jet Ski", icon: LuWaves, cat: "Water", desc: "High-speed rides over turquoise water. Guided tours or solo sessions for every skill level.", from: "฿1,200" },
  { id: "hotel", title: "Hotel Booking", icon: LuHotel, cat: "Travel", desc: "Handpicked resorts, villas and boutique stays with best-rate guarantee and free cancellation options.", from: "฿900" },
  { id: "dolphin", title: "Dolphin Show", icon: LuFish, cat: "Wildlife", desc: "Family-friendly marine shows and close encounters in a responsibly run venue.", from: "฿700" },
  { id: "paraglide", title: "Paragliding", icon: LuWind, cat: "Sky", desc: "Soar above the coastline with expert pilots and breathtaking views of limestone islands.", from: "฿2,800" },
  { id: "zip", title: "Ziplining", icon: LuCableCar, cat: "Sky", desc: "Race through the jungle canopy on world-class lines with full safety gear.", from: "฿1,800" },
  { id: "coral", title: "Coral Island", icon: LuTreePalm, cat: "Water", desc: "Snorkelling, glass-bottom boats and white-sand beaches on a perfect day trip.", from: "฿1,500" },
  { id: "tiger", title: "Tiger Park", icon: LuCat, cat: "Wildlife", desc: "Walk through a protected park and see majestic tigers up close with trained handlers.", from: "฿1,000" },
];

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/business", label: "For Business" },
  { to: "/contact", label: "Contact" },
];
