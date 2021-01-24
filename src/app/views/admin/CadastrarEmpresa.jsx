import { CircularProgress } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import StyledDiv from '../css/admin/Login';
import { fetchCadastrarEmpresa } from '../../store/slicers/async/cadastrarEmpresa';

const CadastrarEmpresa = () => {

    const [mostrarAlertError, setMostrarAlertError] = useState(false)
    const [alertSeverity, setAlertSeverity] = useState('error')
    const [mensagensErro, setMensagensErro] = useState([])
    const dispatch = useDispatch()
    const cadastrarEmpresaState = useSelector((state) => state.empresa.cadastrarEmpresa)
    const [form, setForm] = useState({
        nome: '',
        tipo: '',
    })
    const [alertTitle, setAlertTitle] = useState('Error')

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
        if (cadastrarEmpresaState.error) {
            let erros = [];
            cadastrarEmpresaState.error.map((error, index) => {
                return erros.push(<li key={index} >{error.msg}</li>)
            })
            setMensagensErro(erros)
            setMostrarAlertError(true)
            setAlertSeverity('error')
            setAlertTitle('Error')
        }
        return () => { };
    }, [cadastrarEmpresaState])

    const handleCadastro = async () => {
        try {
            const response = await dispatch(fetchCadastrarEmpresa(form))
            if(response.payload.nome){
                const arrResposta = []
                arrResposta.push(<li>Empresa cadastrada com sucesso!</li>)
                setMensagensErro(arrResposta)
                setMostrarAlertError(true)
                setAlertSeverity('success')
                setAlertTitle("Sucesso")
            }
            //const user = response.payload.user
        } catch (error) {
        }
    }

    function handleCloseAlert(){
        setMostrarAlertError(false)
        setMensagensErro([])
    }

    return (
        <>
            <StyledDiv>
                <form className={'login'}>
                    <h2 className={['login__title', "centered-title"].join(" ")}>Cadastrar Empresa</h2>
                    {mostrarAlertError ? <Alert closeText="Fechar" onClose={() => handleCloseAlert()} className={`alertError`} severity={alertSeverity}>
                    <AlertTitle>{alertTitle}</AlertTitle>
                        <ul>
                            {mensagensErro}
                        </ul>
                    </Alert> : ''}

                    <label className={'login__label'} htmlFor='nome'>Nome</label>
                    <input onChange={formHandler} value={form.nome} className={'login__input'} id='nome' name='nome' type='text'></input>

                    <label className={'login__label'} htmlFor='tipo'>Tipo</label>
                    <input onChange={formHandler} value={form.tipo} className={'login__input'} id='tipo' name='tipo' type='text'></input>
                    
                    {cadastrarEmpresaState.loading ? <CircularProgress size={40}></CircularProgress> : ''}
                    <button id={'botaoLogin'} type='button' onClick={() => handleCadastro()} className={'login__button'}>Enviar</button>
                </form>
            </StyledDiv>
        </>
    )
}

export default CadastrarEmpresa

