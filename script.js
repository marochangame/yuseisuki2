const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const finishScreen = document.getElementById("finishScreen");
const startBtn = document.getElementById("startBtn");
const appleBtn = document.getElementById("appleBtn");
const leftChoice = document.getElementById("leftChoice");
const rightChoice = document.getElementById("rightChoice");
const leftItem = document.getElementById("leftItem");
const rightItem = document.getElementById("rightItem");
const soundBtn = document.getElementById("soundBtn");
const turnCounter = document.getElementById("turnCounter");
const reaction = document.getElementById("reaction");
const reactionText = document.getElementById("reactionText");
const heroFox = document.getElementById("heroFox");

const questions = [
  { left: "👟", leftName: "くつ", right: "🧢", rightName: "ぼうし", answer: "both" },
  { left: "🚗", leftName: "くるま", right: "🦕", rightName: "きょうりゅう", answer: "both" },
  { left: "🍎", leftName: "りんご", right: "🍌", rightName: "バナナ", answer: "both" },
  { left: "🐶", leftName: "いぬ", right: "🐱", rightName: "ねこ", answer: "both" },
  { left: "⚽️", leftName: "ボール", right: "🚃", rightName: "でんしゃ", answer: "both" },
  { left: "🍙", leftName: "おにぎり", right: "🍓", rightName: "いちご", answer: "both" },
  { left: "🚌", leftName: "バス", right: "🚲", rightName: "じてんしゃ", answer: "both" },
  { left: "🧸", leftName: "ぬいぐるみ", right: "🎈", rightName: "ふうせん", answer: "both" },
  { left: "🍩", leftName: "ドーナツ", right: "🥛", rightName: "ぎゅうにゅう", answer: "both" },
  { left: "🐘", leftName: "ぞう", right: "🦒", rightName: "きりん", answer: "both" },
  { left: "🚒", leftName: "しょうぼうしゃ", right: "🚓", rightName: "パトカー", answer: "both" },
  { left: "🍮", leftName: "プリン", right: "🍰", rightName: "ケーキ", answer: "both" },
  { left: "🐰", leftName: "うさぎ", right: "🐻", rightName: "くま", answer: "both" },
  { left: "🌻", leftName: "ひまわり", right: "🌈", rightName: "にじ", answer: "both" },
  { left: "🚀", leftName: "ロケット", right: "✈️", rightName: "ひこうき", answer: "both" },
  { left: "🍇", leftName: "ぶどう", right: "🍊", rightName: "みかん", answer: "both" },
  { left: "🐟", leftName: "さかな", right: "🐢", rightName: "かめ", answer: "both" },
  { left: "🎹", leftName: "ピアノ", right: "🥁", rightName: "たいこ", answer: "both" },
  { left: "🍜", leftName: "ラーメン", right: "🍛", rightName: "カレー", answer: "both" },
  { left: "⭐️", leftName: "おほしさま", right: "🌙", rightName: "おつきさま", answer: "both" },
  { left: "🦁", leftName: "ライオン", right: "🐼", rightName: "パンダ", answer: "both" },
  { left: "🍦", leftName: "アイス", right: "🍪", rightName: "クッキー", answer: "both" },
  { left: "🚜", leftName: "トラクター", right: "🚁", rightName: "ヘリコプター", answer: "both" },
  { left: "🦀", leftName: "かに", right: "🐙", rightName: "たこ", answer: "both" },
  { left: "🥕", leftName: "にんじん", right: "🌽", rightName: "とうもろこし", answer: "both" }
];

const okMessages = ["いいね！", "いいねぇ！", "すきすき！", "やった！", "わぁ！", "すごい！"];
const MAX_QUESTIONS = 5;
let index = 0;
let answeredCount = 0;
let audioCtx = null;
let acceptingAnswer = true;
let shuffled = [];
let nextQuestionPointer = 0;

function unlockAudio() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!audioCtx) audioCtx = new AC();
    if (audioCtx.state === "suspended") audioCtx.resume();
  } catch (e) {}
}

function speak(text) {
  try {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = 0.88;
    u.pitch = 1.35;
    u.volume = 1;
    window.speechSynthesis.speak(u);
  } catch (e) {}
}

function speakQuestion() {
  const q = questions[index];
  speak(`ユーセーくんは、${q.leftName}と${q.rightName}、どっちがすき？`);
}

function shuffleQuestions() {
  shuffled = [...Array(questions.length).keys()];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  nextQuestionPointer = 0;
}

function pickNextQuestion() {
  if (!shuffled.length || nextQuestionPointer >= shuffled.length) shuffleQuestions();
  index = shuffled[nextQuestionPointer];
  nextQuestionPointer += 1;
}

function tone(ok) {
  try {
    unlockAudio();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(ok ? 720 : 260, now);
    osc.frequency.exponentialRampToValueAtTime(ok ? 1140 : 210, now + 0.14);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(ok ? 0.22 : 0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.20);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  } catch (e) {}
}

function celebrationTone() {
  try {
    unlockAudio();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    [660, 880, 1100, 1320].forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.09);
      gain.gain.setValueAtTime(0.001, now + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.18, now + i * 0.09 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.18);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + i * 0.09);
      osc.stop(now + i * 0.09 + 0.2);
    });
  } catch (e) {}
}

function loadQuestion() {
  const q = questions[index];
  leftItem.textContent = q.left;
  rightItem.textContent = q.right;
  leftChoice.setAttribute("aria-label", q.leftName);
  rightChoice.setAttribute("aria-label", q.rightName);
  turnCounter.textContent = `${answeredCount + 1} / ${MAX_QUESTIONS}`;
  acceptingAnswer = true;
}

function showReaction(ok, text) {
  reactionText.textContent = text || (ok ? okMessages[Math.floor(Math.random() * okMessages.length)] : "あれ？");
  reaction.classList.remove("show", "big");
  void reaction.offsetWidth;
  reaction.classList.add("show");
  heroFox.classList.remove("happy");
  if (ok) {
    void heroFox.offsetWidth;
    heroFox.classList.add("happy");
  }
  setTimeout(() => reaction.classList.remove("show"), ok ? 760 : 520);
}

function showBigReaction(text) {
  reactionText.textContent = text;
  reaction.classList.remove("show", "big");
  void reaction.offsetWidth;
  reaction.classList.add("show", "big");
  heroFox.classList.remove("happy");
  void heroFox.offsetWidth;
  heroFox.classList.add("happy");
}

function showFinishScreen() {
  gameScreen.classList.remove("show");
  gameScreen.setAttribute("aria-hidden", "true");
  finishScreen.classList.add("show");
  finishScreen.removeAttribute("aria-hidden");
  appleBtn.classList.remove("pulse");
  void appleBtn.offsetWidth;
  appleBtn.classList.add("pulse");
  setTimeout(() => speak("もういっかいやる？ りんご押してね！"), 520);
}

function finishGame() {
  acceptingAnswer = false;
  celebrationTone();
  speak("できたね。いいねぇ！");
  showBigReaction("できたね！");
  setTimeout(() => {
    reaction.classList.remove("show", "big");
    showFinishScreen();
  }, 1500);
}

function answer(side, button) {
  if (!acceptingAnswer) return;
  acceptingAnswer = false;
  button.classList.add("pressed");
  setTimeout(() => button.classList.remove("pressed"), 130);
  answeredCount += 1;
  tone(true);
  speak("いいね");
  showReaction(true);
  setTimeout(() => {
    if (answeredCount >= MAX_QUESTIONS) {
      finishGame();
      return;
    }
    pickNextQuestion();
    loadQuestion();
    setTimeout(speakQuestion, 180);
  }, 780);
}

function startRound() {
  unlockAudio();
  answeredCount = 0;
  startScreen.classList.add("hide");
  finishScreen.classList.remove("show");
  finishScreen.setAttribute("aria-hidden", "true");
  gameScreen.classList.add("show");
  gameScreen.removeAttribute("aria-hidden");
  pickNextQuestion();
  loadQuestion();
  setTimeout(speakQuestion, 160);
}

startBtn.addEventListener("click", startRound);
appleBtn.addEventListener("click", startRound);
leftChoice.addEventListener("click", () => answer("left", leftChoice));
rightChoice.addEventListener("click", () => answer("right", rightChoice));
soundBtn.addEventListener("click", () => {
  unlockAudio();
  speakQuestion();
});
document.addEventListener("touchstart", unlockAudio, { once: true });
document.addEventListener("click", unlockAudio, { once: true });
shuffleQuestions();
pickNextQuestion();
loadQuestion();
