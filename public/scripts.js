document.addEventListener("DOMContentLoaded", () => {
  const startMenu = document.getElementById("start-menu");
  const startButton = document.getElementById("start-button");
  const powerOffButton = document.getElementById("power-off-button");
  const blackoutScreen = document.getElementById("blackout-screen");
  const powerOnButton = document.getElementById("power-on-button");
  const dropdownButton = document.getElementById("dropdown-button");
  const dropdownMenu = document.getElementById("dropdown-menu");

  const projects = [
    {
      title: "LLM-Graph-Builder",
      description: "Build Neo4J Knowledge Graphs from Excel files",
      stars: 5,
      language: "Python",
      forks: 0,
      issues: 0,
      url: "https://github.com/blacksmithop/LLM-Graph-Builder"
    },
    {
      title: "imgen",
      description:
        "Image manipulation API server, forked from Dank Memer running on aiohttp",
      stars: 4,
      language: "Python",
      forks: 2,
      issues: 0,
      url: "https://github.com/blacksmithop/imgen"
    },
    {
      title: "ambu",
      description:
        "Ambu is a discord bot written in discord.py with a redis backend. V2",
      stars: 3,
      language: "Python",
      forks: 0,
      issues: 0,
      url: "https://github.com/blacksmithop/ambu"
    },
    {
      title: "MafiaggBot",
      description: "Mafia.gg Bot",
      stars: 3,
      language: "Python",
      forks: 0,
      issues: 0,
      url: "https://github.com/blacksmithop/MafiaggBot"
    },
    {
      title: "Portfolio",
      description: "Responsive portfolio website with auto-build workflow",
      stars: 2,
      language: "HTML",
      forks: 1,
      issues: 0,
      url: "https://github.com/blacksmithop/Portfolio"
    }
  ];

  let currentProjectIndex = 0;

  function displayProject(index) {
    const project = projects[index];
    document.getElementById(
      "project-title"
    ).innerHTML = `<a href="${project.url}" target="_blank">${project.title}</a>`;
    document.getElementById("project-description").textContent =
      project.description;
    document.getElementById("project-stars").textContent = project.stars;
    document.getElementById("project-language").textContent = project.language;
    document.getElementById("project-forks").textContent = project.forks;
    document.getElementById("project-issues").textContent = project.issues;

    document.getElementById("prev-project").disabled = index === 0;
    document.getElementById("next-project").disabled =
      index === projects.length - 1;
  }

  document.getElementById("prev-project").addEventListener("click", () => {
    if (currentProjectIndex > 0) {
      currentProjectIndex--;
      displayProject(currentProjectIndex);
    }
  });

  document.getElementById("next-project").addEventListener("click", () => {
    if (currentProjectIndex < projects.length - 1) {
      currentProjectIndex++;
      displayProject(currentProjectIndex);
    }
  });

  // Display the first project initially
  displayProject(currentProjectIndex);

  // Start menu logic
  startMenu.style.display = "none";

  startButton.addEventListener("click", () => {
    if (startMenu.style.display === "none") {
      startMenu.style.display = "flex";
    } else {
      startMenu.style.display = "none";
    }
  });

  powerOffButton.addEventListener("click", () => {
    document.getElementById("main-screen").style.display = "none";
    document.getElementById("taskbar").style.display = "none";
    blackoutScreen.style.display = "flex";
  });

  powerOnButton.addEventListener("click", () => {
    document.getElementById("main-screen").style.display = "flex";
    document.getElementById("taskbar").style.display = "flex";
    blackoutScreen.style.display = "none";
  });

  document.getElementById("about-txt").addEventListener("click", () => {
    openFileWindow("file-window");
  });

  document.getElementById("wallpaper").addEventListener("click", () => {
    openFileWindow("wallpaper-window");
  });

  document.getElementById("projects").addEventListener("click", () => {
    openFileWindow("projects-window");
  });

  document.getElementById("menu-about-txt").addEventListener("click", () => {
    openFileWindow("file-window");
  });

  document.getElementById("menu-wallpaper").addEventListener("click", () => {
    openFileWindow("wallpaper-window");
  });

  document.getElementById("menu-projects").addEventListener("click", () => {
    openFileWindow("projects-window");
  });

  document.getElementById("close-btn").addEventListener("click", () => {
    closeFileWindow("file-window");
  });

  document.getElementById("minimize-btn").addEventListener("click", () => {
    minimizeFileWindow("file-window", "fa-file-alt");
  });

  document.getElementById("expand-btn").addEventListener("click", () => {
    expandFileWindow("file-window");
  });

  document
    .getElementById("close-wallpaper-btn")
    .addEventListener("click", () => {
      closeFileWindow("wallpaper-window");
    });

  document
    .getElementById("minimize-wallpaper-btn")
    .addEventListener("click", () => {
      minimizeFileWindow("wallpaper-window", "fa-image");
    });

  document
    .getElementById("expand-wallpaper-btn")
    .addEventListener("click", () => {
      expandFileWindow("wallpaper-window");
    });

  document
    .getElementById("close-projects-btn")
    .addEventListener("click", () => {
      closeFileWindow("projects-window");
    });

  document
    .getElementById("minimize-projects-btn")
    .addEventListener("click", () => {
      minimizeFileWindow("projects-window", "fa-project-diagram");
    });

  document
    .getElementById("expand-projects-btn")
    .addEventListener("click", () => {
      expandFileWindow("projects-window");
    });

  document.querySelectorAll(".color-square").forEach((square) => {
    square.addEventListener("click", (e) => {
      const defaultWallpaper = ""; // Define the URL or leave it empty for the default/blank wallpaper
      const wallpaperUrl = e.target.style.backgroundImage.slice(5, -2);

      document.body.style.backgroundImage = `url(${
        wallpaperUrl !== "none" ? wallpaperUrl : defaultWallpaper
      })`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";

      // Change icon text color to orange and make it bold
      document.querySelectorAll(".file-icon span").forEach((span) => {
        span.style.color = "orange";
        span.style.fontWeight = "bold";
      });

      // Reset window background and text color as usual
      document.querySelectorAll(".file-window").forEach((window) => {
        window.style.backgroundColor = "#fff";
        window.style.color = "#000";
      });
    });
  });

  dropdownButton.addEventListener("click", () => {
    if (
      dropdownMenu.style.display === "none" ||
      dropdownMenu.style.display === ""
    ) {
      dropdownMenu.style.display = "block";
    } else {
      dropdownMenu.style.display = "none";
    }
  });
});

function openFileWindow(windowId) {
  const windowElement = document.getElementById(windowId);
  windowElement.style.display = "block";
  windowElement.classList.remove("hidden");
}

function closeFileWindow(windowId) {
  const windowElement = document.getElementById(windowId);
  windowElement.style.display = "none";
}

function minimizeFileWindow(windowId, iconClass) {
  const windowElement = document.getElementById(windowId);
  const taskbarRight = document.getElementById("taskbar-right");

  let minimizedIcon = document.querySelector(
    `.taskbar-icon[data-window-id="${windowId}"]`
  );
  if (!minimizedIcon) {
    minimizedIcon = document.createElement("div");
    minimizedIcon.classList.add("taskbar-icon");
    minimizedIcon.setAttribute("data-window-id", windowId);
    minimizedIcon.innerHTML = `<i class="fas ${iconClass}"></i>`;
    minimizedIcon.style.fontSize =
      "20px"; /* Adjusted font size for minimized icons */
    minimizedIcon.addEventListener("click", () => {
      windowElement.style.display = "block";
      windowElement.classList.remove("hidden");
      taskbarRight.removeChild(minimizedIcon);
    });
    taskbarRight.appendChild(minimizedIcon);
  }

  windowElement.style.display = "none";
}

function expandFileWindow(windowId) {
  const windowElement = document.getElementById(windowId);
  windowElement.classList.toggle("expanded");
}

interact(".file-icon, .file-window").draggable({
  modifiers: [
    interact.modifiers.snap({
      targets: [interact.createSnapGrid({ x: 100, y: 100 })],
      range: Infinity,
      relativePoints: [{ x: 0, y: 0 }]
    }),
    interact.modifiers.restrict({
      restriction: "#main-screen",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    })
  ],
  inertia: true,
  listeners: {
    move: dragMoveListener,
    end(event) {
      const allIcons = document.querySelectorAll(".file-icon");
      allIcons.forEach((icon) => {
        if (icon !== event.target) {
          const rect1 = event.target.getBoundingClientRect();
          const rect2 = icon.getBoundingClientRect();

          if (
            rect1.left < rect2.right &&
            rect1.right > rect2.left &&
            rect1.top < rect2.bottom &&
            rect1.bottom > rect2.top
          ) {
            icon.style.transform = `translate(${
              rect1.right - rect2.left + 10
            }px, ${rect1.bottom - rect2.top + 10}px)`;
          }
        }
      });
    }
  }
});

function dragMoveListener(event) {
  const target = event.target;
  const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  target.style.transform = `translate(${x}px, ${y}px)`;
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}
