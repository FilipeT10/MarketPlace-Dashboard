import axios from "axios";

import ServiceConfig from '../config/ServiceConfig';

// Pode ser algum servidor executando localmente: 
// http://localhost:3000

const api = axios.create({
  baseURL: ServiceConfig.url
});

api.interceptors.request.use(request => {
   /* request.headers = {
        'Accept': 'application/json, text/plain',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': getContentTypeHeader(type),
    };*/

    /*if (Usuario.token) {
        request.headers['Authorization'] = Usuario.token;
    }*/

    console.log('REQUEST', request);
    return request;
});

api.interceptors.response.use((response) => {
    console.log('RESPONSE', response);
    return response;
}, error => {
    if (error.response === undefined) {
        console.log('RESPONSE error : Ocorreu uma situação inesperada. Tente novamente em alguns minutos.');
        let data;
        data = { message: 'Ocorreu uma situação inesperada. Tente novamente em alguns minutos.' }

        return Promise.reject(data);

    }
    else {
        if (error.response.data === undefined) {

            console.log('RESPONSE error : Ocorreu uma situação inesperada. Tente novamente em alguns minutos.');

            return Promise.reject('Ocorreu uma situação inesperada. Tente novamente em alguns minutos.');
        }
        if (error.response.data.message == 'Invalid request') {
            error.response.data.message = 'Ocorreu uma situação inesperada. Tente novamente em alguns minutos.';
        }

        console.log('RESPONSE error', error);
        return Promise.reject(error);
    }
});



export default api;