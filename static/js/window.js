window.onload = function (e) {
  let aboutFile = document.getElementsByClassName("fa-file-lines")[0]
  let wallpaperFile = document.getElementsByClassName("fa-images")[0]
  let projectsFile = document.getElementsByClassName("fa-diagram-project")[0]
  let terminalFile = document.getElementsByClassName("fa-terminal")[0]

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


  const commandInput = document.getElementById('commandInput');
  const output = document.getElementById('output');

  const dummyData = {
      'ls': 'Readme.md\nchallenge.py\n.env',
      'cat Readme.md': `Congratulations, you have found the secret challenge.\n\nQuestion: What goes on four legs in the morning, two legs at noon, and three legs in the evening?\n\nLet's see if you can figure this out.\n\nTo solve the challenge, execute the following command:\n\npython challenge.py --answer [your_answer]\n\nGood luck!`,
      'cat .env': 'Nice try!',
      'cat challenge.py': `import argparse\nimport sys\nimport os\nimport jwt  # For encoding/decoding\nfrom dotenv import load_dotenv()\n\n# Load environment variables from .env file\nload_dotenv()\n\n# Fetch secret key from the .env file\nSECRET_KEY = os.getenv("SECRET_KEY")\n\ndef check_answer(answer):\n    # Obfuscated correct answer encoded as JWT\n    encoded_answer = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbnN3ZXIiOiJtYW4ifQ.bM6dVmlLRlWt6sdB7-Tfjhj7M2xPijCglBhEyMnMBVE"\n    ...\n[Content Truncated]`
  };

  // Focus the input by default
  commandInput.focus();

  commandInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
          e.preventDefault();
          const command = commandInput.value.trim();
          if (command) {
              output.innerHTML += `<div>$ ${command}</div>`;
              processCommand(command);
              commandInput.value = '';
          }
      }
  });

  function processCommand(command) {
      if (command === 'cat') {
          output.innerHTML += `<div>Usage: cat [filename]</div>`;
      } else if (command === 'ls') {
          output.innerHTML += `<div>${dummyData['ls']}</div>`;
      } else if (command.startsWith('cat ')) {
          const fileName = command.split(' ')[1];
          if (dummyData[command]) {
              output.innerHTML += `<div>${dummyData[command]}</div>`;
          } else {
              output.innerHTML += `<div>File not found: ${fileName}</div>`;
          }
      } else if (command === 'help') {
          output.innerHTML += `<div>Available commands:\nls\ncat [filename]\nhelp\npython challenge.py --answer [your_answer]</div>`;
      } else if (command.startsWith('python challenge.py')) {
          const commandParts = command.split(' ');
          if (commandParts.length === 4 && commandParts[2] === '--answer' && commandParts[3].toLowerCase() === 'man') {
              output.innerHTML += `<div>Success! You solved the challenge.</div>`;
          } else {
              output.innerHTML += `<div>Incorrect answer or usage. Try python challenge.py --answer [your_answer]</div>`;
          }
      } else {
          output.innerHTML += `<div>Command not found: ${command}</div>`;
      }
      output.scrollTop = output.scrollHeight;
  }
}
