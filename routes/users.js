const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersFilePath = path.join(__dirname, '../data/users.json');

router.get('/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.render('profile', { user });
});

router.post('/:id/follow', (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).send('User not found');

    if (!user.followers.includes(req.session.user.id)) {
        user.followers.push(req.session.user.id);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    }

    res.redirect(`/users/${user.id}`);
});

module.exports = router;
