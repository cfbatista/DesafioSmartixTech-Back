const database = require('../models');
const { compare } = require('bcryptjs');
const { sign, verify } = require('jsonwebtoken');
const jsonSecret =  require('../config/jsonSecret.js');
const nodemailer = require('nodemailer');

class AuthServices {
    async login(data){
        const usuario = await database.Usuario.findOne({
            attributes: ['id', 'email', 'senha'],
            where: {
                email: data.email
            }
        });

        if (!usuario){
            throw new Error('Usuário não encontrado');
        }

        const senhasIguais = await compare(data.senha, usuario.senha);

        if (!senhasIguais){
            throw new Error('Usuário ou senha incorreto');
        }

        // const acessToken = sign({
        //     id: usuario.id,
        //     email: usuario.email
        // }, jsonSecret.secret, {
        //     expiresIn: 36000
        // });

        const accessToken = jsonSecret.secret;

        console.log(accessToken);
        await this.sendTokenEmail(usuario.email, accessToken);

        return { accessToken };
    }


    async sendTokenEmail(email, token){
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            secure: true,
            auth: {
                user: 'cfbatista998@gmail.com',
                pass: 'uvtz rkbk kdpl eiar'
            }
        });

        const mailOptions = {
            from: 'cfbatista998@gmail.com',
            to: email,
            subject: "Token validação Desafio Smartix Tech",
            text: `Seu token é ${token}`
        };

        try{
            const info = await transporter.sendMail(mailOptions);
            console.log('Email enviado', info);
        } catch(error){
            throw new Error('Erro ao enviar o token', error);
        }
    }

}

module.exports = AuthServices;