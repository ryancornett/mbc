"use strict";

import { populatePrayerRequests, populateServiceInfo } from './info-fetches.js'

populatePrayerRequests();

populateServiceInfo();

const topButton = document.getElementById('to-top');
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

// >>> EVERY PAGE GETS A PAGE ID TO FACILITATE THE BELOW SWITCH/CASE TO DETERMINE THE ELEMENTS ARRAY FOR THEME SWITCHING <<<

// CHANGE pageElements to a parameter with each page's corresponding elements array

let pageId = document.getElementById('page-id').classList.value;

switch (pageId) {
    case 'index': // switchPage(indexElements); break;
    case 'salvation': // switchPage(salvationElements); break;
    case 'history': // switchPage(historyElements); break;
    case 'beliefs': // switchPage(beliefsElements); break;
}

// >>> EVERY PAGE GETS A PAGE ID TO FACILITATE THE ABOVE SWITCH/CASE TO DETERMINE THE ELEMENTS ARRAY FOR THEME SWITCHING <<<

const credit = document.querySelector('.credit');
const current = new Date();
const year = current.getFullYear();
credit.innerHTML = `Website by <a href="https://linktr.ee/ryancornett" alt="Ryan Cornett's LinkTree page" class="footer-link">Ryan Cornett</a> | All rights reserved 2021-${year} Manchester Baptist Church`;

// localStorage.setItem('foo', 'bar');
// let check = localStorage.getItem('foo');
// console.log(check);
// localStorage.removeItem('foo');
