import { getLoja } from 'src/daos/auth';
import api from './api';
class ServicePedidos {
  static getPedidos = () => api.get(`pedidos?loja=${getLoja()}`);
  static editPedidos = (id, json) => api.patch(`pedidos/${id}`, json);
  static getSubtotalValue = (json) =>
    api.post(`pedidos/subtotal/${getLoja()}`, json);
  static savePedidos = (json) => api.post(`pedidos`, json);
  static aprovarPedido = (id) => api.post(`pedidos/${id}/aprovar`);
  static pagoPedido = (id) => api.post(`pedidos/${id}/pago`);
  static entregaPedido = (id) => api.post(`pedidos/${id}/entrega`);
  static finalizarPedido = (id) => api.post(`pedidos/${id}/finalizar`);
  static cancelarPedido = (id) => api.post(`pedidos/${id}/cancelar`);
}

export default ServicePedidos;
