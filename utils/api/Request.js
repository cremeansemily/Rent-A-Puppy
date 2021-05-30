const Fetch = require('./Fetch.js');

class Request extends Fetch {
    constructor(fetchReq, route, view) {
        super(fetchReq, route);
        this.view = view
    }

    async handler(req,res) {
        const fetch = await this.fetchReq();
        const view = this.view;
        if (view === 'home' ) {
            const data = {
                pet: fetch,
                loggedIn: req.session.loggedIn,
                user: req.session.username
            }
            res.render('home', data)
        }
    }
}

module.exports = Request;