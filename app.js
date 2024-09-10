const express = require('express');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/files');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');

const app = express();

// Set the port to the environment variable PORT or default to 3000
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'GAJARBOTOL', // Your session secret
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Use routes
app.use('/auth', authRoutes);
app.use('/files', fileRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);

// Default route
app.get('/', (req, res) => {
    res.render('login');
});

// Start the server
app.listen(PORT, () => {
    // Remove the console log for localhost
    // console.log(`Server running on http://localhost:${PORT}`);
});
