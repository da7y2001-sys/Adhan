function DateSection({ hijriDate, gregorianDate }) {
  const weekday = new Intl.DateTimeFormat("ar-SA", { weekday: "long" }).format(
    new Date(),
  );

  return (
    <section className="date-section">
      <div className="date-pill hijri-pill">
        <div className="date-pill-label">
          <span className="date-icon">🌙</span>
          <span>التاريخ الهجري</span>
        </div>
        <div className="date-pill-value">{hijriDate || "--"}</div>
        <div className="date-weekday">{weekday}</div>
      </div>
      <div className="date-divider"></div>
      <div className="date-pill gregorian-pill">
        <div className="date-pill-label">
          <span className="date-icon">📅</span>
          <span>التاريخ الميلادي</span>
        </div>
        <div className="date-pill-value">{gregorianDate || "--"}</div>
        <div className="date-weekday">{weekday}</div>
      </div>
    </section>
  );
}

export default DateSection;
