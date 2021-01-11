import createAsyncSlice from '../../createAsyncSlice';
import {Logar} from '../../../services/requests/auth'

const logar = createAsyncSlice({
    name: 'Logar [POST]',
    service: Logar
});

export const fetchLogar = logar.asyncAction;

export default logar.reducer