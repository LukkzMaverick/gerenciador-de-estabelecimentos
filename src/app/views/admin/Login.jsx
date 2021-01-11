import { useContext, useEffect, useState } from 'react';
import history from '../../config/history';
import Alert from '@material-ui/lab/Alert';
import { CircularProgress } from '@material-ui/core';
import StyledDiv from '../css/admin/Login';
import { fetchLogar } from '../../store/slicers/async/logar';
import { useDispatch, useSelector } from 'react-redux';
import http from '../../config/config';
import { saveLocalStorage, getToken } from '../../config/auth';
import LoginContext from '../../context/LoginContext';

const Login = () => {

    const [mostrarAlertError, setMostrarAlertError] = useState(false)
    const [mensagensErro, setMensagensErro] = useState([])
    const dispatch = useDispatch() 
    const loginState = useSelector((state) => state.auth.login)
    const [form, setForm] = useState({
        email: '',
        senha: '',
    })

    const login = useContext(LoginContext)

    useEffect(() => {
        document.addEventListener('keypress', enviarFormPeloEnter)
        return () => {
            document.removeEventListener('keypress', enviarFormPeloEnter)
        };

        function enviarFormPeloEnter(e) {
            if (e.key === 'Enter') {
                let botaoLogin = document.querySelector('#botaoLogin')
                botaoLogin.click()
            }
        }

    }, [])

    function formHandler(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        if(loginState.error){
            let erros = [];
            loginState.error.map((error, index) => {
                return erros.push(<li key={index} >{error.msg}</li>)
            })
            console.log(erros)
            setMensagensErro(erros)
            setMostrarAlertError(true)
        }
      return () => {};
    }, [loginState])

    const handleLogin = async () => {
        try {
            const response = await dispatch(fetchLogar(form))
            console.log(response)
            saveLocalStorage({token: response.payload.token, user: response.payload.user})
            login.setIsLogged(true)
            http.defaults.headers['x-auth-token'] = getToken();
            history.push('/')
        } catch (error) {
            console.log(error)
            
        }
    }

    return (
        <>
            <StyledDiv className='container'>
                <form className={'login'}>
                    <h2 className={['login__title', "centered-title"].join(" ")}>Login</h2>
                    {mostrarAlertError ? <Alert closeText="Fechar" onClose={() => setMostrarAlertError(false)} className={`alertError`} severity="error">
                        <ul>
                            {mensagensErro}
                        </ul>
                    </Alert> : ''}
                    <label className={'login__label'} htmlFor='email'>Email</label>
                    <input onChange={formHandler} value={form.email} className={'login__input'} id='email' name='email' type='email'></input>
                    <label className={'login__label'} htmlFor='senha'>Senha</label>
                    <input onChange={formHandler} value={form.senha} className={'login__input'} id='senha' name='senha' type='password'></input>
                    {loginState.loading ? <CircularProgress size={40}></CircularProgress> : ''}
                    <button id={'botaoLogin'} type='button' onClick={() => handleLogin()} className={'login__button'}>Entrar</button>
                </form>
            </StyledDiv>
        </>
    )
}

export default Login