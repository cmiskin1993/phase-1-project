const petLink = () => document.getElementById('pet-link');

// Event Handlers
const renderFindPetPage = (e) => {
    e.preventDefault();

    alert('Hi it works!')
}


// Event Listeners
const attachFindPetLinkEvent = () => {
    petLink().addEventListener('click', renderFindPetPage);
}

document.addEventListener('DOMContentLoaded', () => {

    attachFindPetLinkEvent();
})