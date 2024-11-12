document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("density-form");
  const streamDensityOutput = document.getElementById("stream-density-output");
  const jumpDensityOutput = document.getElementById("jump-density-output");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const bpm = parseFloat(document.getElementById("bpm").value);
    const ar = parseFloat(document.getElementById("ar").value);
    const timeSignature = parseFloat(
      document.getElementById("time-signature").value
    );

    let arTime;
    if (ar >= 10) {
      arTime = 450 - (ar - 10) * 50;
    } else if (ar >= 5) {
      arTime = 1200 - (ar - 5) * 150;
    } else {
      arTime = 1800 - ar * 120;
    }


    const objectsPerBeat = bpm / 60;
    const totalStreamObjects =
      ((objectsPerBeat * arTime) / 1000) * timeSignature;
    const totalJumpObjects = totalStreamObjects / 2;

    streamDensityOutput.textContent = totalStreamObjects.toFixed(2);
    jumpDensityOutput.textContent = totalJumpObjects.toFixed(2);
  });
});
