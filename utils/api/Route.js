
const url = process.env.DEV || process.env.PRO;

class Route {
    constructor(route) {
        if (route === 'login') {
            this.route = url + 'api/users/' + route;
        }
        if (route === 'logout') {
            this.route = url + 'api/users/' + route;
        }
        if(route === 'pets'){
            this.route = url + 'api/' + route;
        }

    }
    build() {
        return this.route;
    }
}

module.exports = Route;