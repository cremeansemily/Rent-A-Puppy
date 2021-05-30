const Route = require('./Route.js');
const fetch = require('node-fetch');

class Fetch extends Route {
    constructor(route, data, method) {
        super(route);
        this.data = data;
    }
    
    getMethod(){
        return this.data
    }

    async fetchReq() {
        const url = this.build();
        const data = this.data;
        if (data.toLowerCase() === 'get') {
            const response = await fetch(url, {
                method: data,
                headers: { 'Content-Type': 'application/json' }
            }).catch(e => {
                console.log('Error while fetching login api', e);
                return e
            });
            const responseData = await response.json();
            return responseData
        } else if (data.toLowerCase() === 'post') {
            return
        }
        // else {
        //     const response = await fetch(url, {
        //         method: data,
        //         body: JSON.stringify(data),
        //         headers: { 'Content-Type': 'application/json' }
        //     }).catch(e => {
        //         console.log('Error while fetching login api', e);
        //         return e
        //     });
        //     const responseData = await response.json();
        //     return responseData
        // }

    }

}

module.exports = Fetch;