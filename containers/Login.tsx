import type { NextPage } from 'next'
import { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { executeRequest } from '../services/api';
import { AccessTokenProps } from '../types/AccessTokenProps';

const Login: NextPage<AccessTokenProps> = ({
  setAccessToken
}) => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [isLoading, setLoading] = useState(false);

  const doLogin = async (e : any) =>{
    try{
      setLoading(true);
      e.preventDefault();
      
      if(!login || !password){
        setMsgErro('Parâmetros de entrada inválidos');
          setLoading(false);
        return;
      }

      const body = {
        login,
        password
      }
      
      const result = await executeRequest('login', 'POST', body);
      
      setMsgErro('');
      if(result && result.data){
        localStorage.setItem('accessToken', result.data.token);
        localStorage.setItem('userName', result.data.name);
        localStorage.setItem('userEmail', result.data.email);
        setAccessToken(result.data.token);
      }else{
        setMsgErro('Nao foi possivel processar login tente novamente!');
      }
    }catch(e : any){
      console.log(e);
      if(e?.response?.data?.error){
        setMsgErro(e?.response?.data?.error);
      }else{
        setMsgErro('Ocorreu erro ao processar login tente novamente!');
      }
    }

    setLoading(false);
  }

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const doRegisterUser = async (e : any) =>{
    try{
      setLoading(true);
      e.preventDefault();
      
      if(!email || !name || !password){
        setMsgErro('Favor preencher email, nome e senha');
        setLoading(false);
        return;
      }

      const bodyRegister = {
        name,
        email,
        password
      }

      console.log(bodyRegister);

      await executeRequest('user', 'POST', bodyRegister);
      
      closeModal();
    }catch(e : any){
      console.log(e);
      if(e?.response?.data?.error){
        setMsgErro(e?.response?.data?.error);
      }else{
        setMsgErro('Ocorreu erro ao alterar tarefa tente novamente!');
      }
    }

    setLoading(false);
  }

  const closeModal = () => {
    setName('');
    setPassword('');
    setEmail('');
    setLoading(false);
    setMsgErro('');
    setShowModal(false);
  }

  return (
    <>
    <div className="container-login">
      <img src="/logo.svg" alt="Logo Fiap" className="logo"/>
      <form>
        {msgErro && <p>{msgErro}</p>}
        <div className="input">
          <img src="/mail.svg" alt="Logo Fiap"/>
          <input type="text" placeholder="Informe seu email"
            value={login} onChange={e => setLogin(e.target.value)} />
        </div>
        <div className="input">
          <img src="/lock.svg" alt="Logo Fiap"/>
          <input type="password" placeholder="Informe sua senha"
            value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <button className={isLoading ? "disabled" : ""} type="button" onClick={doLogin} disabled={isLoading}>{isLoading ? "...Carregando" : "Login"}</button>
        <button className={isLoading ? "disabled" : ""} type="button" onClick={() => setShowModal(true)} disabled={isLoading}>{isLoading ? "...Carregando" : "Cadastre-se"}</button>
      </form>
    </div>

    <Modal show={showModal}
        onHide={() => closeModal()}
        className="container-modal">
          <Modal.Body>
              <p>Faça seu cadastro</p>
              {msgErro && <p className="error">{msgErro}</p>}
              <input type="text"
                placeholder="Nome"
                value={name}
                onChange={e => setName(e.target.value)}/>
              <input type={"text"}
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}/>
              <input type={"text" }
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}/>
          </Modal.Body>
          <Modal.Footer>
              <div className="button col-12">
                  <button
                    onClick={doRegisterUser}
                    disabled={isLoading}
                    >{isLoading ? "...Enviando dados" : "Salvar cadastro"}</button>
                  <span onClick={closeModal}>Cancelar</span>
              </div>
          </Modal.Footer>
      </Modal>

    </>






  )
}

export { Login }  