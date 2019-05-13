const express = require('express');
const router = express.Router();
const comparePlaylists = require('./iTunesComparer');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next()
});

// define the home page route
router.get('/', async (req, res) => {
    const result = await comparePlaylists(req.body.libraryPath, req.body.sourcePlaylist, req.body.targetPlaylist);
    res.send(result);
});

module.exports = router;
