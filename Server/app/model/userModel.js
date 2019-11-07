'user strict';
var sql = require('./db.js');

var User = function (user) {
    this.usu_id = user.usu_id;
    this.usu_nome = user.usu_nome;
    this.usu_senha = user.usu_senha;
    this.usu_perfil = user.usu_perfil;
    this.usu_email = user.usu_email;
    this.usu_telefone = user.usu_telefone;
    this.usu_endereco = user.usu_endereco;

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

User.getUserById = function (usu_id, result) {

    sql.query("SELECT usu_nome FROM usuario WHERE usu_id = ? ", usu_id, function (err, res) {
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
            console.log('user : ', res);

            result(null, res);
        }
    });
};

User.updateUserById = function (usu_id, userParam, result) {

    console.log("valor "+userParam.usu_nome)

    sql.query("UPDATE usuario SET usu_nome = ?, usu_senha = ?, usu_perfil = ?, usu_email = ?, usu_telefone = ?, "+
    "usu_endereco = ? , usu_prod = ?"+
    " WHERE usu_id = ?", [userParam.usu_nome, userParam.usu_senha, userParam.usu_perfil,
        userParam.usu_email, userParam.usu_telefone, userParam.usu_endereco, userParam.usu_prod,
        usu_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

User.removeUser = function (id, result) {
    sql.query("DELETE FROM usuario WHERE usu_id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {

            result(null, res);
        }
    });
};

User.findUser = function (emailUsuario, result) {
    sql.query("SELECT usu_nome, usu_senha FROM usuario WHERE usu_email = ?", [emailUsuario], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {

            result(null, res);

        }
    });
};

module.exports = User;

