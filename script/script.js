//reading in modal data
let projects = {};

fetch("data/data.json")
.then(response => response.json()).then(data => {
    projects = data.projects;

    //attempting to force card init only after json loads
    initCards();
})
.catch(error => {
    console.error("JSON loading error: ", error);
});

const modal = document.getElementById("project-modal");

//this function shows the modal window and locks window scrolling while the modal is open
let lastFocused;

function openModal() {
    lastFocused = document.activeElement;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    trapFocus();
}

//and vice versa
function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (lastFocused) {
        lastFocused.focus();
    }
}

//populate a given project with its respective data from JSON file
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-img");
const modalDescription = document.getElementById("modal-description");
const modalLinksContainer = document.querySelector(".modal-links");

function initCards() {
    const cards = document.querySelectorAll(".project-card");

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
}

//trap tab focus in modal window; focus is placed on project title by default
function trapFocus () {
    const focusArray = modal.querySelectorAll("a[href], button");

    const first = focusArray[0];
    const last = focusArray[focusArray.length - 1];

    modal.addEventListener("keydown", e => {
        if (e.key !== "Tab") {
            return;
        }

        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        }
        else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    document.getElementById("modal-title").focus();
}

//close button listeners for modal window
const closeBtn = document.querySelector(".close-btn");

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