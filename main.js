let timer = setInterval(time, 1000);
let isCounting = false;
time();

function time() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  let formatHours = String(hours).padStart(2, "0");
  let formatMinutes = String(minutes).padStart(2, "0");
  let formatSeconds = String(seconds).padStart(2, "0");

  document.getElementById(
    "clock"
  ).innerText = `${formatHours}:${formatMinutes}:${formatSeconds}`;
}

// Warna dari localStorage
let setColor = localStorage.getItem("setColor");
if (!setColor) {
  setColor = "#000000";
  localStorage.setItem("setColor", setColor);
}

document.getElementById("clock").style.color = setColor;
document.getElementById("bg-color").value = setColor;

const colorPicker = document.getElementById("bg-color");
colorPicker.addEventListener("input", function () {
  const newColor = this.value;
  document.getElementById("clock").style.color = newColor;
  localStorage.setItem("setColor", newColor);
});

countdown.addEventListener("click", async () => {
  const display = document.getElementById("clock");
  const stopwatch = document.getElementById("stopwatch");

  if (isCounting) {
    clearInterval(timer);
    timer = setInterval(time);
    isCounting = false;
    countdown.innerText = "Countdown";
    stopwatch.disabled = false;
    stopwatch.style.cursor = "pointer";
    return;
  }

  stopwatch.disabled = true;
  stopwatch.style.cursor = "not-allowed";

  countdown.innerText = "Time";
  clearInterval(timer);

  let userCountdown;

  while (true) {
    const { value: inputValue } = await Swal.fire({
      title: "Masukan countdown waktu:",
      input: "number",
      inputLabel: "Contoh: 10 untuk 10 detik",
      inputAttributes: {
        min: 1,
      },
      inputValidator: (value) => {
        if (!value || isNaN(value) || parseInt(value) < 1) {
          return "Masukkan angka yang valid di atas 0";
        }
      },
    });

    if (inputValue && !isNaN(inputValue) && parseInt(inputValue) >= 1) {
      userCountdown = parseInt(inputValue);
      break;
    }
  }

  display.innerText = userCountdown;
  isCounting = true;

  timer = setInterval(() => {
    userCountdown--;

    if (userCountdown <= 0) {
      clearInterval(timer);
      display.innerText = 0;
      Swal.fire({
        title: "Countdown selesai",
        icon: "success",
      });
      countdown.innerText = "Countdown";
      isCounting = false;
      stopwatch.disabled = false;
      stopwatch.style.cursor = "pointer";
      timer = setInterval(time, 1000);
      return;
    }

    display.innerText = userCountdown;
  }, 1000);
});

stopwatch.addEventListener("click", async () => {
  const display = document.getElementById("clock");
  const countdown = document.getElementById("countdown");

  if (isCounting) {
    clearInterval(timer);
    timer = setInterval(time);
    isCounting = false;

    countdown.disabled = false;
    countdown.style.cursor = "pointer";

    stopwatch.innerText = "Stopwatch";
    return;
  }

  // Disable countdown button
  countdown.disabled = true;
  countdown.style.cursor = "not-allowed";
  stopwatch.innerText = "Time";
  clearInterval(timer);

  let angka = 0;
  let userInput;

  while (true) {
    const { value: inputValue } = await Swal.fire({
      title: "Masukan waktu untuk stopwatch:",
      input: "number",
      inputLabel: "Contoh: 10 untuk 10 detik",
      inputAttributes: {
        min: 1,
      },
      inputValidator: (value) => {
        if (!value || isNaN(value) || parseInt(value) < 1) {
          return "Masukkan angka valid di atas 0!";
        }
      },
    });

    if (inputValue && !isNaN(inputValue) && parseInt(inputValue) >= 1) {
      userInput = parseInt(inputValue);
      break;
    }
  }

  display.innerText = angka;
  isCounting = true;

  timer = setInterval(() => {
    angka++;

    if (angka >= userInput) {
      clearInterval(timer);
      display.innerText = 0;
      Swal.fire({
        title: "Stopwatch selesai",
        icon: "success",
      });

      isCounting = false;
      countdown.disabled = false;
      countdown.style.cursor = "pointer";
      stopwatch.innerText = "Stopwatch";

      timer = setInterval(time, 1000);
      return;
    }

    display.innerText = angka;
  }, 1000);
});
