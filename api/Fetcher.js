const API = require('./API.js');
const fetch = require('node-fetch');

class Fetch extends API {
    constructor(route, data) {
        super(route);
        this.data = data;
    }

    async fetchReq(method) {
        const url = this.build();
        const data = this.data;
        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).catch(e => {
            console.log('Error while fetching login api', e);
        });
        const responseData = await response.json();
        return responseData
    }
}

module.exports = Fetch;