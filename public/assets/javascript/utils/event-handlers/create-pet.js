

const confirmBtn = document.getElementById('confirm');


confirmBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    // Keep form constants in here
    const name = document.getElementById('pet-name').value.trim();
    const dynamic = document.getElementById('dynamic-insert');
    const age = document.getElementById('age').value.trim();
    const breed = document.getElementById('pet-breed').value.trim();
    const personality_trait = document.getElementById('pet-personality').value.trim();
    const bio = document.getElementById('pet-bio').value.trim();
    const file = document.getElementById('input-files');
    const length = file.files.length;
    const fileData = file.files[0];
    /*check the file contents, dont send if field is empty*/
    console.log(fileData)
    if (length === 0) {
        alert('You must select a file!');
    } else {
        const response = await fetch('/api/pets', {
            method: 'post',
            body: JSON.stringify({
                name,
                age,
                breed,
                personality_trait,
                bio,
            }),

            headers: { 'Content-Type': 'application/json' }
        }).catch(e => {
            console.log(e)
        });

        /* If the Pet was successfully created
        set the url of the action to include the newly
        created pet ID and show the file input field
        */
        if (response.ok) {
            /* Need the Response body in JSON to read objects*/
            const resData = await response.json();
            /* Grab the pet id */
            const id = resData.dbPetData.id
            /*store in global to use to retrieve last image uploaded*/
            idData = id;

            /*REMOVE ALL ALERTS FOR PRODUCTION
                CHANGE ALERTS TO MODALS OR TOASTS
            */
            const fileType = file.files[0].name.split('.')[1];
            console.log('checking file contents');
            if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' || fileType === 'gif') {
                if (fileData.size > 2 * 1024 * 1024) {
                    return alert('Images must be less than 2 MB')
                } else {
                    console.log(`Uploading image`);
                    const formData = new FormData();
                    formData.append('file', fileData);
                    const imageUpload = await fetch('/api/pets/upload/' + id, {
                        method: 'post',
                        body: formData,
                    }).catch(e => {
                        console.log(e)
                    });

                    if (imageUpload.ok) {
                      hide();
                      window.location.reload()
                    } else {
                        alert(imageUpload.statusText);
                    }
                }
            } else {
                alert(`The ${fileType.toUpperCase()} file is not supported!`);
            }

        }
    }
});