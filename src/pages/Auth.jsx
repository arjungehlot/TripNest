import { useState } from "react";
import { LuMail, LuLock, LuUser, LuEye, LuEyeOff, LuBuilding2, LuArrowRight, LuCheck, LuPhone, LuUsers, LuBriefcase } from "react-icons/lu";
import { FaGoogle, FaFacebookF } from "react-icons/fa6";
import { Link, navigate } from "../router.jsx";
import { useAuth } from "../auth.jsx";
import Scene from "../components/Scene.jsx";

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

function Field({ icon: Icon, error, right, ...p }) {
  return (
    <div>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" size={18} />
        <input {...p} aria-invalid={!!error} className={`input !pl-11 ${right ? "!pr-12" : ""} ${error ? "!border-navy !ring-4 !ring-navy/10" : ""}`} />
        {right}
      </div>
      {error && <p className="mt-1.5 pl-1 text-xs font-semibold text-teal" role="alert">{error}</p>}
    </div>
  );
}

function Shell({ title, sub, children, footer }) {
  return (
    <section className="grid min-h-screen pt-[72px] lg:grid-cols-2">
      {/* brand panel */}
      <aside className="relative hidden overflow-hidden bg-navy text-white lg:block">
        <div className="animate-spin-slow absolute -left-32 -top-32 h-[32rem] w-[32rem] rounded-full border-[48px] border-teal/20" />
        <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-teal/30 blur-3xl" />
        <div className="relative flex h-full flex-col justify-center px-14 py-12 xl:px-20">
          <h2 className="max-w-md text-4xl font-extrabold leading-tight">Adventure starts with a <span className="text-teal">single click.</span></h2>
          <p className="mt-4 max-w-md text-white/70">Join thousands of travellers and hundreds of businesses booking smarter with TripNest.</p>
          <Scene className="mt-8 w-full max-w-md" />
          <ul className="mt-8 grid max-w-md gap-3 text-sm font-semibold">
            {["Instant e-vouchers & confirmations", "Partner net rates for businesses", "24/7 human support"].map((t) => <li key={t} className="flex items-center gap-3"><span className="grid h-6 w-6 place-items-center rounded-full bg-teal"><LuCheck size={14} /></span>{t}</li>)}
          </ul>
        </div>
      </aside>

      <div className="relative grid place-items-center px-5 py-12 sm:px-10">
        <div className="absolute right-0 top-0 -z-10 h-72 w-72 rounded-full bg-teal/10 blur-3xl" />
        <div className="w-full max-w-md animate-[fadein_.6s_ease]">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
          <p className="mt-2 text-navy/65">{sub}</p>
          {children}
          <p className="mt-8 text-center text-sm text-navy/70">{footer}</p>
        </div>
      </div>
    </section>
  );
}

function TypeSwitch({ value, onChange }) {
  const opts = [["traveller", "Traveller", LuUsers], ["business", "Business", LuBriefcase]];
  return (
    <div className="relative mt-8 grid grid-cols-2 rounded-2xl bg-navy/[.06] p-1" role="tablist">
      <span className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-xl bg-navy shadow-md transition-all duration-300 ${value === "business" ? "left-[calc(50%+2px)]" : "left-1"}`} />
      {opts.map(([k, l, I]) => (
        <button type="button" key={k} role="tab" aria-selected={value === k} onClick={() => onChange(k)} className={`relative z-10 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-colors ${value === k ? "text-white" : "text-navy/70"}`}><I size={16} /> {l}</button>
      ))}
    </div>
  );
}

function Social() {
  return (
    <>
      <div className="my-6 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-navy/40"><span className="h-px flex-1 bg-navy/10" />or continue with<span className="h-px flex-1 bg-navy/10" /></div>
      <div className="grid grid-cols-2 gap-3">
        <button type="button" className="btn btn-ghost"><FaGoogle /> Google</button>
        <button type="button" className="btn btn-ghost"><FaFacebookF /> Facebook</button>
      </div>
    </>
  );
}

const PwToggle = ({ show, set }) => (
  <button type="button" onClick={() => set(!show)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-navy/50 transition hover:bg-navy/5 hover:text-teal">{show ? <LuEyeOff size={18} /> : <LuEye size={18} />}</button>
);

export function Login() {
  const { login } = useAuth();
  const [type, setType] = useState("traveller");
  const [f, setF] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [err, setErr] = useState({});
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!emailOk(f.email)) er.email = "Enter a valid email address";
    if (f.password.length < 6) er.password = "Password must be at least 6 characters";
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    await login({ ...f, type });
    navigate(type === "business" ? "/business" : "/services");
  };
  return (
    <Shell title="Welcome back" sub="Log in to manage your bookings and trips." footer={<>New to TripNest? <Link to="/signup" className="font-bold text-teal hover:underline">Create an account</Link></>}>
      <TypeSwitch value={type} onChange={setType} />
      <form onSubmit={submit} noValidate className="mt-6 space-y-4">
        <Field icon={LuMail} type="email" placeholder="Email address" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} error={err.email} />
        <Field icon={LuLock} type={show ? "text" : "password"} placeholder="Password" autoComplete="current-password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} error={err.password} right={<PwToggle show={show} set={setShow} />} />
        <div className="flex items-center justify-between text-sm">
          <label className="flex cursor-pointer items-center gap-2 font-semibold"><input type="checkbox" className="h-4 w-4 accent-teal" /> Remember me</label>
          <a href="#/login" className="font-bold text-teal hover:underline">Forgot password?</a>
        </div>
        <button disabled={busy} className="btn btn-primary w-full !py-3.5 disabled:opacity-70">{busy ? <Spinner /> : <>Log in <LuArrowRight /></>}</button>
      </form>
      <Social />
    </Shell>
  );
}

const Spinner = () => <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />;

function strength(p) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}

export function Signup() {
  const { signup } = useAuth();
  const [type, setType] = useState("traveller");
  const [f, setF] = useState({ name: "", company: "", email: "", phone: "", password: "", agree: false });
  const [show, setShow] = useState(false);
  const [err, setErr] = useState({});
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  const s = strength(f.password);

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (f.name.trim().length < 2) er.name = "Please enter your full name";
    if (type === "business" && f.company.trim().length < 2) er.company = "Please enter your company name";
    if (!emailOk(f.email)) er.email = "Enter a valid email address";
    if (f.password.length < 8) er.password = "Use at least 8 characters";
    if (!f.agree) er.agree = "Please accept the terms to continue";
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    await signup({ ...f, type });
    navigate(type === "business" ? "/business" : "/services");
  };

  return (
    <Shell title="Create your account" sub="Free to join. Takes less than a minute." footer={<>Already have an account? <Link to="/login" className="font-bold text-teal hover:underline">Log in</Link></>}>
      <TypeSwitch value={type} onChange={setType} />
      <form onSubmit={submit} noValidate className="mt-6 space-y-4">
        <Field icon={LuUser} placeholder="Full name" autoComplete="name" value={f.name} onChange={set("name")} error={err.name} />
        {type === "business" && <Field icon={LuBuilding2} placeholder="Company name" autoComplete="organization" value={f.company} onChange={set("company")} error={err.company} />}
        <Field icon={LuMail} type="email" placeholder={type === "business" ? "Work email" : "Email address"} autoComplete="email" value={f.email} onChange={set("email")} error={err.email} />
        <Field icon={LuPhone} type="tel" placeholder="Phone / WhatsApp (optional)" autoComplete="tel" value={f.phone} onChange={set("phone")} />
        <div>
          <Field icon={LuLock} type={show ? "text" : "password"} placeholder="Create password" autoComplete="new-password" value={f.password} onChange={set("password")} error={err.password} right={<PwToggle show={show} set={setShow} />} />
          <div className="mt-2 flex gap-1.5" aria-hidden>
            {[0, 1, 2, 3].map((i) => <span key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i < s ? "bg-teal" : "bg-navy/10"}`} />)}
          </div>
          <p className="mt-1 pl-1 text-xs text-navy/55">{f.password ? ["Too weak", "Weak", "Good", "Strong", "Excellent"][s] : "Use 8+ characters with letters, numbers & symbols"}</p>
        </div>
        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm"><input type="checkbox" checked={f.agree} onChange={set("agree")} className="mt-0.5 h-4 w-4 accent-teal" /><span>I agree to the <a href="#/signup" className="font-bold text-teal hover:underline">Terms</a> and <a href="#/signup" className="font-bold text-teal hover:underline">Privacy Policy</a></span></label>
          {err.agree && <p className="mt-1.5 pl-7 text-xs font-semibold text-teal" role="alert">{err.agree}</p>}
        </div>
        <button disabled={busy} className="btn btn-primary w-full !py-3.5 disabled:opacity-70">{busy ? <Spinner /> : <>{type === "business" ? "Create partner account" : "Create account"} <LuArrowRight /></>}</button>
      </form>
      <Social />
    </Shell>
  );
}
