const Route = require('./Route');
const fetch = require('node-fetch');

class Fetch extends Route {
    constructor(route, data, method) {
        super(route);
        this.data = data;
    }

    getMethod() {
        return this.data
    }
    getBuild() {
        const d = this.build();
        return d;
    }

    // determines method
    async fetchReq() {
        const url = this.build();
        const data = this.data;
        // console.log(url, "IN FETCH LINE 21")
        let action = url.split('/', 6)[5];
        if (action === undefined) {
            action = url.split('/', 5)[4];
        }
        // console.log(data, 'LINE 26, FETCH')
        console.log(action, "IN FETCH LINE 28")
        // get routes
        if (data.toLowerCase() === 'get' && action === 'login'  || action === 'pets' || parseFloat(action) != NaN) {
            const response = await fetch(url, {
                method: data,
                headers: { 'Content-Type': 'application/json' }
            }).catch(e => {
                return console.log(`Error while fetching the ${action} api`, e);
            });
            const responseData = await response.json();
            // console.log(responseData, "DATA FROM FETCH.js")
            return responseData
        }
        /*Post routes needs the req object, handle the fetch in request.handler */
        else if (data.toLowerCase() === 'post') {
            return
        }
    }

}

module.exports = Fetch;