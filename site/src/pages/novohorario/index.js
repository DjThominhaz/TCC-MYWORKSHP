import './index.scss';
import HederEmpresa from '../../components/header-adm-empresa';
import { useEffect, useState } from 'react';
import { NovoHorario  ,editarHorario , deletarHorario ,CarregarHorarios ,buscarLocal } from '../../api/agendamentos.js';
import storage from 'local-storage';
import { useNavigate } from 'react-router-dom';




export default function Novohorario (){
    const [render , setrender] = useState(false)
    const [rendernovohorario ,setrendernovohorario] = useState (false)
    const [idemp , setid ] = useState(2)
    const [local , setlocal  ] = useState([])
    const [hora , sethora] =useState ('00:00')
    const [data ,setdata] =useState('')
    const [qtd , setqtd] =useState(0)
    const [horario , sethorario] =useState([])
    const [dataCarregarHorario , setdataCarregarHorario]= useState('2022-10-10')

    const Navigate =useNavigate()
    

    async function criarHorario (){
        try {
            await NovoHorario(idemp ,local.map(item => item.local) , String(hora) , data ,qtd)
            CarregarHorario()
            console.log('horario cadastrado com sucesso')
        } catch (err) {
           console.log(err.message)
           console.log('nao foi ')
        }
    }
    async function CarregarHorario (){
        try {
            const rsp = await CarregarHorarios(idemp , local.map(item => item.local) , dataCarregarHorario)
            sethorario(rsp)
        } catch (err) {
            console.log(err.message)
        }
    }
    async function deletar (id){
        try {
            await deletarHorario (id)
            await CarregarHorario()    
        } catch (err) {
            console.log('horario nao deletado', err.message)
        }
        
    }
    async function aumentarHorarios (id , qtd){
        try {
            const a = qtd + 1
            await editarHorario (id , a)
            await CarregarHorario()
            console.log('foi editado')
        } catch (err) {
            console.log('nao foi editado', err.message)
        }
    }

    async function diminuirHorarios (id , qtd){
        try {
            const a = qtd - 1
            if(qtd <= 1)
                throw new Error ('Horario não pode ser menor que 1')
            await editarHorario (id , a)
            await CarregarHorario()
            console.log('foi editado')
        } catch (err) {
            console.log('nao foi editado', err.message)
        }
    }

    async function buscar (id){
        try {
          const a = await buscarLocal(id)  
          setlocal(a)
        } catch (err) {
            console.log(err.message)
        }
    }

    




    function rendernovo (){
    if(rendernovohorario === false){
        setrendernovohorario(true)
    }else{
        setrendernovohorario(true)
    }
    }

    function renderp (){
        setrender(true) 
    }
    function renderhorario(){
        setrendernovohorario(rendernovohorario-1)
    }







    useEffect(() => {

            const empresaLogada = storage('Empresa-Logada')
            setid(empresaLogada.ID_USUARIO_EMPRESA)
            buscar(idemp)
            
        
    },[])

    useEffect( () => {

       CarregarHorario()

    },[local, dataCarregarHorario])


    return(
        <div className='pg-novohorario'>
            <HederEmpresa  class='hora'/>
            <div>   
                <div className='alinhado'>
                    <h2>Horarios</h2>
                    <div className='linha'></div>
                </div>
            <div className='opts'>
                <input type="date" value={dataCarregarHorario} onChange={ e => setdataCarregarHorario (e.target.value)}/>
                <select className='opt' value={local} onChange={e => setlocal(e.target.value)} >               
                    
                        
                {local.map (item =>
                    <option value={item.local}>{item.local}</option>
                    )}
                    
                
                
                </select>
            </div> 
            <div className='horarios'>
                {render === false
                    ?<div  className='nela' >
                    {horario.map (item  =>
                        <div className='card1' onMouseOver={() => renderp()}>
                            <p>{item.hora}</p>
                    </div>
                )}
                     </div>
                    :<div className='nela'>
                        {horario.map (item  =>
                            <div  className='card1' >
                                <p>{item.hora}</p>
                                <div className='btneditarcard'>
                                    <img src='/assets/images/seta esquerda.svg' onClick={() => diminuirHorarios(item.id_agendamento, item.qtd)} alt='' />
                                    <div>{item.qtd}</div>
                                    <img src='/assets/images/seta direita.svg' onClick={() => aumentarHorarios(item.id_agendamento, item.qtd)} alt='' /> &nbsp;
                                    <img src='/assets/images/lixeira.svg' onClick={() => deletar(item.id_agendamento)} alt=''/> &nbsp;                                              
                                </div>
                            </div>
                    )}
                    </div>}   
            </div>
                <div className='card-novo' onClick={rendernovo}>
                    ADICIONAR HORARIO              
                </div>
                    {rendernovohorario === true &&
                        <div className='opts-2'>
                                <input className='info-novo' type='time' placeholder='digite o horario' value={hora} onChange={e => sethora(e.target.value)} />
                                <input className='info-novo' type='date' value={data} onChange={e => setdata(e.target.value)} />
                                <input className='info-novo' type='number' min='1' value={qtd} onChange={e => setqtd(e.target.value)}/>
                            <div className='btns'>  
                                <button onClick={criarHorario} >SALVAR</button>
                                <button className='btn-pronto' onClick={renderhorario} >PRONTO</button>
                            </div>
                    </div>        
                    }
            </div>
            </div>
    )
}