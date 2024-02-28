async function getPrayers() {
    return await fetch('https://raw.githubusercontent.com/ryancornett/mbchurch-data/main/prayer-list.json')
        .then(response => response.json());
}

async function populatePrayerRequests() {
    const prayerRequestsDiv = document.getElementById('prayer-requests');
    let prayerRequests;
    if(sessionStorage.getItem('prayerRequests') !== null) {
        prayerRequests = JSON.parse(sessionStorage.getItem('prayerRequests'));
    } else {
        prayerRequests = await getPrayers();
        sessionStorage.setItem('prayerRequests', JSON.stringify(prayerRequests));
    }
    
    let rawNames = prayerRequests.list;
    let prayers = ""
    rawNames.forEach(name => {
        prayers += `<li class='prayer-item'>${name}</li>`
    })
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

async function populateServiceInfo() {
    const SERVICE_ELEMENTS = ["date", "Opening Scripture", "Call to Worship", "Song of Fellowship", "Song of Exultation", "Responsive Reading Question", "Responsive Reading Scripture", "Song of Adoration", "Special Music", "Sermon Title", "Sermon Text", "Song of Response", "Church Ordinance", "Benediction"];
    const serviceInfoDiv = document.getElementById("service-info");
    let serviceInfo;
    if(sessionStorage.getItem('serviceInfo') !== null) {
        serviceInfo = JSON.parse(sessionStorage.getItem('serviceInfo'));
    } else {
        serviceInfo = await getServiceInfo();
        sessionStorage.setItem('serviceInfo', JSON.stringify(serviceInfo));
    }
    
    let htmlString = 
        `<h5 class="serif">${serviceInfo.date} Morning Worship Service:</h5>
        <p><i>${SERVICE_ELEMENTS[1]}</i>: <span style="font-weight:bold;">${serviceInfo.details.openingScripture}</span></p>
        <p><i>${SERVICE_ELEMENTS[2]}</i>: <span style="font-weight:bold;">${serviceInfo.details.callToWorship}</span></p>
        <p><i>${SERVICE_ELEMENTS[3]}</i>: <span style="font-weight:bold;">${serviceInfo.details.fellowshipSong}</span></p>
        <p><i>${SERVICE_ELEMENTS[4]}</i>: <span style="font-weight:bold;">${serviceInfo.details.songOfExultation}</span></p>
        <p><i>${SERVICE_ELEMENTS[5]}</i>: <span style="font-weight:bold;">${serviceInfo.details.responsiveReadingQuestion}</span></p>
        <p><i>${SERVICE_ELEMENTS[6]}</i>: <span style="font-weight:bold;">${serviceInfo.details.responsiveReadingReference}</span></p>
        <p><i>${SERVICE_ELEMENTS[7]}</i>: <span style="font-weight:bold;">${serviceInfo.details.songOfAdoration}</span></p>`;

    if (serviceInfo.details.specialMusic.isEmpty == "no") {
        htmlString += `<p><i>${SERVICE_ELEMENTS[8]}</i>: <span style="font-weight:bold;">${serviceInfo.details.specialMusic.provider} - ${serviceInfo.details.specialMusic.title}</span></p>`;
    }

    htmlString += 
    `<p><i>${SERVICE_ELEMENTS[9]}</i>: <span style="font-weight:bold;">${serviceInfo.details.sermonTitle}</span></p>
    <p><i>${SERVICE_ELEMENTS[10]}</i>: <span style="font-weight:bold;">${serviceInfo.details.sermonText}</span></p>
    <p><i>${SERVICE_ELEMENTS[11]}</i>: <span style="font-weight:bold;">${serviceInfo.details.songOfResponse}</span></p>`;

    if (serviceInfo.details.theLordsSupper == 1) {
        htmlString += `<p><i>${SERVICE_ELEMENTS[12]}</i>: <span style="font-weight:bold;">The Lord's Supper</span></p>`;
    }

    htmlString += 
    `<p><i>${SERVICE_ELEMENTS[13]}</i>: <span style="font-weight:bold;">${serviceInfo.details.benediction}</span></p><h6> </h6>`;

    if (serviceInfo.details.announcements.isEmpty == "no") {
        htmlString += `<p><sl-badge pill>ANNOUNCEMENTS</sl-badge></p>`
        let announcements = serviceInfo.details.announcements.list;
        announcements.forEach(announcement => {
        htmlString += `<p>${announcement}</p>`
        })
    }
    serviceInfoDiv.innerHTML = htmlString;
}

export { populatePrayerRequests, populateServiceInfo }