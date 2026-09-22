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
  { left: "🥕", leftName: "にんじん", right: "🌽", rightName: "とうもろこし", answer: "both" },

  { left: "🍉", leftName: "すいか", right: "🍑", rightName: "もも", answer: "both" },
  { left: "🍒", leftName: "さくらんぼ", right: "🍍", rightName: "パイナップル", answer: "both" },
  { left: "🥝", leftName: "キウイ", right: "🍐", rightName: "なし", answer: "both" },
  { left: "🍔", leftName: "ハンバーガー", right: "🍕", rightName: "ピザ", answer: "both" },
  { left: "🍟", leftName: "ポテト", right: "🌭", rightName: "ホットドッグ", answer: "both" },
  { left: "🍞", leftName: "パン", right: "🥞", rightName: "ホットケーキ", answer: "both" },
  { left: "🍚", leftName: "ごはん", right: "🍝", rightName: "スパゲッティ", answer: "both" },
  { left: "🍤", leftName: "えびフライ", right: "🥟", rightName: "ぎょうざ", answer: "both" },
  { left: "🍣", leftName: "おすし", right: "🍱", rightName: "おべんとう", answer: "both" },
  { left: "🧁", leftName: "カップケーキ", right: "🍫", rightName: "チョコレート", answer: "both" },
  { left: "🍬", leftName: "あめ", right: "🍿", rightName: "ポップコーン", answer: "both" },
  { left: "🍧", leftName: "かきごおり", right: "🥤", rightName: "ジュース", answer: "both" },

  { left: "🐸", leftName: "かえる", right: "🐧", rightName: "ペンギン", answer: "both" },
  { left: "🐨", leftName: "コアラ", right: "🐯", rightName: "とら", answer: "both" },
  { left: "🐵", leftName: "さる", right: "🦊", rightName: "きつね", answer: "both" },
  { left: "🦓", leftName: "しまうま", right: "🦛", rightName: "かば", answer: "both" },
  { left: "🦏", leftName: "さい", right: "🐊", rightName: "わに", answer: "both" },
  { left: "🐬", leftName: "いるか", right: "🐳", rightName: "くじら", answer: "both" },
  { left: "🦈", leftName: "さめ", right: "🦭", rightName: "あざらし", answer: "both" },
  { left: "🐥", leftName: "ひよこ", right: "🦆", rightName: "あひる", answer: "both" },
  { left: "🦉", leftName: "ふくろう", right: "🦅", rightName: "わし", answer: "both" },
  { left: "🐝", leftName: "はち", right: "🦋", rightName: "ちょうちょ", answer: "both" },
  { left: "🐞", leftName: "てんとうむし", right: "🐌", rightName: "かたつむり", answer: "both" },
  { left: "🐹", leftName: "ハムスター", right: "🐿️", rightName: "りす", answer: "both" },

  { left: "🚕", leftName: "タクシー", right: "🚚", rightName: "トラック", answer: "both" },
  { left: "🚑", leftName: "きゅうきゅうしゃ", right: "🚐", rightName: "ワゴンしゃ", answer: "both" },
  { left: "🏍️", leftName: "バイク", right: "🛴", rightName: "キックボード", answer: "both" },
  { left: "🚂", leftName: "きかんしゃ", right: "🚄", rightName: "しんかんせん", answer: "both" },
  { left: "🚢", leftName: "ふね", right: "⛵️", rightName: "ヨット", answer: "both" },
  { left: "🚤", leftName: "ボート", right: "🛶", rightName: "カヌー", answer: "both" },
  { left: "🚠", leftName: "ロープウェイ", right: "🚡", rightName: "ゴンドラ", answer: "both" },
  { left: "🚲", leftName: "じてんしゃ", right: "🛹", rightName: "スケートボード", answer: "both" },

  { left: "🏀", leftName: "バスケットボール", right: "⚾️", rightName: "やきゅう", answer: "both" },
  { left: "🎾", leftName: "テニス", right: "🏓", rightName: "たっきゅう", answer: "both" },
  { left: "🏸", leftName: "バドミントン", right: "🏐", rightName: "バレーボール", answer: "both" },
  { left: "🛝", leftName: "すべりだい", right: "🎠", rightName: "メリーゴーランド", answer: "both" },
  { left: "🪁", leftName: "たこあげ", right: "🫧", rightName: "しゃぼんだま", answer: "both" },
  { left: "🎨", leftName: "おえかき", right: "🧩", rightName: "パズル", answer: "both" },
  { left: "📚", leftName: "えほん", right: "🎵", rightName: "おんがく", answer: "both" },
  { left: "🎤", leftName: "うた", right: "💃", rightName: "ダンス", answer: "both" },
  { left: "🎮", leftName: "ゲーム", right: "🧱", rightName: "ブロック", answer: "both" },

  { left: "☀️", leftName: "おひさま", right: "☁️", rightName: "くも", answer: "both" },
  { left: "❄️", leftName: "ゆき", right: "☔️", rightName: "あめ", answer: "both" },
  { left: "🌸", leftName: "さくら", right: "🌷", rightName: "チューリップ", answer: "both" },
  { left: "🍁", leftName: "もみじ", right: "🌿", rightName: "はっぱ", answer: "both" },
  { left: "🌊", leftName: "うみ", right: "⛰️", rightName: "やま", answer: "both" },
  { left: "🏖️", leftName: "すなはま", right: "🏕️", rightName: "キャンプ", answer: "both" },
  { left: "🌞", leftName: "あさ", right: "🌙", rightName: "よる", answer: "both" },

  { left: "🛏️", leftName: "ベッド", right: "🛁", rightName: "おふろ", answer: "both" },
  { left: "🪥", leftName: "はみがき", right: "🧼", rightName: "せっけん", answer: "both" },
  { left: "📺", leftName: "テレビ", right: "📱", rightName: "スマホ", answer: "both" },
  { left: "⌚️", leftName: "とけい", right: "🔦", rightName: "かいちゅうでんとう", answer: "both" },
  { left: "🎒", leftName: "リュック", right: "☂️", rightName: "かさ", answer: "both" },
  { left: "✏️", leftName: "えんぴつ", right: "🖍️", rightName: "クレヨン", answer: "both" },
  { left: "🧦", leftName: "くつした", right: "🧤", rightName: "てぶくろ", answer: "both" },
  { left: "👑", leftName: "おうかん", right: "🎀", rightName: "リボン", answer: "both" }
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

function speak(text, onDone, fallbackMs = 1800) {
  try {
    if (!("speechSynthesis" in window)) {
      if (typeof onDone === "function") setTimeout(onDone, 300);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    let finished = false;
    const done = () => {
      if (finished) return;
      finished = true;
      if (typeof onDone === "function") onDone();
    };
    u.lang = "ja-JP";
    u.rate = 0.88;
    u.pitch = 1.35;
    u.volume = 1;
    u.onend = done;
    u.onerror = done;
    window.speechSynthesis.speak(u);
    if (typeof onDone === "function") setTimeout(done, fallbackMs);
  } catch (e) {
    if (typeof onDone === "function") setTimeout(onDone, 300);
  }
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
  setTimeout(() => speak("もういっかいやる？ りんご押してね！"), 720);
}

function finishGame() {
  acceptingAnswer = false;
  celebrationTone();
  showBigReaction("できたね！");
  speak("できたね！", () => {
    reaction.classList.remove("show", "big");
    showFinishScreen();
  }, 1700);
}

function answer(side, button) {
  if (!acceptingAnswer) return;
  acceptingAnswer = false;
  button.classList.add("pressed");
  setTimeout(() => button.classList.remove("pressed"), 130);
  answeredCount += 1;
  tone(true);

  // 5問目だけは「いいね」を途中で切らず、終了音声にきれいにつなげる。
  if (answeredCount >= MAX_QUESTIONS) {
    showReaction(true, "やった！");
    setTimeout(finishGame, 680);
    return;
  }

  speak("いいね");
  showReaction(true);
  setTimeout(() => {
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
