


// get current day 
const day = moment(new Date()).format('D');
const currentDayEl = document.getElementById(`mini-date-${day}`);
const path = window.location.pathname;
const month = document.querySelector('.mini-month').innerText;

// set background color for current day
currentDayEl.setAttribute('class', " booked py-3 px-2 md:px-3 underline text-indigo-500 font-bold text-lg hover:text-indigo-500 text-center cursor-pointer");

 function addBooking(data) {
    // console.log(d)
    const days = document.querySelectorAll('.booked');

    days.forEach(el => {
        const booked = el.getAttribute('data-booked')


        el.addEventListener('click', (event) => {
            let target = event.target
            const date = target.innerText;
            
            if (booked === 'true') {
                console.log('SKIPPING');
                denyBooking(date)
               
            } else if (parseFloat(date)<parseFloat(day)){
                
            }else {
            
                confirmBooking(date);
            }

        });

    })
}






function confirmBooking(dateData) {
    const modal = document.getElementById('modal')
    const hTML = `<div id='modalModal' class="min-w-screen h-screen overflow-x-hidden overflow-y-auto fixed  my-auto inset-0 z-50 outline-none focus:outline-none  items-center flex justify-center" id="modal-id">
    <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
      <!--content-->
      <div class="">
        <!--body-->
        <div class="text-center p-5 flex-auto justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 flex items-center text-green-500 mx-auto" viewBox="0 0 305.002 305.002" fill="currentColor">
                <path d="M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5
                S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5
                c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z"/>
            <path d="M218.473,93.97l-90.546,90.547l-41.398-41.398c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678
                l50.237,50.237c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l99.385-99.385
                c4.881-4.882,4.881-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z"/>
</svg>
                        <h2 class="text-xl font-bold py-4 ">Please confirm your booking for ${month}, ${dateData}</h3>
                        <p class="text-sm text-gray-500 px-8">
                This process cannot be undone, with out confirming with the owner</p>    
        </div>
        <!--footer-->
        <div class="p-3  mt-2 text-center space-x-4 md:block">
            <button id="modal-close" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                Cancel
            </button>
            <button id="submit-booking" class="mb-2 md:mb-0 bg-green-500 border border-green-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600">Book</button>
        </div>
      </div>
    </div>
  </div>`
    modal.innerHTML = hTML;

    document.getElementById('modal-close').addEventListener('click', () => { document.getElementById('modalModal').remove() })
    document.getElementById('submit-booking').addEventListener('click', async () => {
        const source = document.getElementById('imagePreview');
        const pet_id = source.getAttribute('data-petId');
        const owner_id = source.getAttribute('data-ownerId');
        const user_id = source.getAttribute('data-userId');
        const month = moment(new Date()).format('MM');
        const day = dateData;
        const year = moment(new Date()).format('YYYY');
        console.log(month, day, year);
        const date = `${month}/${day}/${year}`
        const host = window.location.hostname;
        const path = window.location.pathname;
        let url = 'https://pimp-my-puppy.herokuapp.com/api/' + 'bookings';
        if (host == 'localhost') {
            url = 'http://localhost:3001/api/' + 'bookings';
        }
        const response = await fetch(url, {
            method: 'post',
            body: JSON.stringify({
                pet_id,
                user_id,
                owner_id,
                date
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                alert(response.statusText); document.getElementById('modalModal').remove()
                return window.location.reload(path)
            })
            .catch(e => console.log(e, "Error Placing Booking"));

        console.log(response)
        
    })
}

function denyBooking(date) {
    const modal = document.getElementById('modal')
    const hTML = `<div id='modalModal' class="min-w-screen h-screen overflow-x-hidden overflow-y-auto fixed  my-auto inset-0 z-50 outline-none focus:outline-none  items-center flex justify-center" id="modal-id">
    <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
      <!--content-->
      <div class="">
        <!--body-->
        <div class="text-center p-5 flex-auto justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 flex items-center text-red-500 mx-auto" viewBox="0 0 512 512" fill="currentColor">
                <path d="M501.609,384.603L320.543,51.265c-13.666-23.006-37.802-36.746-64.562-36.746c-26.76,0-50.896,13.74-64.562,36.746
                c-0.103,0.176-0.19,0.352-0.293,0.528L10.662,384.076c-13.959,23.491-14.223,51.702-0.719,75.457
                c13.535,23.769,37.919,37.948,65.266,37.948h360.544c27.347,0,52.733-14.179,66.267-37.948
                C515.524,435.779,515.261,407.566,501.609,384.603z M225.951,167.148c0-16.586,13.445-30.03,30.03-30.03
                c16.586,0,30.03,13.445,30.03,30.03v120.121c0,16.584-13.445,30.03-30.03,30.03s-30.03-13.447-30.03-30.03V167.148z
                 M255.981,437.421c-24.839,0-45.046-20.206-45.046-45.046c0-24.839,20.206-45.045,45.046-45.045
                c24.839,0,45.045,20.206,45.045,45.045C301.027,417.214,280.821,437.421,255.981,437.421z"/>
</svg>
                        <h2 class="text-xl font-bold py-4 ">${month}, ${date} Is already booked!</h3>
                        <h2 class="text-lg font-bold text-indigo-700 px-8">
                Please select another date!</h2>    
        </div>
        <!--footer-->
        <div class="p-3  mt-2 text-center space-x-4 md:block">
            <button id="modal-close" class="mb-2 md:mb-0 bg-red-600 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-white rounded-full hover:shadow-lg hover:text-lg  hover:text-red-700 hover:font-bold hover:bg-gray-100">
                Ok
            </button>
            
        </div>
      </div>
    </div>
  </div>`
    modal.innerHTML = hTML;

    document.getElementById('modal-close').addEventListener('click', () => { document.getElementById('modalModal').remove() })
}

