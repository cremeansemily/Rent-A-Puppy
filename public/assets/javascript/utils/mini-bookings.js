

// wait for dom to load
function ready(callbackFunction) {
    if (document.readyState != 'loading')
        callbackFunction()

    else
        document.addEventListener("DOMContentLoaded", callbackFunction)
    return
}
ready(async () => {
    const host = window.location.hostname;
    const path = window.location.pathname;
    let url = 'https://pimp-my-puppy.herokuapp.com/api' + path;
    if (host == 'localhost') {
        url = 'http://localhost:3001/api' + path;
    }
    const data = await fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => {
        return res.json()
    }).catch(e => {
        console.log(e)
        return
    });




    const bookings = data.bookings.forEach(el => {

        let currentDay = el.date.split('-')[1];

        if (currentDay[0] == 0) {
            currentDay = currentDay[1];
        }

        const day = document.getElementById(`mini-date-${currentDay}`);
        day.setAttribute('class', "p-1 flex items-end justify-center  bg-red-500 text-white rounded-full self-end");
        day.removeAttribute('data-booked')
        day.setAttribute('data-booked', "true")

        return
    })

    // .then(async response => {
    //     const events = response
    //     console.log(events)
    //     // loop through events for the day, grab the category name
    //     // for each event, add a . into reserved spot and set the 
    //     // span's class for correct color
    //     // for (let i = 0; i < events.length; i++) {
    //     //     const p = document.createElement('img')
    //     //     const currentDay = events[i].day;
    //     //     const catName = events[i].category.name;
    //     //     const eventSpanEl = document.getElementById(`event-${currentDay}`)
    //     //     // CREATE A NEW SPAN TO PLACE . IN
    //     //     p.setAttribute('class', `mb-4 `);
    //     //     p.setAttribute('src', `/assets/images/${catName.toLowerCase()}.png`)
    //     //     eventSpanEl.appendChild(p);
    //     // }

    // })
})








