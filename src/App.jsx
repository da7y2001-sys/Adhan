import { useState, useEffect } from "react";
import axios from "axios";
import {
  Header,
  CitySelector,
  NextPrayerHero,
  DateSection,
  Prayer,
  Footer,
  Weather,
} from "./Components/indexlink";
import "./App.css";

// --- استيراد الصور من مجلد assets ---
import meccaBg from "./assets/mosque-background.jpg";
import fajrImg from "./assets/fajr.jpg";
import sunriseImg from "./assets/sunrise.jpg";
import dhuhrImg from "./assets/dhuhr.jpg";
import asrImg from "./assets/asr.jpg";
import maghribImg from "./assets/maghrib.jpg";
import ishaImg from "./assets/isha.jpg";

const locations = {
  "مكة المكرمة": {
    lat: 21.3891,
    lon: 39.8579,
  },
  "المدينة المنورة": {
    lat: 24.5247,
    lon: 39.5692,
  },
  الرياض: {
    lat: 24.7136,
    lon: 46.6753,
  },
  جدة: {
    lat: 21.4858,
    lon: 39.1925,
  },
  جازان: {
    lat: 16.8892,
    lon: 42.5706,
  },
  صبيا: {
    lat: 17.1495,
    lon: 42.6254,
  },
  "أحد المسارحة": {
    lat: 16.7109,
    lon: 42.9544,
  },
  صامطة: {
    lat: 16.596,
    lon: 42.944,
  },
};

function App() {
  const [selectedCity, setSelectedCity] = useState("مكة المكرمة");
  const [currentTimings, setCurrentTimings] = useState(null);
  const [hijriDate, setHijriDate] = useState("");
  const [gregorianDate, setGregorianDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  const [liveClock, setLiveClock] = useState("");
  const [nextPrayerName, setNextPrayerName] = useState("جاري التحديد...");
  const [countdown, setCountdown] = useState("--:--:--");
  const [activePrayerKey, setActivePrayerKey] = useState("");

  // تحويل الوقت من نظام 24 إلى 12 ساعة
  const formatTime12 = (time24) => {
    if (!time24) return { time: "--:--", period: "" };
    const cleanTime = time24.split(" ")[0];
    const [hoursStr, minutesStr] = cleanTime.split(":");
    let hours = parseInt(hoursStr, 10);
    const minutes = minutesStr;
    const period = hours >= 12 ? "م" : "ص";

    hours = hours % 12;
    if (hours === 0) hours = 12;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;

    return {
      time: `${formattedHours}:${minutes}`,
      period: period,
    };
  };

  useEffect(() => {
    async function getPrayerTimes() {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.aladhan.com/v1/timingsByAddress",
          {
            params: {
              address: `${selectedCity}, السعودية`,
              method: 4,
            },
          },
        );

        const data = response.data.data;
        setCurrentTimings(data.timings);

        const hijri = data.date.hijri;
        const gregorian = data.date.gregorian;

        setHijriDate(`${hijri.day} ${hijri.month.ar} ${hijri.year} هـ`);
        setGregorianDate(
          `${gregorian.day} / ${gregorian.month.number} / ${gregorian.year} م`,
        );
        setLoading(false);
      } catch (error) {
        console.error("خطأ في جلب المواقيت:", error);
        setLoading(false);
      }
    }

    getPrayerTimes();
  }, [selectedCity]);

  useEffect(() => {
    async function getWeather() {
      setWeatherLoading(true);
      try {
        const location = locations[selectedCity];
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              lat: location.lat,
              lon: location.lon,
              appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
              units: "metric",
              lang: "ar",
            },
          },
        );

        setWeather(response.data);
        setWeatherLoading(false);
      } catch (error) {
        console.error("خطأ في جلب الطقس:", error);
        setWeatherLoading(false);
      }
    }

    getWeather();
  }, [selectedCity]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const period = hours >= 12 ? "م" : "ص";
      const hours12 = String(hours % 12 || 12).padStart(2, "0");
      setLiveClock(`${hours12}:${minutes}:${seconds} ${period}`);

      if (!currentTimings) return;

      const prayersOrder = [
        { key: "Fajr", name: "صلاة الفجر" },
        { key: "Sunrise", name: "شروق الشمس" },
        { key: "Dhuhr", name: "صلاة الظهر" },
        { key: "Asr", name: "صلاة العصر" },
        { key: "Maghrib", name: "صلاة المغرب" },
        { key: "Isha", name: "صلاة العشاء" },
      ];

      let nextPrayer = null;
      let targetDate = null;

      for (const p of prayersOrder) {
        if (!currentTimings[p.key]) continue;
        const timeStr = currentTimings[p.key].split(" ")[0];
        const [pHour, pMinute] = timeStr.split(":").map(Number);
        const pDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          pHour,
          pMinute,
          0,
        );

        if (pDate > now) {
          nextPrayer = p;
          targetDate = pDate;
          break;
        }
      }

      if (!nextPrayer) {
        nextPrayer = prayersOrder[0];
        const timeStr = currentTimings["Fajr"].split(" ")[0];
        const [pHour, pMinute] = timeStr.split(":").map(Number);
        targetDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + 1,
          pHour,
          pMinute,
          0,
        );
      }

      setNextPrayerName(nextPrayer.name);
      setActivePrayerKey(nextPrayer.key);

      const diffMs = targetDate - now;
      if (diffMs > 0) {
        const diffSec = Math.floor(diffMs / 1000);
        const h = String(Math.floor(diffSec / 3600)).padStart(2, "0");
        const m = String(Math.floor((diffSec % 3600) / 60)).padStart(2, "0");
        const s = String(diffSec % 60).padStart(2, "0");
        setCountdown(`${h}:${m}:${s}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTimings]);

  // --- مصفوفة الصلوات مع إضافة الصور الخاصة بكل صلاة ---
  const prayersList = [
    {
      key: "Fajr",
      name: "الفجر",
      image: fajrImg,
      ...formatTime12(currentTimings?.Fajr),
    },
    {
      key: "Sunrise",
      name: "الشروق",
      image: sunriseImg,
      ...formatTime12(currentTimings?.Sunrise),
    },
    {
      key: "Dhuhr",
      name: "الظهر",
      image: dhuhrImg,
      ...formatTime12(currentTimings?.Dhuhr),
    },
    {
      key: "Asr",
      name: "العصر",
      image: asrImg,
      ...formatTime12(currentTimings?.Asr),
    },
    {
      key: "Maghrib",
      name: "المغرب",
      image: maghribImg,
      ...formatTime12(currentTimings?.Maghrib),
    },
    {
      key: "Isha",
      name: "العشاء",
      image: ishaImg,
      ...formatTime12(currentTimings?.Isha),
    },
  ];

  return (
    // الغلاف الرئيسي لإضافة صورة مكة في الخلفية
    <div
      className="app-wrapper"
      style={{
        backgroundImage: `linear-gradient(rgba(4, 12, 10, 0.4), rgba(4, 12, 10, 0.8)), url(${meccaBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <main className="container">
        <Header />
        <CitySelector
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
        />
        <NextPrayerHero
          liveClock={liveClock}
          nextPrayerName={nextPrayerName}
          countdown={countdown}
        />
        <DateSection hijriDate={hijriDate} gregorianDate={gregorianDate} />
        <Weather weather={weather} loading={weatherLoading} />

        <Prayer
          prayers={prayersList}
          activePrayerKey={activePrayerKey}
          loading={loading}
        />
        <Footer />
      </main>
    </div>
  );
}

export default App;
