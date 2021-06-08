const textArea = document.querySelectorAll('#textArea');
const sendBtn = document.querySelectorAll('#sendMessage');


textArea.forEach(el => {
    el.addEventListener('change', async (event) => {
        const id = event.target.dataset.bookingid;
        const body = event.target.value.trim();

        const response = await createComment(id, body);
        if (response.ok) {
            addMessage(id, body);
            event.target.value = ''
            // dont want to reload the window, divs are set to be hidden
            // need to append messages client side

        } else {
            alert(response.statusText)
        }

    });
});



// MESSAGE APPENDING

function addMessage(id, message) {
    const div = document.getElementById('msgEl-' + id);
    const newMessage = document.createElement('div');
    const date = Date.now();
    // userMessageEL is in another script file
    //=> /assets/javascript/utils/message-elements
    const msg = userMessageEl(message, date);
    newMessage.innerHTML = msg;
    div.appendChild(newMessage);
}

// MESSAGE UPDATER
// setInterval(function () {
//     console.log('CHECKING MESSAGES');
//     document.location.reload()
//   }, 300000);

// API CALL
async function createComment(booking, comment) {
    const url = `/api/comments`;
    const comment_body = comment;
    const booking_id = booking;
    const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify({
            booking_id,
            comment_body
        }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response)
        .catch(e => console.log(e, "Error logging in"));

    return response
}