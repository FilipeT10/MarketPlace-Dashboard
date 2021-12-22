import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CategoriasListResults from '../components/categorias/CategoriasListResults';
import CategoriasListToolbar from '../components/categorias/CategoriasListToolbar';
import customers from '../__mocks__/customers';
import ServiceCategorias from '../services/Categorias'



class Categorias extends React.Component {

  state = {
    categorias: []
  };


  componentDidMount() {

    this.getCategoria()
  }
  getCategoria = () => {
    ServiceCategorias.getCategorias().then(response => {
        var categorias = response.data;
        console.log(categorias)
        this.setState({categorias})
      
    }).catch(error => {
        console.log(error);
    });
  }
  

  render(){

    const { classes } = this.props;
    const { categorias} = this.state;
  return (
  <>
    <Helmet>
      <title>Categorias</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CategoriasListToolbar />
        <Box sx={{ pt: 3 }}>
          <CategoriasListResults customers={categorias} />
        </Box>
      </Container>
    </Box>
  </>
  );
}
}



export default Categorias;
