
async function getNewMessages(bookingID) {
    const response = await fetch(`/api/bookings/` + bookingID, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response)
        .catch(e => console.log(e, "Error logging in"));
    return response

}
