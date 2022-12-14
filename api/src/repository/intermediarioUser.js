import { con } from "./connection.js"

export async function carregarPaginaZ(id){
    const comando = `
    select 	tb_usuario_empresa.id_usuario_empresa id,
		    nm_empresa				nome,
	    	img_logo				logo,
		    ds_descricao 			descricao,
            ds_pais					pais,
		    ds_cidade				cidade,
		    ds_endereco				endereco
    from tb_pagina_empresa
    inner join tb_usuario_empresa on tb_usuario_empresa.id_usuario_empresa = tb_pagina_empresa.id_pagina_empresa
    where tb_usuario_empresa.id_usuario_empresa = ?
    `;
    const [linhas] = await con.query(comando, [id])
    return linhas; 
}

export async function enviarComentario(comentario){
    const comando = `
    INSERT INTO TB_EMPRESA_AVALIACAO(ID_USUARIO_EMPRESA, id_usuario_cliente , vl_avaliacao, ds_avaliacao, dt_avaliacao)
    values(?, ?, ?, ?, sysdate())
    `
    const [linhas] = await con.query (comando, [comentario.idempresa, comentario.idusuario, comentario.avaliacao, comentario.descricao])
    linhas.id = linhas.insertId;
    return comentario;
}


export async function selecionarComentarios(id){
    const comando = `
    select  id_empresa_avaliacao id1,
			ID_USUARIO_EMPRESA id,
            tb_usuario_cliente.id_usuario_cliente idu,
            nm_usuario nome,
            vl_avaliacao ava,
            ds_avaliacao avads,
            dt_avaliacao dia
    from   tb_empresa_avaliacao
    inner join tb_usuario_cliente on tb_usuario_cliente.id_usuario_cliente = tb_empresa_avaliacao.id_usuario_cliente
    WHERE id_usuario_empresa = ?
    ORDER BY id1 desc`
    const [linhas] = await con.query(comando, [id])
    return linhas;
}

export async function puxarPubs(id){
    const comando = `
    select  	id_pagina_empresa_publicacao 	id1,
            id_pagina_empresa 	ID, 
            nm_titulo		  	titulo,
            ds_caixa_texto	  	texto,
            img_publicacao 		pub
    from 	tb_pagina_empresa_publicacao
    where id_pagina_empresa = ? order by id1 desc
    `
    const [linhas] = await con.query(comando, [id])
    return linhas;
}

export async function avaliacoes(id){
    const comando = `
    select round(sum(vl_avaliacao) / count(vl_avaliacao), 1) as avaliacao,
        count(vl_avaliacao) avaliacoes
    from tb_empresa_avaliacao 
    where id_usuario_empresa = ?
    `
    const [linhas] = await con.query(comando, [id])
    return linhas
}

export async function carregarVerificacoes(id){
    const comando = `
    select  ds_verificacoes verificacao
    from    tb_verificacoes
    where   ID_PAGINA_EMPRESA = ? 
    group by 1;
    `
    const [linhas] = await con.query(comando, [id])
    return linhas;
}

export async function carregarCertificacoes(id){
    const comando = `
    select  ds_certificacoes descricao
    from    tb_certificacoes
    inner   join tb_pagina_empresa on tb_pagina_empresa.id_pagina_empresa = tb_certificacoes.id_verificacoes
    where   id_usuario_empresa = ?
    `
    const [linhas] = await con.query(comando, [id])
    return linhas;
}


export async function Jurupinga(id){
    const comando = `
    select nm_tag tag
    from tb_tag 
    inner join tb_usuario_empresa on tb_usuario_empresa.id_usuario_empresa = tb_tag.id_tag
    where id_usuario_empresa = ?;
    `

    const [linhas] = await con.query(comando, [id])
    return linhas;
}
