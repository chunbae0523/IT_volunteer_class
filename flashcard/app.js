const PAIR_COUNT = 15;
const TIME_DEFAULT = 60;
const TIME_MIN = 15;
const TIME_MAX = 300;
const TIME_STEP = 15;

const WORD_BANK = [
  { id: "hello", vi: "Xin chào", ko: "안녕하세요" },
  { id: "thanks", vi: "Cảm ơn", ko: "감사합니다" },
  { id: "yes", vi: "Vâng", ko: "네" },
  { id: "no", vi: "Không", ko: "아니요" },
  { id: "water", vi: "Nước", ko: "물" },
  { id: "food", vi: "Thức ăn", ko: "음식" },
  { id: "rice", vi: "Cơm", ko: "밥" },
  { id: "friend", vi: "Bạn bè", ko: "친구" },
  { id: "family", vi: "Gia đình", ko: "가족" },
  { id: "school", vi: "Trường học", ko: "학교" },
  { id: "book", vi: "Sách", ko: "책" },
  { id: "love", vi: "Yêu", ko: "사랑" },
  { id: "happy", vi: "Vui vẻ", ko: "행복" },
  { id: "sad", vi: "Buồn", ko: "슬픔" },
  { id: "big", vi: "Lớn", ko: "크다" },
  { id: "small", vi: "Nhỏ", ko: "작다" },
  { id: "hot", vi: "Nóng", ko: "뜨겁다" },
  { id: "cold", vi: "Lạnh", ko: "춥다" },
  { id: "morning", vi: "Buổi sáng", ko: "아침" },
  { id: "night", vi: "Ban đêm", ko: "밤" },
  { id: "today", vi: "Hôm nay", ko: "오늘" },
  { id: "tomorrow", vi: "Ngày mai", ko: "내일" },
  { id: "yesterday", vi: "Hôm qua", ko: "어제" },
  { id: "money", vi: "Tiền", ko: "돈" },
  { id: "time", vi: "Thời gian", ko: "시간" },
  { id: "work", vi: "Công việc", ko: "일" },
  { id: "home", vi: "Nhà", ko: "집" },
  { id: "city", vi: "Thành phố", ko: "도시" },
  { id: "country", vi: "Đất nước", ko: "나라" },
  { id: "sun", vi: "Mặt trời", ko: "태양" },
  { id: "moon", vi: "Mặt trăng", ko: "달" },
  { id: "rain", vi: "Mưa", ko: "비" },
  { id: "wind", vi: "Gió", ko: "바람" },
  { id: "flower", vi: "Hoa", ko: "꽃" },
  { id: "tree", vi: "Cây", ko: "나무" },
  { id: "cat", vi: "Mèo", ko: "고양이" },
  { id: "dog", vi: "Chó", ko: "개" },
  { id: "fish", vi: "Cá", ko: "물고기" },
  { id: "bird", vi: "Chim", ko: "새" },
  { id: "red", vi: "Màu đỏ", ko: "빨간색" },
  { id: "blue", vi: "Màu xanh dương", ko: "파란색" },
  { id: "green", vi: "Màu xanh lá", ko: "초록색" },
  { id: "white", vi: "Màu trắng", ko: "흰색" },
  { id: "black", vi: "Màu đen", ko: "검은색" },
  { id: "one", vi: "Một", ko: "하나" },
  { id: "two", vi: "Hai", ko: "둘" },
  { id: "three", vi: "Ba", ko: "셋" },
  { id: "beautiful", vi: "Đẹp", ko: "아름답다" },
  { id: "delicious", vi: "Ngon", ko: "맛있다" },
  { id: "fast", vi: "Nhanh", ko: "빠르다" },
  { id: "slow", vi: "Chậm", ko: "느리다" },
  { id: "please", vi: "Làm ơn", ko: "부탁해요" },
  { id: "sorry", vi: "Xin lỗi", ko: "미안합니다" },
  { id: "goodbye", vi: "Tạm biệt", ko: "안녕히 가세요" },
  { id: "name", vi: "Tên", ko: "이름" },
  { id: "phone", vi: "Điện thoại", ko: "전화" },
  { id: "car", vi: "Xe hơi", ko: "자동차" },
  { id: "bus", vi: "Xe buýt", ko: "버스" },
  { id: "train", vi: "Tàu hỏa", ko: "기차" },
  { id: "airport", vi: "Sân bay", ko: "공항" },
  { id: "hospital", vi: "Bệnh viện", ko: "병원" },
  { id: "market", vi: "Chợ", ko: "시장" },
  { id: "coffee", vi: "Cà phê", ko: "커피" },
  { id: "tea", vi: "Trà", ko: "차" },
  { id: "milk", vi: "Sữa", ko: "우유" },
  { id: "bread", vi: "Bánh mì", ko: "빵" },
  { id: "apple", vi: "Táo", ko: "사과" },
  { id: "banana", vi: "Chuối", ko: "바나나" },
  { id: "mother", vi: "Mẹ", ko: "어머니" },
  { id: "father", vi: "Bố", ko: "아버지" },
  { id: "teacher", vi: "Giáo viên", ko: "선생님" },
  { id: "student", vi: "Học sinh", ko: "학생" },
];

const boardEl = document.getElementById("board");
const boardLockEl = document.getElementById("board-lock");
const timerEl = document.getElementById("timer");
const timeMinusBtn = document.getElementById("time-minus");
const timePlusBtn = document.getElementById("time-plus");
const matchCountEl = document.getElementById("match-count");
const missCountEl = document.getElementById("miss-count");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const notebookEl = document.getElementById("notebook");
const notebookListEl = document.getElementById("notebook-list");
const answersEl = document.getElementById("answers");
const answersListEl = document.getElementById("answers-list");
const answersDescEl = document.getElementById("answers-desc");
const overlayEl = document.getElementById("overlay");
const resultTitleEl = document.getElementById("result-title");
const resultDescEl = document.getElementById("result-desc");
const playAgainBtn = document.getElementById("play-again-btn");
const closeModalBtn = document.getElementById("close-modal-btn");

const state = {
  playing: false,
  locked: false,
  cards: [],
  selected: [],
  matchedPairs: 0,
  matchedIds: new Set(),
  missCount: 0,
  wrongPairs: new Map(),
  pairMap: new Map(),
  timeLimitSec: TIME_DEFAULT,
  remainingMs: TIME_DEFAULT * 1000,
  rafId: null,
  lastTs: 0,
  lastShownSec: -1,
};

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickPairs() {
  return shuffle(WORD_BANK).slice(0, PAIR_COUNT);
}

function buildCards(pairs) {
  state.pairMap = new Map(pairs.map((p) => [p.id, p]));
  const cards = [];
  pairs.forEach((pair) => {
    cards.push({
      uid: `${pair.id}-vi`,
      pairId: pair.id,
      lang: "vi",
      text: pair.vi,
    });
    cards.push({
      uid: `${pair.id}-ko`,
      pairId: pair.id,
      lang: "ko",
      text: pair.ko,
    });
  });
  return shuffle(cards);
}

function formatTime(ms) {
  const totalSec = Math.max(0, Math.ceil(ms / 1000));
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${String(sec).padStart(2, "0")}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderBoard() {
  boardEl.innerHTML = "";
  const frag = document.createDocumentFragment();
  state.cards.forEach((card, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "card";
    btn.style.setProperty("--i", String(index));
    btn.dataset.uid = card.uid;
    btn.dataset.pairId = card.pairId;
    btn.dataset.lang = card.lang;
    btn.setAttribute(
      "aria-label",
      `${card.lang === "vi" ? "베트남어" : "한국어"} ${card.text}`
    );
    btn.innerHTML = `
      <span class="card-lang">${card.lang === "vi" ? "VI" : "KO"}</span>
      <span class="card-word">${escapeHtml(card.text)}</span>
    `;
    btn.addEventListener("click", () => onCardClick(btn, card));
    frag.appendChild(btn);
  });
  boardEl.appendChild(frag);
}

function spawnMatchBurst(btn) {
  const rect = btn.getBoundingClientRect();
  const colors = ["#ffe08a", "#ff8a6a", "#7ed0b6", "#fff"];
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  for (let i = 0; i < 5; i += 1) {
    const piece = document.createElement("span");
    piece.className = "match-burst";
    piece.style.left = `${cx}px`;
    piece.style.top = `${cy}px`;
    piece.style.setProperty("--dx", `${(Math.random() - 0.5) * 80}px`);
    piece.style.setProperty("--dy", `${-20 - Math.random() * 60}px`);
    piece.style.background = colors[i % colors.length];
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
    document.body.appendChild(piece);
  }
}

function urgentMs() {
  return Math.min(10000, Math.max(5000, state.timeLimitSec * 200));
}

function updateTimerDisplay() {
  const sec = Math.ceil(state.remainingMs / 1000);
  if (sec === state.lastShownSec) return;
  state.lastShownSec = sec;
  timerEl.textContent = formatTime(state.remainingMs);
  timerEl.classList.toggle(
    "is-urgent",
    state.playing && state.remainingMs <= urgentMs()
  );
}

function setHud() {
  updateTimerDisplay();
  matchCountEl.textContent = `${state.matchedPairs} / ${PAIR_COUNT}`;
  missCountEl.textContent = String(state.missCount);
  updateTimeControls();
}

function updateTimeControls() {
  const canEdit = !state.playing;
  timeMinusBtn.disabled = !canEdit || state.timeLimitSec <= TIME_MIN;
  timePlusBtn.disabled = !canEdit || state.timeLimitSec >= TIME_MAX;
}

function adjustTimeLimit(delta) {
  if (state.playing) return;
  state.timeLimitSec = Math.min(
    TIME_MAX,
    Math.max(TIME_MIN, state.timeLimitSec + delta)
  );
  state.remainingMs = state.timeLimitSec * 1000;
  state.lastShownSec = -1;
  setHud();
}

function setLockVisible(visible) {
  boardLockEl.classList.toggle("is-hidden", !visible);
}

function prepareRound(showLock) {
  cancelAnimationFrame(state.rafId);
  state.rafId = null;
  state.playing = false;
  state.locked = false;
  state.selected = [];
  state.matchedPairs = 0;
  state.matchedIds = new Set();
  state.missCount = 0;
  state.wrongPairs = new Map();
  state.remainingMs = state.timeLimitSec * 1000;
  state.lastTs = 0;
  state.lastShownSec = -1;
  state.cards = buildCards(pickPairs());
  document.body.classList.remove("is-playing");
  setLockVisible(showLock);
  notebookEl.hidden = true;
  notebookListEl.innerHTML = "";
  answersEl.hidden = true;
  answersListEl.innerHTML = "";
  overlayEl.hidden = true;
  startBtn.disabled = false;
  restartBtn.disabled = true;
  renderBoard();
  setHud();
}

function startGame() {
  if (state.playing) return;
  setLockVisible(false);
  state.playing = true;
  state.locked = false;
  state.lastTs = 0;
  state.lastShownSec = -1;
  document.body.classList.add("is-playing");
  startBtn.disabled = true;
  restartBtn.disabled = false;
  overlayEl.hidden = true;
  notebookEl.hidden = true;
  answersEl.hidden = true;
  updateTimeControls();
  state.rafId = requestAnimationFrame(tick);
}

function beginNewGame() {
  prepareRound(false);
  startGame();
}

function tick(ts) {
  if (!state.playing) return;
  if (!state.lastTs) {
    state.lastTs = ts;
    state.rafId = requestAnimationFrame(tick);
    return;
  }
  const delta = Math.min(100, ts - state.lastTs);
  state.lastTs = ts;
  state.remainingMs = Math.max(0, state.remainingMs - delta);
  updateTimerDisplay();

  if (state.remainingMs <= 0) {
    endGame(false);
    return;
  }
  state.rafId = requestAnimationFrame(tick);
}

function onCardClick(btn, card) {
  if (!state.playing || state.locked) return;
  if (btn.classList.contains("is-matched") || btn.classList.contains("is-gone")) return;
  if (state.selected.some((f) => f.uid === card.uid)) {
    btn.classList.remove("is-selected");
    state.selected = state.selected.filter((f) => f.uid !== card.uid);
    return;
  }
  if (state.selected.length >= 2) return;

  btn.classList.add("is-selected");
  state.selected.push({ btn, ...card });
  if (state.selected.length < 2) return;

  state.locked = true;
  const [a, b] = state.selected;
  if (a.pairId === b.pairId && a.lang !== b.lang) handleMatch(a, b);
  else handleMiss(a, b);
}

function handleMatch(a, b) {
  state.matchedPairs += 1;
  state.matchedIds.add(a.pairId);
  setHud();

  a.btn.classList.remove("is-selected");
  b.btn.classList.remove("is-selected");
  a.btn.classList.add("is-matched");
  b.btn.classList.add("is-matched");
  spawnMatchBurst(a.btn);
  spawnMatchBurst(b.btn);

  window.setTimeout(() => {
    if (!state.playing && state.matchedPairs < PAIR_COUNT) return;
    a.btn.classList.add("is-gone");
    b.btn.classList.add("is-gone");
    a.btn.disabled = true;
    b.btn.disabled = true;
    state.selected = [];
    state.locked = false;
    if (state.matchedPairs >= PAIR_COUNT) endGame(true);
  }, 720);
}

function handleMiss(a, b) {
  state.missCount += 1;
  recordWrong(a.pairId);
  if (a.pairId !== b.pairId) recordWrong(b.pairId);
  setHud();

  a.btn.classList.add("is-wrong");
  b.btn.classList.add("is-wrong");

  window.setTimeout(() => {
    a.btn.classList.remove("is-selected", "is-wrong");
    b.btn.classList.remove("is-selected", "is-wrong");
    state.selected = [];
    state.locked = false;
  }, 520);
}

function recordWrong(pairId) {
  const pair = state.pairMap.get(pairId);
  if (!pair) return;
  const prev = state.wrongPairs.get(pairId);
  state.wrongPairs.set(pairId, {
    ...pair,
    count: (prev?.count || 0) + 1,
  });
}

function endGame(won) {
  state.playing = false;
  state.locked = true;
  cancelAnimationFrame(state.rafId);
  state.rafId = null;
  document.body.classList.remove("is-playing");
  startBtn.disabled = false;
  restartBtn.disabled = false;
  updateTimeControls();

  resultTitleEl.textContent = won ? "클리어!" : "시간 종료!";
  resultDescEl.textContent = won
    ? `${PAIR_COUNT}쌍을 모두 맞췄어요. 오답 ${state.missCount}회.`
    : `매칭 ${state.matchedPairs}/${PAIR_COUNT} · 오답 ${state.missCount}회. 전체 정답을 확인해 보세요!`;
  closeModalBtn.textContent = won ? "결과 보기" : "정답 보기";
  overlayEl.hidden = false;
  renderAnswers(won);
  renderNotebook();
}

function renderAnswers(won) {
  answersEl.hidden = false;
  answersListEl.innerHTML = "";
  answersDescEl.textContent = won
    ? "이번 판에서 맞춘 모든 짝이에요."
    : "맞춘 짝과 못 맞춘 짝을 모두 확인할 수 있어요.";

  const frag = document.createDocumentFragment();
  state.pairMap.forEach((pair) => {
    const cleared = state.matchedIds.has(pair.id);
    const li = document.createElement("li");
    li.className = cleared ? "is-cleared" : "is-missed";
    li.innerHTML = `
      <span class="pair-vi">${escapeHtml(pair.vi)}</span>
      <span class="pair-arrow">↔</span>
      <span class="pair-ko">${escapeHtml(pair.ko)}</span>
      <span class="pair-status">${cleared ? "맞춤" : "미해결"}</span>
    `;
    frag.appendChild(li);
  });
  answersListEl.appendChild(frag);
}

function renderNotebook() {
  notebookEl.hidden = false;
  notebookListEl.innerHTML = "";

  const items = [...state.wrongPairs.values()].sort((a, b) => b.count - a.count);
  if (!items.length) {
    const li = document.createElement("li");
    li.className = "notebook-empty";
    li.textContent = "이번 판에서는 틀린 짝이 없어요. 완벽해요!";
    notebookListEl.appendChild(li);
    return;
  }

  const frag = document.createDocumentFragment();
  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="pair-vi">${escapeHtml(item.vi)}</span>
      <span class="pair-arrow">↔</span>
      <span class="pair-ko">${escapeHtml(item.ko)}</span>
      <span class="pair-arrow">· ${item.count}회</span>
    `;
    frag.appendChild(li);
  });
  notebookListEl.appendChild(frag);
}

timeMinusBtn.addEventListener("click", () => adjustTimeLimit(-TIME_STEP));
timePlusBtn.addEventListener("click", () => adjustTimeLimit(TIME_STEP));
startBtn.addEventListener("click", beginNewGame);
restartBtn.addEventListener("click", beginNewGame);
playAgainBtn.addEventListener("click", beginNewGame);
closeModalBtn.addEventListener("click", () => {
  overlayEl.hidden = true;
  answersEl.scrollIntoView({ behavior: "smooth", block: "start" });
});

prepareRound(true);
