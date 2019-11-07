'use strict';

var User = require('../model/userModel.js');

exports.listAllUsers = function (req, res) {
    User.getAllUsers(function (err, user) {

        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', user);
        res.send(user);
    });
};

exports.createUser = function (req, res) {
    var newUser = new User(req.body);

    //handles null error 
    if (!newUser.usu_nome || !newUser.usu_senha || !newUser.usu_perfil || !newUser.usu_telefone || !newUser.usu_endereco) {

        res.status(400).send({ error: true, message: 'Please provide name/password/profile/telNumber/address' });

    } else {
        User.createUser(newUser, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
};


exports.readUser = function (req, res) {

    User.getUserById(req.params.usuarioId, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });

};


exports.updateUser = function (req, res) {

    var testUser = new User(req.body);

    User.updateUserById(req.params.usuarioId, testUser, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });

};


exports.deleteUser = function (req, res) {

    User.removeUser(req.params.usuarioId, function (err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted' });
    });

};

exports.findUser = function (req, res) {

    User.findUser(req.params.emailUsuario, function (err, user) {
        if (err)
            res.send(err);

        user == "" ? res.json({ message: 'User not found' }) : res.json(user);;

    });

};




