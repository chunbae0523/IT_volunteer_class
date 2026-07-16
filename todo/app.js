const STORAGE_KEY = "day-todo-v2";
const CIRCUMFERENCE = 2 * Math.PI * 52;

const ICONS = {
  morning: `
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill="currentColor"/>
      <g stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M12 2v2.2M12 19.8V22M2 12h2.2M19.8 12H22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"/>
      </g>
    </svg>
  `,
  lunch: `
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path fill="currentColor" d="M7 3v8a3 3 0 0 0 2.8 3H11v7h2v-7h1.2A3 3 0 0 0 17 11V3h-2v8a1 1 0 0 1-1 1h-1.2V3h-2v9H10a1 1 0 0 1-1-1V3H7zm10.5 0c-.8 2.4-.8 4.8 0 7.2.3.8 1.2 1.3 2 1V3h-2z"/>
    </svg>
  `,
  evening: `
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path fill="currentColor" d="M14.5 3.1A8.5 8.5 0 1 0 20.9 14a7 7 0 0 1-6.4-10.9z"/>
    </svg>
  `,
};

const I18N = {
  ko: {
    eyebrow: "Vacation Day",
    brand: "Day Todo",
    tagline: "오늘 하루를 가볍게, 하나씩 체크해 보세요.",
    doneLabel: "완료",
    doneCaption: "완료",
    addTask: "일정 추가",
    reset: "모두 초기화",
    toastAllDone: "오늘 일정을 모두 끝냈어요!",
    modalTitle: "새 일정 추가",
    periodLabel: "시간대",
    taskLabel: "할 일",
    taskPlaceholder: "예: 카페 가기",
    cancel: "취소",
    saveTask: "추가하기",
    langBtn: "Tiếng Việt",
    morning: "아침",
    lunch: "점심",
    evening: "저녁",
    morningSub: "상쾌하게 하루를 시작해요",
    lunchSub: "여유롭게 즐기는 오후",
    eveningSub: "시원한 밤을 즐겨요",
    deleteTask: "삭제",
    pageTitle: "Day Todo — 오늘의 일정",
    navHome: "홈",
    navTodo: "일정",
    navBudget: "가계부",
    navWeather: "날씨",
    navAbout: "소개",
  },
  vi: {
    eyebrow: "Ngày nghỉ",
    brand: "Day Todo",
    tagline: "Hôm nay nhẹ nhàng — tick từng việc một.",
    doneLabel: "Xong",
    doneCaption: "hoàn thành",
    addTask: "Thêm lịch trình",
    reset: "Đặt lại tất cả",
    toastAllDone: "Bạn đã hoàn thành mọi việc hôm nay!",
    modalTitle: "Thêm lịch trình mới",
    periodLabel: "Buổi",
    taskLabel: "Việc cần làm",
    taskPlaceholder: "Ví dụ: Đi cà phê",
    cancel: "Hủy",
    saveTask: "Thêm",
    langBtn: "한국어",
    morning: "Buổi sáng",
    lunch: "Buổi trưa",
    evening: "Buổi tối",
    morningSub: "Bắt đầu ngày mới sảng khoái",
    lunchSub: "Chiều thư giãn nhẹ nhàng",
    eveningSub: "Tận hưởng đêm mát mẻ",
    deleteTask: "Xóa",
    pageTitle: "Day Todo — Lịch trình hôm nay",
    navHome: "Trang chủ",
    navTodo: "Lịch trình",
    navBudget: "Thu chi",
    navWeather: "Thời tiết",
    navAbout: "Giới thiệu",
  },
};

const DEFAULT_TASKS = [
  { id: "morning-0", period: "morning", ko: "샤워하기", vi: "Tắm" },
  { id: "morning-1", period: "morning", ko: "양치하기", vi: "Đánh răng" },
  { id: "morning-2", period: "morning", ko: "호텔 조식먹기", vi: "Ăn sáng tại khách sạn" },
  { id: "lunch-0", period: "lunch", ko: "쌀국수 맛집 찾아가기", vi: "Tìm quán phở ngon" },
  { id: "lunch-1", period: "lunch", ko: "아로마 마사지 받기", vi: "Massage hương liệu" },
  { id: "evening-0", period: "evening", ko: "수영장가기", vi: "Đi hồ bơi" },
  { id: "evening-1", period: "evening", ko: "바다가기", vi: "Đi biển" },
  { id: "evening-2", period: "evening", ko: "맥주마시기", vi: "Uống bia" },
];

const PERIOD_ORDER = ["morning", "lunch", "evening"];

const store = loadStore();

const sectionsEl = document.getElementById("sections");
const gaugeFill = document.querySelector(".gauge-fill");
const gaugeValue = document.querySelector(".gauge-value");
const gauge = document.querySelector(".gauge");
const doneCountEl = document.getElementById("done-count");
const totalCountEl = document.getElementById("total-count");
const toast = document.getElementById("toast");
const resetBtn = document.getElementById("reset-btn");
const langBtn = document.getElementById("lang-btn");
const addBtn = document.getElementById("add-btn");
const addModal = document.getElementById("add-modal");
const addForm = document.getElementById("add-form");
const taskPeriod = document.getElementById("task-period");
const taskText = document.getElementById("task-text");

function t(key) {
  return I18N[store.lang][key] || I18N.ko[key] || key;
}

function loadStore() {
  const fallback = {
    lang: "ko",
    done: {},
    customTasks: [],
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return migrateLegacy(fallback);
    const parsed = JSON.parse(raw);
    return {
      lang: parsed.lang === "vi" ? "vi" : "ko",
      done: parsed.done && typeof parsed.done === "object" ? parsed.done : {},
      customTasks: Array.isArray(parsed.customTasks) ? parsed.customTasks : [],
    };
  } catch {
    return fallback;
  }
}

function migrateLegacy(fallback) {
  try {
    const legacy = localStorage.getItem("day-todo-v1");
    if (!legacy) return fallback;
    const done = JSON.parse(legacy);
    if (done && typeof done === "object") {
      fallback.done = done;
    }
  } catch {
    /* ignore */
  }
  return fallback;
}

function saveStore() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function getAllTasks() {
  return [...DEFAULT_TASKS, ...store.customTasks];
}

function tasksForPeriod(periodId) {
  return getAllTasks().filter((task) => task.period === periodId);
}

function taskLabel(task) {
  if (store.lang === "vi") return task.vi || task.ko;
  return task.ko || task.vi;
}

function isDone(id) {
  return Boolean(store.done[id]);
}

function setDone(id, value) {
  store.done[id] = value;
  saveStore();
}

function createCheckIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        fill="none"
        stroke="#fff"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `;
}

function applyI18n() {
  document.documentElement.lang = store.lang === "vi" ? "vi" : "ko";
  document.title = t("pageTitle");
  document.body.dataset.lang = store.lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.placeholder = t(key);
  });

  langBtn.setAttribute("aria-pressed", String(store.lang === "vi"));
  langBtn.textContent = t("langBtn");
}

function openModal() {
  addModal.hidden = false;
  requestAnimationFrame(() => addModal.classList.add("open"));
  taskText.value = "";
  taskPeriod.value = "morning";
  taskText.focus();
}

function closeModal() {
  addModal.classList.remove("open");
  setTimeout(() => {
    addModal.hidden = true;
  }, 220);
}

function render() {
  applyI18n();
  sectionsEl.innerHTML = "";

  PERIOD_ORDER.forEach((periodId, periodIndex) => {
    const tasks = tasksForPeriod(periodId);
    const section = document.createElement("article");
    section.className = "section";
    section.dataset.period = periodId;

    const doneInSection = tasks.filter((task) => isDone(task.id)).length;
    const totalInSection = tasks.length;
    const sectionPercent =
      totalInSection === 0
        ? 0
        : Math.round((doneInSection / totalInSection) * 100);

    section.innerHTML = `
      <div class="section-head">
        <div class="section-title-wrap">
          <div class="section-icon" aria-hidden="true">${ICONS[periodId]}</div>
          <div>
            <h2 class="section-title">${t(periodId)}</h2>
            <p class="section-sub">${t(`${periodId}Sub`)}</p>
          </div>
        </div>
        <div class="section-meter" aria-hidden="true">
          <div class="section-meter-bar">
            <div class="section-meter-fill" style="width:${sectionPercent}%"></div>
          </div>
          <p class="section-meter-text">${doneInSection}/${totalInSection}</p>
        </div>
      </div>
      <ul class="task-list"></ul>
    `;

    const list = section.querySelector(".task-list");

    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = `task${isDone(task.id) ? " done" : ""}`;
      li.style.animationDelay = `${0.08 * index + 0.05 * periodIndex}s`;
      li.setAttribute("role", "checkbox");
      li.setAttribute("aria-checked", String(isDone(task.id)));
      li.tabIndex = 0;

      const isCustom = Boolean(task.custom);
      li.innerHTML = `
        <span class="checkbox">${createCheckIcon()}</span>
        <span class="task-text">${escapeHtml(taskLabel(task))}</span>
        ${
          isCustom
            ? `<button type="button" class="delete-btn" aria-label="${t("deleteTask")}">×</button>`
            : ""
        }
      `;

      const toggle = () => {
        const next = !isDone(task.id);
        setDone(task.id, next);
        li.classList.toggle("done", next);
        li.setAttribute("aria-checked", String(next));
        updateProgress(true);
        updateSectionMeter(section, periodId);
        if (next) celebrateTask(li);
      };

      li.addEventListener("click", (event) => {
        if (event.target.closest(".delete-btn")) return;
        toggle();
      });

      li.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      });

      if (isCustom) {
        li.querySelector(".delete-btn").addEventListener("click", (event) => {
          event.stopPropagation();
          store.customTasks = store.customTasks.filter((item) => item.id !== task.id);
          delete store.done[task.id];
          saveStore();
          render();
        });
      }

      list.appendChild(li);
    });

    sectionsEl.appendChild(section);
  });

  updateProgress(false);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function updateSectionMeter(section, periodId) {
  const tasks = tasksForPeriod(periodId);
  const doneInSection = tasks.filter((task) => isDone(task.id)).length;
  const totalInSection = tasks.length;
  const sectionPercent =
    totalInSection === 0
      ? 0
      : Math.round((doneInSection / totalInSection) * 100);
  section.querySelector(".section-meter-fill").style.width = `${sectionPercent}%`;
  section.querySelector(".section-meter-text").textContent =
    `${doneInSection}/${totalInSection}`;
}

function updateProgress(animateValue) {
  const tasks = getAllTasks();
  const total = tasks.length;
  const done = tasks.filter((task) => isDone(task.id)).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  gaugeFill.style.strokeDashoffset = String(
    CIRCUMFERENCE - (CIRCUMFERENCE * percent) / 100
  );
  gaugeValue.textContent = `${percent}%`;
  gauge.setAttribute("aria-valuenow", String(percent));
  doneCountEl.textContent = String(done);
  totalCountEl.textContent = String(total);

  if (animateValue) {
    gauge.classList.remove("pulse");
    void gauge.offsetWidth;
    gauge.classList.add("pulse");
  }

  if (done === total && total > 0) {
    showToast();
    burstConfetti();
  }
}

function celebrateTask(taskEl) {
  taskEl.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.03)" },
      { transform: "scale(1)" },
    ],
    { duration: 320, easing: "ease-out" }
  );
}

function showToast() {
  toast.hidden = false;
  toast.textContent = t("toastAllDone");
  requestAnimationFrame(() => toast.classList.add("show"));
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.hidden = true;
    }, 400);
  }, 2600);
}

function burstConfetti() {
  const colors = ["#f2c14e", "#e07a5f", "#81b29a", "#7ec8e3", "#ffffff"];
  for (let i = 0; i < 28; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDuration = `${1.8 + Math.random() * 1.4}s`;
    piece.style.animationDelay = `${Math.random() * 0.2}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3600);
  }
}

langBtn.addEventListener("click", () => {
  store.lang = store.lang === "ko" ? "vi" : "ko";
  saveStore();
  render();
});

addBtn.addEventListener("click", openModal);

addModal.querySelectorAll("[data-close-modal]").forEach((el) => {
  el.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !addModal.hidden) {
    closeModal();
  }
});

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = taskText.value.trim();
  if (!text) return;

  const period = taskPeriod.value;
  const id = `custom-${Date.now()}`;
  store.customTasks.push({
    id,
    period,
    ko: text,
    vi: text,
    custom: true,
  });
  saveStore();
  closeModal();
  render();
});

resetBtn.addEventListener("click", () => {
  store.done = {};
  store.customTasks = [];
  saveStore();
  render();
});

gaugeFill.style.strokeDasharray = String(CIRCUMFERENCE);
render();
