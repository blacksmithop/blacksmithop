document.addEventListener("DOMContentLoaded", function () {
  const API_BASE_URL = "http://localhost:8080";

  // --- Dark Mode ---
  const toggleButton = document.getElementById("dark-mode-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.classList.add("dark-mode");
    updateDarkModeIcon(true);
  }

  toggleButton.addEventListener("click", () => {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    updateDarkModeIcon(isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  });

  function updateDarkModeIcon(isDarkMode) {
    const icon = toggleButton.querySelector("i");
    icon.classList.toggle("fa-moon", !isDarkMode);
    icon.classList.toggle("fa-sun", isDarkMode);
  }

  // --- Mobile Menu ---
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  mobileMenuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
  });

  // --- View Switching ---
  const navLinks = document.querySelectorAll(".nav-link");
  const views = document.querySelectorAll(".view");

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      
      views.forEach(view => view.classList.remove("active"));
      document.getElementById(targetId).classList.add("active");

      navLinks.forEach(navLink => navLink.classList.remove("active"));
      link.classList.add("active");

      if (mainNav.classList.contains("active")) {
          mainNav.classList.remove("active");
      }
    });
  });

  // --- Contact Form ---
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (form.checkValidity()) {
      const submitBtn = form.querySelector(".submit-btn");
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.disabled = true;

      setTimeout(() => {
        form.reset();
        form.querySelectorAll('.form-group').forEach(fg => fg.classList.remove('focused'));
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    }
  });

  // Floating label effect for form
  const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
  });

  // --- Data Fetching ---
  async function fetchData(endpoint) {
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
          console.error(`Error fetching from ${endpoint}:`, error);
          return [];
      }
  }

  async function renderProjects() {
    const allProjects = await fetchData('/github-repos');
    const projects = allProjects.slice(0, 5);
    const grid = document.querySelector('#projects .projects-grid');
    if (projects.length > 0) {
        grid.innerHTML = projects.map(project => `
            <div class="project-card">
                <div class="project-header">
                    <h3>${project.name}</h3>
                    <div class="project-links">
                        <a href="${project.html_url}" target="_blank" title="View on GitHub"><i class="fab fa-github"></i></a>
                        ${project.homepage ? `<a href="${project.homepage}" target="_blank" title="View Live Site"><i class="fas fa-external-link-alt"></i></a>` : ''}
                    </div>
                </div>
                <p>${project.description || 'No description available.'}</p>
                <div class="project-footer">
                    <span><i class="fas fa-star"></i> ${project.stargazers_count}</span>
                    <span><i class="fas fa-code-branch"></i> ${project.forks_count}</span>
                </div>
            </div>
        `).join('');
    } else {
        grid.innerHTML = "<p>Could not load projects.</p>";
    }
  }

  async function renderServices() {
    const services = await fetchData('/services');
    const grid = document.querySelector('#projects .services-grid');
     if (services.length > 0) {
        grid.innerHTML = services.map(service => `
            <div class="service-card">
                <i class="${service.icon}"></i>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            </div>
        `).join('');
    } else {
        grid.innerHTML = "<p>Could not load services.</p>";
    }
  }

  async function renderTechStack() {
    const techStack = await fetchData('/tech-stack');
    const grid = document.querySelector('#projects .tech-stack-grid');
    if (techStack.length > 0) {
        grid.innerHTML = techStack.map(tech => `
            <div class="tech-card" title="${tech.name}">
                <i class="${tech.icon}" style="color: ${tech.color};"></i>
            </div>
        `).join('');
    } else {
        grid.innerHTML = "<p>Could not load tech stack.</p>";
    }
  }

  // Initial data load
  renderProjects();
  renderServices();
  renderTechStack();
});
