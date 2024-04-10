import { getLoja } from 'src/daos/auth';
import api from './api';
class ServiceCupons {
  static getCupons = () => api.get(`cupoms?loja=${getLoja()}`);

  static editCupons = (id, json) => api.patch(`cupoms/${id}`, json);
  static saveCupons = (json) => api.post(`cupoms`, json);
}

export default ServiceCupons;
