import "./App.css";

import Benefits from "./components/Benefits/Benefits";
import BenefitsThread from "./components/Benefits/BenefitsThread";
import Hero from "./components/Hero/Hero";
import InvitationShowcase from "./components/InvitationShowcase/InvitationShowcase";
import SectionHandoff from "./components/layout/SectionHandoff";
import TemplateStudio from "./components/TemplateStudio/TemplateStudio";

function App() {
  return (
    <>
      {/* header */}

      <main>
        <Hero />
        <InvitationShowcase />
        <SectionHandoff />
        <Benefits />
        <BenefitsThread />
        <TemplateStudio />
      </main>
      {/* footer */}
    </>
  );
}

export default App;
