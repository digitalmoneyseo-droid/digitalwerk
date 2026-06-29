import { useEffect, useMemo, useState } from "react";
import { siteContent } from "./data/siteContent";
import { HomeOne } from "./pages/HomeDesigns";
import { SubPage } from "./pages/SubPage";

const homeRoutes = new Set(["/"]);

function normalizePath(pathname: string) {
  const clean = pathname.replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
}

export default function App() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  const navigate = (href: string) => {
    if (!href.startsWith("/")) return;
    const next = normalizePath(href);
    window.history.pushState({}, "", next);
    setPath(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const routeName =
      path === "/"
        ? "Webdesign, SEO und Performance Marketing"
        : siteContent.subpages.find((page) => page.href === path)?.title;
    document.title = routeName ? `${siteContent.brand.name} - ${routeName}` : `${siteContent.brand.name} - ${siteContent.brand.descriptor}`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", siteContent.meta.defaultDescription);
  }, [path]);

  const subpage = useMemo(() => siteContent.subpages.find((page) => page.href === path), [path]);

  if (path === "/") return <HomeOne onNavigate={navigate} />;
  if (subpage) return <SubPage page={subpage} onNavigate={navigate} />;

  return <SubPage page={null} onNavigate={navigate} knownRoute={homeRoutes.has(path)} />;
}
