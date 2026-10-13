function PrayerCard({ prayer, isActive }) {
  return (
    <div
      className={`prayer-card ${isActive ? "is-active" : ""}`}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(4, 18, 12, 0.4) 0%, rgba(3, 14, 9, 0.85) 100%), url(${prayer.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {isActive && (
        <div className="active-prayer-badge">
          <span>الصلاة القادمة</span>
        </div>
      )}
      <div className="prayer-info">
        <div className="prayer-name-group">
          <span className="prayer-name">{prayer.name}</span>
        </div>
      </div>
      <div className="prayer-time-group">
        <span className="prayer-time">{prayer.time}</span>
        <span className="prayer-period">{prayer.period}</span>
      </div>
    </div>
  );
}

export default PrayerCard;
