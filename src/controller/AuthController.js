const { json } = require('sequelize');
const jsonSecret = require('../config/jsonSecret.js');
const AuthServices = require('../services/AuthServices.js');

const authServices = new AuthServices();
const accessToken =  jsonSecret.secret;

class AuthController {

    static async login(req, res) {
        const { email, senha } = req.body;
        
        try {
            const login = await authServices.login({ email, senha });
            console.log(login.accessToken);
            res.status(200).json(login);
        } catch (error){
            res.status(401).send({ message: error.message });
        }
    }

    static async verificaToken(req, res){
        const { token } = req.body;
        
        if (!token){
            return res.status(401).send('Token não informado');
        }

        // const [, accessToken] = token.split(' ');
        console.log(token);
        console.log(accessToken == token);
        console.log(accessToken.secret);
        try{
            if(token == accessToken){
                res.status(200).send('Token validado');
            }else{
                res.status(500).json({ message: 'Tolken inválido' });
            }
        } catch(error) {
            res.status(500).json({ message: 'Falha ao verificar token' });
        }
    }
}

module.exports = AuthController;