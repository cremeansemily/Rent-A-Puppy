const router = require('express').Router();
const { Comment } = require('../../models');

// GET ALL Comments
router.get('/', (req, res) => {
    console.log(`++++++++++++++++++++`);

    Comment.findAll(
        { attributes: { exclude: ['createdAt', 'updatedAt'] } },
    )
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// FIND ONE Comment
router.get('/:id', (req, res) => {
    console.log(`++++++++++++++++++++`)
    Comment.findOne({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: {
            id: req.params.id
        },
        include: [
            
        ]
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comments found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// CREATE A NEW Comment

router.post('/', (req, res,) => {
    console.log(`++++++++++++++++++++`)
    Comment.create({
        owner_id: req.session.owner_id||req.body.owner_id,
        user_id: req.session.user_id,
        booking_id: req.body.booking_id,
        comment_body: req.body.comment_body,
    })
        .then(dbCommentData => {
            res.status(201).json({ dbCommentData })
        })
        .catch(err => {
            console.log(err);
            return
        });
});

// UPDATE Comment 
router.put('/:id', (req, res) => {
    console.log(`++++++++++++++++++++`)
    Comment.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentsData => {
            if (!dbCommentsData || dbCommentsData[0] === 0) {
                res.status(404).json({ message: 'No comments found with this id' });
                return;
            }
            res.json(dbCommentsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE A Comment
router.delete('/:id', (req, res) => {
    console.log(`++++++++++++++++++++`)
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comments found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router