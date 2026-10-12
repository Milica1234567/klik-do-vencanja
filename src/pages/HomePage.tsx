import FilmMoment from "../components/FilmMoment/FilmMoment";
import Hero from "../components/Hero/Hero";
import InvitationShowcase from "../components/InvitationShowcase/InvitationShowcase";
import Passage from "../components/Passage/Passage";
import ReturnedCopy from "../components/ReturnedCopy/ReturnedCopy";
import Unveil from "../components/Unveil/Unveil";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ContactsAtelier from "../components/Contacts/ContactsAtelier";
import Pricing from "../components/Pricing/Pricing";

function HomePage() {
  return (
    <>
      <main className="home-stack">
        <Header />
        <Hero />
        <Passage />
        <InvitationShowcase />
        <Unveil />
        <FilmMoment />
        <ReturnedCopy />
        <Pricing />
        <ContactsAtelier />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
