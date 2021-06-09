const msgContainerEls = document.querySelectorAll('#collapse-handler');
// handles toggle
msgContainerEls.forEach(el => {
    let open = false;
    el.addEventListener('click', (event) => {
        event.preventDefault();
        const targetEl = event.target
        if (event.target.matches('img')) {

            const targetID = event.target.parentElement.dataset.collapseTarget;
           
            const div = document.getElementById('collapse-target-' + targetID);
            if (open === false) {
                open = true
                setState(targetID, 'open');
                // need to save 'state' in localStorage
                showElement(div);
                return
            } if (open === true) {
                open = false
                setState(targetID, 'closed');
                 // need to save 'state' in localStorage
                hideElement(div);
                return
            }
        }
    })
})
// functions to hide/show the divs
function showElement(element) {
    if(element != null){
        return element.removeAttribute('style');
    }
   
}
function hideElement(element) {
    if(element != null){
        return element.setAttribute('style', "visibility: hidden; display: none;");
    }
   
}

// localStorage
function setState(divID, state){
localStorage.setItem('div-'+divID, JSON.stringify({divID:divID, state: state}));
}function getState() {
    let all = [];
    for (let i = 0; i < localStorage.length; i++) {
        all[i] = JSON.parse(localStorage.getItem(localStorage.key(i)))
        
    }
    return all
}


// WAIT FOR DOM TO LOAD, THEN CHECK STATE OF MESSAGE CONTAINERS
function renderState(checkDOM) {
    if (document.readyState != 'loading')
        checkDOM();

    else
        document.addEventListener("DOMContentLoaded", checkDOM)
    return
}
// if a message div was left open by the user, the page will render with it open
renderState(() => {
    // grabs data from local storage
const data = getState();
// loops through all the message containers if multiple bookings with messages
for (let i = 0; i < data.length; i++) {
    const el = data[i];
    // id if the div that the users click on(from storage)
    const dID = el.divID;
    // the state, open or closed
    const state = el.state.toString();
    // if if was open, show it
    if(state === 'open'){
        const div = document.getElementById('collapse-target-' + dID);
        msgContainerEls.forEach(element=>{
            const id = element.getAttribute('data-collapse-target');
            if(id === dID){
                element.setAttribute('id', 'open')
            }
        })
        showElement(div)
    }
}
})



// in separate file make function that updates the times if the messages were from a previous day. 
