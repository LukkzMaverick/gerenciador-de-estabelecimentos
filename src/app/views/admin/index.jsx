import {
  Redirect,
  Route
} from "react-router-dom";
import history from '../../config/history';
import { isAuthenticated, getUser } from '../../config/auth';
import CadastrarEstabelecimentos from './CadastrarEstabelecimentos';
import Login from './Login';
import TabelaEstabelecimentos from './TabelaEstalecimentos';
import BuscaPorLocalizacao from './BuscaPorLocalizacao';
const Admin = (props) => {

  const AdminRoute = ({ ...rest }) => {
    const user = getUser()
    console.log(user)
    if (!isAuthenticated() && history.location.pathname !== '/login'
      && history.location.pathname !== '/register') {
      return <Redirect push to="/login" />
    }
    return <Route {...rest}></Route>
  }

  return (
    <>
      <AdminRoute exact basename={props.match.path}
        path={props.match.path + '/'} component={TabelaEstabelecimentos} />

      <Route exact basename={props.match.path} path={'/login'} component={Login} />
      <Route exact basename={props.match.path} path={'/register'} component={() => <h1>Só um teste</h1>} />

      <AdminRoute exact basename={props.match.path} path={props.match.path
        + '/listaEstabelecimentos'} component={TabelaEstabelecimentos} />

      <AdminRoute exact basename={props.match.path} path={'/cadastrarEstabelecimentos'}
        component={() => <CadastrarEstabelecimentos novoCadastro={true} />} />
      <AdminRoute exact basename={props.match.path} path={'/editarEstabelecimentos'}
        component={() => <CadastrarEstabelecimentos novoCadastro={false} />} />

      <AdminRoute exact basename={props.match.path} path={'/buscaPorLocalizacao'}
        component={BuscaPorLocalizacao} />

      <AdminRoute exact basename={props.match.path} path={'/filtroLocalizacao'}
        component={() => <TabelaEstabelecimentos filtroLocalizacao={true} />} />
    </>
  )
}

export default Admin
