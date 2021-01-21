import createAsyncSlice from '../../createAsyncSlice';
import { Registrar } from '../../../services/requests/auth';

const registrar = createAsyncSlice({
    name: 'registrar [POST]',
    service: Registrar
});

export const fetchRegistrar = registrar.asyncAction;

export default registrar.reducer