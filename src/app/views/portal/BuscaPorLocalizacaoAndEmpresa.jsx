import React, { useEffect, useState } from 'react'
import {
    fetchEstabelecimentosByLocalizacaoAndEmpresa
} from '../../store/slicers/async/estabelecimentosByLocalizacaoAndEmpresa';

const BuscaPorLocalizacaoAndEmpresa = (props) => {
    const [estabelecimentos, setEstabelecimentos] = useState([])
    useEffect(() => {
        // const response = await dispatch(fetchEstabelecimentosByLocalizacaoAndEmpresa)
        // if(response.payload){

        // }
        return () => {};
    }, [])

    return (
        <>

        </>
    )
}

export default BuscaPorLocalizacaoAndEmpresa
