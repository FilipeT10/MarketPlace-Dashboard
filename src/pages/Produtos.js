import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Pagination,
  LinearProgress
} from '@material-ui/core';
import ProductListToolbar from '../components/product/ProductListToolbar';
import ProductCard from '../components/product/ProductCard';
import products from '../__mocks__/products';
import ProductListResults from 'src/components/product/ProductListResults';

import React from 'react';
import ServiceProdutos from '../services/Produtos'



class Produtos extends React.Component {

  state = {
    produtos: [],
    searchText: "",
    isList: false,
    loading: false
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
        console.log(error);
    });
  }
  
  handleChange = (event) => {
    this.setState({searchText: event.target.value})
  };

  render(){

    const { classes } = this.props;
    const { produtos, isList, loading, searchText} = this.state;
  

  return(
  <>
    <Helmet>
      <title>Produtos</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <ProductListToolbar onTextHandle={this.handleChange}  onListType={() => {isList ?  this.setState({isList: false}) : this.setState({isList: true})}} />
        <Box sx={{ pt: 3 }}>
        { loading ? <LinearProgress/> :
          isList ? <ProductListResults customers={produtos.filter(function(item){
            return item.name.includes(searchText) || item.name.includes(searchText.toLowerCase()) || item.name.includes(searchText.toUpperCase()) || item.name.includes(searchText.charAt(0).toUpperCase()+searchText.slice(1))
          })} /> : <Grid
            container
            spacing={3}
          >
            {produtos.filter(function(item){
            return item.name.includes(searchText) || item.name.includes(searchText.toLowerCase()) || item.name.includes(searchText.toUpperCase()) || item.name.includes(searchText.charAt(0).toUpperCase()+searchText.slice(1))
          }).map((produto) => (
              <Grid
                item
                key={produto._id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard product={produto} />
              </Grid>
            ))}
          </Grid>
          }
        </Box>
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
