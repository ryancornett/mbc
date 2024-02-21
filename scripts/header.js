"use strict";

const nav = document.querySelector('nav');
nav.innerHTML = 
    `<div class="banner">
        <h1>Manchester Baptist Church</h1>
        <img src="images/diamond_black.webp" alt="Manchester Baptist Church logo"/>
    </div>

    <div class="navbar">
        <div class="nav-links">
            <ul>
                <li><a href="#"><sl-icon name="house-door" class="sl-icon"></sl-icon>
                Home</a></li>
                <li><a href="/views/beliefs.html"><sl-icon name="list-check" class="sl-icon"></sl-icon>
                What We Believe</a></li>
                <li><a href="/views/history.html"><sl-icon name="hourglass-split" class="sl-icon"></sl-icon>
                Our Church History</a></li>
                <li><a href="/views/salvation.html"><sl-icon name="question-circle" class="sl-icon"></sl-icon>
                What Is Salvation?</a></li>
                <li><a href="https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=AQBVR8XXE4L3N&source=url&ssrt=1708372905245"><sl-icon name="bank" class="sl-icon"></sl-icon>Online Giving</a></li>
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
