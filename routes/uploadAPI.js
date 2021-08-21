const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Multer storage options
const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload')
    },
    filename: (req, file, cb) => {
        const newFileName = Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    }
});
const fileFilterFunction = (req, file, cb) =>{
const fileExtension = path.extname(file.originalname);
const allowedExtension = ['.jpg','.png','.gif','.jpeg'];
cb(null, allowedExtension.includes(fileExtension));
}
const maxSize = 1*1024*1024;
const upload = multer({ storage: myStorage, fileFilter: fileFilterFunction, limits: {fileSize: maxSize}});
router.post('/upload', upload.single('file'), async (req, res) => {
    if ((req.file) !== undefined) {
        res.send({ message: 'file uploaded ' })
    } else {
        res.status(400).json({ message: 'File not uploaded' });
    }
});
module.exports = router;