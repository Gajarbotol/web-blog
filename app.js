const express = require('express');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/files');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'GAJARBOTOL',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/auth', authRoutes);
app.use('/files', fileRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
    res.render('login');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
