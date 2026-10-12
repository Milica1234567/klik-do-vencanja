import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

import { downloadCalendarEvent } from "../../shared/downloadCalendarEvent";
import type { InvitationContent } from "../../shared/types";

type CalendarSectionProps = {
  content: InvitationContent;
};

const WEEKDAYS = ["Po", "Ut", "Sr", "Če", "Pe", "Su", "Ne"] as const;

const MONTHS_SR = [
  "Januar",
  "Februar",
  "Mart",
  "April",
  "Maj",
  "Jun",
  "Jul",
  "Avgust",
  "Septembar",
  "Oktobar",
  "Novembar",
  "Decembar",
] as const;

function buildMonthGrid(iso: string) {
  const date = new Date(iso);
  const year = date.getFullYear();
  const month = date.getMonth();
  const weddingDay = date.getDate();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: Array<number | null> = [];
  for (let i = 0; i < firstWeekday; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);
  while (cells.length % 7 !== 0) cells.push(null);

  return {
    year,
    monthName: MONTHS_SR[month] ?? "",
    weddingDay,
    cells,
  };
}

function resolveEventEnd(content: InvitationContent): Date {
  const start = new Date(content.eventDateIso);
  const last = content.timeline?.[content.timeline.length - 1];
  if (!last?.time) {
    return new Date(start.getTime() + 8 * 60 * 60 * 1000);
  }

  const [hoursRaw, minutesRaw] = last.time.split(":");
  const hours = Number(hoursRaw);
  const minutes = Number(minutesRaw ?? "0");
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return new Date(start.getTime() + 8 * 60 * 60 * 1000);
  }

  const end = new Date(start);
  end.setHours(hours, minutes, 0, 0);
  if (end.getTime() <= start.getTime()) {
    end.setDate(end.getDate() + 1);
  }
  return end;
}

function CalendarSection({ content }: CalendarSectionProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ring = useTransform(scrollYProgress, [0.18, 0.62], reduceMotion ? [1, 1] : [0, 1]);
  const calendar = useMemo(() => buildMonthGrid(content.eventDateIso), [content.eventDateIso]);

  const coupleTitle = [
    content.couple.partnerOne,
    content.couple.joiner ?? "i",
    content.couple.partnerTwo,
  ].join(" ");

  const location = [content.venue?.placeName, content.venue?.address].filter(Boolean).join(", ");

  const saveWeddingDate = () => {
    downloadCalendarEvent({
      title: `Venčanje — ${coupleTitle}`,
      start: content.eventDateIso,
      end: resolveEventEnd(content),
      location: location || undefined,
      description: `Dan venčanja: ${content.eventDateLabel}`,
      filename: `vencanje-${content.couple.partnerOne}-${content.couple.partnerTwo}.ics`.toLowerCase(),
    });
  };

  return (
    <section className="sf-calendar-scene" data-section="calendar" aria-label="Sačuvajte datum" ref={ref}>
      <div className="sf-calendar-float">
        <p className="sf-calendar__eyebrow">Sačuvajte datum</p>
        <h2 className="sf-calendar__month-title">
          {calendar.monthName} {calendar.year}
        </h2>

        <div className="sf-calendar" role="grid" aria-readonly="true">
          <div className="sf-calendar__weekdays" role="row">
            {WEEKDAYS.map((day, index) => (
              <span key={`${day}-${index}`} className="sf-calendar__weekday" role="columnheader">
                {day}
              </span>
            ))}
          </div>

          <div className="sf-calendar__grid" role="rowgroup">
            {calendar.cells.map((day, index) => {
              const isWedding = day === calendar.weddingDay;

              if (isWedding) {
                return (
                  <button
                    key={`cell-${index}`}
                    type="button"
                    className="sf-calendar__day sf-calendar__day--wedding"
                    role="gridcell"
                    aria-label={`Sačuvaj dan venčanja ${day}. ${calendar.monthName} u kalendar telefona`}
                    onClick={saveWeddingDate}
                  >
                    <svg className="sf-calendar__ring" viewBox="0 0 48 48" aria-hidden="true">
                      <circle className="sf-calendar__ring-track" cx="24" cy="24" r="20" />
                      <motion.circle
                        className="sf-calendar__ring-draw"
                        cx="24"
                        cy="24"
                        r="20"
                        style={{ pathLength: ring }}
                      />
                    </svg>
                    <span>{day}</span>
                  </button>
                );
              }

              return (
                <span
                  key={`cell-${index}`}
                  className={["sf-calendar__day", day ? "" : "sf-calendar__day--empty"].filter(Boolean).join(" ")}
                  role="gridcell"
                >
                  {day ?? ""}
                </span>
              );
            })}
          </div>
        </div>

        <p className="sf-calendar__hint">Dodirnite datum da sačuvate</p>
      </div>
    </section>
  );
}

export default CalendarSection;
