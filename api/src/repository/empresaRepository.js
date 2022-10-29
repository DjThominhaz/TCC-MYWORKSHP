import { con } from "./connection.js";



export async function buscarInfoEmpresa (info){
    const comando = `
    
    SELECT 
            TB_USUARIO_EMPRESA.NM_NOME_DA_EMPRESA 	nome,              
            TB_USUARIO_EMPRESA.DS_ENDERECO 			endereco,
            TB_USUARIO_EMPRESA.NM_REPRESENTANTE 	representante ,
            TB_USUARIO_EMPRESA.DS_TIPO_DA_EMPRESA 	tipo,
            TB_LOGIN.DS_EMAIL    					email
    FROM
            tb_usuario_empresa
    INNER JOIN 
            TB_LOGIN ON TB_USUARIO_EMPRESA.ID_USUARIO_EMPRESA = TB_LOGIN.ID_USUARIO_EMPRESA
    WHERE 
            TB_USUARIO_EMPRESA.ID_USUARIO_EMPRESA = ?
    `
    const [linhas] = await con.query (comando, [info.id])
    return linhas[0]

}

export async function alterarNome (info){
    const comando = `
    UPDATE		TB_USUARIO_EMPRESA
       SET		NM_NOME_DA_EMPRESA = ?
     WHERE 	    ID_USUARIO_EMPRESA = ?
    `
    const [linhas] = await con.query (comando, [info.nome , info.id])
    return linhas.affectedRows

}


export async function alterarEndereco (info){
    const comando = `
    UPDATE		TB_USUARIO_EMPRESA
       SET		DS_ENDERECO  	   = ?
     WHERE 	    ID_USUARIO_EMPRESA = ?
     `
    const [linhas] = await con.query (comando, [info.nome , info.id])
    return linhas.affectedRows
}


export async function alterarNomeRepresentante (info){
    const comando = `
    UPDATE		TB_USUARIO_EMPRESA
       SET		NM_REPRESENTANTE   = ?
     WHERE 	    ID_USUARIO_EMPRESA = ?
     `

    const [linhas] = await con.query (comando, [info.nome , info.id])
    return linhas.affectedRows
}


export async function alterarTipoEmpresa (info){
    const comando = `
    UPDATE		TB_USUARIO_EMPRESA
       SET		DS_TIPO_DA_EMPRESA 	= ?
     WHERE 	    ID_USUARIO_EMPRESA = ?
      `
     
    const [linhas] = await con.query (comando, [info.nome , info.id])
    return linhas.affectedRows
}

export async function alterarEmailEmpresa (info){
    const comando = `
        UPDATE		TB_LOGIN
           SET		DS_EMAIL  = ?
         WHERE 	    ID_USUARIO_EMPRESA = ?
 `
     
    const [linhas] = await con.query (comando, [info.nome , info.id])
    return linhas.affectedRows
}




export async function novaFilial (info){
    const comando = `
        insert INTO TB_FILIAL (ID_USUARIO_EMPRESA	, DS_PAIS , DS_ESTADO , DS_CIDADE , DS_ENDERECO , DS_CEP )
                         VALUE(? , ?, ? , ? , ? , ? )

    `
    const [linhas] = await con.query (comando, [info.id , info.pais, info.estado , info.cidade, info.endereco , info.cep ])
    return info    
}

export async function buscarFilial (info){
    const comando = `
    SELECT ID_USUARIO_EMPRESA	,
            DS_PAIS ,
            DS_ESTADO , 
            DS_CIDADE , 
            DS_ENDERECO ,
            DS_CEP  
    FROM 
        TB_FILIAL
    where
        ID_USUARIO_EMPRESA = ?
    
    `
    const [linhas] = await con.query (comando, [info.id ])
    return linhas    
}



