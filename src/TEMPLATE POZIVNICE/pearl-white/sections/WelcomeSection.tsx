import ScrollReveal from "../../shared/ScrollReveal";
import { revealFade } from "../../shared/motion";
import floral1 from "../assets/floral-1.png";
import PaperSheet from "../components/PaperSheet";
import type { PearlWhiteContent } from "../content";

type WelcomeSectionProps = {
  content: PearlWhiteContent;
};

function WelcomeSection({ content }: WelcomeSectionProps) {
  const welcome = content.welcome;
  if (!welcome) return null;

  return (
    <ScrollReveal as="section" className="bs-section bs-welcome" variants={revealFade}>
      <PaperSheet>
        <h2 className="bs-script">{welcome.greeting}</h2>
        <p className="bs-body">{welcome.body}</p>
      </PaperSheet>
      <img
        className="bs-float-floral bs-float-floral--welcome"
        src={floral1}
        alt=""
        draggable={false}
      />
    </ScrollReveal>
  );
}

export default WelcomeSection;
