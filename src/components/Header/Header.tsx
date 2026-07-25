import { useEffect, useState } from "react";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Lock body scroll when menu is open and restore when closed
    if (menuOpen) document.body.classList.add("menu-open");
    else document.body.classList.remove("menu-open");

    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <section
      className={`header ${menuOpen ? "header--menu-open" : ""}`}
      id="home"
    >
      <div className="header_container">
        <div className="header_logo">Klik do venčanja</div>

        <button
          className={`header_burger ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Zatvori meni" : "Otvori meni"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={`header_nav ${menuOpen ? "header_nav--open" : ""}`}
          aria-hidden={!menuOpen}
        >
          <a href="#home" onClick={closeMenu}>
            Početna
          </a>
          <a href="#demo" onClick={closeMenu}>
            Demo
          </a>
          <a href="#pricing" onClick={closeMenu}>
            Cene
          </a>
          <a href="#contact" onClick={closeMenu}>
            Kontakt
          </a>
        </nav>
      </div>

      <div className="header_content">
        <h1>
          Digitalne pozivnice
          <br />
          <span className="header_span_cursive">za posebne trenutke</span>
        </h1>
        <p className="header_span_p">
          Elegantne, interaktivne i potpuno personalizovane <br /> pozivnice za
          sve tipove proslava
        </p>
      </div>
      <div>
        <a
          href="#"
          className="scroll-indicator"
          aria-label="Scroll down"
        >
          <svg width="28" height="42" viewBox="0 0 28 42">
            <path
              d="M4 12 L14 22 L24 12"
              stroke="currentColor"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 22 L14 32 L24 22"
              stroke="currentColor"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}

export default Header;
