

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
        console.log(el)
        let month = el.date.split('-')[1];
        const currentMonth =  moment(new Date()).format('M');
       
        let currentDay = el.date.split('-')[2];

        if (currentDay[0] == 0 || month[0] ==[0]) {
            currentDay = currentDay[1];
            month = month[1]
        }
        console.log(currentMonth);
        console.log(month)
        if(month === currentMonth){
            console.log("CURRENT")
            const day = document.getElementById(`mini-date-${currentDay}`);
            day.setAttribute('class', " this booked p-1 flex items-end justify-center  bg-indigo-500 text-white rounded-full line-through self-end");
            day.removeAttribute('data-booked');
            day.setAttribute('data-booked', 'true');
        }else{
            console.log('NOT CURRENT')
        }
      
       
        
        
  
        addBooking(data);
        return
    })
    
})







