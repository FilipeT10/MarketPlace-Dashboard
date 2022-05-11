import { useState } from 'react';
import { Link as RouterLink , useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';
import { logout } from 'src/services/auth';



const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {

  const navigate = useNavigate();
  const [notifications] = useState([]);

  const signOut = () => {
    logout()

    navigate('/', { replace: true });
  }

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <div>
          <Logo />
          </div>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden >
          <IconButton color="inherit" size="large">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" size="large" onClick={() => signOut()}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
