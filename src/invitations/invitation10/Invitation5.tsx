import { useEffect } from "react";

import "./Invitation5.css";
import Hero from "./components/Hero/Hero";
import InvitationIntro from "./components/InvitationIntro/InvitationIntro";
import DateEditorial from "./components/DateEditorial/DateEditorial";
import Schedule from "./components/Schedule/Schedule";
import Countdown from "./components/Countdown/Countdown";
import Location from "./components/Location/Location";
import RSVP from "./components/RSVP/RSVP";
import Footer from "./components/Footer/Footer";

function Invitation5() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".invitation10-editorial [data-inv10-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("inv10-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -7%" });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="invitation10-editorial">
      <Hero />
      <InvitationIntro />
      <DateEditorial />
      <Schedule />
      <Countdown />
      <Location />
      <RSVP />
      <Footer />
    </main>
  );
}

export default Invitation5;
