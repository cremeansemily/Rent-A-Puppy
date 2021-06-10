const petBtn = document.getElementById('add-pet-btn');
const modal = document.getElementById('modal');
const cancel = document.getElementById('cancel');


const xBtn = document.getElementById('x_btn');
// functions to control modal 
function trigger() {
    modal.removeAttribute('class');
    petNameValidate(true);
    petAgeValidate(true);
    petBreedValidate(true);
    petPersonalityValidate(true);
    petBioValidate(true);
    petPictureValidate(true);
}

function hide() {
    modal.setAttribute('class', 'hidden')
}

// event listeners
petBtn.addEventListener('click', () => {
    trigger();
});
cancel.addEventListener('click', () => {
    hide();
});
xBtn.addEventListener('click', () => {
    hide();
});


