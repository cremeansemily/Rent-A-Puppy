const { Pet, Owner, Booking, Review } = require('../../models');


class FetchData {

    // Grabs a single pet
    static async petById(id) {

        const data = await Pet.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt', 'owner_id'] },
            where: {
                id: id
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
        }).then(res => {
            const petData = res
            return petData;
        }).catch(e => {
            return console.log('ERROR GETTING SINGLE PET DATA', e);
        })
        console.log('SINGLE PET DATA BUILD', data)
    }

    // Grabs All Pets
    static async allPets(){
        const data = await Pet.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt', 'owner_id'] },
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
        }).then(res => {
            const petData = res.map(el => el.get({ plain: true }));;
            return petData;
        }).catch(e => {
            return console.log('ERROR GETTING PET DATA', e);
        })
        // console.log('PET DATA BUILD', data);
        return data
    }

}



module.exports = FetchData;


