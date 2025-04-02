function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Atualiza os ponteiros do relógio
    const hourDeg = ((hours % 12) * 30) + (minutes * 0.5);
    const minuteDeg = (minutes * 6) + (seconds * 0.1);
    const secondDeg = seconds * 6;

    document.querySelector(".hour").style.transform = `rotate(${hourDeg}deg)`;
    document.querySelector(".minute").style.transform = `rotate(${minuteDeg}deg)`;
    document.querySelector(".second").style.transform = `rotate(${secondDeg}deg)`;

    // Atualiza o relógio digital
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    document.querySelector(".digital-clock").textContent = formattedTime;

    // Atualiza a data
    const options = { weekday: "long", day: "2-digit", month: "long", year: "numeric" };
    const formattedDate = now.toLocaleDateString("pt-BR", options);
    document.querySelector(".date").textContent = formattedDate;
}

// Atualiza a cada segundo
setInterval(updateClock, 1000);
updateClock();
