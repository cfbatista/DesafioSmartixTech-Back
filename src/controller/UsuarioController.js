const Controller = require('./Controller.js');
const UsuarioServices = require('../services/UsuarioServices.js');

const usuarioServices = new UsuarioServices();

class UsuarioController extends Controller {

    constructor(){
        super(usuarioServices);
    }

    async cadastrarUsuario(req, res){
        const { nome, email, senha, telefone } = req.body;

        try{
            const usuario = await usuarioServices.cadastrarUsuario({nome, email, senha, telefone});

            res.status(200).json(usuario);
        } catch (error){
            res.status(400).send({ message: error.message });
        }
    }

}

module.exports = UsuarioController;