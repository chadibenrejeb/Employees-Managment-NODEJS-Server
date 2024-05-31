const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;



// Logging (in Middleware):
// Definition: The process of recording information about each HTTP request and response in a server application.
// Purpose: To monitor the application’s behavior, debug issues, analyze traffic patterns, and maintain records for security auditing.
// Example: Recording the method, URL, status code, headers, and response time of each request to the server.


// custom middleware logger (log requests)
app.use(logger);

// Cross Origin Resource Sharing
const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:  
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// serve static files
app.use('/' ,express.static(path.join(__dirname, '/public')));
app.use('/subdir' , express.static(path.join(__dirname, '/public')));


// routes
app.use('/' , require('./routes/root'));
app.use('/subdir' , require('./routes/subdir'));
app.use('/employees' , require('./routes/api/employees'));



app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));