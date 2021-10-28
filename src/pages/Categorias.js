import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from '../components/customer/CustomerListResults';
import CustomerListToolbar from '../components/customer/CustomerListToolbar';
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
        <CustomerListToolbar />
        <Box sx={{ pt: 3 }}>
          <CustomerListResults customers={categorias} />
        </Box>
      </Container>
    </Box>
  </>
  );
}
}



export default Categorias;
