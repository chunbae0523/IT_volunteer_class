const STORAGE_KEY = "day-todo-v2";

const I18N = {
  ko: {
    pageTitle: "About — 자기소개",
    navHome: "홈",
    navTodo: "일정",
    navBudget: "가계부",
    navWeather: "날씨",
    navFlash: "플래시",
    navTravel: "여행",
    navAbout: "소개",
    langBtn: "Tiếng Việt",
    eyebrow: "Profile",
    brand: "자기소개",
    lead: "한국에 사는 20살. 게임과 맥주, 그게 나의 루틴이다.",
    metaAge: "2006년생",
    metaGender: "남자",
    metaPlace: "대한민국",
    factOriginLabel: "거주지",
    factOriginTitle: "한국에서 사는 스무 살",
    factOriginBody:
      "2006년생 남자. 담백하고 확실하게, 내 방식으로 하루를 굴린다.",
    factHobbyLabel: "취미",
    factHobbyTitle: "리그 오브 레전드",
    factHobbyBody:
      "게임은 취미를 넘어 루틴이다. 소환사의 협곡에서 집중하고, 한 판 한 판 호흡을 맞춘다.",
    factBeerLabel: "취향",
    factBeerTitle: "맥주 없이는 못 산다",
    factBeerBody:
      "하루의 끝은 시원한 맥주 한 잔으로. 그게 없으면 하루가 덜 끝난 기분이다.",
    ctaTodo: "일정 페이지로 이동",
    ctaBudget: "가계부로 이동",
    ctaWeather: "날씨로 이동",
  },
  vi: {
    pageTitle: "About — Giới thiệu",
    navHome: "Trang chủ",
    navTodo: "Lịch trình",
    navBudget: "Thu chi",
    navWeather: "Thời tiết",
    navFlash: "Flash",
    navTravel: "Du lịch",
    navAbout: "Giới thiệu",
    langBtn: "한국어",
    eyebrow: "Hồ sơ",
    brand: "Giới thiệu",
    lead: "20 tuổi sống tại Hàn Quốc. Game và bia — đó là nhịp sống của tôi.",
    metaAge: "Sinh năm 2006",
    metaGender: "Nam",
    metaPlace: "Hàn Quốc",
    factOriginLabel: "Nơi sống",
    factOriginTitle: "20 tuổi ở Hàn Quốc",
    factOriginBody:
      "Nam, sinh năm 2006. Sống thẳng thắn, rõ ràng, theo nhịp của riêng mình.",
    factHobbyLabel: "Sở thích",
    factHobbyTitle: "Liên Minh Huyền Thoại",
    factHobbyBody:
      "Game không chỉ là thú vui — đó là thói quen. Tập trung trong Summoner's Rift, từng ván một.",
    factBeerLabel: "Gu",
    factBeerTitle: "Không bia là không chịu nổi",
    factBeerBody:
      "Cuối ngày phải có một ly bia mát. Thiếu nó thì cảm giác ngày chưa thật sự kết thúc.",
    ctaTodo: "Sang trang lịch trình",
    ctaBudget: "Sang sổ thu chi",
    ctaWeather: "Sang thời tiết",
  },
};

const langBtn = document.getElementById("lang-btn");
let lang = loadLang();

function loadLang() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return "ko";
    const parsed = JSON.parse(raw);
    return parsed.lang === "vi" ? "vi" : "ko";
  } catch {
    return "ko";
  }
}

function saveLang(next) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : { done: {}, customTasks: [] };
    parsed.lang = next;
    if (!parsed.done || typeof parsed.done !== "object") parsed.done = {};
    if (!Array.isArray(parsed.customTasks)) parsed.customTasks = [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    localStorage.setItem(
      STORAGE_KEY,
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
  lang = lang === "ko" ? "vi" : "ko";
  saveLang(lang);
  applyI18n();
});

applyI18n();
