const { Pet, Owner, Booking, Review } = require('../../models');
const sequelize = require('../../config/connection');



async function petById(id) {
    sequelize
        .sync()
        .then(async () => {
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
            }).then(res=>{
                return res
            })
                console.log(data)
                
        })

}

module.exports = petById;


