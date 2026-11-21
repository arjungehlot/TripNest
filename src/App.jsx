import { AuthProvider } from "./auth.jsx";
import { useRoute } from "./router.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Business from "./pages/Business.jsx";
import Contact from "./pages/Contact.jsx";
import { Login, Signup } from "./pages/Auth.jsx";
import { Link } from "./router.jsx";

const ROUTES = { "/": Home, "/services": Services, "/business": Business, "/contact": Contact, "/login": Login, "/signup": Signup };

function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-5 pt-24 text-center">
      <div>
        <p className="text-8xl font-extrabold text-teal">404</p>
        <h1 className="mt-4 text-3xl font-extrabold">This destination doesn't exist</h1>
        <Link to="/" className="btn btn-primary mt-8">Back home</Link>
      </div>
    </section>
  );
}

export default function App() {
  const path = useRoute();
  const Page = ROUTES[path] || NotFound;
  return (
    <AuthProvider>
      <Navbar path={path} />
      <main key={path} className="animate-[fadein_.5s_ease] overflow-x-clip">
        <Page />
      </main>
      <Footer />
    </AuthProvider>
  );
}
