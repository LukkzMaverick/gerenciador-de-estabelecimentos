import createAsyncSlice from '../../createAsyncSlice';
import {
    LocalizacoesByLoggedUser
} from '../../../services/requests/estabelecimentos';

const localizacoesByLoggedUser = createAsyncSlice({
    name: 'localizacoesByLoggedUser [GET]',
    service: LocalizacoesByLoggedUser
});

export const fetchLocalizacoesByLoggedUser = localizacoesByLoggedUser.asyncAction;

export default localizacoesByLoggedUser.reducer
