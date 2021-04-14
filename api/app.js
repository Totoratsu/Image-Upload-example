const express = require('express');
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
const fs = require('fs-extra');

const app = express();
const router = express.Router();

const {
    PORT = 3000,
    NODE_ENV = 'dev'
} = process.env;

if(NODE_ENV==='dev')
    dotenv.config();

// Multer Config
const uploadIMG = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, './uploads'),
        filename: (req, file, cd) => {
            cd(null, file.originalname);
        }
    }),
    dest: path.join(__dirname, './uploads'),
});

app.use(uploadIMG.single('file'));
cloudinary.v2.config({
    cloud_name: process.env.IMG_CLOUD_NAME,
    api_key: process.env.IMG_API_KEY,
    api_secret: process.env.IMG_API_SECRET
});

// Routes
router.post('/img', async (req, res) => {
    try {
        //await cloudinary.v2.uploader.destroy('input.PNG');

        const result = await cloudinary.v2.uploader.upload(req.file.path);

        await fs.unlink(req.file.path);

        return res.json({ statusText: 'done', url: result.url });
    }
    catch (err) {
        return res.json({ err }).status(err.http_code);
    }
});

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});