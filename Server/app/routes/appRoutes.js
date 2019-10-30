'use strict';
module.exports = function (app) {
    var user = require('../controller/userController');
    var product = require('../controller/productController');

    // todoList Routes
    app.route('/usuario')
        .get(user.listAllUsers)
        .post(user.createUser);

    app.route('/usuario/:usuarioId')
        .get(user.readUser)
        .put(user.updateUser)
        .delete(user.deleteUser);

    app.route('/produto')
        .get(product.listAllProducts)
        .post(product.createProduct);

    app.route('/produto/:produtoId')
        .get(product.readProduct)
        .put(product.updateProduct)
        .delete(product.deleteProduct);
};


