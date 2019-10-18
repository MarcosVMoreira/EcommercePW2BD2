
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app'
});

connection.connect(function (err) {
    if (err) throw err;

    app.listen(3000, function () {
        console.log("Server running on port 3000")
    })
});

app.use(bodyParser.urlencoded({ extended: true }))

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/insertUser', (req, res) => {
    var sql = "INSERT INTO user (name, username, email) VALUES ('" + req.body.nome + "', '" + req.body.sobrenome + "', '" + req.body.email + "')";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.render("./index.ejs");
    });
})

app.post('/insertPost', (req, res) => {
    var sql = "INSERT INTO post (title, body, data, user_id) VALUES ('" + req.body.titulo + "', '" + req.body.body + "', '" + req.body.data + "', '" + req.body.id + "')";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.render("./index.ejs");
    });
})

app.post('/insertComment', (req, res) => {
    var sql = "INSERT INTO comment (title, body, email, post_id) VALUES ('" + req.body.titulo + "', '" + req.body.body + "', '" + req.body.email + "', '" + req.body.id + "')";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.render("./index.ejs");
    });
})


app.get('/getPost', (req, res) => {
    var sql = "SELECT * FROM post";
    connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render("./result.ejs", { dados: result });
    });
})

app.post('/updatePost', (req, res) => {
    var sql = "UPDATE post SET title = '"+req.body.tituloAtt+"', body = '"+req.body.bodyAtt+"', data = '"+req.body.dataAtt+"' WHERE id = '"+req.body.idAtt+"'";
    console.log("sql: "+sql)
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record updated");
        res.render("./index.ejs");
    });
})

app.post('/updateComment', (req, res) => {
    var sql = "UPDATE comment SET title = '"+req.body.tituloAtt+"', body = '"+req.body.bodyAtt+"', email = '"+req.body.emailAtt+"' WHERE id = '"+req.body.idAtt+"'";
    console.log("sql: "+sql)
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record updated");
        res.render("./index.ejs");
    });
})


app.post('/deleteComment', (req, res) => {
    var sql = "DELETE FROM comment WHERE id = '"+req.body.idDelete+"'";
    console.log("sql: "+sql)
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record deleted");
        res.render("./index.ejs");
    });
})

app.post('/deletePost', (req, res) => {
    var sql = "DELETE FROM post WHERE id = '"+req.body.idDeletePost+"'";
    console.log("sql: "+sql)
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record deleted");
        res.render("./index.ejs");
    });
})
