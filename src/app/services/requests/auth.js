import http from '../../config/config';

const Logar = (data) => http.post('/auth/login', data)
const Registrar = (data) => http.post('/auth/register', data) 

export {Logar, Registrar}