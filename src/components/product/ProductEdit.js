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
  Alert,
  MenuItem,
  FormControlLabel
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


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const ProductEdit = ({ product, categorias, subcategorias, onBackEdit, ...rest }) => {
  const [isChecked, setChecked] = useState(product.ativo);
  const [values, setValues] = useState(product);

  const [modalVisible, setModalVisible] = useState(false)
  const [modalSuccess, setModalSuccess] = useState(true)

  const [errorImagem, setErrorImagem] = useState(false)

  const [subcategoriaName, setSubcategoriaName] = useState([]);

  const [subcategoriaId, setSubcategoriaId] = useState(product.subcategorias);

  const handleChangeSubcategoria = (event) => {
    console.log(event)
    if (!subcategoriaId.includes(event.target.value))
    setSubcategoriaId(event.target.value); 

    console.log(subcategoriaId)
    // selected options
  };
  
  const filterSubCategoriaFromId = (id) => {
    if(subcategorias.length == 0 || id == undefined){
      return ''
    }else{
      let usuariosFilter = subcategorias.filter(function(item){
        return item._id == id
      })
      if(usuariosFilter.length == 0){
        return "Subcategoria não encontrada"
      }
      return usuariosFilter[0].name
    }
  }

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
      "subcategorias": subcategoriaId,
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
  const handleChangeSubCategoria = (event) => {
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
  <Box sx={{  }}> 
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
                              label="Descrição"
                              margin="normal"
                              name="descricao"
                              required
                              onChange={handleChange}
                              value={values.descricao}
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
                          { subcategorias.length > 0 ?
                            <TextField
                            fullWidth
                            label="Subcategoria"
                            name="subcategorias"
                            margin="normal"
                            select
                            value={values.subcategorias}
                            variant="outlined"
                            required
                            SelectProps={{
                               multiple: true,
                               value: subcategoriaId,
                               onChange: (e) => handleChangeSubcategoria(e),
                               renderValue: (selected) => {
                                 var ids = selected;
                                 var nomes = []
                                 ids.map((id) => (
                                    nomes.push(filterSubCategoriaFromId(id))
                                 ))
                                 return nomes.join(", ")
                              
                              },
                               
                             }}
                           >
                             {subcategorias.map((subcategoria) => (
                               <MenuItem key={subcategoria._id} value={subcategoria._id}>
                                 <FormControlLabel
                                   control={<Checkbox checked={subcategoriaId.includes(subcategoria._id)} />}
                                   label={subcategoria.name}
                                 />
                               </MenuItem>
                             ))}
                           </TextField>
                          : <div></div>
                          }
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
                          
                        <ModalFeedback open={modalVisible} success={modalSuccess} redirect={modalSuccess ? '/app/painel' : ''} title={ modalSuccess ? "Sucesso" : "Falhou"} subTitle={ modalSuccess ? "Produto editado com sucesso." : "Não foi possível editar o produto, tente novamente mais tarde."} />
                      </Box>
  )
 }

ProductEdit.propTypes = {
  product: PropTypes.object.isRequired,
  onBackEdit: PropTypes.func,
  categorias: PropTypes.object.isRequired,
  subcategorias: PropTypes.object.isRequired
};

export default ProductEdit;
