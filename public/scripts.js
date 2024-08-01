document.querySelector('.button.close').addEventListener('click', () => {
    minimizeWindow();
});

document.querySelector('.button.minimize').addEventListener('click', () => {
    minimizeWindow();
});

document.querySelector('.button.expand').addEventListener('click', () => {
    alert('Expand button clicked');
});

document.getElementById('start-button').addEventListener('click', () => {
    toggleSearchWindow();
});

document.getElementById('search-input').addEventListener('click', () => {
    toggleSearchWindow();
});

document.getElementById('search-input').addEventListener('input', () => {
    showSpinner();
});

document.querySelectorAll('.file-item').forEach(item => {
    item.addEventListener('click', () => {
        console.log('Search item clicked');
    });
});

document.getElementById('file-icon').addEventListener('click', () => {
    maximizeWindow();
});

document.getElementById('expander-about').addEventListener('click', () => {
    maximizeWindow();
});

document.getElementById('wallpaper-icon').addEventListener('click', () => {
    toggleWallpaperWindow();
});

document.querySelectorAll('.wallpaper-thumbnail').forEach(item => {
    item.addEventListener('click', (e) => {
        changeWallpaper(e.target.dataset.url);
    });
});

function minimizeWindow() {
    const mainWindow = document.getElementById('main-window');
    mainWindow.classList.add('minimized');
}

function maximizeWindow() {
    const mainWindow = document.getElementById('main-window');
    mainWindow.classList.remove('minimized');
}

function toggleSearchWindow() {
    const searchWindow = document.getElementById('search-window');
    searchWindow.style.display = searchWindow.style.display === 'none' || searchWindow.style.display === '' ? 'block' : 'none';
}

function showSpinner() {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'inline-block';
    setTimeout(() => {
        spinner.style.display = 'none';
    }, 3000);
}

function toggleWallpaperWindow() {
    const wallpaperWindow = document.getElementById('wallpaper-window');
    wallpaperWindow.style.display = wallpaperWindow.style.display === 'none' || wallpaperWindow.style.display === '' ? 'block' : 'none';
}

function changeWallpaper(url) {
    if (url === 'white') {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = '#f7f7f7';
        document.body.classList.remove('background-selected');
        document.body.classList.add('blank-background');
    } else {
        document.body.style.backgroundImage = `url('${url}')`;
        document.body.style.backgroundColor = 'transparent';
        document.body.classList.add('background-selected');
        document.body.classList.remove('blank-background');
    }
    toggleWallpaperWindow();
}

// Make the window draggable
dragElement(document.getElementById("main-window"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById("window-header")) {
        document.getElementById("window-header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
