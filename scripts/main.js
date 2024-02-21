"use strict";

import { populatePrayerRequests, populateServiceInfo } from './info-fetches.js'

populatePrayerRequests();

populateServiceInfo();

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
credit.innerHTML = `Website by <a href="https://linktr.ee/ryancornett" alt="Ryan Cornett's LinkTree page" class="footer-link">Ryan Cornett</a> | All rights reserved ${year} Manchester Baptist Church`;

// localStorage.setItem('foo', 'bar');
// let check = localStorage.getItem('foo');
// console.log(check);
// localStorage.removeItem('foo');
