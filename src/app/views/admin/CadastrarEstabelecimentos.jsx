import Alert from '@material-ui/lab/Alert'
import React, { Fragment, useEffect, useState } from 'react'
import Container from '../css/admin/CadastrarEstabelecimentos'
import { fetchPostEstabelecimento } from '../../store/slicers/async/postEstabelecimento';
import { useDispatch, useSelector } from 'react-redux';
import history from '../../config/history';
import {
    fetchGetOneEstabelecimentoByLoggedUser
} from '../../store/slicers/async/getOneEstabelecimentoByLoggedUser';
import { fetchPutEstabelecimento } from '../../store/slicers/async/putEstabelecimento';
import { Snackbar } from '@material-ui/core';

const CadastrarEstabelecimentos = (props) => {
  const [mostrarErros, setMostrarErros] = useState(false)
  const [mostrarAlertSucess, setMostrarAlertSucess] = useState(false)
  const [mensagensErro, setMensagensErro] = useState([])
  const [botaoHabilitado, setBotaoHabilitado] = useState(false)
  const novoCadastro = props.novoCadastro
  const dispatch = useDispatch()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const estabelecimentoASerEditado = useSelector((state) => 
  state.estabelecimentos.selectEstabelecimentoASerEditado)
  const [form, setForm] = useState({
    nome: '',
    localizacao: '',
  })
  const [localizacaoId, setLocalizacaoId] = useState('')
  const [estabelecimentoId, setEstabelecimentoId] = useState('')

  useEffect(() => {
    (async ()=>{

      if(!novoCadastro){
        console.log(estabelecimentoASerEditado)
        const response = await dispatch(
          fetchGetOneEstabelecimentoByLoggedUser(estabelecimentoASerEditado))
          console.log(response)
        console.log(response.payload._id)
        console.log(response.payload.localizacao)
        setEstabelecimentoId(response.payload._id)
        setLocalizacaoId(response.payload.localizacao._id)
        setForm({nome: response.payload.nome, 
          localizacao: response.payload.localizacao.nome})
      }
    })()
    return () => {};
  }, [])

  useEffect(() => {
    document.addEventListener('keypress', enviarFormPeloEnter)
    return () => {
      document.removeEventListener('keypress', enviarFormPeloEnter)
    };
    

    function enviarFormPeloEnter(e) {
      if (e.key === 'Enter') {
        let botao = document.querySelector('#botaoCadastrar')
        botao.click()
      }
    }

  }, [])

  function formHandler(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
    if(form.nome !== '' && form.localizacao !== '')
      setBotaoHabilitado(true)
    else
      setBotaoHabilitado(false)
  }

  async function requestHandlerPost() {
    const data = await dispatch(fetchPostEstabelecimento(form))
    if(data.payload._id){
      setSnackbarOpen(true)
      setBotaoHabilitado(false)
      setTimeout(() => {
        history.push('/')
      }, 3000);
    }
    console.log(data)
  }

  async function requestHandlerPut() {
    //{nome: data.nome, localizacaoId: data.localizacaoId, nomeLocalizacao: data.nomeLocalizacao}
    const data = await dispatch(fetchPutEstabelecimento(
      {nome: form.nome, 
        nomeLocalizacao: form.localizacao, 
        localizacaoId,
        estabelecimentoId
      }))
    if(data.payload){
      setSnackbarOpen(true)
      setBotaoHabilitado(false)
      setTimeout(() => {
        history.push('/')
      }, 3000);
    }
  }

  function displayErrors(errors) {
    let erroList = []

    errors.map((erro) => {
      return erroList.push(<li>{erro}</li>)
    })

    setMostrarErros(true)
    setMensagensErro(erroList)
  }

  return (
    <Container className={'criarEstabelecimento'}>
      <h1 className={'criarEstabelecimento__title centered-title'}>
        {novoCadastro ? 'Cadastrar Estalecimento' : 'Editar Estabelecimento'}</h1>
      <form className={'criarEstabelecimento__form'}>
        {mostrarAlertSucess ? <Alert closeText="Fechar" onClose={() =>
          setMostrarAlertSucess(false)}
          className={'criarEstabelecimento__sucessAlert'} severity="success">
          {novoCadastro ? 'Estabelecimento criado com sucesso!' : 'Estabelecimento editado com sucesso!'}
        </Alert> : ''}
        <ul className={'criarEstabelecimento__errorList'}>
          {mostrarErros ? <Alert closeText="Fechar" onClose={() => setMostrarErros(false)} className={'criarEstabelecimento__errorMessage'} severity="error">
            {mensagensErro}
          </Alert> : ''}
        </ul>
        <label htmlFor="nome">Nome do Estabelecimento</label>
        <input onChange={formHandler} type="text" name="nome" id="nome" value={form.nome} required />
        <label htmlFor="localizacao">Localização</label>
        <input onChange={formHandler} value={form.localizacao} type="text" name='localizacao'
          id="localizacao" required />
        <button id='botaoCadastrar' disabled={!botaoHabilitado} onClick={novoCadastro ? () => requestHandlerPost() : 
        () => requestHandlerPut()} className={'criarEstabelecimento__button'} type="button">
          {novoCadastro ? 'Cadastrar' : 'Editar'}
        </button>
      </form>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={()=>setSnackbarOpen(false)}>
  <Alert onClose={()=>setSnackbarOpen(false)} severity="success">
    {novoCadastro ? 'Estabelecimento criado com sucesso!' : 'Estabelecimento editado com sucesso!'}
  </Alert>
</Snackbar>
    </Container>
  )
}
export default CadastrarEstabelecimentos
