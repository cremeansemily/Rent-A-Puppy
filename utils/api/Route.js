
  // try {
    //     // custom function 
    //     // takes 3 arguments, 
    //     // 1.) the api route name
    //     // 2.) the request type, GET, POST, PUT, DELETE
    //     // 3.) Optional, View to be rendered
    //     // THE .handler(req,res) MUST ACCOMPANY a Request
    //     // passes in the req if any and gives access to the res

    //     const fetch = new Request('pets', 'GET', 'home');
    //     await fetch.handler(req, res);
    // } catch (error) {
    //     return console.log("HomeRoute\n", error)
    // }
const url = process.env.DEV || process.env.PRO;

class Route {
    constructor(route) {
        const petPattern = /pet\/[0-9]/g
        if (route === 'login') {
            this.route = url + 'api/users/' + route;
        }
        if (route === 'logout') {
            this.route = url + 'api/users/' + route;
        }
        if(route === 'pets'){
            this.route = url + 'api/' + route;
        }
        if(route === 'pets'){
            this.route = url + 'api/' + route;
        }
        if(route.match(petPattern)){
            this.route = url + 'api/' + route;
        }

    }
    build() {
        return this.route;
    }
}

module.exports = Route;