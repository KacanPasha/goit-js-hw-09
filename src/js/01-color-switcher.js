const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.body;

let start;
btnStop.setAttribute("disabled", "true")
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

btnStart.addEventListener('click', () => {
  if (!start) { 
    start = setInterval(() => {
      const color = getRandomHexColor();
      body.style.backgroundColor = color;
      btnStart.setAttribute("disabled", "true");
      btnStop.disabled = false;
    }, 1000);
  } else if (start) {
    btnStop.setAttribute("disabled", "true")
    btnStart.removeAttribute("disabled");
    clearInterval(start);
    start = null;
  }
});

btnStop.addEventListener('click', () => {
  if (start) {
    clearInterval(start);
    start = null;
  }
  btnStart.removeAttribute("disabled");
});





