const CalRender = require('./render-calendar');
const {all,editBook} = require('./api/booking-fetches');



class Status {

    static async get(data) {
        const flowers = data;
        // if this is an object of bookings
        // We Want to update the database
        if (typeof data == "object") {
            try {
                const ud = await flowers.map(el => {
                    if (el === undefined) {
                        // an undefined was coming back
                        // even though no data was undefined
                        // if undefined
                        // DO NOTHING
                    } else {
                        const data = {
                            id: el.id,
                            date: el.date
                        }
                        return data
                    }
                });

                const dd = await ud.forEach(async element => {
                    const ll = element;
                    if (element === undefined) {
                        // DO NOTHING
                    } else {
                        // LOOP OVER DATA AND CHECK THE DATES
                        let id;
                        if (element) {
                            id = ll.id;
                        }
                        const scheduledDate = ll.date.split('-');
                        const currentDate = CalRender.currentDate().split("-");
                        let txt = "Scheduled";
                        if (scheduledDate[1] > currentDate[1]) {
                            txt = "Scheduled"
                        } else if (scheduledDate[1] < currentDate[1]) {
                            // if events are completed from previous months
                            // update that event in the data base to change the status
                            
                            if (id) {
                                try {
                                    await editBook(id, "Completed");
                                } catch (error) {
                                    return console.log(error)
                                }
                            }
                        } else if ((scheduledDate[1] == currentDate[1]) && (scheduledDate[2] == currentDate[2])) {
                            // if events are active
                           
                            if (id) {
                                try {
                                    await editBook(id, "Active");
                                } catch (error) {
                                    return console.log(error)
                                }
                            }
                        } else if (scheduledDate[1] == currentDate[1] && scheduledDate[2] < currentDate[2]) {
                            // checks for dates on current month
                           
                            if (id) {
                                try {
                                    await editBook(id, "Completed");
                                } catch (error) {
                                    return console.log(error)
                                }
                            }
                        } else {
                            // if(scheduledDate[1 == currentDate[1] && scheduledDate[2] < currentDate[2]])
                            // if scheduled, leave alone
                            txt = 'Scheduled';
                        }
                    }
                });
                return dd
            } catch (error) {
                return console.log(error)
            }
        } else {
            // IF NOT OBJECT THEN WE ARE WANTING TO 
            // Render TEXT BASED ON DATE
            // WHILE THE DB STORES THE STATUS
            // THIS ENSURES THERE ARE NO SCREW UPS,
            // THE TIMER UPDATES EVERY HOUR SO THERE COULD POTENTIALLY BE A GAP
            // AND THE STATUS WOULD NOT CHANGE IN THE DB ACCORDINGLY
            // THE DATE IS CONSTANT AND WILL NOT CHANGE
            Status.check(data)
        }
    }

    static async check(data) {
        const scheduledDate = data.split('-');
        const currentDate = CalRender.currentDate().split("-");
        let txt = "Scheduled";
        if (scheduledDate[1] > currentDate[1]) {
            txt = "Scheduled"
        } else if (scheduledDate[1] < currentDate[1]) {
            txt = "Completed"
        } else if ((scheduledDate[1] == currentDate[1]) && (scheduledDate[2] == currentDate[2])) {
            txt = "Active"
        } else if (scheduledDate[1] == currentDate[1] && scheduledDate[2] < currentDate[2]) {
            txt = "Completed"
        } else {
            // if(scheduledDate[1 == currentDate[1] && scheduledDate[2] < currentDate[2]])
            txt = 'Scheduled';
        }
    }

    static color(data) {
        let text = ''
        if (data == 'Scheduled') {
            text = 'yellow';
            return text;
        } if (data == 'Active') {
            text = 'green'
            return text
        } if (data == 'Completed') {
            text = 'red'
            return text
        }
    }

    // run the update once with no interval
    static async update() {
        const d = await all();
        Status.get(d);
    }

    static async runUpdate() {
        // RUNS EVERY HOUR AND UPDATES THE DATABASE WITH THE 
        // APPROPRIATE STATUS
        return setInterval(async () => {
            // blue
            console.log("\x1b[34m%s\x1b[0m",`TIMER: Updating Booking Status`)
            Status.update();
        }, 3600000);
    }


}

module.exports = Status;
