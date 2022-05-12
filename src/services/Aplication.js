
import { getLoja } from 'src/daos/auth';
import api from './api'

class Aplication  {
    
    static getAplicationInfo = () => api.get(`/lojas/`+getLoja())
  
}

export default Aplication;