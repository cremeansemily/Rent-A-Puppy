
// use env variables to switch out url
// instead of repeating code already written 
//  trying node fetch to hit routes already created
if (process.env.DEV) url = process.env.DEV;
if (process.env.PRO) url = process.env.PRO;

class API {
    constructor(route) {
        if (route === 'login') {
            this.route = url + 'api/users/' + route;
        }

    }
    build() {
        return this.route;
    }
}

module.exports = API;