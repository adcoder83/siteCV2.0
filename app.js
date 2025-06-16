// -- Pages dynamiques (textes adaptés du site officiel) --
const pages = {
    accueil: `
    <section class="page-section hero">
        <h1 id="typing-slogan"></h1>
        <p>Bureau d’études indépendant, Géoterria vous accompagne dans tous vos projets de construction, extension, aménagement ou vente de terrain.</p>
        <a href="#contact" data-page="contact" class="cta">Demandez votre étude ou un devis</a>
    </section>
    <section class="page-section intro">
        <h2>Votre sécurité, notre expertise</h2>
        <p>Depuis 2017, Géoterria réalise des études de sol de qualité pour particuliers, collectivités et professionnels dans tout le Var (83) et la région PACA.</p>
    </section>
    <section class="page-section highlights">
        <div class="highlight-card" style="animation-delay:0.2s;">
            <h3>Accompagnement sur-mesure</h3>
            <p>Suivi de projet personnalisé, conseils techniques et réactivité pour chaque client.</p>
        </div>
        <div class="highlight-card" style="animation-delay:0.4s;">
            <h3>Expertise locale</h3>
            <p>Connaissance approfondie des sols du Var et du Sud-Est.</p>
        </div>
        <div class="highlight-card" style="animation-delay:0.6s;">
            <h3>Rapports clairs & conformes</h3>
            <p>Méthodologie et rapports selon la norme NF P 94-500.</p>
        </div>
    </section>
    `,
    apropos: `
    <section class="page-section page-header">
        <h1>À propos de Géoterria</h1>
    </section>
    <section class="page-section about-content">
        <div class="about-text">
            <h2>Notre bureau d’études</h2>
            <p>Créée en 2017 à La Garde, Géoterria est une société indépendante spécialisée dans les missions géotechniques (G1 à G5) et études de sol pour la construction, l’aménagement et la vente de terrain. Notre équipe d’ingénieurs expérimentés intervient principalement dans le Var et la région PACA.</p>
            <h2>Nos valeurs</h2>
            <ul>
                <li><strong>Indépendance</strong> : Objectivité et transparence dans nos préconisations.</li>
                <li><strong>Expertise</strong> : Savoir-faire local, respect des normes, matériel performant.</li>
                <li><strong>Pédagogie</strong> : Ecoute, vulgarisation, disponibilité tout au long du projet.</li>
            </ul>
            <h2>Notre équipe</h2>
            <p>Des ingénieurs et techniciens diplômés, passionnés par la géotechnique, à votre service pour sécuriser vos projets de fondations ou de travaux.</p>
        </div>
        <div class="about-image">
            <img src="https://www.geoterria.com/wp-content/uploads/2022/07/sondage-geotechnique.jpg" alt="Sondage géotechnique Géoterria">
        </div>
    </section>
    `,
    prestations: `
    <section class="page-section page-header">
        <h1>Nos prestations géotechniques</h1>
    </section>
    <section class="page-section services-list">
        <div class="service-card">
            <h3>Étude de sol G1</h3>
            <p><strong>Avant-projet / Vente de terrain</strong><br>
            Analyse préliminaire pour connaître la nature du sol, évaluer les risques et orienter le projet en toute sécurité.</p>
        </div>
        <div class="service-card">
            <h3>Étude de sol G2</h3>
            <p><strong>Conception & exécution</strong><br>
            Détermination du type de fondations à réaliser pour la construction, dimensionnement précis et recommandations adaptées.</p>
        </div>
        <div class="service-card">
            <h3>Étude de sol G3-G4</h3>
            <p><strong>Suivi et contrôle</strong><br>
            Assistance technique pendant les travaux, vérification de la mise en œuvre et adaptation en temps réel si besoin.</p>
        </div>
        <div class="service-card">
            <h3>Étude de sol G5 / Diagnostic</h3>
            <p><strong>Expertise / Sinistre</strong><br>
            Diagnostic de désordres, recherche de causes, solutions de réparation pour sinistres ou pathologies de bâtiment.</p>
        </div>
        <div class="service-card">
            <h3>Étude piscine & ouvrages spéciaux</h3>
            <p>Analyse pour la construction de piscine, murs de soutènement, extensions, etc.</p>
        </div>
        <div class="service-card">
            <h3>Mission terrain et prélèvements</h3>
            <p>Sondages, essais pressiométriques, prélèvements pour analyses en laboratoire.</p>
        </div>
    </section>
    `,
    realisations: `
    <section class="page-section page-header">
        <h1>Nos réalisations</h1>
    </section>
    <section class="page-section realisations-gallery">
        <div class="real-card">
            <img src="https://www.geoterria.com/wp-content/uploads/2022/07/chantier-villa.jpg" alt="Étude villa individuelle">
            <h3>Villa individuelle - Hyères</h3>
            <p>Étude de sol G2, adaptation des fondations sur terrain argileux.</p>
        </div>
        <div class="real-card">
            <img src="https://www.geoterria.com/wp-content/uploads/2022/07/chantier-collectif.jpg" alt="Bâtiment collectif">
            <h3>Bâtiment collectif - Toulon</h3>
            <p>Missions G2/G3 pour résidence de 28 logements.</p>
        </div>
        <div class="real-card">
            <img src="https://www.geoterria.com/wp-content/uploads/2022/07/etude-piscine.jpg" alt="Étude piscine">
            <h3>Piscine privée - La Garde</h3>
            <p>Diagnostic de sol et préconisations pour piscine sur terrain en pente.</p>
        </div>
        <div class="real-card">
            <img src="https://www.geoterria.com/wp-content/uploads/2022/07/chantier-public.jpg" alt="Équipement public">
            <h3>Extension école - Carqueiranne</h3>
            <p>Étude de sol et accompagnement technique pour extension d’école.</p>
        </div>
    </section>
    `,
    contact: `
    <section class="page-section page-header">
        <h1>Contactez Géoterria</h1>
    </section>
    <section class="page-section contact-section">
        <form class="contact-form" autocomplete="off">
            <label for="nom">Nom :</label>
            <input type="text" id="nom" name="nom" required>
            <label for="email">Email :</label>
            <input type="email" id="email" name="email" required>
            <label for="message">Votre message :</label>
            <textarea id="message" name="message" required></textarea>
            <button type="submit">Envoyer</button>
            <p class="form-success">Merci pour votre message, nous vous répondrons rapidement.</p>
        </form>
        <div class="contact-info">
            <h2>Coordonnées</h2>
            <p><strong>Adresse :</strong> 22 rue Marcelin Berthelot, 83130 La Garde</p>
            <p><strong>Téléphone :</strong> 04 94 94 21 99</p>
            <p><strong>Email :</strong> contact@geoterria.com</p>
            <p><strong>Horaires :</strong> Lundi au vendredi, 9h à 18h</p>
            <div class="map">
                <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=6.0104%2C43.1210%2C6.0218%2C43.1265&amp;layer=mapnik&amp;marker=43.1238,6.0161"
                    style="border:1px solid #aaa; width:100%; height:200px;"></iframe>
            </div>
        </div>
    </section>
    `
};

// Animation d'apparition au scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('.highlight-card, .service-card, .real-card');
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 60) {
            el.style.opacity = '1';
            el.style.transform = 'none';
        }
    });
}

// Loader
function showLoader() {
    document.getElementById('page-loader').classList.add('active');
}
function hideLoader() {
    setTimeout(() => {
        document.getElementById('page-loader').classList.remove('active');
    }, 380);
}

// Animation typing accueil
function typingEffect(element, text, speed = 36, cb) {
    let i = 0;
    element.innerHTML = "";
    let span = document.createElement("span");
    span.className = "typing";
    element.appendChild(span);
    function type() {
        if (i <= text.length) {
            span.textContent = text.slice(0, i);
            i++;
            setTimeout(type, speed);
        } else if (cb) {
            cb();
        }
    }
    type();
}

// Navigation dynamique avec transition
function loadPage(page, pushState = true) {
    if (!pages[page]) page = "accueil";
    const main = document.getElementById('main-content');

    // Transition fade out
    if (main.children.length > 0) {
        Array.from(main.children).forEach(child => child.classList.add('fade-out'));
    }
    showLoader();
    setTimeout(() => {
        main.innerHTML = pages[page];

        // Mise à jour des liens actifs
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.toggle('active', link.dataset.page === page);
        });

        // Accessibilité : focus sur le main
        main.focus();

        // Historique navigateur
        if (pushState) {
            history.pushState({ page }, null, '#' + page);
        }

        // Animations d'apparition
        setTimeout(revealOnScroll, 120);

        // Formulaire de contact
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();
                contactForm.querySelector('.form-success').style.display = 'block';
                setTimeout(() => contactForm.querySelector('.form-success').style.display = 'none', 3500);
                contactForm.reset();
            });
        }

        // Typing effect accueil
        if (page === "accueil") {
            const slogan = "Étude de sol & expertise géotechnique à La Garde, Var";
            const typingEl = document.getElementById("typing-slogan");
            if (typingEl) typingEffect(typingEl, slogan, 28);
        }

        // Liens CTA internes
        main.querySelectorAll('a[data-page]').forEach(link => {
            link.addEventListener('click', evt => {
                evt.preventDefault();
                loadPage(link.dataset.page);
            });
        });

        hideLoader();
    }, 380);
}

// Menu burger
function setupBurgerMenu() {
    const burger = document.getElementById('burger-menu');
    const navLinks = document.querySelector('.nav-links');
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

// Navigation liens
function setupNavLinks() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function (evt) {
            evt.preventDefault();
            loadPage(link.dataset.page);
        });
    });
}

// Navigation avec #hash
window.addEventListener('popstate', function (evt) {
    const page = (evt.state && evt.state.page) || location.hash.replace('#', '') || "accueil";
    loadPage(page, false);
});

// Apparition au scroll, bouton retour haut et navbar smart
window.addEventListener('scroll', function () {
    revealOnScroll();
    // Bouton retour haut
    const btn = document.getElementById('back-to-top');
    if (window.scrollY > 260) btn.style.display = "flex";
    else btn.style.display = "none";
    // Navbar hide/show
    if (window.lastScrollY === undefined) window.lastScrollY = 0;
    let nav = document.querySelector('header');
    if (window.scrollY > 80 && window.scrollY > window.lastScrollY) {
        nav.style.top = "-90px";
    } else {
        nav.style.top = "0";
    }
    window.lastScrollY = window.scrollY;
});
window.addEventListener('resize', revealOnScroll);

// Retour haut
function setupBackToTop() {
    const btn = document.getElementById('back-to-top');
    btn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
}

// Initialisation
document.addEventListener('DOMContentLoaded', function () {
    setupBurgerMenu();
    setupNavLinks();
    setupBackToTop();
    // Charge la bonne page selon l'URL (hash)
    const page = location.hash.replace('#', '') || "accueil";
    loadPage(page, false);
    revealOnScroll();
    hideLoader();
});
