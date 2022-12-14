import { con } from "./connection.js";

export async function pesquisaPorNome(nome) {
    const comando = `
    SELECT
        id_usuario_empresa  id, 
        IMG_LOGO logo,
	     DS_DESCRICAO descricao, 
	     NM_EMPRESA nome
         from tb_pagina_empresa 
         where nm_empresa like ?
    `;
    const [linhas]= await con.query(comando, [`%${nome}%`]);
    return linhas;
}


export async function listarEmpresas() {
    const comando =  `
    SELECT VL_AVALIACAO avaliacao, 
    IMG_LOGO logo,
    DS_DESCRICAO descricao, 
    NM_EMPRESA nome
    from tb_pagina_empresa 
    inner join tb_empresa_avaliacao 
    on tb_empresa_avaliacao.id_empresa_avaliacao = tb_pagina_empresa.id_pagina_empresa
    `
    const [linhas] = await con.query(comando)
    return linhas;
}


export async function melhoresAvaliacaoEmpresas() {
    const comando =  `
    select  tb_pagina_empresa.id_usuario_empresa id,
        avaliacao,
		avaliacoes,
		vl_avaliacao,
		IMG_LOGO logo,
		DS_DESCRICAO descricao, 
		NM_EMPRESA nome 
    from (select   sum(vl_avaliacao) / count(vl_avaliacao) avaliacao,
    count(vl_avaliacao) avaliacoes
    from tb_empresa_avaliacao 
    where id_usuario_empresa = 1) grupo,
    
    tb_pagina_empresa

    inner join tb_empresa_avaliacao 
    on tb_empresa_avaliacao.id_empresa_avaliacao = tb_pagina_empresa.id_pagina_empresa
    where avaliacao > 3
    `
    const [linhas] = await con.query(comando)
    return linhas;
}

export async function filtrarMaisProximo(id) {
    const comando = `
    SELECT  IMG_LOGO logo,
			DS_DESCRICAO descricao, 
			NM_EMPRESA nome,
			tb_usuario_empresa.id_usuario_empresa id,
			id_usuario_cliente idCliente,
			tb_usuario_empresa.ds_cidade cicadeEmpresa,
            tb_usuario_cliente.ds_cidade cidadeUsuario
    from tb_usuario_empresa
    inner join tb_usuario_cliente on tb_usuario_cliente.id_usuario_cliente = tb_usuario_empresa.id_usuario_empresa
    inner join tb_pagina_empresa on tb_pagina_empresa.id_pagina_empresa = tb_usuario_empresa.id_usuario_empresa
    where tb_usuario_empresa.ds_cidade = tb_usuario_cliente.ds_cidade and id_usuario_cliente = ?;
    `

    const [linhas] = await con.query(comando,  [`${id}`])
    return linhas;
}


export async function listarTags(){
    const comando = `
        select nm_tag tag
        from tb_tag;
    `
    const [linhas] = await con.query(comando)
    return linhas;
}

export async function selecionarTags(tag){
    const comando = `
    SELECT
        id_usuario_empresa  id, 
        IMG_LOGO logo,
        DS_DESCRICAO descricao, 
        NM_EMPRESA nome,
        nm_tag tag
    from 
        tb_pagina_empresa
    inner join 
        tb_tag on tb_tag.id_tag = id_usuario_empresa
    inner join 
        tb_tag_empresa on tb_tag_empresa.id_tag_empresa = id_usuario_empresa
    where 
        nm_tag = ?
    `

    const [linhas] = await con.query(comando, [`${tag}`])
    return linhas
}