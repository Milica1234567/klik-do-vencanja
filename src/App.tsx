import "./App.css";

import Hero from "./components/Hero/Hero";
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
        <Contacts />
        <Pricing/>
      </main>
      <Footer />
    </>
  );
}

export default App;
