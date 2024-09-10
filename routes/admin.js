const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersFilePath = path.join(__dirname, '../data/users.json');

// Admin dashboard
router.get('/dashboard', (req, res) => {
    if (req.session.user.role !== 'admin') {
        return res.status(403).send('Access denied');
    }
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    res.render('admin', { users });
});

// Update chat ID
router.post('/update-chat-id', (req, res) => {
    if (req.session.user.role !== 'admin') {
        return res.status(403).send('Access denied');
    }
    const { userId, chatId } = req.body;
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    const user = users.find(u => u.id === userId);
    if (user) {
        user.chat_id = chatId;
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    }
    res.redirect('/admin/dashboard');
});

module.exports = router;
