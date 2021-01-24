import createAsyncSlice from '../../createAsyncSlice';
import { GetAllEmpresas } from '../../../services/requests/empresa';

const getAllEmpresas = createAsyncSlice({
    name: 'getAllEmpresas [GET]',
    service: GetAllEmpresas
});

export const fetchGetAllEmpresas = getAllEmpresas.asyncAction;

export default getAllEmpresas.reducer