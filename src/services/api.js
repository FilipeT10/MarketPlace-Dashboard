import axios from "axios";

import { getToken } from "../daos/auth";

// Pode ser algum servidor executando localmente: 
// http://localhost:3000

const api = axios.create({
  //baseURL: "http://[::]:3000"
 //   baseURL: "https://marketplace-base.herokuapp.com"
  baseURL: "https://markbaseservice.onrender.com"
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

/*api.interceptors.request.use(request => {
   request.headers = {
        'Content-Type': 'application/json'
    }

    /*if(request.method == 'post'){

    request.headers['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpc3MiOiJNYXJrZXRQbGFjZS1BUEktTWFuYWdlciIsImlhdCI6MTYzNDA5MDgzMn0.hjzDcQhdSJjpYOZ77zl4dea4Xx9kOQS5YUrnloHkFZA";
   
    console.log('REQUEST Bearer');
    }
 
    console.log('REQUEST', request);
    return request;
})*/

api.interceptors.response.use((response) => {
    console.log('RESPONSE', response);
    return response;
}, error => {
    console.log(error)
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
        }else{

        console.log('RESPONSE error', error.response.data);
        }
        if (error.response.data.message == 'Invalid request') {
            error.response.data.message = 'Ocorreu uma situação inesperada. Tente novamente em alguns minutos.';
        }

        console.log('RESPONSE error', error);

        console.log('RESPONSE error', error.response);

        console.log('RESPONSE error', error.response.message);
        return Promise.reject(error);
    }
});



export default api;