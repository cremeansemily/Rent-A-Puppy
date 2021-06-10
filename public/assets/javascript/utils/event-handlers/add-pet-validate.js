// form validate constants
const petNameAlertEl = document.getElementById('petNameAlert');
const petAgeAlertEl = document.getElementById('petAgeAlert');
const petBreedAlertEl = document.getElementById('petBreedAlert');
const petPersonalityAlertEl = document.getElementById('petPersonalityAlert');
const petBioAlertEl = document.getElementById('petBioAlert');
const petPictureAlertEl = document.getElementById('petPictureAlert');

function showAlert(div, message) {
    div.textContent = message;
    setTimeout(() => {
        hideAlert(div);
    }, 5000);
}
function hideAlert(div) {
    div.textContent = '';
}

// form validation 
function petNameValidate(listener) {
    const petName = document.getElementById('pet-name');
    function validate(event) {
        let data;
        if (event) {
            data = event.target.value.toString();
        } else {
            data = petName.value.trim();
        }
        const pattern = /[^a-zA-Z0-9]/g
        const words = data.split(' ');

        if (data.length < 2) {
            showAlert(petNameAlertEl, "Pet names must contain at least two letters!");
        }
        if (words.length > 1) {
            showAlert(petNameAlertEl, "Pet names must be one word!");
            console.log(words)
            return false
        } else if (data.match(pattern)) {
            showAlert(petNameAlertEl, "Pet names can only contain letters and numbers and must be one word!");
            return false
        } else if (data === '') {
            showAlert(petNameAlertEl, "Pet names are required!");
            return false
        }
        return true
    }
    if (listener === true) {

        return petName.addEventListener('click', (event => {

            petName.addEventListener('focusout', (event) => {
                validate(event);
            });
            // triggers when a user tabs to the next field
            petName.addEventListener('keyDown', (event) => {
                if (event.code === 'Tab') {
                    validate();
                }
            })
        }));
    } else {
        return validate();
    }
}

function petAgeValidate(listener) {
    function validate(event) {
        let data;
        if (event) {
            data = event.target.value.toString();
        } else {
            data = document.getElementById('age').value.trim();
        }
        if (data === '') {
            showAlert(petAgeAlertEl, "Pet Ages are required!");
            return false
        }
        return true
    }
    if (listener === true) {
        return document.getElementById('age').addEventListener('click', (event => {
            document.getElementById('age').addEventListener('focusout', (event) => {
                validate(event);
            })
        }));
    } else {
        return validate();
    }
}

function petBreedValidate(listener) {
    const petBreed = document.getElementById('pet-breed');
    function validate(event) {
        let data;
        if (event) {
            data = event.target.value.toString();
        } else {
            data = petBreed.value.trim();
        }
        const pattern = /[^a-zA-Z]/g;
        // replace spaces
        const words = data.split(' ');

        if (data.length < 5) {
            showAlert(petBreedAlertEl, "Pet breeds must contain at least five letters!");
        }
        if (words.length > 1) {
            showAlert(petBreedAlertEl, "Pet breeds must be one word!");
            console.log(words)
            return false
        } else if (data.match(pattern)) {
            showAlert(petBreedAlertEl, "Pet breeds can only contain letters");
            return false
        } else if (data === '') {
            showAlert(petBreedAlertEl, "Pet breeds are required!");
            return false
        }
        return true
    }
    if (listener === true) {
        return petBreed.addEventListener('click', (event => {
            petBreed.addEventListener('focusout', (event) => {
                validate(event);
            });
            petBreed.addEventListener('keyDown', (event) => {
                if (event.code === 'Tab') {
                    validate();
                }
            })
        }));
    } else {
        return validate();
    }
}

function petPersonalityValidate(listener) {
    const petPersonality = document.getElementById('pet-personality');
    function validate(event) {
        let data;
        if (event) {
            data = event.target.value.toString();
        } else {
            data = petPersonality.value.trim();
        }
        const pattern = /[^a-zA-Z]/g;
        // replace spaces
        const words = data.split(' ');

        if (data.length < 4) {
            showAlert(petPersonalityAlertEl, "Pet personalities must contain at least four letters!");
        }
        if (words.length > 1) {
            showAlert(petPersonalityAlertEl, "Pet personalities must be one word!");
            console.log(words)
            return false
        } else if (data.match(pattern)) {
            showAlert(petPersonalityAlertEl, "Pet personalities can only contain letters");
            return false
        } else if (data === '') {
            showAlert(petPersonalityAlertEl, "Pet personalities are required!");
            return false
        }
        return true
    }
    if (listener === true) {
        return petPersonality.addEventListener('click', (event => {
            petPersonality.addEventListener('focusout', (event) => {
                validate(event);
            });
            petPersonality.addEventListener('keyDown', (event) => {
                if (event.code === 'Tab') {
                    validate();
                }
            })
        }));
    } else {
        return validate();
    }
}

function petBioValidate(listener) {
    const petBio = document.getElementById('pet-bio');
    function validate(event) {
        let data;
        if (event) {
            data = event.target.value.toString();
        } else {
            data = petBio.value.trim();
        }
        // replace spaces
        const words = data.split(' ');

        if (data.length < 4) {
            showAlert(petBioAlertEl, "Pet bio's must contain at least four letters!");
        }
        else if (data === '') {
            showAlert(petBioAlertEl, "Pet bio's are required!");
            return false
        }
        return true
    }
    if (listener === true) {
        return petBio.addEventListener('click', (event => {
            petBio.addEventListener('focusout', (event) => {
                validate(event);
            });
            petBio.addEventListener('keyDown', (event) => {
                if (event.code === 'Tab') {
                    validate();
                }
            })
        }));
    } else {
        return validate();
    }
}

function petPictureValidate(listener) {
    const petPicture = document.getElementById('input-files');
    function validate(event) {
        let data;
        if (event) {
            data = event.target;
        } else {
            data = petPicture.value;
        }

        // replace spaces
        if (data.files === 'undefined' || data.files === undefined) {
            showAlert(petPictureAlertEl, `Images are required`);
            return false
        }
        const fileType = data.files[0].name.split('.')[1];
        if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' || fileType === 'gif') {
            if (data.files[0].size > 2 * 1024 * 1024) {
                showAlert(petPictureAlertEl, `Images must be less than 2 MB`);
                return false
            } else {
                showAlert(petPictureAlertEl, `Accepted`);
                return true
            }
        } else {
            showAlert(petPictureAlertEl, `${fileType.toUpperCase()} is not supported!`);
            return false
        }
    }
    if (listener === true) {
        return petPicture.addEventListener('click', (event => {
            petPicture.addEventListener('change', (event) => {
                validate(event);
            });
            petPicture.addEventListener('keyDown', (event) => {
                if (event.code === 'Tab') {
                    validate();
                }
            })
        }));
    } else {
        return validate();
    }
}