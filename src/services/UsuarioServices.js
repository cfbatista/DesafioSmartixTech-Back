const Services = require('./Services.js');
const dataSource = require('../models');
const { hash } = require('bcryptjs');
const uuid = require('uuid');

class UsuarioServices extends Services {
    constructor(){
        super('Usuario');
    }

    async cadastrarUsuario(data){
        // get usuario pelo email
        // se email já existe não deixa cadastrar
        const usuario = await dataSource.Usuario.findOne({
            where: {
                email: data.email
            }
        });

        if (usuario) {
            throw new Error('Usuário já cadastrado');
        }

        try{
            const senhaHash = await hash(data.senha, 8);
            const novoUsuario = await dataSource.Usuario.create({
                id: uuid.v4(),
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
                senha: senhaHash
            });

            return novoUsuario;
        } catch (error){
            throw new Error('Erro ao cadastrar usuário');
        }
    }
}

module.exports = UsuarioServices;