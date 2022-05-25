
import { getLoja } from 'src/daos/auth'
import api from './api'
class ServiceSubCategorias  {
    
    static getSubCategorias = () => api.get(`subcategorias?loja=${getLoja()}`)
  
    static editSubCategorias = (id, json) => api.patch(`subcategorias/${id}`, json)
    static saveSubCategorias = (json) => api.post(`subcategorias`, json)
  
}

export default ServiceSubCategorias;