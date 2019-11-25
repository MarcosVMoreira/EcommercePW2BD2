'user strict';
var sql = require('./db.js');

var User = function (user) {
    this.usu_id = user.usu_id;
    this.usu_nome = user.usu_nome;
    this.usu_senha = user.usu_senha;
    this.usu_email = user.usu_email;
    this.usu_telefone = user.usu_telefone;
    this.usu_endereco = user.usu_endereco;
};

User.createUser = function (newUser, result) {
    let query = "INSERT INTO usuario (usu_nome, usu_senha, usu_perfil, usu_email, usu_telefone, usu_endereco) VALUES ('" + newUser.usu_nome + "', md5('" + newUser.usu_senha + "'), 'Cliente', '" + newUser.usu_email + "', '" + newUser.usu_telefone + "', '" + newUser.usu_endereco + "')";

    sql.query(query, function (err, res) {
        if (err) {
            if (err.code = "ER_DUP_ENTRY") {
                result(null, err);
            }
        } else {
            result(null, res.insertId);
        }
    });
};

User.getUserById = function (usu_id, result) {
    sql.query("SELECT usu_nome FROM usuario WHERE usu_id = ? ", usu_id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

User.getAllUsers = function (result) {
    sql.query("SELECT * FROM usuario", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('user : ', res);

            result(null, res);
        }
    });
};

User.updateUserById = function (usu_id, userParam, result) {
    sql.query("UPDATE usuario SET usu_nome = ?, usu_senha = ?, usu_perfil = ?, usu_email = ?, usu_telefone = ?, " +
        "usu_endereco = ? , usu_prod = ?" +
        " WHERE usu_id = ?", [userParam.usu_nome, userParam.usu_senha, userParam.usu_perfil,
            userParam.usu_email, userParam.usu_telefone, userParam.usu_endereco, userParam.usu_prod,
            usu_id
        ],
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
};

User.removeUser = function (id, result) {
    sql.query("DELETE FROM usuario WHERE usu_id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

User.findUser = function (user, result) {
    sql.query("SELECT * FROM usuario WHERE usu_email = ? AND usu_senha = md5(?)", [user.usu_email, user.usu_senha], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = User;