window.onload = function (e) {
  let aboutFile = document.getElementsByClassName("fa-file-lines")[0]
  let wallpaperFile = document.getElementsByClassName("fa-images")[0]
  let projectsFile = document.getElementsByClassName("fa-diagram-project")[0]
  let terminalFile = document.getElementsByClassName("fa-terminal")[0]
  

  console.log(document.getElementsByClassName("about-window"))

  let aboutWindow = document.getElementsByClassName("about-window")[0]
  let wallpaperWindow = document.getElementsByClassName("wallpaper-window")[0]
  let projectsWindow = document.getElementsByClassName("projects-window")[0]
  let terminalWindow = document.getElementsByClassName("terminal-window")[0]

  function closeFileWindow(event) {
    console.log("Close")
    event.target.parentNode.parentNode.classList.add("d-none");
  }

  function openAboutWindow() {
    console.log("Hi")
    aboutWindow.classList.remove("d-none");
  }

  function openWallpaperWindow() {
    wallpaperWindow.classList.remove("d-none");
  }

  function openProjectsWindow() {
    projectsWindow.classList.remove("d-none");
  }

  function openTerminalWindow() {
    terminalWindow.classList.remove("d-none");
  }

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);

    var currentTime = h + ":" + m + ":" + s;
    document.getElementsByClassName('time')[0].innerHTML = currentTime
    setTimeout(function () {
      startTime()
    }, 500);
  }

  startTime();

  const btns = document.querySelectorAll('button[id^=close-btn]')
  btns.forEach(btn => {
    btn.addEventListener('click', closeFileWindow);
  });

  aboutFile.addEventListener("click", openAboutWindow);
  wallpaperFile.addEventListener("click", openWallpaperWindow);
  projectsFile.addEventListener("click", openProjectsWindow);
  terminalFile.addEventListener("click", openTerminalWindow);
}
