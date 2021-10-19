
import api from '../services/api'
/*
// Buscando usuários do github
api.get("users/tgmarinho")
      .then((response) => doSomething(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
     });*/

class Categorias  {
    
    static getCategorias = () => api.get(`categorias?loja=61663f593ad92700047d5e1f&ativo=true`)
  
}

export default Categorias;