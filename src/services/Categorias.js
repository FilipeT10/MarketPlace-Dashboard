
import api from './api'
class ServiceCategorias  {
    
    static getCategorias = () => api.get(`categorias?loja=61663f593ad92700047d5e1f`)
  
    static editCategorias = (id, json) => api.patch(`categorias/${id}`, json)
    static saveCategorias = (json) => api.post(`categorias`, json)
  
    static getInfo = () => api.get(`info`)
}

export default ServiceCategorias;