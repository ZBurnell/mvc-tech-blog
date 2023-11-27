const router = require('express').Router();
const { Post, User } = require('../../models');
const Auth = require('../../utils/auth');

router.get('/', (req, res) => {
    console.log('Searching for all post now');
    Post.findAll({
            attributes: ['id', 'title', 'content', 'created_at'],
            order: [['created_at', 'DESC']],
            include: [{
                    model: User,
                    attributes: ['username']
                }]
        })
        .then(dbPostData => res.json(dbPostData.reverse()))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'content', 'title', 'created_at'],
            include: [{
                    model: User,
                    attributes: ['username']
                }]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with that id' });
                return;}
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', Auth, (req, res) => {
    Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;