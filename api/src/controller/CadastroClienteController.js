import { cadastroCliente } from "../repository/CadastroClienteRepository.js";

import { Router } from "express";
const server = Router();

server.post('/cliente/cadastro', async(req, resp) => {
    try{
        const novoCliente = req.body;

        if(!usuario.trim()){
            throw new Error('Nome de usuario é obrigatorio')}

        const ncliente = await cadastroCliente(novoCliente);

        resp.send(ncliente)

    } catch (err) {
        
        resp.status(401).send({
            erro: err.message
        })
    }
})

export default server;
