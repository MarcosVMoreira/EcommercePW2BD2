'user strict';
var sql = require('./db.js');

var User = function (user) {
    this.name = user.name;
    this.password = user.password;
    this.profile = user.profile;
    this.email = user.email;
    this.telNumber = user.telNumber;
    this.address = user.address;

};

User.createUser = function (newUser, result) {
    sql.query("INSERT INTO usuario SET ?", newUser, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

User.getUserById = function (userId, result) {
    sql.query("SELECT usu_nome FROM usuario WHERE usu_id = ? ", userId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);

        }
    });
};

User.getAllUsers = function (result) {
    sql.query("SELECT * FROM usuario", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};

User.updateById = function (id, user, result) {
    sql.query("UPDATE usuario SET usu_nome = ? WHERE id = ?", [user.name, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

User.remove = function (id, result) {
    sql.query("DELETE FROM usuario WHERE id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {

            result(null, res);
        }
    });
};

module.exports = Task;
