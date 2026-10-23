// toggle fullscreen
function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(err => console.error("Error exiting fullscreen:", err));
  } else {
    document.documentElement.requestFullscreen().catch(err => console.error("Error entering fullscreen:", err));
  }
}

const buttonId = 'toggle-fullscreen-btn';
let button = document.getElementById(buttonId);
if (!button) {
  button = document.createElement('div');
  button.id = buttonId;
}

// toggle icons
function setIcon() {
  if (document.fullscreenElement) {
    button.innerHTML = '<svg viewBox="0 0 32 32" id="i-fullscreen-exit" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12 L12 12 12 4 M20 4 L20 12 28 12 M4 20 L12 20 12 28 M28 20 L20 20 20 28"></path> </g></svg>';
  } else {
    button.innerHTML = '<svg viewBox="0 0 32 32" id="i-fullscreen" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12 L4 4 12 4 M20 4 L28 4 28 12 M4 20 L4 28 12 28 M28 20 L28 28 20 28"></path> </g></svg>';
  }
}
setIcon();

// fullscreenchange event
document.addEventListener('fullscreenchange', setIcon);

// styles
Object.assign(button.style, {
  position: 'fixed',
  right: '16px',
  bottom: '16px',
  width: '24px',
  height: '24px',
  padding: '4px',
  color: 'white',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: '2147483647',
  userSelect: 'none'
});
document.body.appendChild(button);

button.addEventListener('click', function (e) {
  toggleFullscreen();
}, false);

// delete button
let timer = null;
let onLongPress = function() {
  if (button) {
    button.style.display = 'none';
  }
  timer = null;
}
function startLongPress(e) {
  if (!timer) {
    timer = setTimeout(onLongPress, 500); // 500ms
  }
}
function endPress(e) {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}
button.addEventListener('touchstart', startLongPress, false);
button.addEventListener('touchend', endPress, false);
button.addEventListener('mousedown', startLongPress, false);
button.addEventListener('mouseup', endPress, false);

