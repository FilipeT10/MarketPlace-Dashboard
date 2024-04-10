import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  CircularProgress,
  LinearProgress
} from '@material-ui/core';
import LojasListResults from '../../components/lojas/LojasListResults';
import LojasListToolbar from '../../components/lojas/LojasListToolbar';
import ServiceLojas from '../../services/Lojas';
import AppConfig from 'src/AppConfig';

class Lojas extends React.Component {
  state = {
    lojas: [],
    searchText: '',
    loading: false
  };

  componentDidMount() {
    this.getLojas();
  }
  getLojas = () => {
    this.setState({ loading: true });
    ServiceLojas.getLojas()
      .then((response) => {
        var lojas = response.data.items;
        console.log(lojas);
        this.setState({ lojas, loading: false });
      })
      .catch((error) => {
        alert('Falha ao carregar as lojas, tente novamente mais tarde.');
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;
    const { lojas, loading, searchText } = this.state;
    return (
      <>
        <Helmet>
          <title>{'Lojas | ' + AppConfig.sigla}</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
        >
          <Container maxWidth={false}>
            {loading ? <LinearProgress /> : <LojasListResults objs={lojas} />}
          </Container>
        </Box>
      </>
    );
  }
}

export default Lojas;
