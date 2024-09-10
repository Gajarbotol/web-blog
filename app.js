const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'GAJARBOTOL',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const DOMAIN = 'https://your-app-name.onrender.com';

app.get('/login/telegram', (req, res) => {
    const telegramLoginUrl = `https://telegram.me/${TELEGRAM_BOT_TOKEN}?start`;
    res.redirect(telegramLoginUrl);
});

app.get('/auth/telegram/callback', (req, res) => {
    const { id, first_name, last_name, username, photo_url } = req.query;

    if (!id) {
        return res.status(400).send('User not found. This is a placeholder.');
    }

    req.session.user = { id, first_name, last_name, username, photo_url };
    res.redirect('/dashboard');
});

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/'); 
    }
    res.send(`<h1>Welcome, ${req.session.user.first_name}!</h1>
              <a href="/profile">View Profile</a>
              <a href="/more-info">More Info</a>
              <a href="/logout">Logout</a>`);
});

app.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/'); 
    }
    res.send(`
        <h1>User Profile</h1>
        <p>ID: ${req.session.user.id}</p>
        <p>Name: ${req.session.user.first_name} ${req.session.user.last_name}</p>
        <p>Username: ${req.session.user.username}</p>
        <a href="/dashboard">Back to Dashboard</a>
        <a href="/logout">Logout</a>
    `);
});

app.get('/more-info', (req, res) => {
    res.send(`
        <h1>More Information</h1>
        <p>This application demonstrates a simple Telegram login integration.</p>
        <p>Feel free to explore!</p>
        <a href="/">Back to Login</a>
    `);
});

app.get('/error', (req, res) => {
    res.send(`
        <h1>Error Page</h1>
        <p>An unexpected error occurred.</p>
        <a href="/">Back to Login</a>
    `);
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/dashboard');
        }
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/login', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login</title>
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <h1>Hacker Login Page</h1>
            <form action="/auth/login" method="POST">
                <input type="text" name="username" placeholder="Username" required>
                <input type="password" name="password" placeholder="Password" required>
                <button type="submit">Login</button>
            </form>
            <a href="/login/telegram">
                <button>Login with Telegram</button>
            </a>
        </body>
        </html>
    `);
});
