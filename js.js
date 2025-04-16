let is24Hour = true;
let startTime = new Date();
let alarmTime = null;

// Som do alarme
const alarmSound = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const ampm = hours >= 12 ? "PM" : "AM";
    if (!is24Hour) {
        hours = hours % 12 || 12;
    }

    const hourDeg = ((hours % 12) * 30) + (minutes * 0.5);
    const minuteDeg = (minutes * 6) + (seconds * 0.1);
    const secondDeg = seconds * 6;

    document.querySelector(".hour").style.transform = `rotate(${hourDeg}deg)`;
    document.querySelector(".minute").style.transform = `rotate(${minuteDeg}deg)`;
    document.querySelector(".second").style.transform = `rotate(${secondDeg}deg)`;

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}${!is24Hour ? " " + ampm : ""}`;
    document.querySelector(".digital-clock").textContent = formattedTime;

    const options = { weekday: "long", day: "2-digit", month: "long", year: "numeric" };
    const formattedDate = now.toLocaleDateString("pt-BR", options);
    document.querySelector(".date").textContent = formattedDate;

    const body = document.body;
    if (now.getHours() >= 18 || now.getHours() < 6) {
        body.classList.add("night-mode");
    } else {
        body.classList.remove("night-mode");
    }

    const elapsed = new Date(now - startTime);
    const elapsedHours = String(elapsed.getUTCHours()).padStart(2, '0');
    const elapsedMinutes = String(elapsed.getUTCMinutes()).padStart(2, '0');
    const elapsedSeconds = String(elapsed.getUTCSeconds()).padStart(2, '0');
    document.querySelector(".elapsed-time").textContent = `Tempo desde abertura: ${elapsedHours}:${elapsedMinutes}:${elapsedSeconds}`;

    // Verifica alarme
    if (alarmTime && now.getHours() === alarmTime.getHours() && now.getMinutes() === alarmTime.getMinutes() && now.getSeconds() === alarmTime.getSeconds()) {
        alarmSound.play();
        alert("⏰ Alarme disparado!");
        alarmTime = null; // Reseta o alarme
    }

    // Diferença até horário futuro (exemplo: 18:00)
    const future = new Date();
    future.setHours(18, 0, 0, 0); // 18:00
    let diff = future - now;
    if (diff < 0) diff += 24 * 60 * 60 * 1000; // se passou, vai pra amanhã

    const diffDate = new Date(diff);
    const diffH = String(diffDate.getUTCHours()).padStart(2, '0');
    const diffM = String(diffDate.getUTCMinutes()).padStart(2, '0');
    const diffS = String(diffDate.getUTCSeconds()).padStart(2, '0');
    document.querySelector(".time-diff").textContent = `Tempo até 18h: ${diffH}:${diffM}:${diffS}`;

    // Fuso horário
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.querySelector(".timezone").textContent = `Fuso horário: ${tz}`;
}

// Toggle entre 12h e 24h
document.querySelector(".toggle-format").addEventListener("click", () => {
    is24Hour = !is24Hour;
    updateClock();
});

// Resetar tempo decorrido
document.querySelector(".reset-timer").addEventListener("click", () => {
    startTime = new Date();
    updateClock();
});

// Definir alarme (formato HH:MM)
document.querySelector(".set-alarm").addEventListener("click", () => {
    const input = prompt("Defina o alarme (HH:MM):");
    if (input) {
        const [h, m] = input.split(":").map(Number);
        if (!isNaN(h) && !isNaN(m)) {
            alarmTime = new Date();
            alarmTime.setHours(h, m, 0, 0);
            alert(`⏰ Alarme definido para ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
        } else {
            alert("Formato inválido. Use HH:MM.");
        }
    }
});

setInterval(updateClock, 1000);
updateClock();

