'user strict';
var sql = require('./db.js');

var Product = function (product) {
    this.prod_id = product.prod_id;
    this.prod_nome = product.prod_nome;
    this.prod_descricao = product.prod_descricao;
    this.prod_preco = product.prod_preco;
}

Product.createProduct = function (newProduct, result) {

    sql.query("INSERT INTO produto SET ?", newProduct, function (err, res) {

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

Product.getProductById = function (prod_id, result) {

    sql.query("SELECT prod_nome FROM produto WHERE prod_id = ? ", prod_id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });

};

Product.getAllProducts = function (result) {
    sql.query("SELECT * FROM produto", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('product : ', res);

            result(null, res);
        }
    });
};

Product.updateProductById = function (prod_id, productParam, result) {

    sql.query("UPDATE produto SET prod_nome = ?, prod_descricao = ?, prod_preco = ? WHERE prod_id = ?",
     [productParam.prod_nome, productParam.prod_descricao, productParam.prod_preco, prod_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });

};

Product.removeProduct = function (prod_id, result) {

    sql.query("DELETE FROM produto WHERE prod_id = ?", [prod_id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {

            result(null, res);
        }
    });
};

module.exports = Product;

