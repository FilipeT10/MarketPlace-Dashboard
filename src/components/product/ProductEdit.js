import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ServiceProdutos from '../../services/Produtos'
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Checkbox,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Grid,
  Switch,
  Alert
} from '@material-ui/core';
import getInitials from '../../utils/getInitials';

import Edit from "@material-ui/icons/Edit";

import IconButton from "@material-ui/core/IconButton";

import { ArrowBack, TrendingUpOutlined } from '@material-ui/icons';
import TagsInput from '../Other/TagsInput';
import ModalFeedback from '../Other/ModalFeedback';
import InputImages from '../Other/InputImages';


var tamanhos = []

var cores = []

var ingredientes = []

var imagens = []

const ProductEdit = ({ product, categorias, onBackEdit, ...rest }) => {
  const [isChecked, setChecked] = useState(product.ativo);
  const [values, setValues] = useState(product);

  const [modalVisible, setModalVisible] = useState(false)
  const [modalSuccess, setModalSuccess] = useState(true)

  const [errorImagem, setErrorImagem] = useState(false)
  
  const tipoProdutos = [
    {
      value: 'roupa',
      label: 'Roupas'
    },
    {
      value: 'tenis',
      label: 'Tênis'
    },
    {
      value: 'alimentacao',
      label: 'Alimentação'
    }
  ];

  const handleSelecetedTamanhos =(items) =>{
    tamanhos = items
    console.log("tamanhos "+tamanhos);
  }
  const handleSelecetedCores =(items) =>{
    cores = items
    console.log("cores "+cores);
  }
  const handleSelecetedIngredientes =(items) =>{
    ingredientes = items
    console.log("ingredientes "+ingredientes);
  }
  const handleSelecetedImagens =(items) =>{
    imagens = items
    console.log("imagens "+imagens);
  }
  const editProduto = () => {
   if(imagens.length < 1){
     setErrorImagem(true)
     return
   }
    
    var json = {
      ...values,
      "tamanhos": tamanhos,
      "cores": cores,
      "ingredientes": ingredientes,
      "imagens": imagens,
      "ativo": isChecked
    }
    ServiceProdutos.editProdutos(product._id, json).then(response => {
        setModalSuccess(true)
        setModalVisible(true)
        var categorias = response.data;
        console.log(categorias)
      }).catch(error => {
        setModalSuccess(false)
        setModalVisible(true)
        console.log(error);
    });
  }




  
  const handleChangeCategoria = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleAtivoChecked = () => {
    setChecked(!isChecked);
  };


  return(
  <Box sx={{ minWidth: 1050 }}> 
                        <div>
                          <IconButton
                              color="inherit"
                              aria-label="open drawer"
                              onClick={onBackEdit}>
                                  <ArrowBack/>
                          </IconButton>
                        
                        <Card>
                          <CardHeader
                            subheader="Produtos"
                            title="Editar"
                          />
                          <Divider />
                          <CardContent>
                            <TextField
                              fullWidth
                              label="Nome"
                              margin="normal"
                              name="name"
                              required
                              onChange={handleChange}
                              value={values.name}
                              variant="outlined"
                            />
                            <TextField
                              fullWidth
                              label="Preço"
                              margin="normal"
                              name="preco"
                              required
                              onChange={handleChange}
                              value={values.preco}
                              variant="outlined"
                            />
                            <TextField
                              fullWidth
                              label="Quantidade"
                              margin="normal"
                              required
                              name="quantidade"
                              onChange={handleChange}
                              value={values.quantidade}
                              variant="outlined"
                            />
                            { categorias.length > 0 ?
                            <TextField
                            fullWidth
                            label="Categoria"
                            name="categoria"
                            margin="normal"
                            onChange={handleChangeCategoria}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={values.categoria}
                            variant="outlined"
                          >
                            {categorias.map((option) => (
                              <option
                                key={option._id}
                                value={option._id}
                              >
                                {option.name}
                              </option>
                            ))}
                          </TextField>
                          : <div></div>
                          }
                          <TextField
                            fullWidth
                            label="Tipo de Produto"
                            name="tipo"
                            margin="normal"
                            onChange={handleChange}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={values.tipo}
                            variant="outlined"
                          >
                            {
                            tipoProdutos.map((option) => (
                              <option
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                          <TagsInput
                              selectedTags={handleSelecetedTamanhos}
                              fullWidth
                              margin="normal"
                              variant="outlined"
                              id="tamanhos"
                              name="tamanhos"
                              placeholder="Adicionar Tamanho"
                              tags={values.tamanhos}
                              label="Tamanhos"
                            />
                            <TagsInput
                              selectedTags={handleSelecetedCores}
                              fullWidth
                              margin="normal"
                              variant="outlined"
                              id="cores"
                              name="cores"
                              placeholder="Adicionar Cores"
                              tags={values.cores}
                              label="Cores"
                            />
                            <TagsInput
                              selectedTags={handleSelecetedIngredientes}
                              fullWidth
                              margin="normal"
                              variant="outlined"
                              id="ingredientes"
                              name="ingredientes"
                              placeholder="Adicionar Ingredientes"
                              tags={values.ingredientes}
                              label="Ingredientes"
                            />
                            <InputImages 
                              error={errorImagem}
                              selectedTags={handleSelecetedImagens}
                              fullWidth
                              margin="normal"
                              variant="outlined"
                              id="imagens"
                              name="imagens"
                              placeholder="Adicionar Imagens"
                              tags={values.imagens}
                              label="Imagens"
                            />
                            <Grid container spacing={2}>
                              <Grid item xs={0}>
                              <Switch
                                checked={isChecked}
                                onChange={handleAtivoChecked}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                              </Grid>
                              <Grid item xs={1} style={{marginTop: 10}}>
                                  { isChecked ? <Typography
                                color="textPrimary"
                                variant="h5"
                              >
                                Ativo
                              </Typography> : <Typography
                                color="textPrimary"
                                variant="h5"
                              >
                                Inativo
                              </Typography>}
                              </Grid>
                            </Grid>
                            
                          
                          </CardContent>
                          <Divider />
                          <Box sx={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              p: 2 }}>
                            <Button
                              color="primary"
                              variant="contained"
                              onClick={() => { editProduto()}}> Salvar</Button>
                          </Box>
                        </Card>
                        </div>
                          
                        <ModalFeedback open={modalVisible} success={modalSuccess} redirect={modalSuccess ? '/app/dashboard' : ''} title={ modalSuccess ? "Sucesso" : "Falhou"} subTitle={ modalSuccess ? "Produto editado com sucesso." : "Não foi possível editar o produto, tente novamente mais tarde."} />
                      </Box>
  )
 }

ProductEdit.propTypes = {
  product: PropTypes.object.isRequired,
  onBackEdit: PropTypes.func,
  categorias: PropTypes.object.isRequired
};

export default ProductEdit;
