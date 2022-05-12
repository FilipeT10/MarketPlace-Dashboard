
import { getLoja } from 'src/daos/auth';
import api from './api'
/*
// Buscando usuários do github
api.get("users/tgmarinho")
      .then((response) => doSomething(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
     });*/

class ServiceProdutos  {
  
    
    static getProdutos = () => api.get(`produtos?loja=${getLoja()}`)

    static editProdutos = (id, json) => api.patch(`produtos/${id}`, json)
    static saveProdutos = (json) => api.post(`produtos`, json)
  
}

export default ServiceProdutos;