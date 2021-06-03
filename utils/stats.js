const CalRender = require('./render-calendar');
const FetchData = require('./api/fetches');
const { updateBooking } = require('./api/fetches');



class Status {

    static async get(data) {
        const flowers = data;
        // if this is an object of bookings
        if (typeof data == "object") {
            try {
                const ud = await flowers.map(el => {
                    if (el === undefined) {

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
                        console.log('HERE')
                    } else {
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
                            console.log("Completed, Updating status")
                            if (id) {
                                try {
                                    await updateBooking(id, "Completed");
                                } catch (error) {
                                    return console.log(error)
                                }
                            }
                        } else if ((scheduledDate[1] == currentDate[1]) && (scheduledDate[2] == currentDate[2])) {
                            // if events are active
                            console.log("Active, Updating status")
                            if (id) {
                                try {
                                    await updateBooking(id, "Active");
                                } catch (error) {
                                    return console.log(error)
                                }
                            }
                        } else if (scheduledDate[1] == currentDate[1] && scheduledDate[2] < currentDate[2]) {
                            // checks for dates on current month
                            console.log("Completed, Updating status")
                            if (id) {
                                try {
                                    await updateBooking(id, "Completed");
                                } catch (error) {
                                    return console.log(error)
                                }
                            }
                        } else {
                            // if(scheduledDate[1 == currentDate[1] && scheduledDate[2] < currentDate[2]])
                            // if scheduled, leave alone
                            console.log("Scheduled")
                            txt = 'Scheduled';
                        }
                    }

                });
                return dd
            } catch (error) {
                return console.log(error)
            }





        } else {
            Status.check(data)
        }
    }

    static async check(data) {
        const scheduledDate = data.split('-');
        const currentDate = CalRender.currentDate().split("-");
        let txt = "Scheduled";
        if (scheduledDate[1] > currentDate[1]) {
            console.log("Scheduled")
            txt = "Scheduled"

        } else if (scheduledDate[1] < currentDate[1]) {
            console.log("Completed")
            txt = "Completed"

        } else if ((scheduledDate[1] == currentDate[1]) && (scheduledDate[2] == currentDate[2])) {
            console.log("Active")
            txt = "Active"

        } else if (scheduledDate[1] == currentDate[1] && scheduledDate[2] < currentDate[2]) {
            console.log("Completed")
            txt = "Completed"

        } else {
            // if(scheduledDate[1 == currentDate[1] && scheduledDate[2] < currentDate[2]])
            console.log("Scheduled")
            txt = 'Scheduled';
        }
    }
    static color(data) {
        // console.log(typeof data)

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

    static async update() {
        // RUNS EVERY HOUR AND UPDATES THE DATABASE WITH THE 
        // APPROPRIATE STATUS
        setTimeout(() => {
            const d = await FetchData.bookings();

            // console.log(d)
            const runUpdate = await Status.get(d);
            return runUpdate;
        }, 3600000);

    }


}

module.exports = Status;
