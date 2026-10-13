import PrayerCard from "./PrayerCard";

function PrayerList({ prayers, activePrayerKey, loading }) {
  if (loading) {
    return (
      <section className="prayers-list">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>جاري استدعاء مواقيت الصلاة وفق تقويم أم القرى...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="prayers-list">
      {prayers.map((prayer) => (
        <PrayerCard
          key={prayer.key}
          prayer={prayer}
          isActive={prayer.key === activePrayerKey}
        />
      ))}
    </section>
  );
}

export default PrayerList;
