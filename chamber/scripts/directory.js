let currentyear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentyear;

let lastModified = new Date(document.lastModified);
document.getElementById('lastModified').textContent = `Last Update: ${lastModified}`;

async function FetchandDisplayMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();

        const cardsContainer = document.getElementById('cards');
        cardsContainer.innerHTML = '';

        members.forEach(member => {
            const card =document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
            <img src="images/${member.image}" alt=${member.name} logo>
            <h2>${member.name}</h2>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membership_level)}</p>`;

            cardsContainer.appendChild(card);
        })
    }
    catch(error) {
        console.error("Error fetching members", error);
    }
}

function getMembershipLevel(level) {
    switch (level) {
        case 1: return "Member";
        case 2: return "Silver";
        case 3: return "Gold";
        case 4: return "Unknown";
    }
}

function toggleView(){
    const cardsContainer = document.getElementById('cards');
    cardsContainer.classList.toggle('grid-view');
    cardsContainer.classList.toggle('list-view');
}

FetchandDisplayMembers();
document.getElementById('toggleView').addEventListener('click', toggleView);

