"use strict";

import { populatePrayerRequests, populateServiceInfo } from './info-fetches.js'
import { Modals } from './modals.js'
import { Countdown } from './countdown.js';
import { Header } from './header.js';
Header();
import getCurrentWeather from "./weather.js";
await getCurrentWeather();

let pageId = document.getElementById('page-id').classList.value;

if (pageId == 'index') {
    populatePrayerRequests();
    populateServiceInfo();
    Modals();
    Countdown();
}

let topButton = document.getElementById('to-top');
function displayTopButton() {
    if (window.scrollY >= 550) {
        topButton.classList.add('visible');
    } else {
        topButton.classList.remove('visible');
    }
}
document.addEventListener('scroll', displayTopButton);

let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  let floatUp = function(entries, observer) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            if(!entry.target.classList.contains('float-up')) {
                entry.target.classList.add('float-up');            
            }
            observer.unobserve(entry.target);
        }
    });
  };
  
  let observer = new IntersectionObserver(floatUp, options);
  
  let targets = document.querySelectorAll('.observable');
  targets.forEach(target => {
  observer.observe(target);
  });

const credit = document.querySelector('.credit');
const current = new Date();
const year = current.getFullYear();
const preCredit = document.createElement('span');
preCredit.textContent = "Website by ";
credit.appendChild(preCredit);
const creditLink = document.createElement('a');
creditLink.setAttribute('href', "https://linktr.ee/ryancornett");
creditLink.setAttribute('alt', "Ryan Cornett's LinkTree page");
creditLink.classList.add("footer-link")
creditLink.textContent = "Ryan Cornett";
credit.appendChild(creditLink);
credit.insertAdjacentText('beforeend', ` | All rights reserved 2021-${year} Manchester Baptist Church`);

