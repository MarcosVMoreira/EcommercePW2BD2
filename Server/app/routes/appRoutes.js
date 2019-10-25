'use strict';
module.exports = function (app) {
    var usuario = require('../controller/usuarioController');

    // todoList Routes
    app.route('/usuario')
        .get(usuario.listarTodosUsuarios)
        .post(usuario.cadastrarUsuario);

    app.route('/usuario/:usuarioId')
        .get(usuario.listaUsuario)
        .put(usuario.atualizaUsuario)
        .delete(usuario.removeUsuario);
};


