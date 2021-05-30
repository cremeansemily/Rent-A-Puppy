const router = require('express').Router();
// const Request = require('../utils/api/Request');
const { Pet, Owner, Booking, Review } = require('../models');

// pet dashboard
router.get('/:id', async (req, res) => {
    // const r = `pet/${req.params.id}`
    // try {
    //     const fetch = new Request(r, 'GET', 'pet-views/dashboard');
    //     await fetch.handler(req, res);
    //     // return res.render('pet-views/dashboard')
    // } catch (error) {
    //     console.log("pet dashboard\n", error)
    // }

    Pet.findOne({
        attributes: { exclude: ['createdAt', 'updatedAt', 'owner_id'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Owner,
                attributes: {
                    exclude: ['password', 'email']
                }
            },
            {
                model: Booking,
                attributes: {
                    exclude: ['owner_id', 'pet_id', 'createdAt', 'updatedAt']
                },
                exclude: {
                    status: "Completed"
                }
            },
            {
                model: Review,
                attributes: {
                    exclude: ['pet_id']
                },
            },
        ]
    })
        .then(dbPetData => {
            if (!dbPetData) {
                res.status(404).json({ message: 'No pets found with this id' });
                return;
            }
            const data = {
                pet: dbPetData.get({plain:true}),
                loggedIn: req.session.loggedIn,
                user: req.session.username
            }
            res.render('pet-views/dashboard', data)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        }); 
   
});


module.exports = router;