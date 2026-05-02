const startBtn = document.getElementById("startBtn");
const soundBtn = document.getElementById("soundBtn");

let audioUnlocked = false;

function unlockAudio() {
  if (audioUnlocked) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    osc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.01);
    audioUnlocked = true;
  } catch(e){}
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ja-JP";
  u.rate = 0.9;
  u.pitch = 1.3;
  speechSynthesis.speak(u);
}

startBtn.addEventListener("click", () => {
  unlockAudio();
  speak("どっちかな");
});

soundBtn.addEventListener("click", () => {
  unlockAudio();
  speak("どっちかな");
});
