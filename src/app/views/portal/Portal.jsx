import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { getUser, isAuthenticated } from '../../config/auth';
import history from '../../config/history';
import ListarEmpresas from './ListarEmpresas';
import EstabelecimentosPorEmpresa from './EstabelecimenosPorEmpresa';
import BuscaPorLocalizacao from './BuscaPorLocalizacao';
import BuscaPorLocalizacaoAndEmpresa from './BuscaPorLocalizacaoAndEmpresa';
import TabelaEstabelecimentos from '../admin/TabelaEstalecimentos';

const Portal = (props) => {
  const LoggedRoute = ({ ...rest }) => {
    console.log('loggedson')
    const user = getUser()
    if (!isAuthenticated() && history.location.pathname !== '/login' 
      && history.location.pathname !== '/register') {
      return <Redirect push to="/login" />
    }
    return <Route {...rest}></Route>
  }

    return (
        <>
        
          <LoggedRoute exact basename={props.match.path}
            path={props.match.path + '/home'} component={ListarEmpresas} />

<LoggedRoute exact basename={props.match.path}
            path={props.match.path + '/empresa'} component={EstabelecimentosPorEmpresa} />
    <LoggedRoute exact basename={props.match.path}
path={props.match.path + '/buscaPorLocalizacao'} component={()=><BuscaPorLocalizacao/>} />

<LoggedRoute exact basename={props.match.path}
path={props.match.path + '/empresa/buscaPorLocalizacao'} 
component={()=><BuscaPorLocalizacaoAndEmpresa empresa={true}/>} />

<LoggedRoute exact basename={props.match.path} path={props.match.path + '/filtroLocalizacao'}
        component={() => <TabelaEstabelecimentos filtroLocalizacao={true} />} />
        </>
      )
}


export default Portal
