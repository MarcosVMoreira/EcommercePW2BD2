'use strict';
module.exports = function (app) {
    var user = require('../controller/appController');

    // todoList Routes
    app.route('/usuario')
        .get(user.listAllUsers)
        .post(user.createUser);

    app.route('/usuario/:usuarioId')
        .get(user.readUser)
        .put(user.updateUser)
        .delete(user.deleteUser);
};


