let key1 = "";
let key2 = "";
let duration = 0;
let clickCount = 0;
let timer;
let testStarted = false;
let countdown;
let clickTimes = [];
let timediffs = [];
let unstableRate = 0;
let beginTime;

document.getElementById("button1").addEventListener("click", () => {
  document.getElementById("button1").textContent = "Press a key for Button 1";
  document.addEventListener("keydown", handleKeyPress1);
});

document.getElementById("button2").addEventListener("click", () => {
  document.getElementById("button2").textContent = "Press a key for Button 2";
  document.addEventListener("keydown", handleKeyPress2);
});

document.getElementById("begin-test").addEventListener("click", () => {
  if (testStarted) {
    alert("Test is already running. Please wait for it to complete.");
    return;
  }

  duration = parseInt(document.getElementById("duration").value);

  if (!isNaN(duration) && duration > 0) {
    document.getElementById("message").classList.remove("hidden");
    document.getElementById("message").textContent =
      "Press one of the buttons to start the test.";
  } else {
    alert("Please enter a valid duration in seconds.");
  }
});

document.getElementById("reset-test").addEventListener("click", initializeTest);

function handleKeyPress1(event) {
  if (!testStarted) {
    key1 = event.key;
    document.getElementById("button1").textContent = `${key1}`;
    document.removeEventListener("keydown", handleKeyPress1);
    document.addEventListener("keydown", handleClick);
  }
}

function handleKeyPress2(event) {
  if (!testStarted) {
    key2 = event.key;
    document.getElementById("button2").textContent = `${key2}`;
    document.removeEventListener("keydown", handleKeyPress2);
    document.addEventListener("keydown", handleClick);
  }
}

function startTest() {
  testStarted = true;
  clickCount = 0;
  clickTimes = [];
  timediffs = [];
  unstableRate = 0;
  beginTime = Date.now();
  timer = duration;
  document.getElementById("result").textContent = "";
  document.getElementById("timer").classList.remove("hidden");
  document.getElementById("time-remaining").textContent = timer;
  document.getElementById("message").classList.add("hidden");

  countdown = setInterval(() => {
    timer--;
    document.getElementById("time-remaining").textContent = timer;

    if (timer <= 0) {
      clearInterval(countdown);
      finishTest();
    }
  }, 1000);
}

function handleClick(event) {
  if (!testStarted && (event.key === key1 || event.key === key2)) {
    startTest();
  }
  if (testStarted && (event.key === key1 || event.key === key2)) {
    clickCount++;
    const currentTime = Date.now();
    clickTimes.push(currentTime);

    if (clickTimes.length > 1) {
      timediffs.push(
        clickTimes[clickTimes.length - 1] - clickTimes[clickTimes.length - 2]
      );
      calculateUnstableRate();
    }
  }
}

function calculateUnstableRate() {
  if (timediffs.length > 0) {
    const sum = timediffs.reduce((a, b) => a + b, 0);
    const avg = sum / timediffs.length;
    const deviations = timediffs.map((v) => (v - avg) * (v - avg));
    const variance = deviations.reduce((a, b) => a + b, 0);
    const std = Math.sqrt(variance / deviations.length);
    unstableRate = std * 10;

    document.getElementById("unstable-rate").textContent =
      "Unstable Rate: " +
      (Math.round(unstableRate * 100000) / 100000).toFixed(3);
  }
}

function finishTest() {
  testStarted = false;
  document.removeEventListener("keydown", handleClick);
  const streamtime = (Date.now() - beginTime) / 1000;
  const bpm = ((clickCount / streamtime) * 60) / 4;
  document.getElementById("result").textContent = `BPM: ${Math.round(bpm)}`;
  document.getElementById("timer").classList.add("hidden");
}

function initializeTest() {
  key1 = "";
  key2 = "";
  duration = 0;
  clickCount = 0;
  testStarted = false;
  clickTimes = [];
  timediffs = [];
  unstableRate = 0;
  document.getElementById("button1").textContent = "Button 1";
  document.getElementById("button2").textContent = "Button 2";
  document.getElementById("result").textContent = "";
  document.getElementById("unstable-rate").textContent = "";
  document.getElementById("timer").classList.add("hidden");
  document.getElementById("time-remaining").textContent = "";
  document.getElementById("message").classList.remove("hidden");
  document.getElementById("message").textContent =
    "Press one of the buttons to start the test.";
  clearInterval(countdown);
}
