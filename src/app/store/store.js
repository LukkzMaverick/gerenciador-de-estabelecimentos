import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logar from './slicers/async/logar';
import selectEstabelecimentoASerEditado from './slicers/selectEstabelecimentoASerEditado';
import putEstabelecimento from './slicers/async/putEstabelecimento';
import selectFiltroLocalizacao from './slicers/selectFiltroLocalizacao';

const authReducer = combineReducers({login: logar})
const estabelecimentosReducer = combineReducers({selectEstabelecimentoASerEditado, 
  putEstabelecimento, selectFiltroLocalizacao})
export default configureStore({
  reducer: {
    auth: authReducer,
    estabelecimentos: estabelecimentosReducer
  },
});