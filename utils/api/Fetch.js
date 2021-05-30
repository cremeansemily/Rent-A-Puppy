const Route = require('./Route.js');
const fetch = require('node-fetch');

class Fetch extends Route {
    constructor(route, data) {
        super(route);
        this.data = data;
    }

    async fetchReq(method) {
        const url = this.build();
        const data = this.data;
        if (data === undefined || data === 'undefined') {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' }
            }).catch(e => {
                console.log('Error while fetching login api', e);
                return e
            });
            const responseData = await response.json();
            return responseData
        } else {
            const response = await fetch(url, {
                method: method,
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            }).catch(e => {
                console.log('Error while fetching login api', e);
                return e
            });
            const responseData = await response.json();
            return responseData
        }

    }
    
}

module.exports = Fetch;