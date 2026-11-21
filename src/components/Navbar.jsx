import { useEffect, useState } from "react";
import { LuMenu, LuX, LuLogOut, LuArrowRight } from "react-icons/lu";
import { Link } from "../router.jsx";
import { NAV } from "../data.js";
import { useAuth } from "../auth.jsx";
import Logo from "./Logo.jsx";

export default function Navbar({ path }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "bg-white/90 shadow-lg shadow-navy/5 backdrop-blur-xl" : "bg-transparent"}`}>
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Link to="/" aria-label="TripNest home"><Logo /></Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => {
            const active = path === n.to;
            return (
              <li key={n.to}>
                <Link to={n.to} className={`group relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${active ? "text-teal" : "text-navy hover:text-teal"}`}>
                  {n.label}
                  <span className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded bg-teal transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <span className="flex items-center gap-2 text-sm font-semibold">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-sm font-bold uppercase text-white">{user.name[0]}</span>
                <span className="max-w-[110px] truncate capitalize">{user.name}</span>
              </span>
              <button onClick={logout} className="btn btn-ghost !px-4 !py-2"><LuLogOut /> Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-full px-4 py-2 text-sm font-semibold text-navy transition hover:text-teal">Log in</Link>
              <Link to="/signup" className="btn btn-primary !py-2.5">Sign up <LuArrowRight /></Link>
            </>
          )}
        </div>

        <button className="grid h-11 w-11 place-items-center rounded-full text-navy transition hover:bg-navy/5 lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <LuX size={24} /> : <LuMenu size={24} />}
        </button>
      </nav>

      {/* mobile drawer */}
      <div className={`grid overflow-hidden transition-all duration-500 lg:hidden ${open ? "h-[calc(100vh-72px)]" : "h-0"}`}>
        <div className="flex flex-col gap-1 overflow-y-auto px-5 pb-10 pt-2">
          {NAV.map((n, i) => (
            <Link key={n.to} to={n.to} style={{ transitionDelay: `${open ? i * 60 : 0}ms` }}
              className={`rounded-2xl px-4 py-4 text-lg font-bold transition-all duration-500 ${open ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"} ${path === n.to ? "bg-teal/10 text-teal" : "text-navy hover:bg-navy/5"}`}>
              {n.label}
            </Link>
          ))}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {user ? (
              <button onClick={logout} className="btn btn-ghost col-span-2"><LuLogOut /> Logout ({user.name})</button>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">Log in</Link>
                <Link to="/signup" className="btn btn-primary">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
