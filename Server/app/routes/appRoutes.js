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

    app.route('/usuario/produto/:usuarioId')
        .get(product.readUserProduct);
    app.route('/produto/categoria/:categoria')
        .get(product.readCategoryProduct);
    app.route('/busca/produto/:produtoNome')
        .get(product.readProductName);
    app.route('/busca/usuario/:usuarioNome')
        .get(user.readUserName);
    app.route('/categoria')
        .get(product.readCategories);
    app.route('/login')
        .post(user.findUser);

    app.route('/salvarCompra')
        .post(user.savePurchase);

};