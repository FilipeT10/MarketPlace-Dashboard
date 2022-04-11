import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Chip,
  Typography
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import { MonetizationOn, Preview, RemoveRedEye } from '@material-ui/icons';
import Edit from "@material-ui/icons/Edit";

import ServiceCategorias from '../../services/Categorias'

import ProductEdit from './ProductEdit';
import ModalSuccess from '../Other/ModalSuccess';

const ProductCard = ({ product, onHandleEdit, ...rest }) => {


  
  return(
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3
        }}
      >
     { /*  <Avatar
          alt="Product"
          src={product.media}
          variant="square"
        />*/}
      </Box>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h4"
      >
        {product.name}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        {product.ativo}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
      
        >
           {product.ativo ? <Chip
                    color="success"
                    label={"Ativo"}
                    size="small"
                  />: <Chip
                  color="warning"
                  label={"Inativo"}
                  size="small"
                />}
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {product.quantidade+" "}
            Unidades
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <MonetizationOn color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {'R$:'}
            {product.preco}
          </Typography>
        </Grid>
      </Grid>
    </Box>
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ 
          alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            display: 'flex'
          }}> 
        <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={onHandleEdit}
      >
        <Edit/>
      </IconButton>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={onHandleEdit }
      >
        <RemoveRedEye/>
      </IconButton>
        </Grid>
        
      </Grid>
    </Box>
    </Card>
)
        }

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onHandleEdit: PropTypes.func
};

export default ProductCard;
