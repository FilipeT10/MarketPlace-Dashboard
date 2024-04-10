import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  CircularProgress,
  LinearProgress
} from '@material-ui/core';
import CuponsListResults from '../components/cupons/CuponsListResults';
import CuponsListToolbar from '../components/cupons/CuponsListToolbar';
import customers from '../__mocks__/customers';
import ServiceCupons from '../services/Cupons';
import AppConfig from 'src/AppConfig';

class Cupons extends React.Component {
  state = {
    cupons: [],
    searchText: '',
    loading: false
  };

  componentDidMount() {
    this.getCupons();
  }
  getCupons = () => {
    this.setState({ loading: true });
    ServiceCupons.getCupons()
      .then((response) => {
        var cupons = response.data;
        console.log(cupons);
        this.setState({ cupons, loading: false });
      })
      .catch((error) => {
        alert('Falha ao carregar as cupons, tente novamente mais tarde.');
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;
    const { cupons, loading, searchText } = this.state;
    return (
      <>
        <Helmet>
          <title>{'Cupons | ' + AppConfig.sigla}</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
        >
          <Container maxWidth={false}>
            {loading ? (
              <LinearProgress />
            ) : (
              <CuponsListResults customers={cupons} />
            )}
          </Container>
        </Box>
      </>
    );
  }
}

export default Cupons;
