import http from '../../config/config';

const EstabelecimentosByLoggedUser = () => http.get('/estabelecimento')
const GetOneEstabelecimentoByLoggedUser = (estabelecimentoId) => {
    return http.get(`/estabelecimento/getOne/${estabelecimentoId}`)
}
const PostEstabelecimento = (data) => http.post('/estabelecimento', data)
const PutEstabelecimento = 
(data) => http.put(`/estabelecimento/${data.estabelecimentoId}`, 
{nome: data.nome, localizacaoId: data.localizacaoId, nomeLocalizacao: data.nomeLocalizacao})

const DeleteEstabelecimento = (estabelecimentoId) => http.delete(`/estabelecimento/${estabelecimentoId}`)

const LocalizacoesByLoggedUser = () => http.get(`/estabelecimento/localizacoes/byLoggedUser`)

const EstabelecimentosByLocalizacaoAndLoggedUser = 
(localizacaoId) => http.get(`/estabelecimento/${localizacaoId}`)

export {
    EstabelecimentosByLoggedUser, 
    PostEstabelecimento, 
    GetOneEstabelecimentoByLoggedUser,
    PutEstabelecimento,
    DeleteEstabelecimento,
    LocalizacoesByLoggedUser,
    EstabelecimentosByLocalizacaoAndLoggedUser
}

