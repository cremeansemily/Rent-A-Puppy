
// get current day 
const day = moment(new Date()).format('D');
const currentDayEl = document.getElementById(`mini-date-${day}`);
const path = window.location.pathname;
const month = document.querySelector('.mini-month').innerText;

// set background color for current day
currentDayEl.setAttribute('class', "py-3 px-2 md:px-3 underline text-red-500 hover:text-indigo-500 text-center cursor-pointer");

function addBooking() {
    const days = document.querySelectorAll('.booked');

    // days.forEach(el=>{
    //     console.log(el.getAttribute('data-booked'))
    // })
    for (let i = 0; i < days.length; i++) {
        const el = days[i];
        el.addEventListener('click', (event) => {
            const date = event.target.innerText;
            confirmBooking(date);
        });
        

    }
}
setTimeout(function name() {

    addBooking();
}, 1000)





function confirmBooking(date) {
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
                        <h2 class="text-xl font-bold py-4 ">Please confirm your booking for ${month}, ${date}</h3>
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

    document.getElementById('modal-close').addEventListener('click',()=>{document.getElementById('modalModal').remove()})
    document.getElementById('submit-booking').addEventListener('click',()=>{alert('YOU BOOKED THIS PET!'); document.getElementById('modalModal').remove()})
}

