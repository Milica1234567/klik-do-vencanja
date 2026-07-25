import "./App.css";

import Benefits from "./components/Benefits/Benefits";
import BenefitsThread from "./components/Benefits/BenefitsThread";
import Hero from "./components/Hero/Hero";
import InvitationShowcase from "./components/InvitationShowcase/InvitationShowcase";
import SectionHandoff from "./components/layout/SectionHandoff";
// import TemplateStudio from "./components/TemplateStudio/TemplateStudio";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// import Contacts from "./components/Contacts/Contacts";
import ContactsAtelier from "./components/Contacts/ContactsAtelier";
import Pricing from "./components/Pricing/Pricing";

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <BenefitsThread />
        <InvitationShowcase />
        <SectionHandoff />
        <Benefits />
        {/* <TemplateStudio /> temporarily hidden */}
        <Pricing />
        {/* <Contacts /> temporarily hidden */}
        <ContactsAtelier />
      </main>
      <Footer />
    </>
  );
}

export default App;
