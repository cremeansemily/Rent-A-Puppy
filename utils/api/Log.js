const { Pet, User } = require('../../models');

class Log {

    // user login

    static inUser(req, res) {
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with that email address!' });
                return;
            }
            const validPassword = dbUserData.checkPassword(req.body.password);
            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
                res.status(201).json({ user: dbUserData, message: `Welcome back, ${dbUserData.username}!` });
            });
            return
        });
    }

    // logout
    static out(req,res){
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        }
        else {
            res.status(404).end();
        }
    }
}


module.exports = Log;