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
    responseHandler(resp, res, view) {

        if (view) {
            this.userResponse(resp, res, view);
        }
        else if (!resp.user) {
            return res.status(400).json(resp.message);
        }
    }

    userResponse(resp, res, view) {
        if (resp.user && !view) {
            return res.status(200).json(resp.message);
        } else if (resp.user && view) {
            let path = '';
            if (view === 'home') {
                path = '/';
                return res.redirect(path);
            } 
        }
    }
}

module.exports = Fetch;