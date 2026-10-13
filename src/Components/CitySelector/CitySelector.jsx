function CitySelector({ selectedCity, onCityChange }) {
  const cities = [
    { value: "مكة المكرمة", name: "مكة المكرمة" },
    { value: "المدينة المنورة", name: "المدينة المنورة" },
    { value: "الرياض", name: "الرياض" },
    { value: "جدة", name: "جدة" },
    { value: "الدمام", name: "الدمام" },
    { value: "الخبر", name: "الخبر" },
    { value: "الطائف", name: "الطائف" },
    { value: "أبها", name: "أبها" },
    { value: "تبوك", name: "تبوك" },
    { value: "بريدة", name: "بريدة" },
    { value: "حائل", name: "حائل" },
    { value: "جازان", name: "جازان" },
    { value: "صبيا", name: "صبيا" },
    { value: "أحد المسارحة", name: "أحد المسارحة" },
    { value: "نجران", name: "نجران" },
    { value: "الجوف", name: "الجوف" },
    { value: "ينبع", name: "ينبع" },
    { value: "صامطة", name: "صامطة" },
  ];

  return (
    <div className="city-selector-wrap">
      <div className="select-box-container">
        <span className="city-icon">📍</span>
        <select
          id="citySelect"
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          aria-label="اختر المدينة أو المحافظة"
        >
          {cities.map((city) => (
            <option key={city.value} value={city.value}>
              {city.name}
            </option>
          ))}
        </select>
        <span className="custom-arrow">▾</span>
      </div>
    </div>
  );
}

export default CitySelector;
