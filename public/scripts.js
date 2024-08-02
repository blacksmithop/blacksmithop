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
    item.addEventListener('click', (e) => {
        if (e.currentTarget.id === 'expander-about') {
            maximizeWindow();
        } else if (e.currentTarget.id === 'expander-wallpaper') {
            toggleWallpaperWindow();
        }
    });
});

document.getElementById('file-icon').addEventListener('click', () => {
    maximizeWindow();
});

document.getElementById('expander-about').addEventListener('click', () => {
    maximizeWindow();
});

document.getElementById('expander-wallpaper').addEventListener('click', () => {
    toggleWallpaperWindow();
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

// Make the windows draggable using Interact.js
interact('.window').draggable({
    allowFrom: '.window-header',
    listeners: {
        start(event) {
            const target = event.target;
            target.style.position = 'absolute';
        },
        move(event) {
            const target = event.target;
            const dataX = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const dataY = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.left = `${dataX}px`;
            target.style.top = `${dataY}px`;

            target.setAttribute('data-x', dataX);
            target.setAttribute('data-y', dataY);
        }
    }
});
