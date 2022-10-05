import { Router } from 'express'

import { listarEmpresas, melhoresAvaliacaoEmpresas, pesquisaPorNome } from '../repository/homeUsuario.js';


const server = Router();

server.get('/home/usuario/busca', async(req, resp) => {
    try{
        const  { nome } = req.query; 
        // console.log(nome);
        const resposta = await pesquisaPorNome(nome);

        resp.send(resposta);
        
    }catch(err){
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.get('/home/usuario/melhores', async (req, resp) => {
    try{
        const t = await melhoresAvaliacaoEmpresas();

        resp.send(t)
        
    }catch(err){
        resp.status(400).send({
            erro:err.message

        })
    }
})


server.get('/home/usuario/listarEmpresas', async(req, resp) =>{
    try{
        const resposta = await listarEmpresas();
        resp.send(resposta);

    }catch(err){
        resp.status(400).send({
            erro:err.message
        })
    }
})



export default server;