const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filesFilePath = path.join(__dirname, '../data/files.json');
const upload = multer({ dest: 'public/uploads/' });

router.post('/upload', upload.single('file'), (req, res) => {
    if (req.session.user.role !== 'admin') {
        return res.status(403).send('Access denied');
    }

    const files = JSON.parse(fs.readFileSync(filesFilePath, 'utf8'));
    const newFile = {
        id: new Date().getTime().toString(), // simple unique ID generator
        user_id: req.session.user.id,
        filename: req.file.originalname,
        filepath: req.file.path,
        uploaded_at: new Date()
    };
    files.push(newFile);
    fs.writeFileSync(filesFilePath, JSON.stringify(files, null, 2));

    res.redirect('/files');
});

module.exports = router;
