const textArea = document.querySelectorAll('#textArea');
const sendBtn = document.querySelectorAll('#sendMessage');


textArea.forEach(el=>{
    el.addEventListener('change',async (event)=>{
        const id = event.target.dataset.bookingid
        const body = event.target.value.trim();

        const response = await createComment(id,body);
        console.log(response);
        if(response.ok){
            addMessage(id,body);
            event.target.value = ''
            // dont want to reload the window, divs are set to be hidden
            // need to append messages client side
            
        }else{
            alert(response.statusText)
        }
        
    });
});

sendBtn.forEach(el=>{
    el.addEventListener('click',(event)=>{
        event.preventDefault();
        console.log(event.target)
    })
})

// MESSAGE APPENDING

function addMessage(id, message){
const div = document.getElementById('msgEl-' + id);

const newMessage = document.createElement('div')
newMessage.innerHTML = `<div class="flex justify-end mb-4">
<div 
  class="mr-2 py-3 px-4 bg-indigo-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white shadow-inner">

  ${message}

</div>
<img src="/assets/images/profile-icons/dog1.png" class="object-cover h-8 w-8 rounded-full mt-4"
  alt="" />
</div>`

div.appendChild(newMessage);

}

// MESSAGE UPDATER
// setInterval(function () {
//     console.log('CHECKING MESSAGES');
//     document.location.reload()
//   }, 300000);

// API CALL
async function createComment(booking, comment){
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