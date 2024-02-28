"use strict";

const nav = document.querySelector('nav');
const banner = document.createElement('div');
banner.classList.add('banner');
banner.setAttribute('id', 'top');

const bannerTitle = document.createElement('h1');
bannerTitle.classList.add('cursive');
bannerTitle.textContent = "Manchester Baptist Church";
banner.appendChild(bannerTitle);

const bannerImg = document.createElement('img');
bannerImg.setAttribute('src', "images/diamond_white.webp");
bannerImg.setAttribute('alt', "Manchester Baptist Church logo");
banner.appendChild(bannerImg);
nav.appendChild(banner);

const navbar = document.createElement('div');
navbar.classList.add('navbar');
nav.appendChild(navbar);
const navLinks = document.createElement('div');
navLinks.classList.add('nav-links');
navbar.appendChild(navLinks);
const navUl = document.createElement('ul');
navLinks.appendChild(navUl);
const navigation = [["#", "house-door", "Home"], ["#about", "people", "About MBC"], ["#this-week", "calendar-week", "This Week at MBC"], ["#contact-us", "info-circle", "Contact Us"], ["https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=AQBVR8XXE4L3N&source=url&ssrt=1708372905245", "wallet", "Online Giving"]];

for (let i = 0; i < navigation.length; i++) {
    let item = document.createElement('li');
    let link = document.createElement('a');
    link.setAttribute('href', navigation[i][0]);
    let icon = document.createElement('sl-icon');
    icon.setAttribute('name', navigation[i][1]);
    icon.classList.add('sl-icon');
    link.appendChild(icon);
    let linkText = document.createTextNode(navigation[i][2]);
    link.appendChild(linkText);
    item.appendChild(link);
    navUl.appendChild(item);
};
const switcher = document.createElement('div')
switcher.classList.add('switcher');
navbar.appendChild(switcher);

let switcherIcon = document.createElement('img');
switcherIcon.setAttribute('src', "images/moon.webp");
switcher.appendChild(switcherIcon);
const main = document.querySelector('main');
const SLIDER_DIV = document.querySelector('.slider');
const SOCIAL_MEDIA_ICONS = document.getElementById('social-media-icons-links');
const BACKGROUND_2 = document.querySelectorAll('.background-2');
const FOOTER = document.querySelector('footer');
const TO_TOP = document.querySelector('.to-top');
const themeElements = [switcher, nav, main, SLIDER_DIV, SOCIAL_MEDIA_ICONS, FOOTER, TO_TOP];

let lightTheme = true;
if (localStorage.getItem('preferredTheme') == "dark") {
    switchTheme();
}

function switchTheme() {
    for (let i=0; i<themeElements.length; i++) {
    themeElements[i].classList.toggle('dark');
    }
    BACKGROUND_2.forEach(bg => {
        bg.classList.toggle('dark');
    })
    if (lightTheme) {
        switcherIcon.setAttribute('src', "images/sun.webp")
        lightTheme = false;
        localStorage.setItem('preferredTheme', 'dark');
    } else {
        switcherIcon.setAttribute('src', "images/moon.webp");
        lightTheme = true;
        localStorage.setItem('preferredTheme', 'light');
    }
}

switcher.addEventListener('click', () => {
    switchTheme();
});

const drawer = document.querySelector('.drawer');
const openButton = document.querySelector('#hamburger');

openButton.addEventListener('click', () => drawer.classList.toggle('open'));