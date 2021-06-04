const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const app = express();
const PORT = process.env.PORT || 3001;
const fileUpload = require('express-fileupload');
const Stats = require('./utils/stats');
//IMPORT SESSIONS
const session = require('express-session');
const Status = require('./utils/stats');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 300000,
        sameSite: 'Strict',
        secure: false
    },
    resave: false,
    saveUninitialized: true,
    rolling: false,
    store: new SequelizeStore({
        db: sequelize
    })
};

if (process.env.PORT) {
    app.set('trust proxy', 1)
    sess.cookie.secure = true
}

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.use(fileUpload());

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log("\x1b[34m%s\x1b[0m",`Now listening on ${PORT}\nhttp://localhost:${PORT}`));
});

// RUN UPDATE ONCE ON START
try {
    console.log("\x1b[32m%s\x1b[0m" ,`Sever Start, Updating Booking Status`);
    setTimeout(() => {
        Status.update();
    }, 3000);
    // green message
  
} catch (error) {
    throw "Error running update"
}finally{
// THEN RUN ON TIME OUT EVERY HOUR
// HAPPENS EVEN IF UPDATE FAILS FIRST TIME
Status.runUpdate();
}






