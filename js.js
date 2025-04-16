let is24Hour = true;
let startTime = new Date(); // Para calcular tempo decorrido

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Modo 12h
    const ampm = hours >= 12 ? "PM" : "AM";
    if (!is24Hour) {
        hours = hours % 12 || 12; // Converte para 12h
    }

    // Atualiza os ponteiros do relógio
    const hourDeg = ((hours % 12) * 30) + (minutes * 0.5);
    const minuteDeg = (minutes * 6) + (seconds * 0.1);
    const secondDeg = seconds * 6;

    document.querySelector(".hour").style.transform = `rotate(${hourDeg}deg)`;
    document.querySelector(".minute").style.transform = `rotate(${minuteDeg}deg)`;
    document.querySelector(".second").style.transform = `rotate(${secondDeg}deg)`;

    // Atualiza o relógio digital
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}${!is24Hour ? " " + ampm : ""}`;
    document.querySelector(".digital-clock").textContent = formattedTime;

    // Atualiza a data
    const options = { weekday: "long", day: "2-digit", month: "long", year: "numeric" };
    const formattedDate = now.toLocaleDateString("pt-BR", options);
    document.querySelector(".date").textContent = formattedDate;

    // Modo claro/escuro conforme horário
    const body = document.body;
    if (now.getHours() >= 18 || now.getHours() < 6) {
        body.classList.add("night-mode");
    } else {
        body.classList.remove("night-mode");
    }

    // Tempo decorrido
    const elapsed = new Date(now - startTime);
    const elapsedHours = String(elapsed.getUTCHours()).padStart(2, '0');
    const elapsedMinutes = String(elapsed.getUTCMinutes()).padStart(2, '0');
    const elapsedSeconds = String(elapsed.getUTCSeconds()).padStart(2, '0');
    document.querySelector(".elapsed-time").textContent = `Tempo desde abertura: ${elapsedHours}:${elapsedMinutes}:${elapsedSeconds}`;
}

// Toggle entre 12h e 24h
document.querySelector(".toggle-format").addEventListener("click", () => {
    is24Hour = !is24Hour;
    updateClock();
});

// Atualiza a cada segundo
setInterval(updateClock, 1000);
updateClock();

