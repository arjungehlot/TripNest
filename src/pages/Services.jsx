import { useState } from "react";
import { LuArrowRight, LuBadgePercent } from "react-icons/lu";
import { Link } from "../router.jsx";
import { Reveal } from "../hooks.jsx";
import { SERVICES } from "../data.js";
import { useAuth } from "../auth.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { CTA } from "./Home.jsx";

const CATS = ["All", "Sky", "Water", "Wildlife", "Travel"];

export default function Services() {
  const [cat, setCat] = useState("All");
  const { user } = useAuth();
  const list = SERVICES.filter((s) => cat === "All" || s.cat === cat);
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-teal/10 to-white px-5 pb-12 pt-36 sm:px-8">
        <div className="absolute -right-24 top-20 -z-0 h-80 w-80 rounded-full bg-teal/15 blur-3xl" />
        <SectionTitle eyebrow="Services" title="Experiences you'll never forget" sub="Pick a category or browse everything. Businesses get net rates after logging in to a partner account." />
        <Reveal className="relative mt-10 flex flex-wrap justify-center gap-2">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-5 py-2.5 text-sm font-bold transition-all duration-300 ${cat === c ? "border-navy bg-navy text-white shadow-lg shadow-navy/20" : "border-navy/15 bg-white hover:border-teal hover:text-teal"}`}>{c}</button>
          ))}
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <article key={s.id} className="card card-hover group relative flex flex-col overflow-hidden" style={{ animation: `fadein .5s ease ${i * 60}ms both` }}>
              <div className="relative grid h-40 place-items-center overflow-hidden bg-navy">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-teal/40 transition-transform duration-700 group-hover:scale-[2]" />
                <div className="absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-white/10" />
                <s.icon className="relative text-white transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6" size={60} />
                <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur">{s.cat}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-extrabold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/65">{s.desc}</p>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-navy/50">From</p>
                    <p className="text-2xl font-extrabold text-teal">{s.from}</p>
                  </div>
                  <Link to={user ? "/contact" : "/login"} className="btn btn-navy !px-5 !py-2.5">Book now <LuArrowRight /></Link>
                </div>
                <p className="mt-4 flex items-center gap-2 border-t border-navy/10 pt-4 text-xs font-semibold text-navy/60"><LuBadgePercent className="text-teal" size={16} /> Partners save up to 25% with net rates</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <div className="mt-24"><CTA /></div>
    </>
  );
}
