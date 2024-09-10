const express = require('express');
const session = require('express-session');
const path = require('path');
const querystring = require('querystring');

const authRoutes = require('./routes/auth'); // Adjust based on your file structure
const fileRoutes = require('./routes/files');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');

const app = express();

// Set the port to the environment variable PORT or default to 3000
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'GAJARBOTOL',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Telegram Bot Token and Domain
const TELEGRAM_BOT_TOKEN = '6683124880:AAHES0Y-6FviR9oXLpkAHyIB6Pirq4nYQJg';
const DOMAIN = 'https://web-blog-wofi.onrender.com'; // Replace with your Render URL

// Telegram Login URL
app.get('/login/telegram', (req, res) => {
    const telegramLoginUrl = `https://telegram.me/${TELEGRAM_BOT_TOKEN}?start`;
    res.redirect(telegramLoginUrl);
});

// Callback URL to handle Telegram login
app.get('/auth/telegram/callback', (req, res) => {
    const { id, first_name, last_name, username, photo_url } = req.query;

    if (!id) {
        return res.status(400).send('User not found. This is a placeholder.');
    }

    // Here, you would typically check if the user exists in your database
    // and log them in or create a new user.

    // For demonstration, we'll just log the user info
    console.log('User authenticated:', { id, first_name, last_name, username, photo_url });
    
    // Save user info in session or database
    req.session.user = { id, first_name, last_name, username, photo_url };

    // Redirect to a protected route or home
    res.redirect('/dashboard'); // Update as necessary
});

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
});
