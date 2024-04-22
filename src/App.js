import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';

import { isAdmin, isAuthenticated } from './daos/auth';

import privateRoutes from './privateRoutes';
import adminRoutes from './adminRoutes';

const App = () => {
  const content = useRoutes(routes);

  const privateContent = useRoutes(privateRoutes);

  const adminContent = useRoutes(adminRoutes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {isAuthenticated()
          ? isAdmin()
            ? adminContent
            : privateContent
          : content}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
