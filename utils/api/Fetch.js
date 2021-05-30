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

    async fetchReq() {
        const url = this.build();
        const data = this.data;
        let action = url.split('/', 6)[5];
        if (action === undefined) {
            action = url.split('/', 5)[4];
        }
        // get routes
        if (data.toLowerCase() === 'get' && action === 'login'  || action === 'pets') {
            const response = await fetch(url, {
                method: data,
                headers: { 'Content-Type': 'application/json' }
            }).catch(e => {
                return console.log(`Error while fetching the ${action} api`, e);
            });
            const responseData = await response.json();
            return responseData
        }
        /*Post routes needs the req object, handle the fetch in request.handler */
        else if (data.toLowerCase() === 'post') {
            return
        }
    }

}

module.exports = Fetch;