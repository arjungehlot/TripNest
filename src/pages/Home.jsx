import { useState } from "react";
import { LuArrowRight, LuSearch, LuStar, LuShieldCheck, LuHeadset, LuBadgePercent, LuUsers, LuBriefcase, LuCheck, LuQuote, LuSparkles, LuCalendarCheck, LuTicket } from "react-icons/lu";
import { Link, navigate } from "../router.jsx";
import { Reveal, Counter } from "../hooks.jsx";
import { SERVICES } from "../data.js";
import Scene from "../components/Scene.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

const AUDIENCE = {
  b2c: {
    label: "Travellers",
    icon: LuUsers,
    title: <>Your nest for every <span className="text-gradient">adventure.</span></>,
    sub: "Book flights, hotels, yacht parties, skydiving, jet ski and more in minutes. Honest prices, verified partners, and a human on the other end of the line.",
    cta: ["Start exploring", "/services"],
    cta2: ["Create free account", "/signup"],
  },
  b2b: {
    label: "Businesses",
    icon: LuBriefcase,
    title: <>The travel engine behind <span className="text-gradient">your business.</span></>,
    sub: "Agencies, hotels, corporates and resellers get wholesale rates, bulk booking tools, white-label pages and a partner dashboard — all in one platform.",
    cta: ["Explore partner tools", "/business"],
    cta2: ["Become a partner", "/signup"],
  },
};

function Hero() {
  const [mode, setMode] = useState("b2c");
  const [q, setQ] = useState({ service: "", date: "", guests: "2" });
  const a = AUDIENCE[mode];
  return (
    <section className="relative overflow-hidden pt-[72px]">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-teal/10 via-white to-white" />
      <div className="absolute -left-40 top-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-teal/15 blur-3xl" />
      <div className="absolute -right-32 top-10 -z-10 h-96 w-96 rounded-full bg-navy/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:pb-28 lg:pt-16">
        <div>
          {/* B2C / B2B switch */}
          <div className="inline-flex rounded-full border border-navy/10 bg-white p-1 shadow-sm" role="tablist" aria-label="Who are you?">
            {Object.entries(AUDIENCE).map(([k, v]) => (
              <button key={k} role="tab" aria-selected={mode === k} onClick={() => setMode(k)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${mode === k ? "bg-navy text-white shadow-md" : "text-navy/70 hover:text-teal"}`}>
                <v.icon size={16} /> {v.label}
              </button>
            ))}
          </div>

          <div key={mode} className="animate-[fadein_.6s_ease]">
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">{a.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-navy/70 sm:text-lg">{a.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={a.cta[1]} className="btn btn-primary">{a.cta[0]} <LuArrowRight /></Link>
              <Link to={a.cta2[1]} className="btn btn-ghost">{a.cta2[0]}</Link>
            </div>
          </div>

          {mode === "b2c" ? (
            <form onSubmit={(e) => { e.preventDefault(); navigate("/services"); }} className="mt-10 grid gap-3 rounded-3xl border border-navy/10 bg-white p-3 shadow-xl shadow-navy/10 sm:grid-cols-[1.3fr_1fr_.7fr_auto]">
              <select value={q.service} onChange={(e) => setQ({ ...q, service: e.target.value })} className="input !border-0 !bg-navy/[.04]" aria-label="Service">
                <option value="">Choose experience…</option>
                {SERVICES.map((s) => <option key={s.id}>{s.title}</option>)}
              </select>
              <input type="date" value={q.date} onChange={(e) => setQ({ ...q, date: e.target.value })} className="input !border-0 !bg-navy/[.04]" aria-label="Date" />
              <input type="number" min="1" max="50" value={q.guests} onChange={(e) => setQ({ ...q, guests: e.target.value })} className="input !border-0 !bg-navy/[.04]" aria-label="Guests" />
              <button className="btn btn-navy !rounded-2xl"><LuSearch /> Search</button>
            </form>
          ) : (
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {["Wholesale net rates", "Bulk & group booking", "White-label booking pages", "Dedicated account manager"].map((t) => (
                <li key={t} className="flex items-center gap-3 rounded-2xl border border-navy/10 bg-white px-4 py-3 text-sm font-semibold shadow-sm"><span className="grid h-6 w-6 place-items-center rounded-full bg-teal text-white"><LuCheck size={14} /></span>{t}</li>
              ))}
            </ul>
          )}

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {["A", "M", "S", "K"].map((l, i) => (
                <span key={l} className={`grid h-10 w-10 place-items-center rounded-full border-2 border-white text-sm font-bold text-white ${i % 2 ? "bg-teal" : "bg-navy"}`}>{l}</span>
              ))}
            </div>
            <div>
              <div className="flex text-teal">{[...Array(5)].map((_, i) => <LuStar key={i} size={16} fill="currentColor" />)}</div>
              <p className="text-xs font-semibold text-navy/65">Loved by 25,000+ travellers & 400+ partners</p>
            </div>
          </div>
        </div>

        {/* visual */}
        <div className="relative mx-auto w-full max-w-[560px]">
          <div className="absolute inset-6 -z-10 rotate-6 rounded-[3rem] bg-teal/20" />
          <div className="absolute -inset-3 -z-10 -rotate-3 rounded-[3rem] border-2 border-dashed border-navy/15" />
          <Scene className="w-full drop-shadow-2xl" />
          <div className="animate-float absolute -left-3 top-16 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-navy/15 sm:-left-8">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal text-white"><LuShieldCheck size={20} /></span>
            <div><p className="text-sm font-extrabold">Safety certified</p><p className="text-xs text-navy/60">Verified operators</p></div>
          </div>
          <div className="animate-float-slow absolute -right-2 bottom-24 flex items-center gap-3 rounded-2xl bg-navy px-4 py-3 text-white shadow-xl shadow-navy/30 sm:-right-6">
            <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-white/15"><span className="animate-pulse-ring absolute inset-0 rounded-xl bg-teal" /><LuHeadset size={20} className="relative" /></span>
            <div><p className="text-sm font-extrabold">24/7 support</p><p className="text-xs text-white/70">Real humans</p></div>
          </div>
          <div className="animate-float absolute bottom-6 left-6 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-navy/15">
            <p className="text-xs font-semibold text-navy/60">Experiences from</p>
            <p className="text-2xl font-extrabold text-teal">฿700</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...SERVICES, ...SERVICES];
  return (
    <div className="overflow-hidden border-y border-navy/10 bg-navy py-4 text-white" aria-hidden>
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-10 text-sm font-bold uppercase tracking-widest">
            <span className="flex items-center gap-3"><s.icon className="text-teal" size={18} />{s.title}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Audience() {
  const cards = [
    { icon: LuUsers, tag: "B2C", title: "For travellers", text: "Plan your whole trip in one place and pay securely. No hidden fees, instant confirmations.", points: ["Flights, stays & activities together", "Free cancellation on selected bookings", "Chat support in your language", "Member-only deals and rewards"], to: "/services", cta: "Browse experiences", dark: false },
    { icon: LuBriefcase, tag: "B2B", title: "For businesses", text: "Resell, bundle and manage travel at scale with tools built for agencies, hotels and corporates.", points: ["Net wholesale rates & commissions", "API and white-label booking engine", "Bulk bookings & invoicing", "Partner dashboard with live reports"], to: "/business", cta: "See partner programme", dark: true },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <SectionTitle eyebrow="Built for everyone" title="One platform, two ways to travel" sub="Whether you're booking a weekend getaway or running a travel business, TripNest fits the way you work." />
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {cards.map((c, i) => (
          <Reveal key={c.tag} variant={i ? "reveal-right" : "reveal-left"} className={`group relative overflow-hidden rounded-[2rem] p-8 sm:p-10 ${c.dark ? "bg-navy text-white" : "border border-navy/10 bg-teal/[.07]"}`}>
            <div className={`absolute -right-16 -top-16 h-56 w-56 rounded-full transition-transform duration-700 group-hover:scale-150 ${c.dark ? "bg-teal/30" : "bg-teal/20"}`} />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className={`grid h-14 w-14 place-items-center rounded-2xl ${c.dark ? "bg-teal text-white" : "bg-navy text-white"}`}><c.icon size={26} /></span>
                <span className={`rounded-full px-4 py-1 text-xs font-extrabold tracking-widest ${c.dark ? "bg-white/10" : "bg-white text-teal"}`}>{c.tag}</span>
              </div>
              <h3 className="mt-6 text-2xl font-extrabold sm:text-3xl">{c.title}</h3>
              <p className={`mt-3 ${c.dark ? "text-white/75" : "text-navy/70"}`}>{c.text}</p>
              <ul className="mt-6 space-y-3">
                {c.points.map((p) => <li key={p} className="flex items-center gap-3 text-sm font-semibold"><LuCheck className="shrink-0 text-teal" size={18} />{p}</li>)}
              </ul>
              <Link to={c.to} className={`btn mt-8 ${c.dark ? "btn-light" : "btn-navy"}`}>{c.cta} <LuArrowRight /></Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="relative bg-teal/[.06] py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle eyebrow="Our services" title="Everything for the perfect trip" sub="From the sky to the sea — ten experiences, one simple booking flow." />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 5) * 70} variant="reveal-zoom">
              <Link to="/services" className="card card-hover group flex h-full flex-col items-center p-4 text-center sm:p-6">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-navy text-white transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-teal"><s.icon size={28} /></span>
                <h3 className="mt-5 text-lg font-extrabold">{s.title}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-teal">from {s.from}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center"><Link to="/services" className="btn btn-primary">View all services <LuArrowRight /></Link></Reveal>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [[25000, "+", "Happy travellers"], [400, "+", "Business partners"], [10, "", "Signature experiences"], [98, "%", "Satisfaction rate"]];
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white">
      <div className="animate-spin-slow absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full border-[40px] border-teal/15" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-4">
        {stats.map(([n, s, l], i) => (
          <Reveal key={l} delay={i * 100} className="text-center">
            <p className="text-5xl font-extrabold text-white"><Counter to={n} suffix={s} /></p>
            <div className="mx-auto mt-3 h-1 w-10 rounded bg-teal" />
            <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-white/70">{l}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function How() {
  const steps = [
    { icon: LuSearch, t: "Discover", d: "Browse experiences, compare prices and pick your date." },
    { icon: LuTicket, t: "Book", d: "Secure checkout with instant e-voucher and confirmation." },
    { icon: LuCalendarCheck, t: "Enjoy", d: "Show up and have fun — we handle pickups and support." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <SectionTitle eyebrow="How it works" title="Booking in three easy steps" />
      <div className="relative mt-16 grid gap-8 md:grid-cols-3">
        <div className="absolute left-[16%] right-[16%] top-10 hidden border-t-2 border-dashed border-teal/40 md:block" />
        {steps.map((s, i) => (
          <Reveal key={s.t} delay={i * 120} className="relative text-center">
            <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-navy text-white shadow-xl shadow-navy/25 transition-transform duration-500 hover:scale-110 hover:bg-teal">
              <s.icon size={30} />
              <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-teal text-xs font-extrabold ring-4 ring-white">{i + 1}</span>
            </div>
            <h3 className="mt-6 text-xl font-extrabold">{s.t}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm text-navy/65">{s.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Why() {
  const f = [
    { icon: LuBadgePercent, t: "Best-price promise", d: "Direct operator rates with no hidden markups." },
    { icon: LuShieldCheck, t: "Verified & insured", d: "Every partner is vetted for safety and quality." },
    { icon: LuHeadset, t: "24/7 human support", d: "Call, chat or email — anytime, any timezone." },
    { icon: LuSparkles, t: "Smart tech", d: "Fast booking engine, instant vouchers, live availability." },
  ];
  return (
    <section className="bg-teal/[.06] py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal variant="reveal-left">
          <SectionTitle center={false} eyebrow="Why TripNest" title="Travel tech that feels personal" sub="We combine a modern booking platform with local expertise, so every trip — for one traveller or a thousand — runs smoothly." />
          <Link to="/signup" className="btn btn-navy mt-8">Join TripNest <LuArrowRight /></Link>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {f.map((x, i) => (
            <Reveal key={x.t} delay={i * 90} variant="reveal-right" className="card card-hover p-6">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal/10 text-teal"><x.icon size={24} /></span>
              <h3 className="mt-4 text-lg font-extrabold">{x.t}</h3>
              <p className="mt-1 text-sm text-navy/65">{x.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { n: "Anna K.", r: "Traveller · Germany", q: "Booked skydiving, jet ski and a yacht party in one go. Zero stress and the team was brilliant." },
    { n: "Rahul M.", r: "Owner · Horizon Travels", q: "Net rates and the partner dashboard doubled our activity bookings in a single season." },
    { n: "Sophie L.", r: "Traveller · France", q: "The Coral Island trip was the highlight of our holiday. Booking took two minutes." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <SectionTitle eyebrow="Testimonials" title="Trusted by travellers and partners" />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {t.map((x, i) => (
          <Reveal key={x.n} delay={i * 110} className="card card-hover relative p-8">
            <LuQuote className="absolute right-6 top-6 text-teal/25" size={44} />
            <div className="flex text-teal">{[...Array(5)].map((_, k) => <LuStar key={k} size={16} fill="currentColor" />)}</div>
            <p className="mt-4 leading-relaxed text-navy/80">“{x.q}”</p>
            <div className="mt-6 flex items-center gap-3">
              <span className={`grid h-11 w-11 place-items-center rounded-full font-bold text-white ${i % 2 ? "bg-teal" : "bg-navy"}`}>{x.n[0]}</span>
              <div><p className="text-sm font-extrabold">{x.n}</p><p className="text-xs text-navy/60">{x.r}</p></div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8">
      <Reveal variant="reveal-zoom" className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-navy via-navy to-teal p-10 text-center text-white sm:p-16">
        <div className="animate-float absolute -left-10 top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="animate-float-slow absolute -bottom-16 right-10 h-60 w-60 rounded-full bg-teal/40 blur-2xl" />
        <h2 className="relative mx-auto max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">Ready to build your next adventure?</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-white/80">Create a free account in under a minute — as a traveller or as a business partner.</p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/signup" className="btn btn-light">Create account <LuArrowRight /></Link>
          <Link to="/contact" className="btn border border-white/40 text-white hover:bg-white/10">Talk to us</Link>
        </div>
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (<><Hero /><Marquee /><Audience /><ServicesPreview /><Stats /><How /><Why /><Testimonials /><CTA /></>);
}
