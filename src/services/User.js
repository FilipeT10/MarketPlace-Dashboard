
import api from './api'

class ServiceUser  {
    
   // static getCategorias = () => api.get(`categorias?loja=61663f593ad92700047d5e1f`)
  
    static authenticate = (json) => api.post(`users/authenticateSgm`, json)
   /* static saveCategorias = (json) => api.post(`categorias`, json)
  
    static getInfo = () => api.get(`info`)*/
}

export default ServiceUser;