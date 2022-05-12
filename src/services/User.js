
import api from './api'

class ServiceUser  {
    
  
    static authenticate = (json) => api.post(`users/authenticateSgm`, json)



  
    static getInfo = () => api.get(`info`)
}

export default ServiceUser;