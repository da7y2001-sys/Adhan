function NextPrayerHero({ liveClock, nextPrayerName, countdown }) {
  return (
    <section className="next-prayer-hero">
      <div className="mihrab-peak-crest">۞</div>
      <div className="hero-header">
        <div className="hero-tag">
          <span className="pulse-dot"></span>
          <span>الصلاة القادمة</span>
        </div>
        <div className="live-clock-badge">
          <span className="clock-icon">⏱</span>
          <span>{liveClock || "--:--:--"}</span>
        </div>
      </div>
      <div className="hero-content">
        <div className="next-prayer-name">
          {nextPrayerName || "جاري التحديد..."}
        </div>
        <div className="countdown-label">
          <span className="label-ornament">❖</span>
          <span>المتبقي على دخول الوقت</span>
          <span className="label-ornament">❖</span>
        </div>
        <div className="countdown-timer">{countdown || "--:--:--"}</div>
      </div>
    </section>
  );
}

export default NextPrayerHero;
