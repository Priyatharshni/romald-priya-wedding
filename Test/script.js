/* ==========================================
   GLOBAL INTERACTIVE SCRIPTS
   ========================================== */
const audio = document.getElementById("wedding-audio");
const musicBtn = document.getElementById("music-control");
const welcomeCurtain = document.getElementById("welcome-curtain");
const bowClickArea = document.getElementById("bow-tie-click-area");

/* ==========================================
   CURTAIN OPENING SEQUENCE - Only on Bow Tie Click
   ========================================== */
bowClickArea.addEventListener('click', openInvitation);

function openInvitation() {
    // 1. Trigger the opening animation on the curtain overlay
    welcomeCurtain.classList.add("opened");

    // 2. Set content visible for fade-in, but curtain covers it initially
    const mainContent = document.getElementById("invitation-content");
    mainContent.style.opacity = "1";

    // 3. User interaction logic to safe-start music play commands
    audio.play().then(() => {
        // Show music controller after successful play start
        musicBtn.classList.add("spin", "visible");
    }).catch(error => {
        console.log("Autoplay block bypass trace (click triggered play):", error);
        // Show button even if play fails, user can try again
        musicBtn.classList.add("visible");
    });
}

function toggleMusic() {
    if (audio.paused) {
        audio.play();
        musicBtn.classList.add("spin");
    } else {
        audio.pause();
        musicBtn.classList.remove("spin");
    }
}

/* ==========================================
   LIVE TARGET COUNTER SUBTRACTION LOOP
   ========================================== */
// Target wedding date: September 12, 2026, at 5:30 PM (17:30)
const weddingDate = new Date("2026-09-12T17:30:00").getTime();

setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Calculations for dynamic data sets
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Dynamic injection of results into corresponding HTML IDs
    document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

    if (distance < 0) {
        document.querySelector(".countdown-container").innerHTML = "<h3>The Celebrations Have Commenced!</h3>";
    }
}, 1000);