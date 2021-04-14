const express = require('express');
const cloudinary = require('cloudinary');
const fs = require('fs-extra');

const router = express.Router();

// Saves the image localy
router.post('/img', (req, res) => {
    return res.jsonp({ statusText: 'done' });
});

// Saves the image on cloudinary
router.post('/cloud', async (req, res) => {
    try {
        //await cloudinary.v2.uploader.destroy('input.PNG');

        const result = await cloudinary.v2.uploader.upload(req.file.path);
        console.log('Success')
        await fs.unlink(req.file.path);

        return res.json({ statusText: 'done', url: result.url });
    }
    catch (err) {
        return res.json({ err }).status(err.http_code);
    }
});

module.exports = router;