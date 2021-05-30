const id = document.getElementById('imagePreview').getAttribute('data-petId');
const img = document.getElementById('imagePreview');


function ready(callbackFunction) {
    if (document.readyState != 'loading')
        callbackFunction()

    else
        document.addEventListener("DOMContentLoaded", callbackFunction)
    return
}
ready(() => {
    async function renderPetImage(id) {

        const response = fetch(`/api/pets/${id}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            return res.json();
        }).catch(e => {
            console.log(e)
        });
        const imgData = await response;
        let profile_picture = imgData.profile_picture;
        let dURL;
        if (profile_picture === null) {
            const n = random();
            img.setAttribute('src', `/assets/images/default${n}.jpg`);
        } else {
            let typedArray = new Uint8Array(profile_picture);
            /*Convert array to Blob*/
            let blob = new Blob([typedArray], { type: 'image/jpeg' });
            /*create html img element*/
            dURL = URL.createObjectURL(blob);
        }
        id.src = dURL;
        console.log(imgData.profile_picture, id)
    }
    
    // renderPetImage(id);
    
    

});

function random() {
    let rn = Math.floor(Math.random() * 22);
    if (rn === 0 || rn >= 9 || rn == undefined) {
        return random();
    } else {
        return rn
    }
}

/*Grab the array buffer from response*/
