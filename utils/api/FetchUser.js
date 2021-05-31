const { Pet, Owner, Booking, Review, Comment, User } = require('../../models');
// grabs single user
class FetchUser {

    static async all() {
        const user = await User.findAll(
            { attributes: { exclude: ['password'] } }
        ).catch(e=>e);
        return user;
    }

    static async byId(req) {
        const user = await User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Booking,
                },

            ]
        }).catch(e=>e)
        return user;
            // .then(dbUserData => {
            //     if (!dbUserData) {
            //         // res.status(404).json({ message: 'No user found with this id' });
            //         const msg = { message: 'No user found with this id' }
            //         return msg
            //     }
            //     // res.json(dbUserData);
            //     return dbUserData;
            // })
            // .catch(err => {
            //     console.log(err);
            //     // res.status(500).json(err);
            //     return err
            // });
    }

    // create user
    static async createNew(req, res) {
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
            .then(dbUserData => {
                req.session.save(() => {
                    req.session.user_id = dbUserData.id;
                    req.session.username = dbUserData.username;
                    req.session.loggedIn = true;
                    res.status(201).json({ user: dbUserData });
                    return
                })
            })
            .catch(err => {
                const errMsg = ((err.errors[0].message).split('.')[1]).toUpperCase()
                return res.status(409).json(errMsg)
            });
    }
    // user update
    static async update(req, res) {
        await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
            .then(dbUserData => {
                if (!dbUserData || dbUserData[0] === 0) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
    // user delete
    static async delete(req, res) {
        await User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }

}

module.exports = FetchUser;