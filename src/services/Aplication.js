
import api from './api'

class Aplication  {
    
    static getAplicationInfo = () => api.get(`/lojas/61663f593ad92700047d5e1f`)
  
}

export default Aplication;