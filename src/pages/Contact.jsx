import { useState } from "react";
import { LuPhone, LuMail, LuMapPin, LuSend, LuCheck, LuClock } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa6";
import { Reveal } from "../hooks.jsx";
import { CONTACT } from "../data.js";
import SectionTitle from "../components/SectionTitle.jsx";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const cards = [
    { icon: LuPhone, t: "Call us", v: CONTACT.phone, href: `tel:${CONTACT.tel}` },
    { icon: FaWhatsapp, t: "WhatsApp", v: "Chat instantly", href: `https://wa.me/${CONTACT.tel.replace("+", "")}` },
    { icon: LuMail, t: "Email", v: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: LuClock, t: "Support hours", v: "24 / 7, all year", href: "#/contact" },
  ];
  return (
    <>
      <section className="bg-gradient-to-b from-teal/10 to-white px-5 pb-10 pt-36 sm:px-8">
        <SectionTitle eyebrow="Contact" title="We'd love to plan your trip" sub="Questions about a booking, a partnership or a custom package? Reach out any time." />
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-8 sm:px-8 lg:grid-cols-[.9fr_1.1fr]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {cards.map((c, i) => (
            <Reveal key={c.t} delay={i * 80} variant="reveal-left">
              <a href={c.href} className="card card-hover group flex items-center gap-5 p-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-navy text-white transition-all duration-500 group-hover:bg-teal group-hover:rotate-6"><c.icon size={24} /></span>
                <span className="min-w-0"><span className="block text-xs font-bold uppercase tracking-widest text-teal">{c.t}</span><span className="block break-words font-extrabold">{c.v}</span></span>
              </a>
            </Reveal>
          ))}
          <Reveal variant="reveal-left" className="flex items-center gap-3 rounded-2xl bg-teal/10 px-5 py-4 text-sm font-semibold sm:col-span-2 lg:col-span-1"><LuMapPin className="text-teal" size={20} /> Serving travellers & partners across Thailand</Reveal>
        </div>
        <Reveal variant="reveal-right">
          {sent ? (
            <div className="card grid h-full place-items-center p-12 text-center"><div><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal text-white"><LuCheck size={30} /></span><h3 className="mt-5 text-2xl font-extrabold">Message sent!</h3><p className="mt-2 text-navy/65">Thanks for reaching out — we'll reply shortly.</p></div></div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="card grid gap-4 p-6 shadow-2xl shadow-navy/10 sm:grid-cols-2 sm:p-8">
              <input required className="input" placeholder="Your name" aria-label="Name" />
              <input required type="email" className="input" placeholder="Email address" aria-label="Email" />
              <select className="input sm:col-span-2" defaultValue="" aria-label="I am a">
                <option value="" disabled>I am a…</option><option>Traveller (individual / family)</option><option>Travel business / partner</option>
              </select>
              <input className="input sm:col-span-2" placeholder="Subject" aria-label="Subject" />
              <textarea required rows="5" className="input sm:col-span-2" placeholder="Your message" aria-label="Message" />
              <button className="btn btn-primary sm:col-span-2"><LuSend /> Send message</button>
            </form>
          )}
        </Reveal>
      </section>
    </>
  );
}
