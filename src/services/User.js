
import api from './api'
/*
// Buscando usuários do github
api.get("users/tgmarinho")
      .then((response) => doSomething(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
     });*/

class ServiceUser  {
    
   // static getCategorias = () => api.get(`categorias?loja=61663f593ad92700047d5e1f`)
  
    static authenticate = (json) => api.post(`users/authenticate`, json)
   /* static saveCategorias = (json) => api.post(`categorias`, json)
  
    static getInfo = () => api.get(`info`)*/
}

export default ServiceUser;