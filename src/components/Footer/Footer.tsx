import "./Footer.css";
import Instagram from "../../assets/icons/instagram.png";
import Facebook from "../../assets/icons/facebook.png";
import TikTok from "../../assets/icons/tik-tok.png";
import Logo from "../../assets/logo.png";
function Footer() {
  return (
    <section className="footer">
      <div className="footer_container">
        <div className="footer_logo_container">
          <img src={Logo} alt="Logo"></img>
        </div>
        <div className="menu-container">
          <ul>
            <li>Demo</li>
            <li>Cene</li>
            <li>Kontakt</li>
          </ul>
        </div>
        <div className="social-container">
          <div className="social-icon">
            <a
              href="https://www.instagram.com/klikdovencanja/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Instagram} alt="Instagram"></img>
            </a>
          </div>
          <div className="social-icon">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Facebook} alt="Facebook"></img>
            </a>
          </div>
          <div className="social-icon">
            <a
              href="https://www.tiktok.com/@klikdovencanja"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={TikTok} alt="TikTok"></img>
            </a>
          </div>
          {/*<div className="social-icon">
            <a
              href="mailto:dovencanjaklik@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Email} alt="Email"></img>
            </a>
          </div>*/}
        </div>
      </div>
      <div className="footer_copyright">
        <p>&copy; 2026 Klik do venčanja. Sva prava zadržana.</p>
      </div>
    </section>
  );
}

export default Footer;
