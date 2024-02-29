"use strict"

function Modals() {
    (function Ministries() {
        const MINISTRIES = document.querySelector('.ministries-modal');
        const openMinistries = document.querySelector('.open-ministries');
        openMinistries.addEventListener('click', () => MINISTRIES.show());
    })();

    (function Leadership() {
        const LEADERSHIP = document.querySelector('.leadership-modal');
        const openLeadership = document.querySelector('.open-leadership');
        openLeadership.addEventListener('click', () => LEADERSHIP.show());
    })();

    (function Schedule() {
        const SCHEDULE = document.querySelector('.schedule-modal');
        const openSchedule = document.querySelector('.open-schedule');
        openSchedule.addEventListener('click', () => SCHEDULE.show());
    })();

    (function Resources() {
        const RESOURCES = document.querySelector('.resources-modal');
        const openResources = document.querySelector('.open-resources');
        openResources.addEventListener('click', () => RESOURCES.show());
    })();
}

export { Modals };