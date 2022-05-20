import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, CircularProgress, LinearProgress } from '@material-ui/core';
import UsuariosListResults from '../../components/usuarios/UsuariosListResults';
import UsuariosListToolbar from '../../components/usuarios/UsuariosListToolbar';
import ServiceUsuarios from '../../services/Usuarios'
import AppConfig from 'src/AppConfig';
import ServiceLojas from 'src/services/Lojas';


class Usuarios extends React.Component {

  state = {
    usuarios: [],
    lojas: [],
    searchText: "",
    loading: false
  };


  componentDidMount() {

    this.getUsuarios()
  }
  getUsuarios = () => {
    this.setState({loading: true})
    ServiceUsuarios.getUsuarios().then(response => {
        var usuarios = response.data.items;

        ServiceLojas.getLojas().then(response => {
          var lojas = response.data.items;
          this.setState({usuarios, lojas, loading: false})
          
        }).catch(error => {
    
            alert('Falha ao carregar as lojas, tente novamente mais tarde.');
            console.log(error);
        });
      
    }).catch(error => {
        alert('Falha ao carregar as usuarios, tente novamente mais tarde.');
        console.log(error);
    });
  }

  render(){

    const { classes } = this.props;
    const { usuarios, loading, searchText, lojas} = this.state;
  return (
  <>
    <Helmet>
      <title>{'Usuarios | '+AppConfig.sigla}</title>
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
          <UsuariosListResults customers={usuarios} lojas={lojas} />
          }
      </Container>
    </Box>
  </>
  );
}
}



export default Usuarios;
