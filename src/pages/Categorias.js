import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  CircularProgress,
  LinearProgress
} from '@material-ui/core';
import CategoriasListResults from '../components/categorias/CategoriasListResults';
import CategoriasListToolbar from '../components/categorias/CategoriasListToolbar';
import ServiceCategorias from '../services/Categorias';
import AppConfig from 'src/AppConfig';

class Categorias extends React.Component {
  state = {
    categorias: [],
    searchText: '',
    loading: false
  };

  componentDidMount() {
    this.getCategoria();
  }
  getCategoria = () => {
    this.setState({ loading: true });
    ServiceCategorias.getCategorias()
      .then((response) => {
        var categorias = response.data;
        console.log(categorias);
        this.setState({ categorias, loading: false });
      })
      .catch((error) => {
        alert('Falha ao carregar as categorias, tente novamente mais tarde.');
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;
    const { categorias, loading, searchText } = this.state;
    return (
      <>
        <Helmet>
          <title>{'Categorias | ' + AppConfig.sigla}</title>
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
              <CategoriasListResults objs={categorias} />
            )}
          </Container>
        </Box>
      </>
    );
  }
}

export default Categorias;
