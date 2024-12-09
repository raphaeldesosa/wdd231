let currentyear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentyear;

let lastModified = new Date(document.lastModified);
document.getElementById('lastModified').textContent = `Last Update: ${lastModified}`;


window.onload = function() {
    let lastVisit = localStorage.getItem("lastVisit");
    const currentDate = new Date();
    console.log('Current Date:', currentDate);
    console.log('Last Visit', lastVisit);

    let message='';

    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions!";
        localStorage.setItem("lastVisit", currentDate.toString());
    } else {
        lastVisit = new Date(lastVisit);
        const timeDifference = currentDate - lastVisit;

        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

        if (daysDifference < 1) {
            message = "Back so soon! Awesome!";
        } else {
            message = `You last visited ${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`
        }

        localStorage.setItem("lastVisit", currentDate.toString());
    }

    document.getElementById('visitor-message').textContent = message;
}