import React, {useEffect, useState, Fragment} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchEstabelecimentosByEmpresa } from '../../store/slicers/async/estabelecimentosByEmpresa';
import { Container as BootstrapContainer, Table } from 'react-bootstrap'
import styled from 'styled-components';
import history from '../../config/history';
import SearchIcon from '@material-ui/icons/Search';
import { Button, Tooltip } from '@material-ui/core';

const EstabelecimentosPorEmpresa = () => {
    const selectEmpresaState = useSelector((state) => state.empresa.selectEmpresa)
    const dispatch = useDispatch()
    const [estabelecimentos, setEstabelecimentos] = useState([])
    useEffect(() => {
        (async()=>{
            const response = await dispatch(fetchEstabelecimentosByEmpresa(selectEmpresaState.empresaId))
            console.log(response.payload)
            if(response.payload){
                setEstabelecimentos(response.payload)
            }
        })()
      return () => {};
    }, [])

    function mountEstabelecimentos() {

        if (estabelecimentos && estabelecimentos.length > 0) {
            console.log(estabelecimentos)
            return estabelecimentos.map((estabelecimento) => {
                console.log(estabelecimento)
                return (
                    <Fragment>
                        <tr key={estabelecimento._id}>
                            <td className='item' onClick={() => console.log('implemente navegação')}
                                className='item'>
                                {estabelecimento.nome}
                            </td>
                            <td>
                                {estabelecimento.endereco}
                            </td>
                            <td>
                                {estabelecimento.localizacao.nome}
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
                <h1>{`Estabelecimentos de ${selectEmpresaState.nomeEmpresa}`}</h1>
                <Tooltip className='pesquisa' title={`Buscar estabelecimentos de ${selectEmpresaState.nomeEmpresa} por cidade`}>
                                    <Button onClick={() =>
                                       history.push('/portal/empresa/buscaPorLocalizacao')} size="small">
                                        <SearchIcon/>
                                    </Button>
                                </Tooltip>
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome do Estabelecimento</th>
                            <th>Endereço</th>
                            <th>Localização</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mountEstabelecimentos()}
                    </tbody>
                </Table>
            </Container>
    </>
  )
}

export default EstabelecimentosPorEmpresa

const Container = styled(BootstrapContainer)`
padding: 1.5rem;
    h1{
        margin-bottom: 2rem;
    }
    .item:hover{
        cursor: pointer;
        color: #0000EE;
    }
    .pesquisa{
        margin-bottom: 1rem;
    }
`