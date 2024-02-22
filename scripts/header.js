"use strict";

const nav = document.querySelector('nav');
nav.innerHTML = 
    `<div class="banner" id="top">
        <h1>Manchester Baptist Church</h1>
        <img src="images/diamond_white.webp" alt="Manchester Baptist Church logo"/>
    </div>

    <div class="navbar">
        <div class="nav-links">
            <ul>
                <li><a href="#"><sl-icon name="house-door" class="sl-icon"></sl-icon>
                Home</a></li>
                <li><a href="#beliefs"><sl-icon name="people" class="sl-icon"></sl-icon>
                Who We Are</a></li>
                <li><a href="#this-week"><sl-icon name="calendar-week" class="sl-icon"></sl-icon>
                This Week at MBC</a></li>
                <li><a href="#contact-us"><sl-icon name="info-circle" class="sl-icon"></sl-icon>
                Contact Us</a></li>
                <li><a href="https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=AQBVR8XXE4L3N&source=url&ssrt=1708372905245"><sl-icon name="wallet" class="sl-icon"></sl-icon>Online Giving</a></li>
            </ul>
        </div>

        <div class="switcher">
        </div>

    </div>`;

const switcher = document.querySelector('.switcher');
switcher.innerHTML = `<img src="images/moon.webp" />`;
const main = document.querySelector('main');
const SLIDER_DIV = document.querySelector('.slider');
const SOCIAL_MEDIA_ICONS = document.getElementById('social-media-icons-links');
const themeElements = [switcher, nav, main, SLIDER_DIV, SOCIAL_MEDIA_ICONS];
let lightTheme = true;

function switchTheme() {
    for (let i=0; i<themeElements.length; i++) {
    themeElements[i].classList.toggle('dark');
    }
    if (lightTheme) {
        switcher.innerHTML = `<img src="images/sun.webp" />`;
        lightTheme = false;
    
    } else {
        switcher.innerHTML = `<img src="images/moon.webp" />`;
        lightTheme = true;
    }
}

switcher.addEventListener('click', () => {
    switchTheme();
});
