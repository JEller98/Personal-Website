//reading in modal data
let projects = {};

fetch("data/data.json")
.then(response => response.json()).then(data => {
    projects = data.projects;

    //attempting to force card init only after json loads
    initCards();
    updateProjectVisibility();
})
.catch(error => {
    console.error("JSON loading error: ", error);
});

//"View More"/"View Less" buttons for project card grid
const moreBtn = document.getElementById("more-btn");

let expanded = false;

function cardRows(cards) {
    const rows = [];
    let currentRow = [];
    let lastTop = null;

    cards.forEach(card => {
        const top = card.offsetTop;

        if (lastTop === null || Math.abs(top - lastTop) < 5) {
            currentRow.push(card);
        }
        else {
            rows.push(currentRow);
            currentRow = [card];
        }

        lastTop = top;
    });

    if (currentRow.length) {
        rows.push(currentRow);
    }

    return rows;
}

function updateProjectVisibility() {
    requestAnimationFrame(() => {
        const projectCards = document.querySelectorAll(".project-card");

        //transform the NodeList to an array
        const rows = cardRows([...projectCards]);

        rows.forEach((row, index) => {
            row.forEach(card => {
                if (!expanded && index >= 2) {
                    card.classList.add("hidden-project");
                } else {
                    card.classList.remove("hidden-project");
                }
            });
        });

        if (rows.length <= 2) {
            moreBtn.style.display = "none";
        } else {
            moreBtn.style.display = "block";
        }
    });
}

moreBtn.addEventListener("click", () => {
    expanded = !expanded;

    moreBtn.textContent = expanded ? "View Less" : "View More";
    moreBtn.setAttribute("aria-expanded", expanded);

    updateProjectVisibility();
});

window.addEventListener("resize", () => {
    updateProjectVisibility();
});

window.addEventListener("load", () => {
    updateProjectVisibility();
});

//this function shows the modal window and locks window scrolling while the modal is open
const modal = document.getElementById("project-modal");
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
const modalToolsContainer = document.querySelector(".modal-tools");
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
            modalImage.alt = data.alt || data.title || "Project Image";
            modalDescription.textContent = data.description;

            //clear lingering tools
            modalToolsContainer.innerHTML = "";
            if (data.tools && data.tools.length) {
                const toolsHeader = document.createElement("h3");
                toolsHeader.textContent = "Tools Used";
                modalToolsContainer.appendChild(toolsHeader);

                const row = document.createElement("div");
                row.classList.add("modal-tools-row");

                data.tools.forEach(tool => {
                    const img = document.createElement("img");
                    img.src = tool.img;
                    img.alt = tool.alt;
                    img.title = tool.alt;
                    row.appendChild(img);
                });

                modalToolsContainer.appendChild(row);
            }

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
                        img.classList.add(linkObj.class || "");
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

window.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
    }
});