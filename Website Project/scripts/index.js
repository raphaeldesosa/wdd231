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
const myButton = document.getElementById('myButton');
const menuLinks = document.querySelector('nav .menuLinks');

myButton.addEventListener('click', () => {
    menuLinks.classList.toggle('hidden')
})

/*const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();

    alert("Thank you for your message! We'll get back to you as soon as possible!")

    form.reset();
})*/



/*document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

   
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const message = document.getElementById('message').value;
    const timestamp = new Date().toISOString();

    
    sessionStorage.setItem('firstName', firstName);
    sessionStorage.setItem('lastName', lastName);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('mobile', mobile);
    sessionStorage.setItem('message', message);
    sessionStorage.setItem('timestamp', timestamp);

    
    window.location.href = 'request.html';
});*/


const form = document.querySelector("form");
const confirmationModal = document.getElementById("confirmationModal");
const confirmButton = document.getElementById("confirmSubmit");
const cancelButton = document.getElementById("cancelSubmit");
const formSummary = document.getElementById("formSummary");
const confirmationMessage = document.getElementById("confirmationMessage");

form.addEventListener("submit", function(event){
    event.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const message = document.getElementById("message").value;

    formSummary.innerHTML = `
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${mobile}</p>
        <p><strong>Message:</strong> ${message}</p>`;

    confirmationModal.showModal();
});

confirmButton.addEventListener("click", function(){
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const message = document.getElementById('message').value;
    const timestamp = new Date().toISOString();

    
    sessionStorage.setItem('firstName', firstName);
    sessionStorage.setItem('lastName', lastName);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('mobile', mobile);
    sessionStorage.setItem('message', message);
    sessionStorage.setItem('timestamp', timestamp);

    
    window.location.href = 'request.html';
});

cancelButton.addEventListener("click", function(){
    confirmationModal.close();
})