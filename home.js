const LANG_STORE_KEY = "day-todo-v2";

const I18N = {
  ko: {
    pageTitle: "Day Suite — 프로젝트 홈",
    langBtn: "Tiếng Việt",
    eyebrow: "Project Hub",
    brand: "Day Suite",
    tagline: "지금까지 만든 앱을 한곳에서 열어보세요.",
    todoLabel: "일정",
    todoTitle: "Day Todo",
    todoDesc: "하루 일정을 추가하고 완료율을 확인해요.",
    budgetLabel: "가계부",
    budgetTitle: "Ledger",
    budgetDesc: "수입·지출을 기록하고 하루 소득을 봐요.",
    weatherLabel: "날씨",
    weatherTitle: "Skyline",
    weatherDesc: "도시 날씨와 기온, 습도를 확인해요.",
    flashLabel: "게임",
    flashTitle: "Flash Match",
    flashDesc: "보이는 카드에서 베트남어·한국어 짝을 맞춰 보세요.",
    travelLabel: "여행",
    travelTitle: "Atlas",
    travelDesc: "여행지를 검색하고 하루 루트·명소를 추천받아요.",
    aboutLabel: "소개",
    aboutTitle: "About",
    aboutDesc: "자기소개와 취향을 담은 프로필 페이지.",
  },
  vi: {
    pageTitle: "Day Suite — Trang chủ dự án",
    langBtn: "한국어",
    eyebrow: "Trung tâm dự án",
    brand: "Day Suite",
    tagline: "Mở tất cả ứng dụng đã tạo ở một nơi.",
    todoLabel: "Lịch trình",
    todoTitle: "Day Todo",
    todoDesc: "Thêm lịch trình và xem tiến độ hoàn thành.",
    budgetLabel: "Thu chi",
    budgetTitle: "Ledger",
    budgetDesc: "Ghi thu·chi và xem thu nhập trong ngày.",
    weatherLabel: "Thời tiết",
    weatherTitle: "Skyline",
    weatherDesc: "Xem thời tiết, nhiệt độ và độ ẩm của thành phố.",
    flashLabel: "Trò chơi",
    flashTitle: "Flash Match",
    flashDesc: "Tìm cặp Việt–Hàn trên các thẻ đang hiện sẵn.",
    travelLabel: "Du lịch",
    travelTitle: "Atlas",
    travelDesc: "Tìm điểm đến và nhận gợi ý lộ trình theo ngày.",
    aboutLabel: "Giới thiệu",
    aboutTitle: "About",
    aboutDesc: "Trang hồ sơ với giới thiệu và gu cá nhân.",
  },
};

const langBtn = document.getElementById("lang-btn");
let lang = loadLang();

function loadLang() {
  try {
    const raw = localStorage.getItem(LANG_STORE_KEY);
    if (!raw) return "ko";
    const parsed = JSON.parse(raw);
    return parsed.lang === "vi" ? "vi" : "ko";
  } catch {
    return "ko";
  }
}

function saveLang(next) {
  lang = next;
  try {
    const raw = localStorage.getItem(LANG_STORE_KEY);
    const parsed = raw ? JSON.parse(raw) : { done: {}, customTasks: [] };
    parsed.lang = next;
    if (!parsed.done || typeof parsed.done !== "object") parsed.done = {};
    if (!Array.isArray(parsed.customTasks)) parsed.customTasks = [];
    localStorage.setItem(LANG_STORE_KEY, JSON.stringify(parsed));
  } catch {
    localStorage.setItem(
      LANG_STORE_KEY,
      JSON.stringify({ lang: next, done: {}, customTasks: [] })
    );
  }
}

function t(key) {
  return I18N[lang][key] || I18N.ko[key] || key;
}

function applyI18n() {
  document.documentElement.lang = lang === "vi" ? "vi" : "ko";
  document.body.dataset.lang = lang;
  document.title = t("pageTitle");
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  langBtn.setAttribute("aria-pressed", String(lang === "vi"));
  langBtn.textContent = t("langBtn");
}

langBtn.addEventListener("click", () => {
  saveLang(lang === "ko" ? "vi" : "ko");
  applyI18n();
});

applyI18n();
