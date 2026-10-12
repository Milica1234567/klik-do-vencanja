import ScrollReveal from "../../shared/ScrollReveal";
import { revealFade } from "../../shared/motion";
import { blushArt } from "../art";
import LineArt from "../components/LineArt";

function saveWeddingDate() {
  const title = "Venčanje Jelene i Stefana";
  const details = "Ceremonija u 17:00. Villa Botanica, Beograd.";
  const location = "Villa Botanica, Beograd";
  const apple = /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (apple) {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Klik do vencanja//Rose blush//SR",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:rose-blush-20270912@klikdovencanja",
      "DTSTAMP:20270912T150000Z",
      "DTSTART:20270912T150000Z",
      "DTEND:20270912T220000Z",
      "SUMMARY:Venčanje Jelene i Stefana",
      "DESCRIPTION:Ceremonija u 17:00. Villa Botanica, Beograd.",
      "LOCATION:Villa Botanica\\, Beograd",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const file = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "vencanje-jelena-stefan.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    return;
  }

  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", title);
  url.searchParams.set("dates", "20270912T150000Z/20270912T220000Z");
  url.searchParams.set("details", details);
  url.searchParams.set("location", location);
  window.open(url.toString(), "_blank", "noopener,noreferrer");
}

function GallerySection() {
  return (
    <ScrollReveal as="section" className="inv6-qb-section" variants={revealFade} amount={0.2} once>
      <article className="inv6-qb-card inv6-qb-card--detail inv6-qb-save" data-section="save">
        <LineArt src={blushArt.butterfly} className="inv6-qb-save__art" />
        <h2 className="inv6-qb-save__title">Sačuvajte dan</h2>
        <p className="inv6-qb-save__date">12. septembar</p>
        <button type="button" className="inv6-qb-btn" onClick={saveWeddingDate}>
          Dodaj u kalendar
        </button>
      </article>
    </ScrollReveal>
  );
}

export default GallerySection;
