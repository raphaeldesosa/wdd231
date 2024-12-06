let currentyear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentyear;

let lastModified = new Date(document.lastModified);
document.getElementById('lastModified').textContent = `Last Update: ${lastModified}`;

const membershipData = [
    {
        id: 1,
        name: "NP Membership",
        description: "Basic membership offering general access to resources and limited perks.",
        benefits: ["Access to general events", "Networking opportunities", "Newsletter subscription"],
        modalId: "npModal"
    },
    {
        id: 2,
        name: "Bronze Membership",
        description: "Includes additional perks like event discounts and training sessions.",
        benefits: ["Event discounts", "Basic advertising", "Access to training programs"],
        modalId: "bronzeModal"
    },
    {
        id: 3,
        name: "Silver Membership",
        description: "Advanced membership with spotlight positions and priority access.",
        benefits: ["Spotlight on home page", "Priority event registration", "Enhanced advertising"],
        modalId: "silverModal"
    },
    {
        id: 4,
        name: "Gold Membership",
        description: "Premium membership with maximum benefits and VIP perks.",
        benefits: ["VIP events", "Premium advertising", "Exclusive discounts"],
        modalId: "goldModal"
    }
];

function generateMembershipDetails() {
    const linksContainer = document.getElementById('membership-links');

    membershipData.forEach(member => {
        const link = document.createElement('button');
        link.textContent = `Learn More About ${member.name}`;
        link.classList.add('membership-link');
        link.onclick = () => openModal(member);

        linksContainer.appendChild(link);

    
        const modal = document.getElementById(member.modalId);
        modal.innerHTML = `
            <div class="modal-content">
                <h2>${member.name}</h2>
                <p>${member.description}</p>
                <h3>Benefits:</h3>
                <ul>
                    ${member.benefits.map(benefit => `<li>${benefit}</li>`).join("")}
                </ul>
            </div>`;
        
        const closeButton = document.createElement('button');
        closeButton.textContent = "Close";
        closeButton.classList.add('close-modal');
        closeButton.onclick = () => closeModal(member.modalId);

        modal.appendChild(closeButton);
    });
}




function openModal(member) {
    const modal = document.getElementById(member.modalId);
    if (modal) modal.showModal();
   
}


function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.close();
    }
}

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

   
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const organization = document.getElementById('organization').value;
    const timestamp = new Date().toISOString();

    
    sessionStorage.setItem('firstName', firstName);
    sessionStorage.setItem('lastName', lastName);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('mobile', mobile);
    sessionStorage.setItem('organization', organization);
    sessionStorage.setItem('timestamp', timestamp);

    
    window.location.href = 'thanks.html';
});


generateMembershipDetails();

