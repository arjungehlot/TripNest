import { useEffect, useState } from "react";

// Tiny dependency-free hash router (works on any static host, no server config).
const getPath = () => (window.location.hash.replace(/^#/, "") || "/").split("?")[0];

export function useRoute() {
  const [path, setPath] = useState(getPath());
  useEffect(() => {
    const onChange = () => {
      setPath(getPath());
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return path;
}

export const navigate = (to) => { window.location.hash = to; };

export function Link({ to, children, ...props }) {
  return <a href={`#${to}`} {...props}>{children}</a>;
}
