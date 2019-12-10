'user strict';
var sql = require('./db.js');

var Product = function (product) {
    this.prod_id = product.prod_id;
    this.prod_nome = product.prod_nome;
    this.prod_descricao = product.prod_descricao;
    this.prod_categoria = product.prod_categoria;
    this.prod_preco = product.prod_preco;
    this.prod_quantidade = product.prod_quantidade;
    this.prod_imagem = product.prod_imagem;
}

Product.createProduct = function (newProduct, result) {
    sql.query("INSERT INTO produto SET ?", newProduct, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
};

Product.getProductById = function (prod_id, result) {
    sql.query("SELECT CONVERT(prod_imagem USING utf8) AS prod_imagem, prod_nome, prod_descricao, prod_quantidade, prod_preco, prod_categoria, prod_id FROM produto WHERE prod_id = ? ", prod_id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Product.getProductByUserId = function (user_id, result) {
    sql.query("SELECT CONVERT(p.prod_imagem USING utf8) AS prod_imagem,  prod_id, p.prod_nome, p.prod_descricao, pc.categoria AS prod_categoria FROM produto p INNER JOIN prod_usu pu ON pu.prod_usu_produto = prod_id INNER JOIN usuario u ON u.usu_id = prod_usu_usuario INNER JOIN produto_categoria pc ON p.prod_categoria = pc.categoria_id WHERE u.usu_id = ? ORDER BY prod_usu_id DESC", user_id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


Product.getProductByName = function (name, result) {
    sql.query("SELECT CONVERT(p.prod_imagem USING utf8) AS prod_imagem, p.prod_id, p.prod_nome, p.prod_descricao, prod_preco, pc.categoria, p.prod_quantidade, pc.categoria_controle AS prod_categoria FROM produto p INNER JOIN produto_categoria pc ON p.prod_categoria = pc.categoria_id WHERE MATCH (p.prod_nome) AGAINST (? IN BOOLEAN MODE)", name, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Product.getProductByCategory = function (category, result) {
    sql.query("SELECT CONVERT(p.prod_imagem USING utf8) AS prod_imagem, p.prod_nome, p.prod_preco, p.prod_id, p.prod_descricao, pc.categoria AS prod_categoria, p.prod_quantidade FROM produto p INNER JOIN produto_categoria pc ON p.prod_categoria = pc.categoria_id WHERE pc.categoria_controle = ?", category, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Product.getAllProducts = function (result) {
    sql.query("SELECT CONVERT(p.prod_imagem USING utf8) AS prod_imagem, p.prod_id, p.prod_nome, p.prod_descricao, p.prod_preco, pc.categoria, p.prod_quantidade FROM produto p INNER JOIN produto_categoria pc ON p.prod_categoria = pc.categoria_id", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Product.getAllCategories = function (result) {
    sql.query("SELECT * FROM produto_categoria", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Product.updateProductById = function (prod_id, productParam, result) {
    sql.query("UPDATE produto SET prod_nome = ?, prod_descricao = ?, prod_preco = ?, prod_categoria = ?, prod_quantidade = ?, prod_imagem = ? WHERE prod_id = ?",
        [productParam.prod_nome, productParam.prod_descricao, productParam.prod_preco, productParam.prod_categoria, productParam.prod_quantidade, productParam.prod_imagem, prod_id],
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
};

Product.updateQuantity = function (prod_id, productParam, result) {
    sql.query("UPDATE produto SET prod_quantidade = ? WHERE prod_id = ?", [productParam.prod_quantidade, prod_id],
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
};

Product.removeProduct = function (prod_id, result) {
    sql.query("DELETE FROM produto WHERE prod_id = ?", [prod_id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
module.exports = Product;
