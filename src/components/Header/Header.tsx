import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

type HeaderProps = {
  /** `landing` = full hero header; `page` = compact nav for inner routes */
  variant?: "landing" | "page";
};

function Header({ variant = "landing" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isPage = variant === "page";

  useEffect(() => {
    if (menuOpen) document.body.classList.add("menu-open");
    else document.body.classList.remove("menu-open");

    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <section
      className={`header ${menuOpen ? "header--menu-open" : ""} ${isPage ? "header--page" : ""}`}
      id={isPage ? undefined : "home"}
    >
      <div className="header_container">
        <Link className="header_logo" to="/" onClick={closeMenu}>
          Klik do venčanja
        </Link>

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
          <Link to="/" onClick={closeMenu}>
            Početna
          </Link>
          <Link to="/katalog" onClick={closeMenu}>
            Katalog
          </Link>
          {!isPage ? <span className="header_nav-gap" aria-hidden="true" /> : null}
          <Link to="/#invitation-showcase" onClick={closeMenu}>
            Demo
          </Link>
          <Link to="/#cenovnik" onClick={closeMenu}>
            Cene
          </Link>
          <Link to="/#contacts-atelier" onClick={closeMenu}>
            Kontakt
          </Link>
        </nav>

        {!isPage && (
          <Link className="header_talk" to="/#contacts-atelier" onClick={closeMenu}>
            Razgovor
          </Link>
        )}
      </div>
    </section>
  );
}

export default Header;
