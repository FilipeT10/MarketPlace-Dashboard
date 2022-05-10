import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountProfile from '../components/account/AccountProfile';
import AccountProfileDetails from '../components/account/AccountProfileDetails';
import AppConfig from 'src/AppConfig';
import SettingsPassword from 'src/components/settings/SettingsPassword';

const Account = () => (
  <>
    <Helmet>
      <title>{'Perfil | '+AppConfig.sigla}</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails />
          </Grid>
        </Grid>

        <Box sx={{ pt: 3 }}>
          <SettingsPassword />
        </Box>
      </Container>

      
    
    </Box>
  </>
);

export default Account;
