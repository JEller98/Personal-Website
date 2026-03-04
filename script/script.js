//data for project modals
const projects = {
    personal_website: {
        title: "Personal Website",
        image: "../img/project_imgs/modal_imgs/website.jpg",
        description: "The very website you're looking at! This project was created as a portfolio to showcase my experience and skills. I wanted to start off simple for this site, so I used HTML, CSS (Flexbox) and vanilla JavaScript. As time goes on I hope to add support for more accessibility features, but this is currently version 1. More to come!",
        links: [
            {
                href: "#",
                img: "../img/other/home.svg",
                alt: "An icon of a home.",
                title: "You're already here!"
            }
        ]
    }
};

const cards = document.querySelectorAll(".project-card");
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-img");
const modalDescription = document.getElementById("modal-description");
const modalLinksContainer = document.querySelector(".modal-links");
const closeBtn = document.querySelector(".close-btn");

//this function shows the modal window and locks window scrolling while the modal is open
function openModal() {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

//and vice versa
function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

//populate a given project with its respective data from up above
cards.forEach(card => {
    card.addEventListener("click", () => {
        const key = card.dataset.project;
        const data = projects[key];

        if (!data) {
            return;
        }

        modalTitle.textContent = data.title;
        modalImage.src = data.image;
        modalDescription.textContent = data.description;

        //clear lingering links
        modalLinksContainer.innerHTML = "";


        //build links
        if (Array.isArray(data.links)) {
            data.links.forEach(linkObj => {
                const anchorLink = document.createElement("a");
                anchorLink.href = linkObj.href || "#";
                anchorLink.target = "_blank";
                anchorLink.classList.add("modal-link");

                if (linkObj.img) {
                    const img = document.createElement("img");
                    img.src = linkObj.img;
                    img.alt = linkObj.alt || "";
                    img.title = linkObj.title || "";
                    anchorLink.appendChild(img);
                }
                else if (linkObj.text) {
                    anchorLink.textContent = linkObj.text;
                }

                modalLinksContainer.appendChild(anchorLink);
            });
        }
        
        openModal();
    });
});

closeBtn.addEventListener("click", () => {
    closeModal();
});

modal.addEventListener("click", e => {
    if (e.target === modal) {
        closeModal();
    }
});

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
    }
});

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