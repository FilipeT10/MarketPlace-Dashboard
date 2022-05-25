import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, CircularProgress, LinearProgress } from '@material-ui/core';
import SubCategoriasListResults from '../components/subcategorias/SubCategoriasListResults';
import SubCategoriasListToolbar from '../components/subcategorias/SubCategoriasListToolbar';
import customers from '../__mocks__/customers';
import ServiceSubCategorias from '../services/SubCategorias'
import AppConfig from 'src/AppConfig';
import ServiceCategorias from 'src/services/Categorias';



class SubSubCategorias extends React.Component {

  state = {
    subcategorias: [],
    categorias: [],
    searchText: "",
    loading: false
  };


  componentDidMount() {

    this.getSubCategoria()
  }
  getSubCategoria = () => {
    this.setState({loading: true})
    ServiceSubCategorias.getSubCategorias().then(response => {
        var subcategorias = response.data;
        console.log(subcategorias)
        ServiceCategorias.getCategorias().then(response => {
          var categorias = response.data;
          this.setState({subcategorias, categorias, loading: false})
          
        }).catch(error => {
    
            alert('Falha ao carregar as categorias, tente novamente mais tarde.');
            console.log(error);
        });
      
    }).catch(error => {
        alert('Falha ao carregar as subcategorias, tente novamente mais tarde.');
        console.log(error);
    });
  }

  render(){

    const { classes } = this.props;
    const { subcategorias, categorias, loading, searchText} = this.state;
  return (
  <>
    <Helmet>
      <title>{'SubCategorias | '+AppConfig.sigla}</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
          { loading ? <LinearProgress/> :
          <SubCategoriasListResults customers={subcategorias} categorias={categorias} />
          }
      </Container>
    </Box>
  </>
  );
}
}



export default SubSubCategorias;
