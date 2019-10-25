'use strict';

var User = require('../model/appModel.js');

exports.listAllUsers = function (req, res) {
    User.getAllUsers(function (err, task) {

        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', task);
        res.send(task);
    });
};

exports.createUser = function (req, res) {
    var newUser = new User(req.body);

    //handles null error 
    if (!newUser.name || !newUser.password || !newUser.profile || !newUser.telNumber || !newUser.address) {

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
    Task.getTaskById(req.params.userId, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.updateUser = function (req, res) {
    User.updateById(req.params.userId, new User(req.body), function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.deleteTask = function (req, res) {

    User.remove(req.params.userId, function (err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });

};

