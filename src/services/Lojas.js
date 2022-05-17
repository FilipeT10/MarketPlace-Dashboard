
import { getLoja } from 'src/daos/auth'
import api from './api'
class ServiceLojas  {
    
    static getLojas = () => api.get(`lojas`)
    static editLojas = (id, json) => api.patch(`lojas/${id}`, json)
    static saveLojas = (json) => api.post(`lojas`, json)
}

export default ServiceLojas;