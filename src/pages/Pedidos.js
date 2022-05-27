import { Helmet } from 'react-helmet';
import {
  Box,
  Card,
  Container,
  Grid,
  Pagination,
  LinearProgress
} from '@material-ui/core';
import PedidosListResults from 'src/components/pedidos/PedidosListResults';

import React from 'react';
import ServicePedidos from '../services/Pedidos'

import ServiceCategorias from '../services/Categorias'
import AppConfig from 'src/AppConfig';
import ServiceSubCategorias from 'src/services/SubCategorias';
import ServiceUsuarios from 'src/services/Usuarios';
import ServiceTipoPagamentos from 'src/services/TipoPagamentos';


class Pedidos extends React.Component {

  state = {
    pedidos: [],
    usuarios: [],
    tipopagamentos: [],
    searchText: "",
    isList: false,
    loading: false,
    categorias: [],
    isEdit: false,
    values: {}
  };


  componentDidMount() {

    this.getPedidos()
  }
  getPedidos = () => {

    this.setState({loading: true})
    ServicePedidos.getPedidos().then(response => {
        var pedidos = response.data;
        console.log(pedidos)
        this.setState({pedidos})
        this.getUsers()
    }).catch(error => {
        alert('Falha ao carregar os pedidos, tente novamente mais tarde.');
        console.log(error);
    });
  }
  
  getUsers = () => {
    ServiceUsuarios.getUsuarios().then(response => {
        var usuarios = response.data.items;
        this.setState({usuarios})
        this.getTipoPagamendos()
    }).catch(error => {
        alert('Falha ao carregar, tente novamente mais tarde.');
        console.log(error);
    });
  }
  getTipoPagamendos = () => {
    ServiceTipoPagamentos.getTipoPagamentos().then(response => {
        var tipopagamentos = response.data.items;
        this.setState({tipopagamentos, loading: false})
      
    }).catch(error => {
        alert('Falha ao carregar, tente novamente mais tarde.');
        console.log(error);
    });
  }


  
  handleBackEdit = () => {
    this.setState({isEdit: false})
  };
  handleEdit = (customer) => {
   
    this.setState({values:{nome: customer.name, ...customer}, isEdit: true})
  };

  handleChange = (event) => {
    this.setState({searchText: event.target.value})
  };

  render(){

    const { classes } = this.props;
    const { pedidos, isList, loading, searchText, values, isEdit, usuarios, tipopagamentos} = this.state;
  

  return(
  <>
    <Helmet>
      <title>{'Pedidos | '+AppConfig.sigla}</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
       
        <div>
        { loading ? <LinearProgress/> :
           <PedidosListResults customers={pedidos} usuarios={usuarios} tipopagamentos={tipopagamentos}  onListType={() => {isList ?  this.setState({isList: false}) : this.setState({isList: true})}} />  
          }
        </div>
        { loading == false ?
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
        </Box> : <div/>
         }
      </Container>
    </Box>
  </>
)
}
}
        
export default Pedidos;
