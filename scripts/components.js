"use strict";
import getCurrentWeather from "./weather.js";

const allImages = [
    '../images/slider/001-resized.jpg', 
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80',
    '../images/slider/002-resized.jpg',
    'https://images.unsplash.com/photo-1439723680580-bfd9d28ef9b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    '../images/slider/003-resized.jpg',
    'https://images.unsplash.com/photo-1529098872095-cc14f7439917?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    '../images/slider/004-resized.jpg',
    'https://images.unsplash.com/photo-1493243350443-9e3048ce7288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1340&q=80'
];

const slides = document.querySelector('.slides');
let imagesAcrossScreen = 5;
let totalImages = allImages.length;
let slideMargins = 0.2;
let scrollSpeed = 50; // seconds per loop
let arraySlice = [];
let sliderImages = [];

function generateSlider() {
    slides.innerHTML = '';
    let slideWidth = (100 / imagesAcrossScreen);
    arraySlice = allImages.slice(0, imagesAcrossScreen);
    sliderImages = [...allImages, ...arraySlice];
    let transformDistance = (totalImages / imagesAcrossScreen) * -100;
    let marginCorrection = ((totalImages) * 2) * slideMargins;
    const root = document.querySelector(':root');
    root.style.setProperty('--slide-margins', `${slideMargins}vw`);
    root.style.setProperty('--transform-distance', `${transformDistance}vw`);
    root.style.setProperty('--margin-correction', `${marginCorrection}vw`);
    root.style.setProperty('--slide-width', `${slideWidth}vw`);
    root.style.setProperty('--scroll-speed', `${scrollSpeed}s`);
    for (let i = 0; i < sliderImages.length; i++) {
      let sliderImage = document.createElement('img');
      sliderImage.setAttribute('class', 'slide');
      sliderImage.setAttribute('src', `${sliderImages[i]}`);
      slides.appendChild(sliderImage);
  }
};

generateSlider();

// setTimeout(function() {
//     generateSlider();
//   }, 2000);

// // LOADING SPINNER from https://codepen.io/PsychoLlama/pen/JdpQJe?editors=1010

//   window.onload = function() {
// var bars, current, rotation, last;

// bars = document.querySelectorAll('.bar');
// current = 0;
// last = 0;

// rotation = setInterval(function() {
//     bars[last].style.opacity = 0.4;
//     bars[current].style.opacity = 1;
//     last = current;
//     if (current === bars.length - 1) {
//     current = 0;
//     } else {
//     current++;
//     }
// }, 150)
// }

// END LOADING SPINNER

// *** BEGIN COUNTDOWN TIMER ***

function getTargetTime() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    let targetTime = new Date(now);

    if (dayOfWeek === 0) {
      if (hour > 10) {
        targetTime.setHours(18, 0, 0, 0);
      } else {
        targetTime.setHours(10, 0, 0, 0);
      }
    } else if (dayOfWeek >= 1 && dayOfWeek <= 3) {
      targetTime.setDate(now.getDate() + (3 - dayOfWeek));
      targetTime.setHours(18, 0, 0, 0);
    } else if ((dayOfWeek === 3 && hour >= 19) || (dayOfWeek > 3)) {
      targetTime.setDate(now.getDate() + (7 - dayOfWeek));
      targetTime.setHours(10, 0, 0, 0);
    } else if (dayOfWeek === 3 && (hour < 18 || (hour === 18 && minute < 0))) {
      targetTime.setDate(now.getDate() + (3 - dayOfWeek));
      targetTime.setHours(18, 0, 0, 0);
    }

    return targetTime;
  }
  
  function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    const now = new Date();
    const targetTime = getTargetTime();
    const timeDifference = targetTime - now;

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    const hoursFormatted = (hours < 10 ? '0' : '') + hours;
    const minutesFormatted = (minutes < 10 ? '0' : '') + minutes;
    const secondsFormatted = (seconds < 10 ? '0' : '') + seconds;
  
    countdownElement.textContent = `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`;
  
    if (timeDifference < 0) {
      clearInterval(interval);
      countdownElement.textContent = '00:00:00';
    }
  }
  
const interval = setInterval(updateCountdown, 1000);

  // *** END COUNTDOWN TIMER ***

await getCurrentWeather();

