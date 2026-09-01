import { useEffect } from "react";

import "./Invitation3.css";
import Hero from "./components/Hero/Hero";
import InvitationIntro from "./components/InvitationIntro/InvitationIntro";
import DateSection from "./components/DateSection/DateSection";
import Timeline from "./components/Timeline/Timeline";
import Location from "./components/Location/Location";
import RSVP from "./components/RSVP/RSVP";
import Footer from "./components/Footer/Footer";

function Invitation3() {
  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>(
      ".invitation8-botanical [data-inv8-reveal]",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("inv8-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -7%" },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="invitation8-botanical">
      <Hero />
      <InvitationIntro />
      <DateSection />
      <Timeline />
      <Location />
      <RSVP />
      <Footer />
    </main>
  );
}

export default Invitation3;
