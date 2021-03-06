const moment = require('moment');
const Status = require('./stats');
const CalRender = require('./render-calendar');

module.exports = {

    format_msg_time: date => {
        if (process.env.DEV) {
            return `${new Date(date).toLocaleTimeString()}`;
        }
        else {
            let time = moment(date).format('hh:mm:ss');
            const corrected = time.split(':');
            let hour = (parseFloat(corrected[0]));
            let hh = hour -= 4;
            let correctHour = hh;
            let a = '';
            if (hh < 10) {
                correctHour = `0${hh}`
                a = 'AM'
            } else {
                a = 'PM'
            }
            return `${correctHour}:${corrected[1]}:${corrected[2]} ${a}`
        }
    },

    return_rating: (data) => {
        if (data === null) {
            return data = 0;
        } else {
            return data
        }
    },

    render_status_color: (data) => {
        return Status.color(data)
    },

    render_paws: (rating) => {
        if (rating === null) {
            return 0;
        }
        let data = []
        let image = `<img class="h-6 object-contain" src='/assets/images/pawprint.png'>`
        const num = rating;
        function stars(rating) {
            if (rating == Math.floor(num)) {
                let count = num
                while (count > 0) {
                    count -= 1;
                    data.push(image);
                }
            } else {
                const d = rating.toString();
                const f = d.split(".")[0];
                let count = f
                while (count > 0) {
                    count -= 1;
                    data.push(image);
                }
                if (count = 0) {
                    let last = `<img class="h-6 object-contain" src='/assets/images/half-paw.png'>`
                    data.push(last);
                    return
                }
            }
        }
        stars(num);
        return data.splice(',').join('');
    },
    add_one: (data) => {
        if (data === null) {
            return data = 0;
        } else {
            return data += 1;
        }
    },
    render_mini_1: data => {
        if (data === undefined) {
            return '';
        }
        const dates = data.map(el => {
            if (el === 0) {
                el = "";
            }
            return (`<td class="flex-row items-center justify-center py-3 px-2 md:px-3  hover:text-indigo-500 text-center cursor-pointer"> <a  id="mini-date-${el}" class='booked' data-booked='false'>${el}</a> </td>`)
        }).join(" ")
        return dates
    },
    display_date: () => {
        return moment(new Date()).format('dddd [the] Do [of] MMMM');
    },
    display_month: () => {
        return CalRender.currentMonthLong();
    },
    display_year: () => {
        return CalRender.currentYear();
    },
    render_week_days: () => {
        const days = [
            "S",
            "M",
            "T",
            "W",
            "Th",
            "F",
            "S"
        ]
        const weekDays = days.map(el => {
            return (`<th id="mini-col-${el}" class="py-3 px-2 md:px-3 "><p id=${el}>${el}</p> </th>`)
        }).join(" ")
        return weekDays
    },

    render_events: (data) => {
        // ADDs LIST OF EVENTS TO MONTH TITLE ON MINI CALENDAR
        if (data === undefined) {
            return ''
        }
        return data.map(el => {
            return el.day
        }).join(" ")
    },

    render_messages: (data) => {
        let data1 = [];
        if (data === undefined || data === 'undefined') {

        } else {
            data1.push(data)
        }
    },

    render_pet_name: (name) => {
        let length = name.length
        let last = name[length -= 1];
        if (last.toLowerCase() === 's') {
            return `${name}'`
        } else {
            return `${name}'s`
        }

    },

    render_date: (date) => {
        return moment(date).format('MM-DD-YYYY')
    }



}