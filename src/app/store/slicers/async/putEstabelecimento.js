import createAsyncSlice from '../../createAsyncSlice';
import {
    PutEstabelecimento
} from '../../../services/requests/estabelecimentos';

const putEstabelecimento = createAsyncSlice({
    name: 'putEstabelecimento [PUT]',
    service: PutEstabelecimento
});

export const fetchPutEstabelecimento = putEstabelecimento.asyncAction;

export default putEstabelecimento.reducer