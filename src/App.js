import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';

import { isAuthenticated } from "./services/auth";


import privateRoutes from './privateRoutes';

const App = () => {
  const content = useRoutes(routes);

  const privateContent = useRoutes(privateRoutes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {isAuthenticated() ? privateContent : content}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
