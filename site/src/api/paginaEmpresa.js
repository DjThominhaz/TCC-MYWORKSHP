import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000' 
})

//PAGINA EMPRESA============================================================================

export async function Pagina (idEmpresa, nome, descricao) {
    const t = await api.post('/empresa/adicionarpagina', {
        idEmpresa:idEmpresa,
        nome:nome,
        descricao:descricao
    });

    return t.data;
}

export async function CarregarPagina (id) {
    const resposta = await api.get(`/empresa/pagina/${id}`);
    return resposta.data;
}

export async function AlterarPagina (idEmpresa, nome, descricao) {
    const resposta = await api.put(`/empresa/alterarpagina/${idEmpresa}`, {
        nome:nome,
        descricao:descricao
    });
    return resposta.data;
}

//IMAGEM ==========================================================================================

export async function CarregarImagem (idEmpresa, imagem) {
    const formData = new FormData();
    formData.append("capa", imagem);

    const resposta = await api.put(`/empresa/pagina/${idEmpresa}/imagem`, formData, {
        headers: {
            "content-type": "multipart/form-data"
        },
    });

    return resposta.status;
}

export function buscarImagem(imagem) {
    return `${api.getUri()}/${imagem}`
}


//PUBLICAÇÃO EMPRESA ==============================================================================

export async function AdicionarPublicacao (idEmpresa, nome, conteudo){
    const resposta = await api.post('/empresa/publicacao', {
        idEmpresa:idEmpresa, 
        nome:nome, 
        conteudo:conteudo
    });

    return resposta.data;
}

export async function AlterarPublicacao (nome, conteudo, idEmpresa, idPublicacao){
    const resposta = await api.put(`/empresa/publicacao/${idEmpresa}/${idPublicacao}`, {
        nome:nome, 
        conteudo:conteudo, 
    });
    return resposta.data;
}

export async function DeletarPublicacao (idEmpresa, idPublicacao){
    const resposta = await api.delete(`/empresa/publicacao/${idEmpresa}/${idPublicacao}`);
    return resposta.data;
}

export async function gerarIdPublicacaoEmpresa (idEmpresa){
    const resposta = await api.get(`/gerarIdPublicacao/${idEmpresa}`);
    return resposta.data
}

export async function listarPublicacao(id) {
    const resposta = await api.get(`/empresa/publicacao/${id}`);
    return resposta.data;
}

export async function CarregarImagempublic (id, imagem) {
    const formData = new FormData();
    formData.append("capa", imagem);

    const resposta = await api.put(`/empresa/imagem/publicacao/${id}`, formData, {
        headers: {
            "content-type": "multipart/form-data"
        },
    });

    return resposta.status;
}


//TAGS ============================================================================================

export async function ListarTags () {
    const resposta = await api.get('/tag');
    return resposta.data;
}

export async function adiciTag (Tag, Pagina) {
    const resp = await api.post('/empresa/tag', {
        Tag:Tag, 
        Pagina:Pagina
    });
    return resp.data
}

export async function ListarTagsPag (Pagina) {
    const resposta = await api.get(`/empresa/tag/${Pagina}`);
    return resposta.data;
}


//Review ============================================================================================

export async function listarReview(id){
    const r = await api.get(`/empresa/review/${id}`)
    return r.data
}

//Verifcações  ============================================================================================

export async function  Verificacoes(idVerificacao, Pagina, link){
    const resposta = await api.post('http://localhost:5000/empresa/verificacao', {
        idVerificacao:idVerificacao,
        Pagina:Pagina,
        link:link
    });


    return resposta.data;
}

export async function  EditarVerificacoes(link, idPagina, idVerificacao){
    const resposta = await api.put('http://localhost:5000/empresa/verificacao', {
        link:link,
        idPagina:idPagina,
        idVerificacao:idVerificacao
    });

    return resposta.data;
}


export async function listarVerificações(idPagina){
    const resposta = await api.get(`http://localhost:5000/empresa/listar-verificacao/${idPagina}`)
    return resposta.data;
}

export async function loadLocal(id){
    const t = await api.get(`/empresa/local?id=${id}`)
    return t.data;
}

