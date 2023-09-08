import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//  селекторы штмл
const dateInput = document.querySelector("#datetime-picker");
const startBtn = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownInterval;
let targetDate;
startBtn.setAttribute("disabled", "true")

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate) {
      if (selectedDate < new Date()) {
        Notiflix.Notify.failure('Qui timide rogat docet negare');
        clearInterval(countdownInterval);
      } else {
        targetDate = selectedDate;
        startBtn.removeAttribute("disabled");
      }
    } else {
      startBtn.setAttribute("disabled", "true");
    }
  },
};

flatpickr(dateInput, options);


function startCountdown() {
  countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeRemaining = targetDate - currentTime;
    startBtn.setAttribute("disabled", "true")
    dateInput.disabled = true;
    dateInput.style.pointerEvents = 'none';

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      updateTimeDisplay(0);
      window.alert("Time's up!");
      startBtn.setAttribute("disabled", "true");
    } else {
      updateTimeDisplay(timeRemaining);
    }
  }, 1000);
}


function updateTimeDisplay(timeRemaining) {
  const time = convertMs(timeRemaining);
  daysValue.textContent = addLeadingZero(time.days);
  hoursValue.textContent = addLeadingZero(time.hours);
  minutesValue.textContent = addLeadingZero(time.minutes);
  secondsValue.textContent = addLeadingZero(time.seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startBtn.addEventListener('click', startCountdown);