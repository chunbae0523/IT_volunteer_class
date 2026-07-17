const STORAGE_KEY = "day-ledger-v1";
const LANG_STORE_KEY = "day-todo-v2";
const CATEGORIES = ["salary", "food", "transport", "shopping", "others"];

const I18N = {
  ko: {
    pageTitle: "Ledger — 가계부",
    navHome: "홈",
    navTodo: "일정",
    navBudget: "가계부",
    navWeather: "날씨",
    navFlash: "플래시",
    navTravel: "여행",
    navAbout: "소개",
    langBtn: "Tiếng Việt",
    eyebrow: "Daily Ledger",
    brand: "가계부",
    tagline: "하루 수입과 지출을 기록하고, 잔액을 한눈에 확인하세요.",
    todayIncome: "오늘 수입",
    todayExpense: "오늘 지출",
    todayNet: "하루 소득",
    addTitle: "수입 · 지출 작성",
    income: "수입",
    expense: "지출",
    dateLabel: "날짜",
    categoryLabel: "카테고리",
    amountLabel: "금액",
    amountPlaceholder: "예: 15000",
    noteLabel: "메모",
    notePlaceholder: "선택 사항",
    saveEntry: "기록하기",
    chartTitle: "오늘 지출 · 카테고리별",
    chartSub: "선택한 날짜의 지출 비율",
    chartEmpty: "아직 지출 기록이 없어요.",
    listTitle: "오늘 기록",
    listEmpty: "기록이 없습니다. 위에서 추가해 보세요.",
    catSalary: "급여",
    catFood: "식비",
    catTransport: "교통",
    catShopping: "쇼핑",
    catOthers: "기타",
    toastSaved: "기록이 저장됐어요!",
    toastDeleted: "기록을 삭제했어요.",
    deleteAria: "삭제",
    currency: "₩",
  },
  vi: {
    pageTitle: "Ledger — Sổ thu chi",
    navHome: "Trang chủ",
    navTodo: "Lịch trình",
    navBudget: "Thu chi",
    navWeather: "Thời tiết",
    navFlash: "Flash",
    navTravel: "Du lịch",
    navAbout: "Giới thiệu",
    langBtn: "한국어",
    eyebrow: "Sổ hàng ngày",
    brand: "Thu chi",
    tagline: "Ghi lại thu nhập và chi tiêu, xem số dư trong một cái nhìn.",
    todayIncome: "Thu hôm nay",
    todayExpense: "Chi hôm nay",
    todayNet: "Thu nhập ngày",
    addTitle: "Ghi thu · chi",
    income: "Thu",
    expense: "Chi",
    dateLabel: "Ngày",
    categoryLabel: "Danh mục",
    amountLabel: "Số tiền",
    amountPlaceholder: "VD: 15000",
    noteLabel: "Ghi chú",
    notePlaceholder: "Tùy chọn",
    saveEntry: "Lưu lại",
    chartTitle: "Chi hôm nay · theo danh mục",
    chartSub: "Tỷ lệ chi tiêu theo ngày đã chọn",
    chartEmpty: "Chưa có khoản chi nào.",
    listTitle: "Nhật ký hôm nay",
    listEmpty: "Chưa có ghi chép. Hãy thêm ở phía trên.",
    catSalary: "Lương",
    catFood: "Ăn uống",
    catTransport: "Đi lại",
    catShopping: "Mua sắm",
    catOthers: "Khác",
    toastSaved: "Đã lưu!",
    toastDeleted: "Đã xóa bản ghi.",
    deleteAria: "Xóa",
    currency: "₫",
  },
};

const CAT_KEYS = {
  salary: "catSalary",
  food: "catFood",
  transport: "catTransport",
  shopping: "catShopping",
  others: "catOthers",
};

let lang = loadLang();
let entryType = "income";
const store = loadStore();

const langBtn = document.getElementById("lang-btn");
const entryForm = document.getElementById("entry-form");
const entryDate = document.getElementById("entry-date");
const entryCategory = document.getElementById("entry-category");
const entryAmount = document.getElementById("entry-amount");
const entryNote = document.getElementById("entry-note");
const entryList = document.getElementById("entry-list");
const listEmpty = document.getElementById("list-empty");
const chartEmpty = document.getElementById("chart-empty");
const toast = document.getElementById("toast");
const netCard = document.getElementById("net-card");
const typeButtons = document.querySelectorAll(".type-btn");

function t(key) {
  return I18N[lang][key] || I18N.ko[key] || key;
}

function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function loadLang() {
  try {
    const raw = localStorage.getItem(LANG_STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.lang === "vi" || parsed.lang === "ko") return parsed.lang;
    }
  } catch {
    /* ignore */
  }
  return "ko";
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

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { entries: [] };
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.entries)) return { entries: [] };
    return { entries: parsed.entries };
  } catch {
    return { entries: [] };
  }
}

function saveStore() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function formatMoney(amount) {
  const symbol = t("currency");
  const n = Math.round(Number(amount) || 0);
  const formatted = n.toLocaleString(lang === "vi" ? "vi-VN" : "ko-KR");
  return `${symbol}${formatted}`;
}

function applyI18n() {
  document.documentElement.lang = lang === "vi" ? "vi" : "ko";
  document.body.dataset.lang = lang;
  document.title = t("pageTitle");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
  });

  langBtn.setAttribute("aria-pressed", String(lang === "vi"));
  langBtn.textContent = t("langBtn");
}

function setEntryType(type) {
  entryType = type;
  typeButtons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.type === type);
  });

  if (type === "income") {
    entryCategory.value = "salary";
  } else if (entryCategory.value === "salary") {
    entryCategory.value = "food";
  }
}

function entriesForDate(date) {
  return store.entries.filter((e) => e.date === date);
}

function sumBy(entries, type) {
  return entries
    .filter((e) => e.type === type)
    .reduce((sum, e) => sum + Number(e.amount), 0);
}

function updateSummary() {
  const date = entryDate.value || todayISO();
  const dayEntries = entriesForDate(date);
  const income = sumBy(dayEntries, "income");
  const expense = sumBy(dayEntries, "expense");
  const net = income - expense;

  document.getElementById("today-income").textContent = formatMoney(income);
  document.getElementById("today-expense").textContent = formatMoney(expense);
  document.getElementById("today-net").textContent = formatMoney(net);

  netCard.classList.toggle("is-negative", net < 0);
  netCard.classList.toggle("is-positive", net > 0);
}

function updateChart() {
  const date = entryDate.value || todayISO();
  const dayEntries = entriesForDate(date).filter((e) => e.type === "expense");
  const totals = Object.fromEntries(CATEGORIES.map((c) => [c, 0]));

  dayEntries.forEach((e) => {
    if (totals[e.category] !== undefined) {
      totals[e.category] += Number(e.amount);
    }
  });

  const max = Math.max(...Object.values(totals), 0);
  const hasExpense = max > 0;
  chartEmpty.hidden = hasExpense;

  CATEGORIES.forEach((cat) => {
    const col = document.querySelector(`.bar-col[data-cat="${cat}"]`);
    if (!col) return;
    const fill = col.querySelector(".bar-fill");
    const amountEl = col.querySelector(".bar-amount");
    const value = totals[cat];
    const pct = max === 0 ? 0 : Math.max((value / max) * 100, value > 0 ? 8 : 0);
    fill.style.setProperty("--h", `${pct}%`);
    amountEl.textContent = formatMoney(value);
  });
}

function renderList() {
  const date = entryDate.value || todayISO();
  const dayEntries = entriesForDate(date).slice().reverse();

  entryList.innerHTML = "";
  listEmpty.hidden = dayEntries.length > 0;

  dayEntries.forEach((entry) => {
    const li = document.createElement("li");
    li.className = "entry-item";
    li.dataset.id = entry.id;

    const badge = document.createElement("span");
    badge.className = `entry-badge ${entry.type}`;
    badge.textContent = entry.type === "income" ? "+" : "−";

    const meta = document.createElement("div");
    meta.className = "entry-meta";

    const cat = document.createElement("p");
    cat.className = "entry-cat";
    cat.textContent = t(CAT_KEYS[entry.category] || "catOthers");

    const note = document.createElement("p");
    note.className = "entry-note";
    note.textContent = entry.note || "—";

    meta.append(cat, note);

    const amount = document.createElement("span");
    amount.className = `entry-amount ${entry.type}`;
    amount.textContent =
      (entry.type === "income" ? "+" : "−") + formatMoney(entry.amount);

    const del = document.createElement("button");
    del.type = "button";
    del.className = "delete-btn";
    del.setAttribute("aria-label", t("deleteAria"));
    del.textContent = "×";
    del.addEventListener("click", () => removeEntry(entry.id, li));

    li.append(badge, meta, amount, del);
    entryList.appendChild(li);
  });
}

function refresh() {
  updateSummary();
  updateChart();
  renderList();
}

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  requestAnimationFrame(() => {
    toast.classList.add("is-visible");
  });
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => {
      toast.hidden = true;
    }, 400);
  }, 2200);
}

function removeEntry(id, li) {
  li.classList.add("is-removing");
  setTimeout(() => {
    store.entries = store.entries.filter((e) => e.id !== id);
    saveStore();
    refresh();
    showToast(t("toastDeleted"));
  }, 280);
}

function uid() {
  return `e-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

typeButtons.forEach((btn) => {
  btn.addEventListener("click", () => setEntryType(btn.dataset.type));
});

entryDate.addEventListener("change", refresh);

entryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = Number(entryAmount.value);
  if (!amount || amount < 1) return;

  store.entries.push({
    id: uid(),
    type: entryType,
    date: entryDate.value || todayISO(),
    category: entryCategory.value,
    amount,
    note: entryNote.value.trim(),
  });

  saveStore();
  entryAmount.value = "";
  entryNote.value = "";
  refresh();

  const submitBtn = entryForm.querySelector(".primary-btn");
  submitBtn.classList.remove("pop");
  void submitBtn.offsetWidth;
  submitBtn.classList.add("pop");

  showToast(t("toastSaved"));
});

langBtn.addEventListener("click", () => {
  saveLang(lang === "ko" ? "vi" : "ko");
  applyI18n();
  refresh();
});

entryDate.value = todayISO();
applyI18n();
setEntryType("income");
refresh();
