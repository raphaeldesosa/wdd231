let currentyear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentyear;

let lastModified = new Date(document.lastModified);
document.getElementById('lastModified').textContent = `Last Update: ${lastModified}`;


const url = 'https://api.openweathermap.org/data/2.5/weather?lat=6.92&lon=122.1&appid=1485d934b5f60a885a2d92b53d7daffb&units=metric'

async function apiFetch (){
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            displayWeather(data);
        } else {
            throw Error(await response.text);
        }
    } catch (error) {
        console.log(error);
    }
    
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weather-info');
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    weatherContainer.innerHTML = `
    <p><strong>Temperature:</strong> ${temperature.toFixed(1)}°C</p>
    <p><strong>Description:</strong> ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
    <p><strong>Humidity:</strong> ${humidity}%</p>
    <p><strong>Wind Speed:</strong> ${windSpeed} m/s<p>`;

}

apiFetch();

function getSpotlightMembers(members) {
    return members
    .filter(member => member.membership_level === 2 || member.membership_level === 3)
    .sort(() => 0.5 -Math.random())
    .slice(0,3);
}

async function displaySpotlights() {
    const response = await fetch('data/members.json');
    const members = await response.json();
    const spotlights = getSpotlightMembers(members);
    const spotlightsContainer = document.getElementById('cards');
    spotlights.innerHTML = '';

    spotlights.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="images/${member.image}" alt=${member.name} logo>
            <h2>${member.name}</h2>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership Level:</strong> ${member.membership_level === 2 ? 'Silver' : 'Gold'}</p>`;
        spotlightsContainer.appendChild(card);
    })
}

displaySpotlights();

const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=6.92&lon=122.1&appid=1485d934b5f60a885a2d92b53d7daffb&units=metric';

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if(response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch(error) {
        console.log(error);
    }
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-info');
    forecastContainer.innerHTML = '';

    const forecasts = {};
    let dayCount = 0;

    for (const forecast of data.list) {
        if (dayCount >= 3) break;

        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', {weekday: 'long'});
        const isToday = day === new Date().toLocaleDateString("en-US", {weekday: "long"});

        const hour = date.getHours();
        if (!forecasts[day] || hour === 12) {
            forecasts[day] = { temp: forecast.main.temp, isToday};
        }

        if (Object.keys(forecasts).length > dayCount) {
            dayCount++;
        }
    }

    Object.entries(forecasts).forEach(([day, forecast]) => {
        const displayDay = forecast.isToday ? 'Today' : day;
        const temperature = forecast.temp.toFixed(0);

        const forecastRow = document.createElement('p')
        forecastRow.innerHTML = `<strong>${displayDay}:</strong> ${temperature} °C`;
        forecastContainer.appendChild(forecastRow);
    })
}

fetchForecast();

function showModal(details) {
    const modal = document.getElementById('course-details');

    modal.innerHTML = `
    <button id="closeModal">×</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.titple}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(',')} </p>`;

    modal.showModal();

    closeModal.addEventListener("click", () => {
        modal.closest();
    })
}



function getMembershipLevel(level) {
    switch (level) {
        case 1: return "Member";
        case 2: return "Silver";
        case 3: return "Gold";
        case 4: return "Unknown";
    }
}

function toggleSpotlightsView() {
    const spotlightsContainer = document.getElementById('cards');
    spotlightsContainer.classList.toggle('grid-view');
    spotlightsContainer.classList.toggle('list-view');
}

document.getElementById('toggleView').addEventListener('click', toggleSpotlightsView);

const myButton = document.getElementById('myButton');
const menuLinks = document.querySelector('nav .menuLinks');

myButton.addEventListener('click', () => {
    menuLinks.classList.toggle('hidden')
})

