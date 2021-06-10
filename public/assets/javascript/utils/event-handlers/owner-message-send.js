
const textArea = document.querySelectorAll('#textArea');
const sendBtn = document.querySelectorAll('#sendMessage');

textArea.forEach(el => {
    el.addEventListener('click', async (event) => {
        const id = event.target.dataset.bookingid;
            event.target.addEventListener('keydown', async (event)=>{
                if(event.code === 'Enter' || event.code === 'NumpadEnter'){
                    const msg = event.target.value.trim();
                    const response = await createComment(id, msg);
                    if (response.ok) {
                        addMessage(id, msg);
                        event.target.value = '';
                
                       
                    } else {
                        alert(response.statusText)
                    }
                }
            })
        

       


    });
});




// MESSAGE APPENDING

function addMessage(id, message, method) {
    const div = document.getElementById('msgEl-' + id);
    const newMessage = document.createElement('div');
    if (!method) {
     
        const date = Date.now();
      
        // userMessageEL is in another script file
        //=> /assets/javascript/utils/message-elements
        const msg = ownerMessageEl(message, date);
        newMessage.innerHTML = msg;
        div.appendChild(newMessage);
    } else {
        const { date, meth } = method;
        if (meth === `userUpdates`) {
            console.log(method)
            const msgs = userMessageOwnerViewEl(message, date, id);
            newMessage.innerHTML = msgs;
            div.appendChild(newMessage)
        }
    }

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