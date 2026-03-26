//scroll arrow
const topScroll = document.getElementById("top-arrow");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topScroll.style.opacity = "1";
        topScroll.style.pointerEvents = "auto";
    } else {
        topScroll.style.opacity = "0";
        topScroll.style.pointerEvents = "none";
    }
});