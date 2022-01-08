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

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'categorias', element: <Categorias /> },
      { path: 'cadastrar-categoria', element: <CadastrarCategoria /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <Produtos /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
