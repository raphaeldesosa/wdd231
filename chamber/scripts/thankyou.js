let currentyear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentyear;

let lastModified = new Date(document.lastModified);
document.getElementById('lastModified').textContent = `Last Update: ${lastModified}`;

window.onload = function() {
    const firstName = sessionStorage.getItem('firstName');
    const lastName = sessionStorage.getItem('lastName');
    const email = sessionStorage.getItem('email');
    const mobile = sessionStorage.getItem('mobile');
    const organization = sessionStorage.getItem('organization');
    const timestamp = sessionStorage.getItem('timestamp');

    
    document.getElementById('first-name').textContent = firstName;
    document.getElementById('last-name').textContent = lastName;
    document.getElementById('email').textContent = email;
    document.getElementById('mobile').textContent = mobile;
    document.getElementById('organization').textContent = organization;
    document.getElementById('timestamp').textContent = timestamp;
};