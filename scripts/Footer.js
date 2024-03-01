"use strict"

/**
 * @param {HTMLElement} container 
 */

export default async function(container) {
    const sundaySchedule = ["Sundays", "9:30 AM Fellowship Breakfast", "10:00 AM Sunday School", "11:00 AM Morning Worship Service", "6:00 PM Evening Worship Service"];
    const wednesdaySchedule = ["Wednesdays", "6:00 PM Prayer & Bible Study", "6:00 PM Youth Groups", "Facebook icon", ];
    const socialLinks = [
        ["https://www.facebook.com/mbcserves/", "MBC Facebook page", "Facebook icon", "images/facebook.webp"],
        ["https://twitter.com/mbcserves/", "MBC Twitter/X page", "Twitter/X icon", "images/twitter-x.webp"],
        ["https://www.instagram.com/mbcserves", "MBC Instagram page", "Instagram icon", "images/instagram.webp"],
        ["https://www.youtube.com/channel/UCr0VXQX3Iq18VLojGWeuRUw/featured", "MBC YouTube page", "YouTube icon", "images/youtube.webp"]
    ]

    const rowOne = document.createElement('div');
    rowOne.classList.add('row-1');
    container.appendChild(rowOne);

    let scheduleColOne = document.createElement('div');
    scheduleColOne.classList.add('footer-schedule', 'col-1')
    rowOne.appendChild(scheduleColOne);
    let scheduleColOneList = document.createElement('ul');
    scheduleColOne.appendChild(scheduleColOneList);

    sundaySchedule.forEach((item) => {
        let listItem = document.createElement('li');
        listItem.textContent = item;
        scheduleColOneList.appendChild(listItem);
    })

    const logo = document.createElement('img');
    logo.setAttribute('src', 'images/diamond_white.webp');
    logo.setAttribute('alt', 'MBC Diamond logo');
    logo.classList.add('diamond');
    rowOne.appendChild(logo);

    let scheduleColTwo = document.createElement('div');
    scheduleColTwo.classList.add('footer-schedule')
    rowOne.appendChild(scheduleColTwo);
    let scheduleColTwoList = document.createElement('ul');
    scheduleColTwo.appendChild(scheduleColTwoList);

    wednesdaySchedule.forEach((item) => {
        let listItem = document.createElement('li');
        listItem.textContent = item;
        scheduleColTwoList.appendChild(listItem);
    })

    const rowTwo = document.createElement('div');
    rowTwo.classList.add('row-2');
    container.appendChild(rowTwo);

    const weatherDiv = document.createElement('div');
    weatherDiv.classList.add('weather');
    rowTwo.appendChild(weatherDiv);

    const currentlyIn = document.createElement('h6');
    currentlyIn.classList.add('place');
    currentlyIn.textContent = "Currently in Manchester, KY:";
    weatherDiv.appendChild(currentlyIn);
    const currentWeather = document.createElement('div');
    currentWeather.setAttribute('id', 'current-weather');
    weatherDiv.appendChild(currentWeather);

    const map = document.createElement('iframe');
    map.title = 'map';
    map.height = '300';
    map.src = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3179.864664989327!2d-83.76327206717397!3d37.155917382030104!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8843529f938b7a8d%3A0x223c84ae2263dc52!2sManchester%20Baptist%20Church!5e0!3m2!1sen!2sus!4v1708372351721!5m2!1sen!2sus';
    map.allowfullscreen = '';
    map.loading = 'lazy';
    map.referrerpolicy = 'no-referrer-when-downgrade';
    rowTwo.appendChild(map);

    const footerSocials = document.createElement('div');
    footerSocials.setAttribute('id', 'footer-social-media-icons-links');
    rowTwo.appendChild(footerSocials);

    for (let i = 0; i < socialLinks.length; i++) {
        let link = document.createElement('a');
        link.setAttribute('href', socialLinks[i][0]);
        link.setAttribute('aia-label', socialLinks[i][1]);
        let image = document.createElement('img');
        image.setAttribute('aria-label', socialLinks[i][2]);
        image.setAttribute('src', socialLinks[i][3]);
        link.appendChild(image);
        footerSocials.appendChild(link);
    }

    const credit = document.createElement('div');
    credit.classList.add('credit');
    container.appendChild(credit);
}