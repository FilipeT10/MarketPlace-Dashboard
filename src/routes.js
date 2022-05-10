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

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'perfil', element: <Account /> },
      { path: 'categorias', element: <Categorias /> },
      { path: 'cadastrar-categoria', element: <CadastrarCategoria /> },
      { path: 'cadastrar-produto', element: <CadastrarProduto /> },
      { path: 'painel', element: <Dashboard /> },
      { path: 'produtos', element: <Produtos /> },
      { path: 'configuracoes', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'cadastro', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/painel" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
