//navbar
const sections = document.querySelectorAll("section");
const navContainer = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");

            navLinks.forEach(link => {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(`.nav-links a[href = "#${id}"]`);

            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });
},
{
    threshold : 0.3,
    rootMargin: "-80px 0px -40% 0px"
});

sections.forEach(section => observer.observe(section));

//hamburger menu for touchscreens
const navHeader = document.querySelector(".nav-header");
const navToggle = document.querySelector(".nav-toggle");
let navFocusTrapController = null;

function trapNavFocus() {
    navFocusTrapController = new AbortController();
    const signal = navFocusTrapController.signal;

    const focusable = Array.from(navHeader.querySelectorAll("a[href], button"));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    navHeader.addEventListener("keydown", e => {
        if (e.key !== "Tab") return;

        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }, { signal });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            closeNav();
            navToggle.focus();
        }
    }, { signal });
}

function releaseNavFocus() {
    if (navFocusTrapController) {
        navFocusTrapController.abort();
        navFocusTrapController = null;
    }
}

function closeNav() {
    releaseNavFocus();
    navContainer.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
    const isOpen = navContainer.classList.contains("open");

    if (isOpen) {
        closeNav();
    } else {
        navContainer.classList.add("open");
        navToggle.classList.add("active");
        navToggle.setAttribute("aria-expanded", "true");
        trapNavFocus();
    }
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        closeNav();
    });
});

document.addEventListener("click", e => {
    if (!e.target.closest(".nav-header") && navContainer.classList.contains("open")) {
        closeNav();
    }
});

//light/dark mode
const toggle = document.getElementById("theme-toggle");
const icon = document.getElementById("theme-icon");
const root = document.documentElement;

function updateIcon() {
    if (root.classList.contains("dark-mode")) {
        icon.src = "img/other/sun.svg";
        icon.alt = "A sun icon";
        toggle.setAttribute("aria-pressed", "true");
    }
    else {
        icon.src = "img/other/moon.svg";
        icon.alt = "A moon icon";
        toggle.setAttribute("aria-pressed", "false");
    }
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    root.classList.add("dark-mode");
}

toggle.addEventListener("click", () => {
    root.classList.toggle("dark-mode");

    if(root.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    }
    else {
        localStorage.setItem("theme", "light");
    }

    updateIcon();
});

updateIcon();