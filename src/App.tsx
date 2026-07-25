import "./App.css";

import Benefits from "./components/Benefits/Benefits";
import BenefitsThread from "./components/Benefits/BenefitsThread";
import Hero from "./components/Hero/Hero";
import InvitationShowcase from "./components/InvitationShowcase/InvitationShowcase";
import SectionHandoff from "./components/layout/SectionHandoff";
import TemplateStudio from "./components/TemplateStudio/TemplateStudio";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Contacts from "./components/Contacts/Contacts";
import Pricing from "./components/Pricing/Pricing";

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <InvitationShowcase />
        <SectionHandoff />
        <Benefits />
        <BenefitsThread />
        <TemplateStudio />
        <Contacts />
        <Pricing/>
      </main>
      <Footer />
    </>
  );
}

export default App;
