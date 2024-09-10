const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersFilePath = path.join(__dirname, '../data/users.json');

// Placeholder login mechanism
router.get('/login', (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    const user = users.find(u => u.telegram_id === '123');
    if (user) {
        req.session.user = user;
        return res.redirect('/users/' + user.id);
    }
    res.send('User not found. This is a placeholder. Implement Telegram login.');
});

module.exports = router;
