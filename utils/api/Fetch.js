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
    userResponseHandler(resp, res, view) {
        if (resp.user && !view) {
            return res.status(200).json(resp.message);
        } else if (resp.user && view) {
            if (view === 'home') path = '/';
            return res.redirect(path);
        } else if (!resp.user) {
            return res.status(400).json(resp.message);
        }
    }
}

module.exports = Fetch;