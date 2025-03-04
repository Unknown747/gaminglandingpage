// Fungsi untuk menampilkan tanggal terkini
function displayDate() {
    const dt = new Date();
    document.getElementById("datetime").innerHTML = dt.toLocaleDateString();
}

// Fungsi untuk menandai kartu sumber daya yang dipilih
function SelectedCard(cardnum) {
    const cards = ["Resources-Card1", "Resources-Card2", "Resources-Card3"];
    cards.forEach(cardId => {
        const card = document.getElementById(cardId);
        card.classList.remove("Resources-Card-Selected");
        card.classList.add("Resources-Card");
    });
    const selectedCard = document.getElementById(`Resources-Card${cardnum}`);
    selectedCard.classList.remove("Resources-Card");
    selectedCard.classList.add("Resources-Card-Selected");
}

// Fungsi untuk memulai proses "generasi"
function generate() {
    const usernameInput = document.getElementById("lname");
    const username = usernameInput.value;

    if (username === "") {
        usernameInput.style.borderColor = "#e2251c";
        usernameInput.style.boxShadow = "0 0 10px red";
        usernameInput.focus();
        return;
    }

    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";

    document.getElementById("user-name").textContent = username;
    document.getElementById("user-name1").textContent = username;
    document.getElementById("user-name2").textContent = username;

    let step = 1;
    const interval = setInterval(() => {
        updateGenerationStatus(step, username);
        step++;
        if (step > 17) {
            clearInterval(interval);
            // Tambahkan logika untuk memicu content locker di sini (misalnya, _TR())
            // _TR();
        }
    }, 2000);
}

// Fungsi untuk memperbarui status "generasi"
function updateGenerationStatus(step, username) {
    const loadingText = document.getElementById("text-gen-loading");
    const statusMessages = {
        1: "Connecting to server...",
        2: "Verifying hash...",
        3: "Connecting to game server...",
        4: `Locating Free Fire Server for ${username} (attempt 1)...`,
        5: `Locating Free Fire Server for ${username} (attempt 2)...`,
        6: "Downloading values...",
        7: "CRC Check...",
        8: "Sending Packets...",
        9: "Reading config...",
        10: "Server Response: OK",
        11: "Sending...",
        14: "Checking Verification...",
        15: "Reading config...",
        16: "User not verified.",
        17: "Redirecting...",
    };

    if (statusMessages[step]) {
        loadingText.textContent = statusMessages[step];
    }

    const statusElements = ["text-gen", "text-gen1", "text-gen2", "text-gen3", "text-gen4", "text-gen5"];
    statusElements.forEach((elementId, index) => {
        const element = document.getElementById(elementId);
        if (step === index + 5) {
            element.style.display = "block";
        } else if (step === 11 && index === 2) {
            element.style.display = "block";
        } else if (step === 14 && index === 3) {
            element.style.display = "block";
        } else if (step === 15 && index === 4) {
            element.style.display = "block";
        } else if (step === 16 && index === 5) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
}

// Fungsi untuk simulasi pergerakan mouse acak (opsional, untuk bot visitor)
function simulateMouseMove() {
    const maxX = window.innerWidth;
    const maxY = window.innerHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    window.dispatchEvent(new MouseEvent("mousemove", {
        clientX: randomX,
        clientY: randomY,
        bubbles: true,
        cancelable: true
    }));
}

// Fungsi untuk simulasi klik acak (opsional, untuk bot visitor)
function simulateMouseClick() {
    const maxX = window.innerWidth;
    const maxY = window.innerHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    const element = document.elementFromPoint(randomX, randomY);
    if (element) {
        element.dispatchEvent(new MouseEvent("click", {
            bubbles: true,
            cancelable: true
        }));
    }
}

// Inisialisasi
displayDate();
setInterval(simulateMouseMove, 2000); // Gerakkan mouse setiap 2 detik
setInterval(simulateMouseClick, 5000); // Klik setiap 5 detik
