const owner = function() {
    return{
        findOne: async function (id) {
            const data = await Owner.findOne({
                attributes: { exclude: ['password', 'email'] },
                where: {
                    id: id
                },
                include: [
                    {
                        model: Pet,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    },
                    {
                        model: Booking,
                        attributes: {
                            exclude: ['owner_id', 'createdAt', 'updatedAt']
                        },
                        include: {
                            model: Comment,
                            include: {
                                model: User,
                                attributes: {
                                    exclude: ['password', 'email']
                                },
                            },
                        },
                        include: {
                            model: User,
                            attributes: {
                                exclude: ['password', 'email']
                            },
                        },
                       
                    },
                ]
            }).then(res => {
                if(res){
                    const ownerData = res.get({plain:true})
                    return ownerData;
                }else{
                    throw new Error("user-fetches line 88")
                }
               
            }).catch(e => {
                return console.log("\x1b[31m%s\x1b[0m", 'Error Getting ownerData' + e);
            })
            // console.log('SINGLE PET DATA BUILD', data);
            return data
        },

    }
} 