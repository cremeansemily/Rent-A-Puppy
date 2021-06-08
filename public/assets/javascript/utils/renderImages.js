

async function renderImages(data) {
    /*GRAB ALL images, set the src on each on*/
    // console.log(data)
    const elements = document.querySelectorAll('#imagePreview');
    elements.forEach(el => {
        const petId = el.getAttribute('data-petid');
    
        function random() {
            let rn = Math.floor(Math.random() * 22);
            if (rn === 0 || rn >= 9 || rn == undefined) {
                return random();
            } else {
                return rn
            }
        }
        if (data[petId - 1].picture == '' || data[petId - 1].picture == ' ') {
            const rn = random();
            const url = `/assets/images/default${rn}.jpg`
            return el.src = url
        } else {
            return el.src = data[petId - 1];
        }
    })
}
/*Grab the array buffer from response*/
async function getPetImages() {
    const response = fetch(`/api/pets`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => {
        return res.json();
    }).catch(e => {
        console.log(e)
    });
    const imgData = await response;
    const images = imgData.map(el => {
        let dURL;
        const picture = el.profile_picture;
        if (picture === null) {
            dURL = '';
        } else {
            let typedArray = new Uint8Array(picture.data);
            /*Convert array to Blob*/
            let blob = new Blob([typedArray], { type: 'image/jpeg' });
            /*create html img element*/
           return dURL = URL.createObjectURL(blob);
        }
        return {
            id: el.id,
            picture: dURL
        }
    });
    renderImages(images);
}

getPetImages();
