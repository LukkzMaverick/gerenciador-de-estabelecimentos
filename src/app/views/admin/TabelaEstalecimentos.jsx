import React, { Fragment, useEffect, useState } from 'react'
import { Container as BootstrapContainer, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { fetchEstabelecimentosByLoggedUser } from '../../store/slicers/async/estabelecimentosByLoggedUser'
import history from '../../config/history';
import { Button, Tooltip } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import { selecionarEstabelecimentoASerEditado } from '../../store/slicers/selectEstabelecimentoASerEditado'
import AlertDialog from '../../components/AlertDialog';
import { fetchDeleteEstabelecimento } from '../../store/slicers/async/deleteEstabelecimento';
import {
    fetchEstabelecimentosByLocalizacaoAndLoggedUser
} from '../../store/slicers/async/estabelecimentosByLocalizacaoAndLoggedUser';
import DeleteIcon from '@material-ui/icons/Delete';
import {useAlert} from 'react-alert'
const TabelaEstabelecimentos = (props) => {

    const dispatch = useDispatch()
    const [estabelecimentos, setEstabelecimentos] = useState([])
    const [alertDialogIsOpen, setAlertDialogIsOpen] = useState(false)
    const [nomeEstabelecimento, setNomeEstabelecimento] = useState('')
    const[estabelecimentoId, setEstabelecimentoId] = useState('')
    const [responseDelete, setResponseDelete] = useState('')
    const localizacaoIdFiltro = useSelector((state) => 
  state.estabelecimentos.selectFiltroLocalizacao)
  const alert = useAlert()

    useEffect(() => {
        (async () => {
            if(props.filtroLocalizacao){
                const response = await dispatch
                (fetchEstabelecimentosByLocalizacaoAndLoggedUser(localizacaoIdFiltro))
                if(response.type !== 'estabelecimentosByLocalizacaoAndLoggedUser [GET]/fetchError'){
                    setEstabelecimentos(response.payload)
                }else{
                    //history.push('/')
                }
            }else{
                const response = await dispatch(fetchEstabelecimentosByLoggedUser())
                if (response.type === 'estabelecimentosByLoggedUser [GET]/fetchError') {
                    if(responseDelete !== ''){
                        history.push('/cadastrarEstabelecimentos')
                    }else{
                        alert.show(<div style={{ fontSize: '1.8rem' }}>Não existem estabelecimentos cadastrados!</div>, {
                            title: "Erro!",
                    
                            onClose: () => history.push('/cadastrarEstabelecimentos'),
                            timeout: '3000'
                    
                          });
                    
                          setTimeout(() => {
                            history.push('/cadastrarEstabelecimentos')
                          }, 3000);
                    }
                }else{
                    setEstabelecimentos(response.payload)
                } 
            }
            
        })()
        return () => { };
    }, [responseDelete])

    function handleEditIconClick(id) {
        dispatch(selecionarEstabelecimentoASerEditado(id))
        history.push('/editarEstabelecimentos')
    }

    function handleDeleteIconClick(nome, id) {
        setNomeEstabelecimento(nome)
        setEstabelecimentoId(id)
        setAlertDialogIsOpen(true)
    }

    async function deletarEstabelecimento(){
        setAlertDialogIsOpen(false)
        const response = await dispatch(fetchDeleteEstabelecimento(estabelecimentoId))
        if(response.payload){
            setResponseDelete(response.payload)
        }
        console.log(response)
    }

    function mountEstabelecimentos() {

        if (estabelecimentos && estabelecimentos.length > 0) {
            console.log(estabelecimentos)
            return estabelecimentos.map((estabelecimento) => {
                console.log(estabelecimento)
                return (
                    <Fragment>
                        <tr>
                            <td className='item' onClick={() => console.log('implemente navegação')}
                                key={estabelecimento._id} className='item'>
                                {estabelecimento.nome}
                            </td>
                            <td>
                                {estabelecimento.localizacao.nome}
                            </td>
                            <td className='last-column'>
                                <Tooltip title="Editar Estabelecimento">
                                    <Button className={'editIconButton'} onClick={() =>
                                        handleEditIconClick(
                                            estabelecimento._id)} size="small">
                                        <EditIcon className='editIcon'></EditIcon>
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Excluir Estabelecimento">
                                    <Button className={'editIconButton'} onClick={() =>
                                        handleDeleteIconClick(estabelecimento.nome, estabelecimento._id)} size="small">
                                        <DeleteIcon className='editIcon'></DeleteIcon>
                                    </Button>
                                </Tooltip>
                            </td>
                        </tr>
                    </Fragment>
                )
            })
        }
    }

    return (
        <>
            <Container>
                <h1>{'Estabelecimentos'}</h1>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome do Estabelecimento</th>
                            <th>Localização</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mountEstabelecimentos()}
                    </tbody>
                </Table>
            </Container>
            <AlertDialog confirmDelete={deletarEstabelecimento}
            giveUpDelete={() => setAlertDialogIsOpen(false)}
            isOpen={alertDialogIsOpen} nomeEstabelecimento={nomeEstabelecimento}/>
        </>
    )
}

export default TabelaEstabelecimentos

const Container = styled(BootstrapContainer)`
padding: 1.5rem;
    h1{
        margin-bottom: 2rem;
    }
    .last-column {
        width: 10rem;
    }
`