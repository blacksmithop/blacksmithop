document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('start-menu').classList.toggle('hidden');
});

document.getElementById('about-txt').addEventListener('click', () => {
    openFileWindow('file-window');
});

document.getElementById('wallpaper').addEventListener('click', () => {
    openFileWindow('wallpaper-window');
});

document.getElementById('close-btn').addEventListener('click', () => {
    closeFileWindow('file-window');
});

document.getElementById('minimize-btn').addEventListener('click', () => {
    minimizeFileWindow('file-window', 'fa-file-alt');
});

document.getElementById('expand-btn').addEventListener('click', () => {
    expandFileWindow('file-window');
});

document.getElementById('close-wallpaper-btn').addEventListener('click', () => {
    closeFileWindow('wallpaper-window');
});

document.getElementById('minimize-wallpaper-btn').addEventListener('click', () => {
    minimizeFileWindow('wallpaper-window', 'fa-image');
});

document.getElementById('expand-wallpaper-btn').addEventListener('click', () => {
    expandFileWindow('wallpaper-window');
});

document.querySelectorAll('.color-square').forEach(square => {
    square.addEventListener('click', (e) => {
        document.body.style.backgroundImage = `url(${e.target.style.backgroundImage.slice(5, -2)})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    });
});

function openFileWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.style.display = 'block';
    windowElement.classList.remove('hidden');
}

function closeFileWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.style.display = 'none';
}

function minimizeFileWindow(windowId, iconClass) {
    const windowElement = document.getElementById(windowId);
    const taskbar = document.getElementById('taskbar');

    // Check if the icon already exists in the taskbar
    let minimizedIcon = document.querySelector(`.taskbar-icon[data-window-id="${windowId}"]`);
    if (!minimizedIcon) {
        minimizedIcon = document.createElement('div');
        minimizedIcon.classList.add('taskbar-icon');
        minimizedIcon.setAttribute('data-window-id', windowId);
        minimizedIcon.innerHTML = `<i class="fas ${iconClass}"></i>`;
        minimizedIcon.addEventListener('click', () => {
            windowElement.style.display = 'block';
            windowElement.classList.remove('hidden');
            taskbar.removeChild(minimizedIcon);
        });
        taskbar.appendChild(minimizedIcon);
    }

    windowElement.style.display = 'none';
}

function expandFileWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.classList.toggle('expanded');
}

// Initially open and center the about.txt window
document.addEventListener('DOMContentLoaded', () => {
    openFileWindow('file-window');
    const aboutWindow = document.getElementById('file-window');
    aboutWindow.style.top = '50%';
    aboutWindow.style.left = '50%';
    aboutWindow.style.transform = 'translate(-50%, -50%)';
});

interact('.file-icon, .file-window')
    .draggable({
        modifiers: [
            interact.modifiers.snap({
                targets: [interact.createSnapGrid({ x: 100, y: 100 })], // Grid size increased for better stacking
                range: Infinity,
                relativePoints: [{ x: 0, y: 0 }]
            }),
            interact.modifiers.restrict({
                restriction: '#main-screen',
                endOnly: true,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            })
        ],
        inertia: true,
        listeners: {
            move: dragMoveListener,
            end(event) {
                // Handle overlap avoidance
                const allIcons = document.querySelectorAll('.file-icon');
                allIcons.forEach(icon => {
                    if (icon !== event.target) {
                        const rect1 = event.target.getBoundingClientRect();
                        const rect2 = icon.getBoundingClientRect();

                        if (rect1.left < rect2.right && rect1.right > rect2.left &&
                            rect1.top < rect2.bottom && rect1.bottom > rect2.top) {
                            icon.style.transform = `translate(${rect1.right - rect2.left + 10}px, ${rect1.bottom - rect2.top + 10}px)`;
                        }
                    }
                });
            }
        }
    });

function dragMoveListener(event) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}
