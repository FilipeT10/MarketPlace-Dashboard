import { Helmet } from 'react-helmet';
import {
  Box,
  Card,
  Container,
  Grid,
  Pagination,
  LinearProgress
} from '@material-ui/core';
import ProductListToolbar from '../components/product/ProductListToolbar';
import ProductCard from '../components/product/ProductCard';
import ProductEdit from '../components/product/ProductEdit';
import products from '../__mocks__/products';
import ProductListResults from 'src/components/product/ProductListResults';

import React from 'react';
import ServiceProdutos from '../services/Produtos'

import ServiceCategorias from '../services/Categorias'
import AppConfig from 'src/AppConfig';


class Produtos extends React.Component {

  state = {
    produtos: [],
    searchText: "",
    isList: false,
    loading: false,
    categorias: [],
    isEdit: false,
    values: {}
  };


  componentDidMount() {

    this.getProdutos()
  }
  getProdutos = () => {

    this.setState({loading: true})
    ServiceProdutos.getProdutos().then(response => {
        var produtos = response.data;
        console.log(produtos)
        this.setState({produtos, loading: false})
      
    }).catch(error => {
        alert('Falha ao carregar os produtos, tente novamente mais tarde.');
        console.log(error);
    });
  }
  
  getCategorias = () => {
    ServiceCategorias.getCategorias().then(response => {
        var categorias = response.data;
        this.setState({categorias})
      
    }).catch(error => {
        alert('Falha ao carregar as categorias, tente novamente mais tarde.');
        console.log(error);
    });
  }


  
  handleBackEdit = () => {
    this.setState({isEdit: false})
  };
  handleEdit = (customer) => {
    this.getCategorias()
    this.setState({values:{nome: customer.name, ...customer}, isEdit: true})
  };

  handleChange = (event) => {
    this.setState({searchText: event.target.value})
  };

  render(){

    const { classes } = this.props;
    const { produtos, isList, loading, searchText, values, isEdit, categorias} = this.state;
  

  return(
  <>
    <Helmet>
      <title>{'Produtos | '+AppConfig.sigla}</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        {!isEdit && !isList && 
        <ProductListToolbar onTextHandle={this.handleChange} onListType={() => {isList ?  this.setState({isList: false}) : this.setState({isList: true})}} />
          }
        <div>
        { loading ? <LinearProgress/> :
          isList ? <ProductListResults customers={produtos}  onListType={() => {isList ?  this.setState({isList: false}) : this.setState({isList: true})}} /> : <Grid
            container
            spacing={3}
          >
            {isEdit ? 
              <Card sx={{ backgroundColor: 'background.default', marginLeft: 3, marginTop: 3, width: '100%'}}>
                <ProductEdit product={values} categorias={categorias} onBackEdit={this.handleBackEdit}/>
              </Card>
            :
            
            produtos.filter(function(item){
              return item.name.includes(searchText) || item.name.includes(searchText.toLowerCase()) || item.name.includes(searchText.toUpperCase()) || item.name.includes(searchText.charAt(0).toUpperCase()+searchText.slice(1))
             }).map((produto) => (

              <Grid
                style={{marginTop: 20}}
                item
                key={produto._id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard product={produto} onHandleEdit={ () => this.handleEdit(produto)} />
              </Grid> 
            ))}
          </Grid>
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
        
export default Produtos;
