import createAsyncSlice from '../../createAsyncSlice';
import { RegistrarAdmin } from '../../../services/requests/auth';

const registrarAdmin = createAsyncSlice({
    name: 'registrarAdmin [POST]',
    service: RegistrarAdmin
});

export const fetchRegistrarAdmin = registrarAdmin.asyncAction;

export default registrarAdmin.reducer