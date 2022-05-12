
import { getLoja } from 'src/daos/auth'
import api from './api'
class ServiceCategorias  {
    
    static getCategorias = () => api.get(`categorias?loja=${getLoja()}`)
  
    static editCategorias = (id, json) => api.patch(`categorias/${id}`, json)
    static saveCategorias = (json) => api.post(`categorias`, json)
  
    static getInfo = () => api.get(`info`)
}

export default ServiceCategorias;