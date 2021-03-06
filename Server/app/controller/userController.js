'use strict';

var User = require('../model/userModel');

exports.listAllUsers = function (req, res) {
    User.getAllUsers(function (err, user) {
        if (err)
            res.send(err);
        res.send(user);
    });
};

exports.createUser = function (req, res) {
    var newUser = new User(req.body);
    if (!newUser.usu_nome || !newUser.usu_senha || !newUser.usu_telefone || !newUser.usu_endereco) {
        res.status(400).send({
            error: true,
            message: 'Please provide name/password/profile/telNumber/address'
        });
    } else {
        User.createUser(newUser, function (err, user) {
            if (err)
                res.send(err);
            user['code'] == "ER_DUP_ENTRY" ? res.json({
                message: 'Duplicate entry'
            }) : res.json(user);
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
    var newUser = new User(req.body);
    User.updateUserById(req.params.usuarioId, newUser, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.deleteUser = function (req, res) {
    User.removeUser(req.params.usuarioId, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'User successfully deleted'
        });
    });
};

exports.findUser = function (req, res) {
    User.findUser(req.body, function (err, user) {
        if (err)
            res.send(err);
        user == "" ? res.json({
            message: 'User not found'
        }) : res.json(user);
    });
};

exports.readUserName = function (req, res) {
    User.getUserByName(req.params.usuarioNome, function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
};

exports.savePurchase = function (req, res) {
    User.createPurchase([req.body[1], req.body[0]], function (err, usu_prod) {
        if (err)
            res.send(err);
        res.json(usu_prod);
    });
};