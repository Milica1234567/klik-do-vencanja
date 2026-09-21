import type { InvitationContent } from "../../shared/types";
import EmbossedLeaves from "../components/EmbossedLeaves";
import MonogramSeal from "../components/MonogramSeal";
import { dustyBlueSealCopy, envelopeClosed } from "../content";

type SpreadSectionProps = {
  content: InvitationContent;
};

function SpreadSection({ content }: SpreadSectionProps) {
  const { couple, announcement, venue, monogram, quote, dressCode } = content;
  const joiner = couple.joiner ?? "&";
  const copy = dustyBlueSealCopy;

  return (
    <div className="dbs-stage-wrap">
      <div className="dbs-stage" data-section="spread" aria-label="Pozivnica">
        <section className="dbs-piece dbs-piece--invite" aria-label="Glavna pozivnica">
          <div className="dbs-open-envelope" aria-hidden="true">
            <span className="dbs-open-envelope__liner" />
          </div>
          <article className="dbs-card dbs-card--cream dbs-invite">
            <p className="dbs-kicker">{announcement}</p>
            <p className="dbs-subline">{copy.invitationSubline}</p>

            <h1 className="dbs-names">
              <span className="dbs-names__name">{couple.partnerOne}</span>
              <span className="dbs-names__joiner">{joiner}</span>
              <span className="dbs-names__name">{couple.partnerTwo}</span>
            </h1>

            <p className="dbs-date">
              <span>{copy.dateDay}</span>
              <span className="dbs-date__pipe" aria-hidden="true">
                |
              </span>
              <span>{copy.dateMonth}</span>
              <span className="dbs-date__pipe" aria-hidden="true">
                |
              </span>
              <span>{copy.dateYear}</span>
            </p>

            {venue ? <p className="dbs-time">U {venue.timeLabel}</p> : null}

            <div className="dbs-venues">
              {venue ? (
                <div className="dbs-venues__block">
                  <p className="dbs-kicker dbs-kicker--compact">{venue.title}</p>
                  <p className="dbs-venues__place">{venue.placeName}</p>
                  {venue.address ? (
                    <p className="dbs-venues__address">{venue.address}</p>
                  ) : null}
                </div>
              ) : null}

              <div className="dbs-venues__block">
                <p className="dbs-kicker dbs-kicker--compact">{copy.receptionTitle}</p>
                <p className="dbs-venues__place">{copy.receptionPlace}</p>
                <p className="dbs-venues__address">{copy.receptionAddress}</p>
              </div>
            </div>

            <div className="dbs-hero__corner" aria-hidden="true">
              <EmbossedLeaves className="dbs-hero__leaves" />
              {monogram ? (
                <MonogramSeal letters={monogram} className="dbs-monogram" />
              ) : null}
            </div>
          </article>
        </section>

        <section className="dbs-piece dbs-piece--envelope" aria-label="Koverta">
          <img
            className="dbs-piece__envelope-img"
            src={envelopeClosed}
            alt=""
            draggable={false}
          />
        </section>

        {quote ? (
          <section className="dbs-piece dbs-piece--quote" aria-label="Citat">
            <article className="dbs-card dbs-card--cream dbs-quote-card">
              <span className="dbs-quote__mark" aria-hidden="true">
                “
              </span>
              <p className="dbs-quote__text">{quote}</p>
              {copy.quoteSource ? (
                <p className="dbs-quote__source">{copy.quoteSource}</p>
              ) : null}
              <EmbossedLeaves className="dbs-quote__leaves" />
            </article>
          </section>
        ) : null}

        <section className="dbs-piece dbs-piece--std" aria-label="Sačuvajte datum">
          <article className="dbs-card dbs-card--blue dbs-std-card">
            <p className="dbs-kicker dbs-kicker--light">{copy.saveTheDateLabel}</p>
            <h2 className="dbs-std__names">
              {couple.partnerOne} {joiner} {couple.partnerTwo}
            </h2>
            <p className="dbs-std__date">{content.eventDateLabel}</p>
            <span className="dbs-std__sprig" aria-hidden="true">
              ✿
            </span>
          </article>
        </section>

        <section className="dbs-piece dbs-piece--details" aria-label="Detalji">
          <article className="dbs-card dbs-card--blue dbs-card--bordered dbs-details-card">
            <h2 className="dbs-card-title dbs-card-title--light">
              {copy.detailsTitle}
            </h2>
            <p className="dbs-details__url">{copy.detailsUrl}</p>
            {dressCode ? (
              <div className="dbs-details__block">
                <p className="dbs-kicker dbs-kicker--light">{dressCode.title}</p>
                <p className="dbs-details__label">{dressCode.label}</p>
              </div>
            ) : null}
          </article>
        </section>

        {monogram ? (
          <div className="dbs-piece dbs-piece--tag" aria-hidden="true">
            <MonogramSeal letters={monogram} className="dbs-tag" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SpreadSection;
