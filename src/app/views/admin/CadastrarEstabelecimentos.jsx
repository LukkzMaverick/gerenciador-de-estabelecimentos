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
import { fetchEmpresaByLoggedUser } from '../../store/slicers/async/empresaByLoggedUser';
import { InputLabel, Select, Snackbar } from '@material-ui/core';
import {useAlert} from 'react-alert'

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
  const alert = useAlert()
  const [form, setForm] = useState({
    nome: '',
    localizacao: '',
    empresaId: '',
    endereco: ''
  })
  const [localizacaoId, setLocalizacaoId] = useState('')
  const [estabelecimentoId, setEstabelecimentoId] = useState('')
  const empresaByLoggedUserState = useSelector((state)=> state.empresa.empresaByLoggedUser)
  const [empresas,setEmpresas] = useState([])
  const [empresa, setEmpresa] = useState('')
  const postEstabelecimentoState = useSelector((state) => state.estabelecimentos.postEstabelecimento)

  useEffect(() => {
    (async ()=>{

      if(!novoCadastro){
        const response = await dispatch(
          fetchGetOneEstabelecimentoByLoggedUser(estabelecimentoASerEditado))
        const {_id, nome, localizacao, endereco, empresa} = response.payload
        const {nome: localizacaoNome} = localizacao
        setEstabelecimentoId(response.payload._id)
        setLocalizacaoId(response.payload.localizacao._id)
        setEmpresa(empresa)
        setForm({nome: nome, 
          localizacao: localizacaoNome, endereco: endereco, empresaId: empresa})
      }
    })()
    return () => {};
  }, [])

  useEffect(() => {
    (async()=>{
      const response = await dispatch(fetchEmpresaByLoggedUser())
      if(response.payload.length > 0){
        setEmpresas(response.payload)
      }else{
        alert.show(<div style={{ fontSize: '1.8rem' }}>Não existem empresas cadastradas!</div>, {
          title: "Erro!",
  
          onClose: () => history.push('/cadastrarEmpresas'),
          timeout: '4000'
  
        });
  
        setTimeout(() => {
          history.push('/cadastrarEmpresas')
        }, 4000);
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
    if(form.nome !== '' && form.localizacao !== '' && form.endereco && form.empresaId)
      setBotaoHabilitado(true)
    else
      setBotaoHabilitado(false)
  }

  async function requestHandlerPost() {
    const data = await dispatch(fetchPostEstabelecimento(form))
    if(data.payload){
      setSnackbarOpen(true)
      setBotaoHabilitado(false)
      setTimeout(() => {
        history.push('/')
      }, 3000);
    }
  }

  async function requestHandlerPut() {
    //{nome: data.nome, localizacaoId: data.localizacaoId, nomeLocalizacao: data.nomeLocalizacao}
    const data = await dispatch(fetchPutEstabelecimento(
      {nome: form.nome, 
        nomeLocalizacao: form.localizacao, 
        localizacaoId,
        estabelecimentoId, 
      endereco: form.endereco,
      empresaId: form.empresaId
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

  useEffect(() => {
    if(postEstabelecimentoState.error){
      let erroList = []
    postEstabelecimentoState.error.map((erro) => {
      return erroList.push(<li>{erro}</li>)
    })

    setMostrarErros(true)
    setMensagensErro(erroList)
    }
    return () => {};
  }, [postEstabelecimentoState])

  function handleSelectChange(event) {
    setEmpresa(event.target.value)
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
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
        <label htmlFor="endereco">Endereço</label>
        <input onChange={formHandler} value={form.endereco} type="text" name='endereco'
          id="endereco" required />
        <label htmlFor="localizacao">Cidade</label>
        <input onChange={formHandler} value={form.localizacao} type="text" name='localizacao'
          id="localizacao" required />

 <InputLabel htmlFor="empresa">Empresa</InputLabel>
                <Select className='criarEstabelecimento__select' fullWidth={true}
                    native
                    value={empresa}
                    onChange={(event) => handleSelectChange(event)}
                    inputProps={{
                        name: 'empresaId',
                        id: 'empresa',
                    }}
                >
                    <option aria-label="None" value="" />
                    {empresas.map((empresa) => {
                        if (empresas && empresas.length > 0) {
                            return (
                                <Fragment>
                                    <option value={empresa._id}>{empresa.nome}</option>
                                </Fragment>
                            )
                        }
                    })}
                </Select> 

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
