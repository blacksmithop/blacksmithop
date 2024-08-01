document.querySelector('.button.close').addEventListener('click', () => {
    minimizeWindow();
});

document.querySelector('.button.minimize').addEventListener('click', () => {
    minimizeWindow();
});

document.querySelector('.button.expand').addEventListener('click', () => {
    alert('Expand button clicked');
});

document.querySelector('.file-icon').addEventListener('click', () => {
    maximizeWindow();
});

function minimizeWindow() {
    const mainWindow = document.getElementById('main-window');
    const fileIcon = document.getElementById('file-icon');
    mainWindow.classList.add('minimized');
    fileIcon.style.display = 'flex';
}

function maximizeWindow() {
    const mainWindow = document.getElementById('main-window');
    const fileIcon = document.getElementById('file-icon');
    mainWindow.classList.remove('minimized');
    fileIcon.style.display = 'none';
}
