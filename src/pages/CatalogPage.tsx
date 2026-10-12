import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header/Header";
import Reveal from "../components/motion/Reveal";
import { invitationTemplates } from "../data/invitations";
import "./CatalogPage.css";

const catalogOrder = [
  { slug: "invitation-1", name: "Vrata" },
  { slug: "invitation-7", name: "Akvarel" },
  { slug: "invitation-2", name: "Koverta" },
  { slug: "invitation-8", name: "Monogram" },
  { slug: "invitation-3", name: "Leto" },
  { slug: "invitation-9", name: "Ornament" },
  { slug: "invitation-4", name: "Biser" },
  { slug: "invitation-10", name: "Veo" },
  { slug: "invitation-5", name: "Soft Floral" },
  { slug: "invitation-11", name: "Pečat" },
  { slug: "invitation-6", name: "Blush" },
] as const;

function CatalogPage() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const entries = useMemo(
    () =>
      catalogOrder.map((item) => ({
        name: item.name,
        template: invitationTemplates.find((template) => template.slug === item.slug)!,
      })),
    [],
  );

  const selectedIndex = Math.max(
    0,
    entries.findIndex((entry) => entry.template.slug === slug),
  );
  const selected = entries[selectedIndex] ?? entries[0];

  const open = (index: number) => {
    const next = entries[index];
    if (!next) return;
    navigate(`/katalog/${next.template.slug}`);
  };

  return (
    <>
      <Header variant="page" />
      <main className="catalog">
        <Reveal as="p" className="catalog__lead" kind="slide">
          Vaša priča,
          <em> u jednom linku.</em>
        </Reveal>

        <div className="catalog__stage">
          <button
            type="button"
            className="catalog__arrow catalog__arrow--prev"
            aria-label="Prethodna pozivnica"
            onClick={() => open((selectedIndex - 1 + entries.length) % entries.length)}
          >
            ‹
          </button>

          <div className="catalog-phone">
            <div className="catalog-phone__screen">
              <iframe
                key={selected.template.previewPath}
                src={`${selected.template.previewPath}?embed=1`}
                title={selected.name}
              />
            </div>
          </div>

          <button
            type="button"
            className="catalog__arrow catalog__arrow--next"
            aria-label="Sledeća pozivnica"
            onClick={() => open((selectedIndex + 1) % entries.length)}
          >
            ›
          </button>
        </div>

        <Reveal as="div" kind="up" className="catalog__list-wrap">
        <ol className="catalog__list" aria-label="Pozivnice">
          {entries.map((entry, index) => {
            const active = index === selectedIndex;
            return (
              <li key={entry.template.id}>
                <button
                  type="button"
                  className={active ? "is-on" : ""}
                  aria-current={active ? "true" : undefined}
                  onClick={() => open(index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {entry.name}
                </button>
              </li>
            );
          })}
        </ol>
        </Reveal>
      </main>
    </>
  );
}

export default CatalogPage;
