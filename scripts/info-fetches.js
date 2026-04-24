async function getPrayers() {
    return await fetch('https://raw.githubusercontent.com/ryancornett/mbchurch-data/main/prayer-list.json')
        .then(response => response.json());
}

async function populatePrayerRequests() {
    const prayerRequestsDiv = document.getElementById('prayer-requests');
    let prayerRequests = await getPrayers();
    
    let rawNames = prayerRequests.list;
    let prayers = ""
    rawNames.forEach(name => {
        prayers += `<li class='prayer-item'>${name}</li>`
    })
    prayers += `<li class='prayer-item'>Weekly prayer focus: ${prayerRequests.focus}</li>`
    prayerRequestsDiv.innerHTML =
    `<h6><i>Last updated ${prayerRequests.updated}</i></h6>
    <ol class="prayer-list">
    ${prayers}
    </ol>`
}

async function getServiceInfo() {
    return await fetch('https://raw.githubusercontent.com/ryancornett/mbchurch-data/main/service-details.json')
        .then(response => response.json());
}

let songTypeEnum = {
    "exultation": "Song of Exultation",
    "adoration": "Song of Adoration",
    "supplication": "Song of Supplication",
    "devotion": "Song of Devotion",
    "psalm": "Psalm in Meter",
    "consolation": "Song of Consolation",
    "thanksgiving": "Song of Thanksgiving"
};

async function populateServiceInfo() {

    const serviceInfoDiv = document.getElementById("service-info");
    let serviceInfo;

    if (sessionStorage.getItem('serviceInfo') !== null) {
        serviceInfo = JSON.parse(sessionStorage.getItem('serviceInfo'));
    } else {
        serviceInfo = await getServiceInfo();
        sessionStorage.setItem('serviceInfo', JSON.stringify(serviceInfo));
    }

    const thirdSongType = songTypeEnum[serviceInfo.details.thirdSongType];
    const fourthSongType = songTypeEnum[serviceInfo.details.fourthSongType];
    let htmlString = 
        `<h5 class="serif">${serviceInfo.date} Morning Worship Service:</h5>
        <p><i>Opening Scripture</i>: <span style="font-weight:bold;">${serviceInfo.details.openingScripture}</span></p>
        <p><i>Call to Worship</i>: <span style="font-weight:bold;">${serviceInfo.details.callToWorship}</span></p>
        <p><i>Song of Fellowship</i>: <span style="font-weight:bold;">${serviceInfo.details.fellowshipSong}</span></p>
        <p><i>Responsive Reading</i>: <span style="font-weight:bold;">${serviceInfo.details.responsiveReading}</span></p>
        <p><i>${thirdSongType}</i>: <span style="font-weight:bold;">${serviceInfo.details.thirdSong}</span></p>
        <p><i>${fourthSongType}</i>: <span style="font-weight:bold;">${serviceInfo.details.fourthSong}</span></p>`;

    if (serviceInfo.details.specialMusic.isScheduled) {
        htmlString += `<p><i>Special Music</i>: <span style="font-weight:bold;">${serviceInfo.details.specialMusic.provider} - ${serviceInfo.details.specialMusic.title}</span></p>`;
    }

    htmlString += 
    `<p><i>Sermon Title</i>: <span style="font-weight:bold;">${serviceInfo.details.sermonTitle}</span></p>
    <p><i>Sermon Text</i>: <span style="font-weight:bold;">${serviceInfo.details.sermonText}</span></p>
    <p><i>Song of Response</i>: <span style="font-weight:bold;">${serviceInfo.details.songOfResponse}</span></p>`;

    if (serviceInfo.details.theLordsSupper) {
        htmlString += `<p><i>The Lord's Supper</i>: <span style="font-weight:bold;">The Lord's Supper</span></p>`;
    }

    htmlString += 
    `<p><i>Closing</i>: <span style="font-weight:bold;">${serviceInfo.details.closing}</span></p><h6> </h6>`;

    if (serviceInfo.details.announcements.isPopulated) {
        htmlString += `<p id="announcement-badge"><sl-badge pill>ANNOUNCEMENTS</sl-badge></p>`
        let announcements = serviceInfo.details.announcements.list;
        announcements.forEach(announcement => {
        htmlString += `<p style="margin-top:0.5rem;">• ${announcement}</p>`
        })
    }
    serviceInfoDiv.innerHTML = htmlString;
}

export { populatePrayerRequests, populateServiceInfo };