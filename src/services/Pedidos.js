
import { getLoja } from 'src/daos/auth';
import api from './api'
/*
// Buscando usuários do github
api.get("users/tgmarinho")
      .then((response) => doSomething(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
     });*/

class ServicePedidos  {
  
    
    static getPedidos = () => api.get(`pedidos?loja=${getLoja()}`)

    static editPedidos = (id, json) => api.patch(`pedidos/${id}`, json)
    static savePedidos = (json) => api.post(`pedidos`, json)
  
}

export default ServicePedidos;