import { useEffect, useState } from "react";

import "./Invitation7.css";
import Hero from "./components/Hero/Hero";
import PhotoIntro from "./components/PhotoIntro/PhotoIntro";
import InvitationMessage from "./components/InvitationMessage/InvitationMessage";
import WeddingDetails from "./components/WeddingDetails/WeddingDetails";
import PhotoStory from "./components/PhotoStory/PhotoStory";
import Location from "./components/Location/Location";
import RSVP from "./components/RSVP/RSVP";
import Footer from "./components/Footer/Footer";
import DoorIntro from "./components/DoorIntro/DoorIntro";
import Countdown from "./components/Countdown/Countdown";

function Invitation7() {
  const [revealed, setRevealed] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".invitation11-wine [data-inv11-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("inv11-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8%" });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function revealInvitation() {
    window.scrollTo(0, 0);
    setRevealed(true);
  }

  return (
    <>
      {showIntro && (
        <DoorIntro
          onReveal={revealInvitation}
          onComplete={() => setShowIntro(false)}
        />
      )}
      <main className={`invitation11-wine ${revealed ? "invitation11-wine--inv11-revealed" : ""}`}>
        <Hero />
        <PhotoIntro />
        <InvitationMessage />
        <WeddingDetails />
        <PhotoStory />
        <Location />
        <Countdown />
        <RSVP />
        <Footer />
      </main>
    </>
  );
}

export default Invitation7;
