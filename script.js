const sentence =
  "The quick brown fox jumps over the lazy dog while programmers silently debug JavaScript code for hours without realizing the semicolon they missed.";

let timeLeft = 60;
let timerStarted = false;
let timerId;
let startTime = 0;

function startTest() {
  if (!timerStarted) {
    timerStarted = true;
    startTime = new Date();
    timerId = setInterval(updateTimer, 1000);
  }
}

function updateTimer() {
  timeLeft--;
  document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

  if (timeLeft <= 0) {
    endTest();
  }
}

function checkEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // prevent newline
    endTest(); // end test on Enter key
  }
}

function endTest() {
  clearInterval(timerId);
  document.getElementById("inputBox").disabled = true;

  const endTime = new Date();
  const timeTakenSec = Math.round((endTime - startTime) / 1000);

  const userInput = document.getElementById("inputBox").value.trim();
  const originalWords = sentence.split(" ");
  const typedWords = userInput.split(" ");

  let correctCount = 0;
  let mistakeCount = 0;

  for (let i = 0; i < typedWords.length; i++) {
    if (typedWords[i] === originalWords[i]) {
      correctCount++;
    } else {
      mistakeCount++;
    }
  }

  const wpm = Math.round((correctCount / timeTakenSec) * 60);
  const wordsPerSecond = (correctCount / timeTakenSec).toFixed(2);

  const resultText = `
    ⏱️ Time Taken: ${timeTakenSec}s
    ✅ Total Words Typed: ${typedWords.length}
    🔍 Correct Words: ${correctCount}
    ❌ Mistakes: ${mistakeCount}
    ⚡ WPM: ${wpm}
    🚀 Words Per Second: ${wordsPerSecond}
  `;

  document.getElementById("result").innerText = resultText;
}
