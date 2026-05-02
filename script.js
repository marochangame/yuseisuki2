const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const startBtn = document.getElementById("startBtn");
const leftChoice = document.getElementById("leftChoice");
const rightChoice = document.getElementById("rightChoice");
const leftItem = document.getElementById("leftItem");
const rightItem = document.getElementById("rightItem");
const soundBtn = document.getElementById("soundBtn");
const reaction = document.getElementById("reaction");
const reactionText = document.getElementById("reactionText");
const heroFox = document.getElementById("heroFox");

const pairs = [
  { left: "👟", right: "🧢", answer: "left" },
  { left: "🚗", right: "🦕", answer: "right" },
  { left: "🍎", right: "🍌", answer: "right" },
  { left: "🐶", right: "🐱", answer: "left" },
  { left: "⚽️", right: "🚃", answer: "right" },
  { left: "🍙", right: "🍓", answer: "left" },
  { left: "🚌", right: "🚲", answer: "left" },
  { left: "🧸", right: "🎈", answer: "right" },
  { left: "🍩", right: "🥛", answer: "left" },
  { left: "🐘", right: "🦒", answer: "right" }
];

const messages = ["やった！", "いいね！", "すごい！", "ぴんぽん！"];
let currentIndex = 0;
let audioReady = false;

function speak(text) {
  try {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = 0.92;
    u.pitch = 1.35;
    u.volume = 1;
    window.speechSynthesis.speak(u);
  } catch (e) {}
}

function beep(ok = true) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(ok ? 780 : 280, now);
    osc.frequency.exponentialRampToValueAtTime(ok ? 1160 : 220, now + 0.12);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.25, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  } catch (e) {}
}

function shuffleNext() {
  currentIndex = (currentIndex + 1) % pairs.length;
  loadQuestion();
}

function loadQuestion() {
  const q = pairs[currentIndex];
  leftItem.textContent = q.left;
  rightItem.textContent = q.right;
  leftChoice.setAttribute("aria-label", "ひだり");
  rightChoice.setAttribute("aria-label", "みぎ");
}

function showReaction(ok) {
  reactionText.textContent = ok ? messages[Math.floor(Math.random() * messages.length)] : "あれ？";
  reaction.classList.remove("show");
  void reaction.offsetWidth;
  reaction.classList.add("show");

  heroFox.classList.remove("happy");
  if (ok) {
    void heroFox.offsetWidth;
    heroFox.classList.add("happy");
  }

  setTimeout(() => reaction.classList.remove("show"), ok ? 760 : 520);
}

function answer(side, btn) {
  btn.classList.add("pressed");
  setTimeout(() => btn.classList.remove("pressed"), 130);

  const ok = pairs[currentIndex].answer === side;
  beep(ok);
  showReaction(ok);

  if (ok) {
    setTimeout(() => {
      shuffleNext();
    }, 820);
  }
}

startBtn.addEventListener("click", () => {
  audioReady = true;
  startScreen.classList.add("hide");
  gameScreen.classList.add("show");
  gameScreen.removeAttribute("aria-hidden");
  loadQuestion();
  speak("どっちかな");
});

leftChoice.addEventListener("click", () => answer("left", leftChoice));
rightChoice.addEventListener("click", () => answer("right", rightChoice));
soundBtn.addEventListener("click", () => speak("どっちかな"));

loadQuestion();
