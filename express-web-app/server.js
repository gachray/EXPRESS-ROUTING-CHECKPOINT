// server.js
const express = require('express');
const app = express();
const port = 3000;

// Custom middleware to check working hours
function checkWorkingHours(req, res, next) {
    const currentHour = new Date().getHours();
    const currentDay = new Date().getDay(); // 0 (Sunday) to 6 (Saturday)

    // Check if it's a working day and time
    if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
        next();
    } else {
        res.send('The application is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
    }
}

app.use(checkWorkingHours);

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files (CSS)
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/services', (req, res) => {
    res.render('services', { title: 'Our Services' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
