const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
port = 3000;

const cors = require('cors')

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

const mysql = require('mysql');

const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'liquorstore'
});

mc.connect();
app.listen(port);
console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors(corsOptions));

var routes = require('./app/routes/appRoutes'); //importing route
routes(app); //register the route