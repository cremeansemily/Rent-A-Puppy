

 function packageAll(data){
    let allMessages = [];
    // push all messages to one array
    // TEMP ARRAY
    let msgHolder = [];
    // push user messages 
    let user = data.userData;
    user.map(el => msgHolder.push(el));
    // grab comments from owner data
    data.ownerData.map(el => {
        const data = el.comments
        msgHolder.push(data)
    });
    // I STUPIDLY DID THIS WRONG, should have grabbed comments by booking ID BUT WHATEVER
    for (let i = 0; i < msgHolder.length; i++) {
        const element = msgHolder[i];
        // if object
        if (element.length == undefined) {
            allMessages.push(element)
        } else {
            // if array of objects
            // push individual object and not array containing them
            const len = element.length;
            for (let j = 0; j < len; j++) {
                const elem = element[j];
                allMessages.push(elem)
            }
        }
    }

    return allMessages;
}

function render_messages (data, args) {
    console.log(args)
    console.log(data)
    // WHEN RENDERING LOOP BACKWARDS. LOWER THE IDs OLDER THE MESSAGE IS
}
module.exports = {packageAll, render_messages}; 