'use strict';

var Product = require('../model/productModel.js');

exports.listAllProducts = function (req, res) {
    Product.getAllProducts(function (err, product) {

        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', product);
        res.send(product);
    });
};

exports.createProduct = function (req, res) {
    var newProduct = new Product(req.body);

    console.log("Data: "+newProduct.prod_nome+", "+newProduct.prod_descricao+", "+newProduct.prod_preco);

    //handles null error 
    if (!newProduct.prod_nome || !newProduct.prod_descricao || !newProduct.prod_preco) {

        res.status(400).send({ error: true, message: 'Please provide product name/desc/price' });

    } else {
        Product.createProduct(newProduct, function (err, product) {
            if (err) {
                res.send(err);
            }
            res.json(product);
        });
    }
};


exports.readProduct = function (req, res) {

    Product.getProductById(req.params.produtoId, function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });

};


exports.updateProduct = function (req, res) {

    var product = new Product(req.body);

    Product.updateProductById(req.params.produtoId, product, function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });

};


exports.deleteProduct = function (req, res) {

    Product.removeProduct(req.params.produtoId, function (err, product) {
        if (err)
            res.send(err);
        res.json({ message: 'Product successfully deleted' });
    });

};



