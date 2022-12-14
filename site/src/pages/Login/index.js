import { login } from '../../api/loginController';
import { Link, useNavigate } from 'react-router-dom';
import storage from 'local-storage';

import './index.scss';
import '../../common/common.scss';


import { useState, useRef } from 'react';
import Des from 'react-reveal/Fade'



export default function Index(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');


    const [erro, setErro] = useState('');

    const Navigate = useNavigate();
    
    const ref = useRef();

    async function Login() {
        try{
            
            const r = await login(email, senha);
            console.log(r.BT_LOGIN)
            if (r.BT_LOGIN === 0){
                storage('Cliente-Logado', r);
                Navigate('/home/usuario');
            } 
            else{
                storage('Empresa-Logada', r);
                Navigate('/home/empresa');  
            }


        } catch (err) {
            if (err.response.status === 401){
                setErro(err.response.data.erro);    
            }
        }
    }

  
return(
        <main className='login'>
            <section className='tela'>
                <div className='faixa-cinza'>
                    <h1 className='MW'><Link to="/">MyWorkShip </Link></h1>

                    <div className='alinhar-imgs'>
                        <Des>
                            <img className='img1' src='/assets/images/calendario1.svg'></img>
                        </Des>
                    </div>


                </div>

                <div className='boxright'>
                    <h1 className='h1-boxright'>Não possui conta? <Link to="/cadastro" className='register'><span className='color'>Crie sua conta agora!</span></Link></h1>

                    <div className='inputs'>
                        <input className='input1' placeholder='Usuario' value={email} onChange={e => setEmail(e.target.value) } />
                        <input className='input2' placeholder='Senha' type = 'password' value={senha} onChange={e => setSenha(e.target.value) } />

                        <p>{erro}</p>
                        <div>
                            <button className='buttonLogin' onClick={Login}>Entrar</button>
                        </div>

                    </div>

            

                </div>

            </section>


        </main>  
       
)
}