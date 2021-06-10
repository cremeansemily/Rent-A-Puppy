const router = require('express').Router();
const { Pet, Owner, User, Booking, Comment } = require('../../models');

// GET ALL Bookings
router.get('/', (req, res) => {
    console.log(`++++++++++++++++++++`);

    Booking.findAll(
        { attributes: { exclude: ['createdAt', 'updatedAt'] } },
    )
        .then(dbBookingData => res.json(dbBookingData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// FIND ONE Booking
router.get('/:id', (req, res) => {
    console.log(`++++++++++++++++++++`)
    Booking.findOne({
        attributes: { exclude: ['createdAt', 'updatedAt', 'owner_id', 'pet_id', 'user_id'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Owner,
                attributes: {
                    exclude: ['password', 'email']
                },
               
            },
            {
                model: User,
                attributes: {
                    exclude: ['password', 'email']
                },
            
            },
            {
                model: Pet,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Comment,
                attributes: {
                    exclude: []
                }
            },

        ]
    })
        .then(dbBookingData => {
            if (!dbBookingData) {
                res.status(404).json({ message: 'No bookings found with this id' });
                return;
            }
            res.json(dbBookingData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// CREATE A NEW Booking
router.post('/', (req, res,) => {
    console.log(`++++++++++++++++++++`)
    Booking.create({
        pet_id: req.body.pet_id,
        user_id: req.body.user_id,
        owner_id: req.body.owner_id,
        date: req.body.date,
    })
        .then(dbBookingData => {
            res.status(201).json({ dbBookingData })
        })
        .catch(err => {
            console.log(err);
            return
        });
});

// UPDATE Booking INFO
router.put('/:id', (req, res) => {
    console.log(`++++++++++++++++++++`)
    Booking.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbBookingData => {
            if (!dbBookingData || dbBookingData[0] === 0) {
                res.status(404).json({ message: 'No bookings found with this id' });
                return;
            }
            res.json(dbBookingData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE A Booking
router.delete('/:id', (req, res) => {
    console.log(`++++++++++++++++++++`)
    Booking.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbBookingData => {
            if (!dbBookingData) {
                res.status(404).json({ message: 'No bookings found with this id' });
                return;
            }
            res.json(dbBookingData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router