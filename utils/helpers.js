const moment = require('moment');
const CalRender = require('./render-calendar');

module.exports = {
    return_rating: (data) => {
        if (data === null) {
            return data = 0;
        } else {

            return data
        }

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
            // MAKE A FUNCTION THAT CHECKS FOR REMINDERS AND ADD IN SPAN
            
            return (`<td class="py-3 px-2 md:px-3  hover:text-blue-500 text-center cursor-pointer"> <p id=mini-date-${el}></p>${el} </td>`)
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
            // INSTEAD OF RETURNING EMPTY TRY TO FETCH CALENDAR AGAIN
            return ''
        }
        return data.map(el => {
            return el.day
        }).join(" ")
    }
}