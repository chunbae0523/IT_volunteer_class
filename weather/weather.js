const API_BASE = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "57acea65ecbfc1c11b3c8f7d523bfda0";
const IP_GEO_URL = "https://get.geojs.io/v1/ip/geo.json";
const LANG_KEY = "skyline-lang";
const RING = 2 * Math.PI * 38;

const I18N = {
  ko: {
    pageTitle: "Skyline — 날씨",
    navHome: "홈",
    navTodo: "일정",
    navBudget: "가계부",
    navWeather: "날씨",
    navAbout: "소개",
    langBtn: "Tiếng Việt",
    searchLabel: "도시 검색",
    searchPlaceholder: "도시 검색",
    searchAria: "검색",
    locateAria: "내 위치 날씨",
    tempRangeAria: "최저·최고 기온",
    metricsAria: "날씨 지표",
    humidity: "습도",
    wind: "바람",
    clouds: "구름",
    visibility: "가시거리",
    pressure: "기압",
    sunTimes: "일출 · 일몰",
    feels: "체감",
    tempMin: "최저",
    tempMax: "최고",
    locating: "위치를 확인하는 중…",
    loading: "날씨를 불러오는 중…",
    locatingIp: "네트워크 위치로 확인하는 중…",
    geoDenied: "정확한 위치를 얻지 못해 대략적인 지역 날씨를 보여줍니다.",
    geoUnsupported: "이 브라우저는 위치 기능을 지원하지 않아 대략 위치로 불러옵니다.",
    cityNotFound: "도시를 찾을 수 없습니다. 다른 이름으로 검색해 보세요.",
    apiKeyInvalid:
      "API 키가 유효하지 않습니다. 새 키를 발급하거나, 방금 만든 키라면 최대 2시간 후 다시 시도해 주세요.",
    fetchFail: "날씨 정보를 가져오지 못했습니다.",
    networkError: "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.",
    locationFail: "위치를 확인할 수 없습니다. 도시 이름으로 검색해 주세요.",
  },
  vi: {
    pageTitle: "Skyline — Thời tiết",
    navHome: "Trang chủ",
    navTodo: "Lịch trình",
    navBudget: "Thu chi",
    navWeather: "Thời tiết",
    navAbout: "Giới thiệu",
    langBtn: "한국어",
    searchLabel: "Tìm thành phố",
    searchPlaceholder: "Tìm thành phố",
    searchAria: "Tìm kiếm",
    locateAria: "Thời tiết vị trí của tôi",
    tempRangeAria: "Nhiệt độ thấp nhất · cao nhất",
    metricsAria: "Chỉ số thời tiết",
    humidity: "Độ ẩm",
    wind: "Gió",
    clouds: "Mây",
    visibility: "Tầm nhìn",
    pressure: "Áp suất",
    sunTimes: "Bình minh · Hoàng hôn",
    feels: "Cảm giác như",
    tempMin: "Thấp nhất",
    tempMax: "Cao nhất",
    locating: "Đang xác định vị trí…",
    loading: "Đang tải thời tiết…",
    locatingIp: "Đang ước lượng vị trí qua mạng…",
    geoDenied: "Không lấy được vị trí chính xác, đang hiển thị thời tiết khu vực gần đúng.",
    geoUnsupported: "Trình duyệt không hỗ trợ định vị, đang dùng vị trí gần đúng.",
    cityNotFound: "Không tìm thấy thành phố. Hãy thử tên khác.",
    apiKeyInvalid:
      "API key không hợp lệ. Hãy tạo key mới, hoặc đợi tối đa 2 giờ nếu vừa tạo.",
    fetchFail: "Không lấy được thông tin thời tiết.",
    networkError: "Lỗi mạng. Hãy kiểm tra kết nối internet.",
    locationFail: "Không xác định được vị trí. Hãy tìm theo tên thành phố.",
  },
};

const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const locateBtn = document.getElementById("locate-btn");
const langBtn = document.getElementById("lang-btn");
const resultEl = document.getElementById("result");
const cityNameEl = document.getElementById("city-name");
const conditionEl = document.getElementById("condition");
const tempEl = document.getElementById("temp");
const feelsEl = document.getElementById("feels");
const statusEl = document.getElementById("status");
const weatherFx = document.getElementById("weather-fx");

const tempMinEl = document.getElementById("temp-min");
const tempMaxEl = document.getElementById("temp-max");
const tempRangeFill = document.getElementById("temp-range-fill");
const tempRangeMarker = document.getElementById("temp-range-marker");

const humidityValue = document.getElementById("humidity-value");
const humidityRingFill = document.getElementById("humidity-ring-fill");
const humidityRingLabel = document.getElementById("humidity-ring-label");

const windValue = document.getElementById("wind-value");
const windNeedle = document.getElementById("wind-needle");

const cloudsValue = document.getElementById("clouds-value");
const cloudsBar = document.getElementById("clouds-bar");

const visibilityValue = document.getElementById("visibility-value");
const visibilityBar = document.getElementById("visibility-bar");

const pressureValue = document.getElementById("pressure-value");
const pressureBar = document.getElementById("pressure-bar");

const sunValue = document.getElementById("sun-value");
const sunriseEl = document.getElementById("sunrise");
const sunsetEl = document.getElementById("sunset");
const sunDot = document.getElementById("sun-dot");

humidityRingFill.style.strokeDasharray = String(RING);
humidityRingFill.style.strokeDashoffset = String(RING);

let lang = loadLang();
let lastQuery = null;
let lastWeatherData = null;

function loadLang() {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved === "vi" || saved === "ko") return saved;
  const browser = (navigator.language || "").toLowerCase();
  return browser.startsWith("vi") ? "vi" : "ko";
}

function t(key) {
  return I18N[lang][key] || I18N.ko[key] || key;
}

function apiLang() {
  return lang === "vi" ? "vi" : "kr";
}

function applyI18n() {
  document.documentElement.lang = lang === "vi" ? "vi" : "ko";
  document.body.dataset.lang = lang;
  document.title = t("pageTitle");
  langBtn.textContent = t("langBtn");
  langBtn.setAttribute("aria-pressed", String(lang === "vi"));

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
  });
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("is-error", isError);
}

function weatherTheme(main) {
  const key = (main || "").toLowerCase();
  if (key === "clear") return "clear";
  if (key === "clouds") return "clouds";
  if (key === "rain") return "rain";
  if (key === "drizzle") return "drizzle";
  if (key === "thunderstorm") return "thunderstorm";
  if (key === "snow") return "snow";
  if (["mist", "smoke", "haze", "dust", "fog", "sand", "ash", "squall", "tornado"].includes(key)) {
    return "atmosphere";
  }
  return "clouds";
}

function clearFx() {
  weatherFx.innerHTML = "";
}

function addRain(count = 70) {
  for (let i = 0; i < count; i += 1) {
    const drop = document.createElement("span");
    drop.className = "rain-drop";
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.animationDuration = `${0.55 + Math.random() * 0.7}s`;
    drop.style.animationDelay = `${-Math.random() * 2}s`;
    drop.style.opacity = String(0.35 + Math.random() * 0.55);
    weatherFx.appendChild(drop);
  }
}

function addSnow(count = 45) {
  for (let i = 0; i < count; i += 1) {
    const flake = document.createElement("span");
    flake.className = "snowflake";
    const size = 4 + Math.random() * 8;
    flake.style.width = `${size}px`;
    flake.style.height = `${size}px`;
    flake.style.left = `${Math.random() * 100}%`;
    flake.style.animationDuration = `${3.5 + Math.random() * 5}s`;
    flake.style.animationDelay = `${-Math.random() * 5}s`;
    flake.style.opacity = String(0.45 + Math.random() * 0.5);
    weatherFx.appendChild(flake);
  }
}

function addClouds() {
  ["cloud-1", "cloud-2", "cloud-3"].forEach((name) => {
    const cloud = document.createElement("span");
    cloud.className = `cloud ${name}`;
    weatherFx.appendChild(cloud);
  });
}

function addSun() {
  const sun = document.createElement("div");
  sun.className = "sun";
  const ray = document.createElement("div");
  ray.className = "sun-ray";
  sun.appendChild(ray);
  weatherFx.appendChild(sun);
}

function addFog() {
  ["fog-1", "fog-2", "fog-3"].forEach((name) => {
    const layer = document.createElement("div");
    layer.className = `fog-layer ${name}`;
    weatherFx.appendChild(layer);
  });
}

function addLightning() {
  const flash = document.createElement("div");
  flash.className = "lightning";
  weatherFx.appendChild(flash);
}

function renderWeatherFx(theme) {
  clearFx();
  document.body.dataset.weather = theme;

  switch (theme) {
    case "clear":
      addSun();
      break;
    case "clouds":
      addClouds();
      break;
    case "rain":
    case "drizzle":
      addClouds();
      addRain(theme === "drizzle" ? 40 : 80);
      break;
    case "thunderstorm":
      addClouds();
      addRain(90);
      addLightning();
      break;
    case "snow":
      addClouds();
      addSnow();
      break;
    case "atmosphere":
      addFog();
      break;
    default:
      addClouds();
  }
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatTime(unix, timezoneOffset) {
  const date = new Date((unix + timezoneOffset) * 1000);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function windDirectionLabel(deg) {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round((((deg % 360) + 360) % 360) / 45) % 8;
  return dirs[index];
}

function resetVisuals() {
  humidityRingFill.style.strokeDashoffset = String(RING);
  humidityRingLabel.textContent = "0%";
  cloudsBar.style.width = "0%";
  visibilityBar.style.width = "0%";
  pressureBar.style.width = "0%";
  tempRangeFill.style.width = "0%";
  tempRangeMarker.style.left = "0%";
  sunDot.style.left = "0%";
  windNeedle.style.transform = "rotate(0deg)";
}

function playReveal() {
  resultEl.classList.remove("is-ready");
  void resultEl.offsetWidth;
  resultEl.classList.add("is-ready");
}

function animateTemp(target) {
  const start = performance.now();
  const duration = 700;
  const from = 0;

  function frame(now) {
    const progress = clamp((now - start) / duration, 0, 1);
    const eased = 1 - (1 - progress) ** 3;
    const value = Math.round(from + (target - from) * eased);
    tempEl.textContent = `${value}°`;
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function updateVisuals(data) {
  const temp = data.main.temp;
  const feels = Math.round(data.main.feels_like);
  const tempMin = Math.round(data.main.temp_min);
  const tempMax = Math.round(data.main.temp_max);
  const humidity = data.main.humidity;
  const pressure = data.main.pressure;
  const clouds = data.clouds?.all ?? 0;
  const visibilityKm = (data.visibility ?? 0) / 1000;
  const windSpeed = data.wind?.speed ?? 0;
  const windDeg = data.wind?.deg ?? 0;
  const timezone = data.timezone ?? 0;
  const sunrise = data.sys?.sunrise;
  const sunset = data.sys?.sunset;
  const now = data.dt ?? Math.floor(Date.now() / 1000);

  tempMinEl.textContent = `${t("tempMin")} ${tempMin}°`;
  tempMaxEl.textContent = `${t("tempMax")} ${tempMax}°`;

  const span = Math.max(tempMax - tempMin, 1);
  const currentPos = clamp(((temp - tempMin) / span) * 100, 0, 100);

  humidityValue.textContent = `${humidity}%`;
  windValue.textContent = `${windSpeed.toFixed(1)} m/s ${windDirectionLabel(windDeg)}`;
  cloudsValue.textContent = `${clouds}%`;
  visibilityValue.textContent = `${visibilityKm.toFixed(1)} km`;
  pressureValue.textContent = `${pressure} hPa`;

  if (sunrise && sunset) {
    sunriseEl.textContent = formatTime(sunrise, timezone);
    sunsetEl.textContent = formatTime(sunset, timezone);
    sunValue.textContent = `${formatTime(sunrise, timezone)} – ${formatTime(sunset, timezone)}`;

    const daySpan = Math.max(sunset - sunrise, 1);
    const sunPos = clamp(((now - sunrise) / daySpan) * 100, 0, 100);
    requestAnimationFrame(() => {
      sunDot.style.left = `${sunPos}%`;
    });
  }

  requestAnimationFrame(() => {
    humidityRingFill.style.strokeDashoffset = String(RING - (RING * humidity) / 100);
    humidityRingLabel.textContent = `${humidity}%`;
    cloudsBar.style.width = `${clouds}%`;
    visibilityBar.style.width = `${clamp((visibilityKm / 10) * 100, 0, 100)}%`;
    pressureBar.style.width = `${clamp(((pressure - 980) / 60) * 100, 0, 100)}%`;
    tempRangeFill.style.width = `${currentPos}%`;
    tempRangeMarker.style.left = `${currentPos}%`;
    windNeedle.style.transform = `rotate(${windDeg}deg)`;
  });

  feelsEl.textContent = `${t("feels")} ${feels}°C`;
  animateTemp(Math.round(temp));
}

function renderWeather(data) {
  lastWeatherData = data;
  const main = data.weather?.[0]?.main || "Clouds";
  const description = data.weather?.[0]?.description || "";
  const theme = weatherTheme(main);

  cityNameEl.textContent = `${data.name}${data.sys?.country ? `, ${data.sys.country}` : ""}`;
  conditionEl.textContent = description;
  cityInput.value = data.name || "";

  resetVisuals();
  resultEl.hidden = false;
  renderWeatherFx(theme);
  playReveal();
  updateVisuals(data);
  setStatus("");
}

async function requestWeather(params) {
  setStatus(t("loading"));
  resultEl.hidden = true;
  resultEl.classList.remove("is-ready");

  const url = new URL(API_BASE);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  url.searchParams.set("appid", API_KEY);
  url.searchParams.set("units", "metric");
  url.searchParams.set("lang", apiLang());

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        setStatus(t("apiKeyInvalid"), true);
        return;
      }
      if (response.status === 404) {
        setStatus(t("cityNotFound"), true);
        return;
      }
      setStatus(data.message || t("fetchFail"), true);
      return;
    }

    lastQuery = params;
    renderWeather(data);
  } catch (error) {
    console.error(error);
    setStatus(t("networkError"), true);
  }
}

function fetchWeatherByCity(city) {
  return requestWeather({ q: city });
}

function fetchWeatherByCoords(lat, lon) {
  return requestWeather({ lat: String(lat), lon: String(lon) });
}

function timezoneFallbackCity() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  if (/Ho_Chi_Minh|Saigon|Bangkok|Phnom_Penh|Vientiane/i.test(tz)) {
    return "Ho Chi Minh City";
  }
  if (/Hanoi/i.test(tz)) return "Hanoi";
  if (/Seoul|Tokyo|Osaka/i.test(tz)) return "Seoul";
  return "Ho Chi Minh City";
}

async function fetchIpLocation() {
  const response = await fetch(IP_GEO_URL, { cache: "no-store" });
  if (!response.ok) throw new Error("ip geo failed");
  const data = await response.json();
  const lat = Number(data.latitude);
  const lon = Number(data.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    throw new Error("invalid ip coords");
  }
  return { lat, lon, city: data.city || "", country: data.country || "" };
}

async function loadApproximateLocation(noticeKey) {
  setStatus(t(noticeKey || "locatingIp"));
  try {
    const { lat, lon } = await fetchIpLocation();
    await fetchWeatherByCoords(lat, lon);
  } catch (error) {
    console.warn(error);
    await fetchWeatherByCity(timezoneFallbackCity());
  }
}

function getBrowserPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(Object.assign(new Error("unsupported"), { code: 0 }));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 12000,
      maximumAge: 60000,
    });
  });
}

async function loadByGeolocation() {
  locateBtn.classList.add("is-loading");
  setStatus(t("locating"));

  try {
    const position = await getBrowserPosition();
    const { latitude, longitude } = position.coords;
    await fetchWeatherByCoords(latitude, longitude);
  } catch (error) {
    console.warn(error);
    if (error?.code === 0) {
      await loadApproximateLocation("geoUnsupported");
    } else {
      await loadApproximateLocation("geoDenied");
    }
  } finally {
    locateBtn.classList.remove("is-loading");
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;
  fetchWeatherByCity(city);
});

locateBtn.addEventListener("click", () => {
  loadByGeolocation();
});

langBtn.addEventListener("click", async () => {
  lang = lang === "ko" ? "vi" : "ko";
  localStorage.setItem(LANG_KEY, lang);
  applyI18n();

  if (lastQuery) {
    await requestWeather(lastQuery);
  } else if (lastWeatherData?.coord) {
    await fetchWeatherByCoords(lastWeatherData.coord.lat, lastWeatherData.coord.lon);
  }
});

applyI18n();
renderWeatherFx("clear");
setStatus(t("locating"));
loadByGeolocation();
