import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  Bell as BellIcon,
  Archive,
  CreditCard,
  Folder,
  FolderMinus
} from 'react-feather';
import NavItem from './NavItem';
import { getNome, getProfile, isAdmin } from 'src/daos/auth';
import { CardGiftcardOutlined, NotificationsOutlined} from '@material-ui/icons';


const items = [
  {
    href: '/app/painel',
    icon: BarChartIcon,
    title: 'Painel'
  },
  {
    href: '/app/categorias',
    icon: Folder,
    title: 'Categorias'
  },
  {
    href: '/app/subcategorias',
    icon: FolderMinus,
    title: 'Subcategorias'
  },
  {
    href: '/app/produtos',
    icon: ShoppingBagIcon,
    title: 'Produtos'
  },
  {
    href: '/app/perfil',
    icon: UserIcon,
    title: 'Perfil'
  },
  {
    href: '/app/configuracoes',
    icon: SettingsIcon,
    title: 'Configurações'
  },
  {
    href: '/app/cadastro',
    icon: UserPlusIcon,
    title: 'Cadastro'
  },
];

const itemsAdm = [
  {
    href: '/adm/painel',
    icon: BarChartIcon,
    title: 'Painel'
  },
  {
    href: '/adm/usuarios',
    icon: UsersIcon,
    title: 'Usuários'
  },
  {
    href: '/adm/lojas',
    icon: ShoppingBagIcon,
    title: 'Lojas'
  },
  {
    href: '/adm/extratos',
    icon: Archive,
    title: 'Extrato'
  },
  {
    href: '/adm/tipopagamento',
    icon: CreditCard,
    title: 'Tipo de Pagamentos'
  },
  {
    href: '/adm/avisos',
    icon: BellIcon,
    title: 'Avisos'
  },
  {
    href: '/adm/perfil',
    icon: UserIcon,
    title: 'Perfil'
  },
  {
    href: '/app/configuracoes',
    icon: SettingsIcon,
    title: 'Configurações'
  },
  
];


const DashboardSidebar = ({ onMobileClose, openMobile }) => {

  const user = {
    avatar: '/static/images/avatars/avatar.png',
    jobTitle: getProfile() == 'admin' ? 'Administrador' : getProfile() == 'sysAdminMktPlc' ? 'Sistema' : '' ,
    name: getNome()
  };
  
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          { isAdmin() ? 
            itemsAdm.map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))
          :
          items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
     
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden xlDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {
  },
  openMobile: false
};

export default DashboardSidebar;
