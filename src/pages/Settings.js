import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SettingsNotifications from '../components/settings/SettingsNotifications';
import SettingsPassword from '../components/settings/SettingsPassword';
import AppConfig from 'src/AppConfig';

const SettingsView = () => (
  <>
    <Helmet>
      <title>{'Settings | '+AppConfig.sigla}</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <SettingsNotifications />
      </Container>
    </Box>
  </>
);

export default SettingsView;
