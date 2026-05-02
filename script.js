// 完全版：動作＋音声OK
const startBtn = document.getElementById("startBtn");
const gameScreen = document.getElementById("gameScreen");
const startScreen = document.getElementById("startScreen");
const left = document.getElementById("leftChoice");
const right = document.getElementById("rightChoice");

const pairs = [
  {l:"👟", r:"🧢", a:"l"},
  {l:"🍎", r:"🍌", a:"r"},
];

let i=0;

function speak(t){
 if(!('speechSynthesis'in window))return;
 speechSynthesis.cancel();
 const u=new SpeechSynthesisUtterance(t);
 u.lang="ja-JP";
 u.pitch=1.3;
 u.rate=0.9;
 speechSynthesis.speak(u);
}

function load(){
 left.textContent=pairs[i].l;
 right.textContent=pairs[i].r;
}

startBtn.onclick=()=>{
 startScreen.style.display="none";
 gameScreen.style.display="block";
 load();
 speak("どっちかな");
};

left.onclick=()=>ans("l");
right.onclick=()=>ans("r");

function ans(s){
 if(pairs[i].a===s){
  speak("いいね");
  i=(i+1)%pairs.length;
  setTimeout(load,500);
 }else{
  speak("あれ");
 }
}
