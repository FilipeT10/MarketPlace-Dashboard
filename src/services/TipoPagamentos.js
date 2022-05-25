
import { getLoja } from 'src/daos/auth'
import api from './api'
class ServiceTipoPagamentos  {
    
    static getTipoPagamentos = () => api.get(`tipopagamentos`)
    static editTipoPagamentos = (id, json) => api.patch(`tipopagamentos/${id}`, json)
    static saveTipoPagamentos = (json) => api.post(`tipopagamentos`, json)
}

export default ServiceTipoPagamentos;