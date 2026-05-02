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

const questions = [
  { left: "👟", leftName: "くつ", right: "🧢", rightName: "ぼうし", answer: "left" },
  { left: "🚗", leftName: "くるま", right: "🦕", rightName: "きょうりゅう", answer: "right" },
  { left: "🍎", leftName: "りんご", right: "🍌", rightName: "バナナ", answer: "right" },
  { left: "🐶", leftName: "いぬ", right: "🐱", rightName: "ねこ", answer: "left" },
  { left: "⚽️", leftName: "ボール", right: "🚃", rightName: "でんしゃ", answer: "right" },
  { left: "🍙", leftName: "おにぎり", right: "🍓", rightName: "いちご", answer: "left" },
  { left: "🚌", leftName: "バス", right: "🚲", rightName: "じてんしゃ", answer: "left" },
  { left: "🧸", leftName: "ぬいぐるみ", right: "🎈", rightName: "ふうせん", answer: "right" },
  { left: "🍩", leftName: "ドーナツ", right: "🥛", rightName: "ぎゅうにゅう", answer: "left" },
  { left: "🐘", leftName: "ぞう", right: "🦒", rightName: "きりん", answer: "right" }
];

const okMessages = ["やった！", "いいね！", "すごい！", "ぴんぽん！"];
let index = 0;
let audioCtx = null;

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

function loadQuestion() {
  const q = questions[index];
  leftItem.textContent = q.left;
  rightItem.textContent = q.right;
  leftChoice.setAttribute("aria-label", q.leftName);
  rightChoice.setAttribute("aria-label", q.rightName);
}

function showReaction(ok) {
  reactionText.textContent = ok ? okMessages[Math.floor(Math.random() * okMessages.length)] : "あれ？";
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

function answer(side, button) {
  button.classList.add("pressed");
  setTimeout(() => button.classList.remove("pressed"), 130);

  const ok = questions[index].answer === side;
  tone(ok);
  speak(ok ? "いいね" : "あれ");
  showReaction(ok);

  if (ok) {
    setTimeout(() => {
      index = (index + 1) % questions.length;
      loadQuestion();
      setTimeout(speakQuestion, 180);
    }, 780);
  }
}

startBtn.addEventListener("click", () => {
  unlockAudio();
  startScreen.classList.add("hide");
  gameScreen.classList.add("show");
  gameScreen.removeAttribute("aria-hidden");
  loadQuestion();
  setTimeout(speakQuestion, 160);
});

leftChoice.addEventListener("click", () => answer("left", leftChoice));
rightChoice.addEventListener("click", () => answer("right", rightChoice));

soundBtn.addEventListener("click", () => {
  unlockAudio();
  speakQuestion();
});

document.addEventListener("touchstart", unlockAudio, { once: true });
document.addEventListener("click", unlockAudio, { once: true });

loadQuestion();
