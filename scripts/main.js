import { updateAllProgressBars, updateProgressBar } from './ProgressBars.js';

let intervalDay;
let speedDay;

let progressPoint = {
  health: 100,
  hunger: 100,
  happiness: 100,
  age: 0,
};

const saveConfig = (element) => {
  element.classList.remove('show-modal');
};

const toggleVisibilityModal = (element) => {
  element.classList.toggle('show-modal');
};

document.addEventListener('DOMContentLoaded', () => {
  const btnClean = document.getElementById('btn-clean');
  const btnFeed = document.getElementById('btn-feed');
  const btnPlay = document.getElementById('btn-play');

  const btnNewGame = document.getElementById('btnNewGame');

  const gameModal = document.getElementById('modal');
  const btnCloseModal = document.getElementById('close-modal');
  const modalGameOver = document.getElementById('game-over');

  const btnSaveConfig = document.getElementById('save-config');
  const inputPetName = document.getElementById('input-pet-name');
  const petName = document.getElementById('pet-name');
  const inputSpeedDay = document.getElementById('input-speed-day');

  btnClean.addEventListener('click', () => {
    updateProgressBar('progress-health', 100);
    progressPoint.health = 100;
  });

  btnFeed.addEventListener('click', () => {
    updateProgressBar('progress-hunger', 100);
    progressPoint.hunger = 100;
  });

  btnPlay.addEventListener('click', () => {
    updateProgressBar('progress-happiness', 100);
    progressPoint.happiness = 100;
  });

  btnNewGame.addEventListener('click', () => {
    toggleVisibilityModal(gameModal);
  });

  btnSaveConfig.addEventListener('click', () => {
    petName.innerText = inputPetName.value;
    speedDay = parseInt(inputSpeedDay.value, 10) * 1000;

    toggleVisibilityModal(gameModal);
    startDay();
  });

  btnCloseModal.addEventListener('click', () => {
    toggleVisibilityModal(gameModal);
  });
});

function clockDay() {
  const modalGameOver = document.getElementById('game-over');

  progressPoint.health -= randomNumber();
  progressPoint.hunger -= randomNumber();
  progressPoint.happiness -= randomNumber();
  progressPoint.age++;

  if (
    progressPoint.health <= 0 ||
    progressPoint.happiness <= 0 ||
    progressPoint.hunger <= 0
  ) {
    clearInterval(intervalDay);

    modalGameOver.classList.add('show-modal');
    const btnRestart = document.getElementById('btn-restart');
    btnRestart.addEventListener('click', () => {
      toggleVisibilityModal(modalGameOver);
      progressPoint.health = 100;
      progressPoint.hunger = 100;
      progressPoint.happiness = 100;
      progressPoint.age = 0;
      startDay();
    });
    return;
  }

  updateAllProgressBars(progressPoint);
  updatePetAge();
  return;
}

function updatePetAge() {
  const petAge = document.getElementById('pet-age');
  petAge.innerText = progressPoint.age;
}

function randomNumber() {
  const min = 5;
  const max = 10;
  const range = max - min + 1;
  const randomNumber = Math.floor(Math.random() * range) + min;
  return randomNumber;
}

function startDay() {
  intervalDay = setInterval(clockDay, speedDay);
  return;
}
