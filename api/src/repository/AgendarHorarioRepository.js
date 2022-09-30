import { con } from "./connection.js";



export default async function AgendarHorario (info){
    const comando = `                     
    insert INTO TB_CLIENTE_AGENDAMENTO (ID_AGENDAMENTO , ID_USUARIO_CLIENTE , NM_PESSOA , DS_EMAIL , DS_CPF , DS_TELEFONE , DS_SEXO , DT_NASCIMENTO , DS_SITUACAO)
							  VALUE( ? , ? , ? , ? , ? , ? , ? , ? , ? )
 
    `
    const [linhas] = await con.query (comando, [info.id_agendamento , info.id_cliente , info.nome , info.email ,  info.cpf  ,  info.telefone , info.sexo , info.nascimento , info.situacao ]);
    info.id = linhas.insertId
    return info;
}




