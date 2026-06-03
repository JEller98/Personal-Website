//scroll arrow
const topScroll = document.getElementById("top-arrow");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topScroll.style.opacity = "1";
        topScroll.style.pointerEvents = "auto";
        topScroll.removeAttribute("aria-hidden");
    } else {
        topScroll.style.opacity = "0";
        topScroll.style.pointerEvents = "none";
        topScroll.setAttribute("aria-hidden", "true");
    }
});