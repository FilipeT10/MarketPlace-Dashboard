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
import Lojas from './pages/adm/Lojas';
import CadastrarLoja from './pages/adm/CadastrarLoja';
import Usuarios from './pages/adm/Usuarios';
import CadastrarUsuario from './pages/adm/CadastrarUsuario';

const adminRoutes = [
  {
    path: 'adm',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <Navigate to="/adm/painel" /> },
      { path: 'perfil', element: <Account /> },
      { path: 'lojas', element: <Lojas /> },
      { path: 'cadastrar-loja', element: <CadastrarLoja /> },
      { path: 'cadastrar-usuario', element: <CadastrarUsuario /> },
      { path: 'usuarios', element: <Usuarios /> },
      { path: 'painel', element: <Dashboard /> },
      { path: 'extratos', element: <Produtos /> },
      { path: 'configuracoes', element: <Settings /> },
      { path: 'cadastro', element: <Register /> },
      { path: 'avisos', element: <Register /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/adm/painel" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default adminRoutes;
