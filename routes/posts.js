const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const fetch = require('node-fetch');

// const api_url = 'numbers/&{month}/${day}/date';
router.get('/numbers', async(req, res) => {
    try {
        const api_url = '/numbers';
        const res = await fetch(api_url);
        const json = await res.json();
        console.log(json);
    } catch (err) {
        res.json({ message: err });
    }
});


router.get('/calculator', async(req, res) => {
    try {
        const api_url = '/calculator';
        const res = await fetch(api_url);
        const json = await res.json();
        console.log(json);
    } catch (err) {
        res.json({ message: err });
    }
});


router.get('/ChuckNorris', async(req, res) => {
    try {
        const api_url = '/ChuckNorris';
        const res = await fetch(api_url);
        const json = await res.json();
        console.log(json);
    } catch (err) {
        res.json({ message: err });
    }
});


//GET BACK ALL THE POSTS
router.get('/', async(req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

//SUBMITS A POST
router.get('/specific', (req, res) => {
    res.send('Specific post');
});


router.post('/', async(req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
});
//SPECIFIC POST
router.get('/:postId', async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

//Delete Post
router.delete('/:postId', async(req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId })
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });
    }
});
//Update a post
router.patch('/:postId', async(req, res) => {
    try {
        const updatedPost = await Post.updateOne({ _id: req.params.postId }, {
            $set: { title: req.body.title }
        });
        res.json(updatedPost);
    } catch (err) {
        res.json({ message: err });
    }
})

module.exports = router;