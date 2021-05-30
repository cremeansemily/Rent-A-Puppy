const Route = require('./Route');
const fetch = require('node-fetch');

class Fetch extends Route {
    constructor(route, method) {
        super(route);
        this.method = method;
    }

    getMethod() {
        return this.method
    }
    getRoute() {
        const d = this.build();
        return d;
    }

    // determines method
    // need to refactor to remove the fetch, I see the downside to the requests, server is slow.
    async fetchReq() {
        const url = this.build();
        const data = this.data;
        console.log(url, "IN FETCH LINE 21")
        let action = url.split('/', 6)[5];
        if (action === undefined) {
            action = url.split('/', 5)[4];
        }
        // PET DASHBOARD
        if(parseFloat(action) != NaN){
            let ad = url.split('/')[4];
            const id = action;
            if(ad === 'pet'){
              console.log(data)
              return id
            }
        }
        // HOME ROUTE
        if(action === 'pets'){
            return
        }
        // console.log(data, 'LINE 26, FETCH')
        console.log(action,  "IN FETCH LINE 28")
        // get routes for all pet info
        // if (data.toLowerCase() === 'get' && action === 'pets') {
        //     // check for individual pet route
        //         console.log('EXPECTING TO BE NEEDING ALL PET INFO')
        //     // should handle all the responses for 
        //     // const response = await fetch(url, {
        //     //     method: data,
        //     //     headers: { 'Content-Type': 'application/json' }
        //     // }).catch(e => {
        //     //     return console.log(`Error while fetching the ${action} api`, e);
        //     // });
        //     // const responseData = await response.json();
        //     // // console.log(responseData, "DATA FROM FETCH.js")
        //     // return responseData
        // }
        // /*Post routes needs the req object, handle the fetch in request.handler */
        // else if (data.toLowerCase() === 'post') {
        //     return
        // }
        // else{
        //     console.log(url,data)
        // }
    }

}

module.exports = Fetch;