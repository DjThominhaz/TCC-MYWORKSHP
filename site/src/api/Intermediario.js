import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000' 
})

export async function loadPage(id){
    const resposta = await api.get(`/home/usuario/int/${id}`);
    return resposta.data
}

export async function sendReview(id, idu, avaliacao, descricao, dia){
    const r = await api.post('/home/usuario/comentario',{
        idempresa:id,
        idusuario:idu,
        avaliacao:avaliacao,
        descricao:descricao,
        dia: dia
    });
    return r.data
}

export async function loadCertficacoes(id){
    const t = await api.get(`/home/usuario/certificacoes?id=${id}`)
    return t.data
}

export async function loadVerificacoes(id){
    const t = await api.get(`/home/usuario/verificacoes?id=${id}`)
    return t.data
}

export async function Brahma(id){
    const t = await api.get(`/home/usuario/buscarTags?id=${id}`)
    return t.data;
}


export async function listarComentarios(id){
    const t = await api.get(`/home/usuario/coments?id=${id}`)
    return t.data;
}

export async function laodPubs(id){
    const t = await api.get(`/home/usuario/pubs?id=${id}`)
    return t.data;
}

export async function carregarAvaliacao(id){
    const t = await api.get(`/home/usuario/avaliacoes?id=${id}`)
    return t.data;
}