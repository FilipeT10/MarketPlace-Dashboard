
import { getUsuario } from 'src/daos/auth'
import api from './api'
class ServiceUsuarios  {
    
    static getUsuarios = () => api.get(`users`)
    static editUsuarios = (id, json) => api.patch(`users/${id}`, json)
    static saveUsuarios = (json) => api.post(`users`, json)
}

export default ServiceUsuarios;