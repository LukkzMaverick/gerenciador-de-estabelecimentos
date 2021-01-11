import createAsyncSlice from '../../createAsyncSlice';
import {EstabelecimentosByLocalizacaoAndLoggedUser} from '../../../services/requests/estabelecimentos'

const estabelecimentosByLocalizacaoAndLoggedUser = createAsyncSlice({
    name: 'estabelecimentosByLocalizacaoAndLoggedUser [GET]',
    service: EstabelecimentosByLocalizacaoAndLoggedUser
});

export const fetchEstabelecimentosByLocalizacaoAndLoggedUser = 
estabelecimentosByLocalizacaoAndLoggedUser.asyncAction;

export default estabelecimentosByLocalizacaoAndLoggedUser.reducer

