
const url = process.env.DEV || process.env.PRO;

class Route {
    constructor(route) {
        if (route === 'login') {
            this.route = url + 'api/users/' + route;
        }

    }
    build() {
        return this.route;
    }
}

module.exports = Route;