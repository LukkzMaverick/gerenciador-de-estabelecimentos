import createAsyncSlice from '../../createAsyncSlice';
import {
    PostEstabelecimento
} from '../../../services/requests/estabelecimentos';

const postEstabelecimento = createAsyncSlice({
    name: 'postEstabelecimento [POST]',
    service: PostEstabelecimento
});

export const fetchPostEstabelecimento = postEstabelecimento.asyncAction;

export default postEstabelecimento.reducer