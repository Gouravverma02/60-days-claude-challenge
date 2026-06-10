/* =========================
TYPING ANIMATION
========================= */

document.addEventListener("DOMContentLoaded", () => {

  const typingElement = document.getElementById("typing");

  if (typingElement) {

    const words = [
      "AI Developer",
      "Software Engineer",
      "Java Developer",
      "Future Entrepreneur",
      "Building The Future With AI"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];

      charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

      typingElement.textContent = currentWord.substring(0, charIndex);

      let speed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        speed = 1200;
      }

      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
      }

      setTimeout(typeEffect, speed);
    }

    typeEffect();
  }

  /* =========================
  PROJECTS
  ========================= */

 const projects = [
  {
    title: "SKSportz – Sports E-Commerce Application",
    desc: "Sports e-commerce system for managing products and purchases.",
    tech: ["Java", "JDBC", "MySQL"],
    category: "Java"
  },
  {
    title: "AI Interview Coach",
    desc: "AI-based interview preparation system with feedback simulation.",
    tech: ["Java", "APIs", "OOP", "DSA"],
    category: "AI"
  },
  {
    title: "Cab Booking Application",
    desc: "Cab booking system with authentication and ride management.",
    tech: ["Java", "JDBC", "MySQL", "Swing"],
    category: "Java"
  },
  {
    title: "Weather Application",
    desc: "Real-time weather app using API with responsive UI.",
    tech: ["HTML", "CSS", "JavaScript", "API"],
    category: "Web"
  }
];

  const grid = document.getElementById("projectGrid");

  function renderProjects(list) {
    if (!grid) return;

    grid.innerHTML = list.map(project => `
      <div class="glass p-6 rounded-3xl">
        <h3 class="text-xl font-bold mb-2">${project.title}</h3>
        <p class="text-gray-400 mb-3">${project.desc}</p>

        <div class="flex flex-wrap gap-2">
          ${project.tech.map(t =>
            `<span class="bg-indigo-600 px-3 py-1 rounded-full text-sm">${t}</span>`
          ).join("")}
        </div>
      </div>
    `).join("");
  }

  renderProjects(projects);

  /* =========================
  FILTERS
  ========================= */

  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {

      buttons.forEach(b => b.classList.remove("bg-indigo-600"));
      btn.classList.add("bg-indigo-600");

      const category = btn.dataset.category || btn.innerText.trim();

      const filtered = category === "All"
        ? projects
        : projects.filter(p => p.category === category);

      renderProjects(filtered);
    });
  });

  /* =========================
  COUNTERS (FIXED SAFE)
  ========================= */

  document.querySelectorAll(".counter").forEach(counter => {

    const target = Number(counter.dataset.target || 0);
    let current = 0;

    const step = Math.max(1, Math.ceil(target / 100));

    function update() {
      current += step;

      if (current >= target) {
        counter.innerText = target;
        return;
      }

      counter.innerText = current;
      setTimeout(update, 20);
    }

    update();
  });

  /* =========================
  DARK MODE
  ========================= */

  const html = document.documentElement;
  const toggle = document.getElementById("themeToggle");

  if (localStorage.getItem("theme") === "dark") {
    html.classList.add("dark");
  }

  toggle?.addEventListener("click", () => {
    html.classList.toggle("dark");

    localStorage.setItem(
      "theme",
      html.classList.contains("dark") ? "dark" : "light"
    );
  });

  /* =========================
  SCROLL REVEAL (OPTIMIZED)
  ========================= */

  const reveals = document.querySelectorAll(".reveal");

  function revealElements() {
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealElements, { passive: true });
  revealElements();

  /* =========================
  MOUSE GLOW
  ========================= */

  const glow = document.querySelector(".cursor-glow");

  if (glow) {
    document.addEventListener("mousemove", e => {
      glow.style.left = (e.clientX - 150) + "px";
      glow.style.top = (e.clientY - 150) + "px";
    });
  }

  /* =========================
  LOADER
  ========================= */

  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (!loader) return;

    setTimeout(() => {
      loader.style.opacity = "0";

      setTimeout(() => {
        loader.style.display = "none";
      }, 400);

    }, 800);
  });

  /* =========================
  PARTICLES
  ========================= */

  if (typeof tsParticles !== "undefined" &&
      document.getElementById("particles-js")) {

    tsParticles.load("particles-js", {
      particles: {
        number: { value: 60 },
        color: { value: "#6366f1" },
        links: {
          enable: true,
          distance: 150,
          color: "#6366f1",
          opacity: 0.2
        },
        move: { enable: true, speed: 1 },
        size: { value: 2 }
      }
    });
  }

});