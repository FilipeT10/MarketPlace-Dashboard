import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, LinearProgress } from '@material-ui/core';
import CuponsListResults from '../components/cupons/CuponsListResults';
import ServiceCupons from '../services/Cupons';
import AppConfig from 'src/AppConfig';
import ServiceCategorias from 'src/services/Categorias';
import ServiceSubCategorias from 'src/services/SubCategorias';

class Cupons extends React.Component {
  state = {
    cupons: [],
    searchText: '',
    categorias: [],
    subcategorias: [],
    loading: false
  };

  componentDidMount() {
    this.getCupons();
  }
  getCategorias = () => {
    ServiceCategorias.getCategorias()
      .then((response) => {
        var categorias = response.data;
        this.setState({ categorias });
        ServiceSubCategorias.getSubCategorias()
          .then((response) => {
            console.log(response.data);
            var subcategorias = response.data;
            this.setState({ subcategorias, loading: false });
          })
          .catch((error) => {
            alert(
              'Falha ao carregar as subcategorias, tente novamente mais tarde.'
            );
            console.log(error);
          });
      })
      .catch((error) => {
        alert('Falha ao carregar as categorias, tente novamente mais tarde.');
        console.log(error);
      });
  };
  getCupons = () => {
    this.setState({ loading: true });
    ServiceCupons.getCupons()
      .then((response) => {
        var cupons = response.data;
        console.log(cupons);
        this.setState({ cupons });
        this.getCategorias();
      })
      .catch((error) => {
        alert('Falha ao carregar as cupons, tente novamente mais tarde.');
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;
    const { cupons, loading, searchText, categorias, subcategorias } =
      this.state;
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
              <CuponsListResults
                objs={cupons.sort((x, y) => Number(y.ativo) - Number(x.ativo))}
                categorias={categorias}
                subcategorias={subcategorias}
              />
            )}
          </Container>
        </Box>
      </>
    );
  }
}

export default Cupons;
