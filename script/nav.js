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
const navToggle = document.querySelector(".nav-toggle");

navToggle.addEventListener("click", () => {
    navContainer.classList.toggle("open");
    navToggle.classList.toggle("active");

    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navContainer.classList.remove("open");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
    });
});

document.addEventListener("click", e => {
    const navClick = e.target.closest(".nav-header");

    if (!navClick && navContainer.classList.contains("open")) {
        navContainer.classList.remove("open");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
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
    }
    else {
        icon.src = "img/other/moon.svg";
        icon.alt = "A moon icon";
    }
}

if (localStorage.getItem("theme") === "dark") {
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