import { InputLabel, Select } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import { Container as BootstrapContainer } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { fetchLocalizacoesByLoggedUser } from '../../store/slicers/async/localizacoesByLoggedUser';
import { selecionarLocalizacao } from '../../store/slicers/selectFiltroLocalizacao'
import history from '../../config/history';
import { useAlert } from 'react-alert'

const BuscaPorLocalizacao = () => {
    const [localizacao, setLocalizacao] = useState('')
    const dispatch = useDispatch()
    const [localizacoes, setLocalizacoes] = useState([])
    const alert = useAlert()
    function handleSelectChange(event) {
        console.log(event.target)
        setLocalizacao(event.target.value)
        dispatch(selecionarLocalizacao(event.target.value))
        history.push('/filtroLocalizacao')
    }

    useEffect(() => {
        (async () => {
            const response = await dispatch(fetchLocalizacoesByLoggedUser())
            if(response.payload.localizacoes.length > 0){
                setLocalizacoes(response.payload.localizacoes)
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
            
        })()
        return () => { };
    }, [])

    return (
        <>
            <Container>
                <h1>Busca por Localização</h1>
                <InputLabel htmlFor="localizacao">Localização</InputLabel>
                <Select className='select' fullWidth={true}
                    native
                    value={localizacao}
                    onChange={(event) => handleSelectChange(event)}
                    inputProps={{
                        name: 'Localização',
                        id: 'localizacao',
                    }}
                >
                    <option aria-label="None" value="" />
                    {localizacoes.map((localizacao) => {
                        if (localizacoes && localizacoes.length > 0) {
                            return (
                                <Fragment>
                                    <option value={localizacao._id}>{localizacao.nome}</option>
                                </Fragment>
                            )
                        }
                    })}
                </Select>
            </Container>
        </>
    )
}

export default BuscaPorLocalizacao

const Container = styled(BootstrapContainer)`
padding: 1.5rem;
    h1{
        margin-bottom: 2rem;
    }
    .select{
        max-width: 500px;
    }
`