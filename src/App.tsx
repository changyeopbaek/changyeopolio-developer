import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useActiveSection } from "./hooks/useActiveSection";
import {
  Layout,
  Header,
  Hero,
  Categories,
  Skills,
  Work,
  Career,
  Comments,
  Contact,
  Footer,
  SectionDivider,
} from "./components";

function App() {
  const activeSection = useActiveSection();
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        const headerHeight = 80;
        const y =
          el.getBoundingClientRect().top + window.scrollY - headerHeight;
        requestAnimationFrame(() => {
          window.scrollTo({ top: y, behavior: "smooth" });
        });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <Layout>
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <SectionDivider />
        <Categories />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Work />
        <SectionDivider />
        <Career />
        <SectionDivider />
        <Comments />
        <SectionDivider />
        <Contact />
        <SectionDivider />
      </main>
      <Footer />
    </Layout>
  );
}

export default App;
