import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import Categorias from './pages/Categorias';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Produtos from './pages/Produtos';
import Register from './pages/Register';
import Settings from './pages/Settings';
import CadastrarCategoria from './pages/CadastrarCategoria';
import CadastrarProduto from './pages/CadastrarProduto';
import SubSubCategorias from './pages/SubCategorias';
import CadastrarSubCategoria from './pages/CadastrarSubCategoria';
import Pedidos from './pages/Pedidos';
import CadastrarPedido from './pages/CadastrarPedido';
import EditarPedido from './pages/EditarPedido';

const privateRoutes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <Navigate to="/app/painel" /> },
      { path: 'perfil', element: <Account /> },
      { path: 'categorias', element: <Categorias /> },
      { path: 'cadastrar-categoria', element: <CadastrarCategoria /> },
      { path: 'subcategorias', element: <SubSubCategorias /> },
      { path: 'cadastrar-subcategoria', element: <CadastrarSubCategoria /> },
      { path: 'cadastrar-produto', element: <CadastrarProduto /> },
      { path: 'cadastrar-pedido', element: <CadastrarPedido /> },
      { path: 'painel', element: <Dashboard /> },
      { path: 'produtos', element: <Produtos /> },
      { path: 'pedidos', element: <Pedidos /> },
      { path: 'editar-pedido', element: <EditarPedido /> },
      { path: 'configuracoes', element: <Settings /> },
      { path: 'cadastro', element: <Register /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/painel" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default privateRoutes;
