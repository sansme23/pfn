document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("nav a");
    const content = document.getElementById("content");

    // Skabelon-layouts
    const pages = {
        home: `
            <section id="video-section">
                <h2>Velkommen til min portfolio</h2>
                <video controls id="portfolio-video">
                    <source src="video.mp4" type="video/mp4">
                </video>
            </section>
        `,
        projects: `
            <section id="projects">
                <h2>Mine Projekter</h2>
                <input type="text" id="search" placeholder="Søg efter projekt...">
                <div id="project-list"></div>
            </section>
        `,
        about: `
            <section id="about">
                <h2>Om mig</h2>
                <p>Jeg er Sanne, en passioneret digital designer og frontendudvikler...</p>
            </section>
        `
    };

    // Funktion til at opdatere layoutet dynamisk
    function loadPage(page) {
        content.innerHTML = pages[page]; // Indsæt HTML fra skabelonerne
        if (page === "projects") loadProjects(); // Hvis vi er på projektsiden, hent projekter
    }

    // Håndter navigation
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const page = e.target.getAttribute("data-page");
            loadPage(page);
            history.pushState({ page }, "", `#${page}`); // Opdater URL (uden reload)
        });
    });

    // Håndter browser-back/forward
    window.addEventListener("popstate", (e) => {
        if (e.state) loadPage(e.state.page);
    });

    // Indlæs initial side (hvis der er en hash i URL'en)
    const initialPage = window.location.hash.replace("#", "") || "home";
    loadPage(initialPage);
});

// Funktion til at loade projekter dynamisk
function loadProjects() {
    const projectList = document.getElementById("project-list");
    const projects = [
        { title: "JavaScript Spil", description: "Et simpelt spil i JS", tech: ["JavaScript", "HTML", "CSS"], link: "#" },
        { title: "Portfolio", description: "Min egen portfolio-side", tech: ["HTML", "SCSS", "JavaScript"], link: "#" }
    ];

    projectList.innerHTML = projects.map(proj => `
        <div class="project">
            <h3>${proj.title}</h3>
            <p>${proj.description}</p>
            <p><strong>Tech:</strong> ${proj.tech.join(", ")}</p>
            <a href="${proj.link}" target="_blank">Se projekt</a>
        </div>
    `).join("");
}

