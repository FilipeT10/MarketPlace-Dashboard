import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, CircularProgress, LinearProgress } from '@material-ui/core';
import CategoriasListResults from '../components/categorias/CategoriasListResults';
import CategoriasListToolbar from '../components/categorias/CategoriasListToolbar';
import customers from '../__mocks__/customers';
import ServiceCategorias from '../services/Categorias'



class Categorias extends React.Component {

  state = {
    categorias: [],
    searchText: "",
    loading: false
  };


  componentDidMount() {

    this.getCategoria()
  }
  getCategoria = () => {
    this.setState({loading: true})
    ServiceCategorias.getCategorias().then(response => {
        var categorias = response.data;
        console.log(categorias)
        this.setState({categorias, loading: false})
      
    }).catch(error => {
        console.log(error);
    });
  }
  handleChange = (event) => {
    this.setState({searchText: event.target.value})
  };

  render(){

    const { classes } = this.props;
    const { categorias, loading, searchText} = this.state;
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
        <CategoriasListToolbar onTextHandle={this.handleChange} />
        <Box sx={{ pt: 3 }}>
          { loading ? <LinearProgress/> :
          <CategoriasListResults customers={categorias.filter(function(item){
            return item.name.includes(searchText) || item.name.includes(searchText.toLowerCase()) || item.name.includes(searchText.toUpperCase()) || item.name.includes(searchText.charAt(0).toUpperCase()+searchText.slice(1))
          })} />
          }
          </Box>
      </Container>
    </Box>
  </>
  );
}
}



export default Categorias;
