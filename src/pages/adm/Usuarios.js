import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, CircularProgress, LinearProgress } from '@material-ui/core';
import UsuariosListResults from '../../components/usuarios/UsuariosListResults';
import UsuariosListToolbar from '../../components/usuarios/UsuariosListToolbar';
import ServiceUsuarios from '../../services/Usuarios'
import AppConfig from 'src/AppConfig';


class Usuarios extends React.Component {

  state = {
    usuarios: [],
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
        console.log("Users", usuarios)
        this.setState({usuarios, loading: false})
      
    }).catch(error => {
        alert('Falha ao carregar as usuarios, tente novamente mais tarde.');
        console.log(error);
    });
  }

  render(){

    const { classes } = this.props;
    const { usuarios, loading, searchText} = this.state;
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
          <UsuariosListResults customers={usuarios} />
          }
      </Container>
    </Box>
  </>
  );
}
}



export default Usuarios;
