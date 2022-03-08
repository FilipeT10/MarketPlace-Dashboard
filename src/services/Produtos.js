
import api from './api'
/*
// Buscando usuários do github
api.get("users/tgmarinho")
      .then((response) => doSomething(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
     });*/

class ServiceProdutos  {
    
    static getProdutos = () => api.get(`produtos?loja=61663f593ad92700047d5e1f`)

    static saveProdutos = (json) => api.post(`produtos`, json)
  
}

export default ServiceProdutos;