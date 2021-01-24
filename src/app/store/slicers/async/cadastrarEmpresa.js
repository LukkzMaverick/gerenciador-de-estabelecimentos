import createAsyncSlice from '../../createAsyncSlice';
import { CadastrarEmpresa } from '../../../services/requests/empresa';

const cadastrarEmpresa = createAsyncSlice({
    name: 'cadastrarEmpresa [POST]',
    service: CadastrarEmpresa
});

export const fetchCadastrarEmpresa = cadastrarEmpresa.asyncAction;

export default cadastrarEmpresa.reducer