import http from '../../config/config';

const CadastrarEmpresa = (data) => http.post('/empresa', data)
const EmpresaByLoggedUser = (data) => http.get('/empresa/byLoggedUser')
const GetAllEmpresas = (data) => http.get('/empresa')
export {CadastrarEmpresa, EmpresaByLoggedUser, GetAllEmpresas}

