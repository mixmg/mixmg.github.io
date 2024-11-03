let key1 = "";
let key2 = "";
let duration = 0;
let clickCount = 0;
let timer;
let testStarted = false;
let countdown;
let clickTimes = []; // Tablica do przechowywania czasów kliknięć
let timediffs = []; // Różnice czasowe między kliknięciami
let unstableRate = 0; // Niestabilne tempo
let beginTime; // Czas rozpoczęcia testu

document.getElementById("button1").addEventListener("click", () => {
  document.getElementById("button1").textContent = "Press a key for Button 1";
  console.log("Button 1 click detected, waiting for key press...");
  document.addEventListener("keydown", handleKeyPress1);
});

document.getElementById("button2").addEventListener("click", () => {
  document.getElementById("button2").textContent = "Press a key for Button 2";
  console.log("Button 2 click detected, waiting for key press...");
  document.addEventListener("keydown", handleKeyPress2);
});

document.getElementById("begin-test").addEventListener("click", () => {
  if (testStarted) {
    alert("Test is already running. Please wait for it to complete.");
    console.log("Test is already running.");
    return;
  }

  duration = parseInt(document.getElementById("duration").value);

  if (!isNaN(duration) && duration > 0) {
    document.getElementById("message").classList.remove("hidden");
    document.getElementById("message").textContent =
      "Press one of the buttons to start the test.";
    console.log("Duration set: ", duration);
  } else {
    alert("Please enter a valid duration in seconds.");
    console.log("Invalid duration entered.");
  }
});

document.getElementById("reset-test").addEventListener("click", initializeTest);

function handleKeyPress1(event) {
  if (!testStarted) {
    key1 = event.key;
    document.getElementById("button1").textContent = `${key1}`;
    console.log("Key set for Button 1: ", key1);
    document.removeEventListener("keydown", handleKeyPress1);
    document.addEventListener("keydown", handleClick);
  }
}

function handleKeyPress2(event) {
  if (!testStarted) {
    key2 = event.key;
    document.getElementById("button2").textContent = `${key2}`;
    console.log("Key set for Button 2: ", key2);
    document.removeEventListener("keydown", handleKeyPress2);
    document.addEventListener("keydown", handleClick);
  }
}

function startTest() {
  testStarted = true;
  clickCount = 0;
  clickTimes = []; // Resetowanie tablicy czasów kliknięć
  timediffs = []; // Resetowanie tablicy różnic czasowych
  unstableRate = 0; // Resetowanie niestabilnego tempa
  beginTime = Date.now(); // Czas rozpoczęcia testu
  timer = duration;
  document.getElementById("result").textContent = "";
  document.getElementById("timer").classList.remove("hidden");
  document.getElementById("time-remaining").textContent = timer;
  document.getElementById("message").classList.add("hidden");
  console.log("Test started, timer set to: ", timer);

  countdown = setInterval(() => {
    timer--;
    document.getElementById("time-remaining").textContent = timer;
    console.log("Timer: ", timer);

    if (timer <= 0) {
      clearInterval(countdown);
      finishTest();
    }
  }, 1000);
}

function handleClick(event) {
  console.log("Key pressed: ", event.key);
  if (!testStarted && (event.key === key1 || event.key === key2)) {
    startTest();
  }
  if (testStarted && (event.key === key1 || event.key === key2)) {
    clickCount++;
    const currentTime = Date.now(); // Uzyskanie aktualnego czasu w ms
    clickTimes.push(currentTime); // Dodanie czasu kliknięcia do tablicy

    // Obliczanie różnic czasowych tylko po pierwszym kliknięciu
    if (clickTimes.length > 1) {
      timediffs.push(
        clickTimes[clickTimes.length - 1] - clickTimes[clickTimes.length - 2]
      );
      calculateUnstableRate();
    }

    console.log("Click count: ", clickCount);
  }
}

function calculateUnstableRate() {
  if (timediffs.length > 0) {
    const sum = timediffs.reduce((a, b) => a + b, 0);
    const avg = sum / timediffs.length;
    const deviations = timediffs.map((v) => (v - avg) * (v - avg));
    const variance = deviations.reduce((a, b) => a + b, 0);
    const std = Math.sqrt(variance / deviations.length);
    unstableRate = std * 10; // Mnożenie przez 10 dla uzyskania niestabilnego tempa

    // Wyświetlenie niestabilnego tempa
    document.getElementById("unstable-rate").textContent =
      "Unstable Rate: " +
      (Math.round(unstableRate * 100000) / 100000).toFixed(3);
    console.log("Unstable Rate: ", unstableRate);
  }
}

function finishTest() {
  testStarted = false;
  document.removeEventListener("keydown", handleClick);
  const streamtime = (Date.now() - beginTime) / 1000;
  const bpm = ((clickCount / streamtime) * 60) / 4; // Obliczanie BPM
  document.getElementById("result").textContent = `BPM: ${Math.round(bpm)}`;
  document.getElementById("timer").classList.add("hidden");
  console.log("Test finished. BPM: ", bpm);
}

function initializeTest() {
  key1 = "";
  key2 = "";
  duration = 0;
  clickCount = 0;
  testStarted = false;
  clickTimes = []; // Resetowanie tablicy czasów kliknięć
  timediffs = []; // Resetowanie tablicy różnic czasowych
  unstableRate = 0; // Resetowanie niestabilnego tempa
  document.getElementById("button1").textContent = "Button 1";
  document.getElementById("button2").textContent = "Button 2";
  document.getElementById("result").textContent = "";
  document.getElementById("unstable-rate").textContent = ""; // Resetowanie wyświetlania niestabilnego tempa
  document.getElementById("timer").classList.add("hidden");
  document.getElementById("time-remaining").textContent = "";
  document.getElementById("message").classList.remove("hidden");
  document.getElementById("message").textContent =
    "Press one of the buttons to start the test.";
  clearInterval(countdown);
  console.log("Test fully reset.");
}
