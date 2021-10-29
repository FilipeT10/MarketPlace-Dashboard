import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Pagination
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
    isList: false
  };


  componentDidMount() {

    this.getProdutos()
  }
  getProdutos = () => {
    ServiceProdutos.getProdutos().then(response => {
        var produtos = response.data;
        console.log(produtos)
        this.setState({produtos})
      
    }).catch(error => {
        console.log(error);
    });
  }
  

  render(){

    const { classes } = this.props;
    const { produtos, isList} = this.state;
  

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
        <ProductListToolbar onListType={() => {isList ?  this.setState({isList: false}) : this.setState({isList: true})}} />
        <Box sx={{ pt: 3 }}>
          {isList ? <ProductListResults customers={produtos} /> : <Grid
            container
            spacing={3}
          >
            {products.map((product) => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          }
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Box>
  </>
)
}
}
        
export default Produtos;
