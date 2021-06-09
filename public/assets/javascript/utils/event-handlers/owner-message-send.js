
const textArea = document.querySelectorAll('#textArea');
const sendBtn = document.querySelectorAll('#sendMessage');


textArea.forEach(el => {
    el.addEventListener('change', async (event) => {
        const id = event.target.dataset.bookingid;
        const body = event.target.value.trim();

        const response = await createComment(id, body);
        const currentUserMessages = document.querySelectorAll(`#userMessage-${id}`);
        if (response.ok) {
            addMessage(id, body);
            event.target.value = '';
           
            let count = 0;
            let length = currentUserMessages.length;
            console.log(length)
            updateMsg = () => {
                count++
                getNewMessages(id).then(async res => {
                    if (res.ok) {
                        const msgData = await res.json();
                        const current = msgData.user.comments.length
                        if (length == current) {
                            if (count > 55) {
                                updateMsg();
                            } if (count < 55) {
                                setTimeout(() => {
                                    updateMsg()
                                }, 10000);
                            }
                        } else {
                            // figure how many messages and render those
                            const missing = current - length;
                            // console.log(missing);
                            let msgsArray = [msgData.user.comments];
                            console.log(current)
                            let missingArray = [];
                            for (let i = 1; i <= missing; i++) {
                                const el = msgsArray[0].pop();
                                // console.log(msgsArray)
                                missingArray.push(el)
                            }
                            missingArray.forEach(el=>{
                                console.log(el)
                                // append these should be in order? ha we will see
                                const method = {
                                    meth: 'userUpdates',
                                    date: el.createdAt
                                }
                                const message = el.comment_body
                                addMessage(id, message, method);
                                length = current;
                            })
                            setTimeout(() => {
                                updateMsg();
                            }, 6000);

                        }
                    }
                });
            }

            updateMsg();

            // dont want to reload the window, divs are set to be hidden
            // need to append messages client side
        } else {
            alert(response.statusText)
        }


    });
});



// MESSAGE APPENDING

function addMessage(id, message, method) {
    const div = document.getElementById('msgEl-' + id);
    const newMessage = document.createElement('div');
    if (!method) {
        console.log('here')
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