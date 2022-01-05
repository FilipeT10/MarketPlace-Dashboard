
import api from './api'
/*
// Buscando usuários do github
api.get("users/tgmarinho")
      .then((response) => doSomething(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
     });*/

class ServiceCategorias  {
    
    static getCategorias = () => api.get(`categorias?loja=61663f593ad92700047d5e1f`)
  
    static editCategorias = (id, json) => api.patch(`categorias/${id}`, json)
  
    static getInfo = () => api.get(`info`)
}

export default ServiceCategorias;