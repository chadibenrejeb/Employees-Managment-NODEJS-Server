    require('dotenv').config();
    const express = require('express');
    const app = express();
    const path = require('path');
    const cors = require('cors');
    const { logger } = require('./middleware/logEvents');
    const errorHandler = require('./middleware/errorHandler');
    const verifyJWT = require('./middleware/verifyJWT');
    const credentials = require('./middleware/credentials');
    const mongoose = require('mongoose');
    const connectDB = require('./config/dbConn');
    const PORT = process.env.PORT || 3500; 
    const corsOptions = require('./config/corsOptions');
    const cookieParser = require('cookie-parser');


    // Connect to MONGODB 
    connectDB(); 


    // Logging (in Middleware):
    // Definition: The process of recording information about each HTTP request and response in a server application.
    // Purpose: To monitor the application’s behavior, debug issues, analyze traffic patterns, and maintain records for security auditing.
    // Example: Recording the method, URL, status code, headers, and response time of each request to the server.


    // custom middleware logger (log requests)
    app.use(logger);


    // Handle options credentials check - before CORS!
    // and fetch cookies credentials requirement
    app.use(credentials);


    // Cross Origin Resource Sharing
    app.use(cors(corsOptions));

    // built-in middleware to handle urlencoded data
    // in other words, form data:  
    // ‘content-type: application/x-www-form-urlencoded’
    app.use(express.urlencoded({ extended: false }));

    // built-in middleware for json 
    app.use(express.json());

    //middleware for cookies 
    app.use(cookieParser());

    // serve static files
    app.use('/' ,express.static(path.join(__dirname, '/public'))); // bech css y t appliqua al '/public lkol


    // routes
    app.use('/', require('./routes/root'));
    app.use('/register', require('./routes/register'));
    app.use('/auth', require('./routes/auth'));
    app.use('/refresh', require('./routes/refresh'));
    app.use('/logout', require('./routes/logout'));



    app.use(verifyJWT);
    app.use('/employees', require('./routes/api/employees'));

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
    mongoose.connection.once('open' , () => {
        console.log("connected to MONGO DB");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
