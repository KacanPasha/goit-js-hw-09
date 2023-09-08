
import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const createPromisesButton = form.querySelector('button');


form.addEventListener('submit', function (e) {
  e.preventDefault();

  
  const firstDelay = parseInt(form.elements.delay.value);
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);

  
  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const delay = firstDelay + step * i;
    
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
        
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        //console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  form.reset();
});


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
