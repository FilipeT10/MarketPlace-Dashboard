import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, CircularProgress, LinearProgress } from '@material-ui/core';
import ServiceProdutos from '../services/Produtos'

import ServiceCategorias from '../services/Categorias'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Switch,
  TextField,
  Typography, Grid
} from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import { ArrowBack } from '@material-ui/icons';

import TagsInput from '../components/Other/TagsInput';


class CadastrarProduto extends React.Component {

  state = {
    isChecked: true,
    nome: '',
    categorias: [], 
    values: {}
  };

  componentDidMount() {

    this.getCategorias()
  }
  tipoProdutos = [
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
  handleSelecetedTags =(items) =>{
    console.log(items);
  }
  handleChangeCategoria = (event) => {
    this.setState({values:{
      ...this.state.values,
      [event.target.name]: event.target.value,
      categoriaID: event.target.key
    }});
  };
  getCategorias = () => {
    ServiceCategorias.getCategorias().then(response => {
        var categorias = response.data;
        this.setState({categorias})
      
    }).catch(error => {
        console.log(error);
    });
  }

  saveProdutos = () => {
    var json = {
      "name": this.state.nome,
      "ativo": this.state.isChecked
    }
    ServiceProdutos.saveProdutos(json).then(response => {
        var categorias = response.data;
        console.log(categorias)
    }).catch(error => {
        console.log(error);
    });
  }

   handleChange = (event) => {
    this.setState({
      nome: event.target.value
    });
  };
   handleAtivoChecked = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  };
 
  render(){

    const { values, categorias, isChecked} = this.state;
  return (

  <>
    <Helmet>
      <title>Cadastrar Produto</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
        <Box sx={{ minWidth: 1050 }}> 
       <div>
         
      
      <Card>
        <CardHeader
          subheader="Produto"
          title="Cadastrar"
        />
        <Divider />
        <CardContent>
                            <TextField
                              fullWidth
                              label="Nome"
                              margin="normal"
                              name="nome"
                              required
                              onChange={this.handleChange}
                              value={values.nome}
                              variant="outlined"
                            />
                            <TextField
                              fullWidth
                              label="Preço"
                              margin="normal"
                              name="preco"
                              required
                              onChange={this.handleChange}
                              value={values.preco}
                              variant="outlined"
                            />
                            <TextField
                              fullWidth
                              label="Quantidade"
                              margin="normal"
                              required
                              name="quantidade"
                              onChange={this.handleChange}
                              value={values.quantidade}
                              variant="outlined"
                            />
                            { categorias.length > 0 ?
                            <TextField
                            fullWidth
                            label="Categoria"
                            name="categoria"
                            margin="normal"
                            onChange={this.handleChangeCategoria}
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
                            onChange={this.handleChange}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={values.tipo}
                            variant="outlined"
                          >
                            {
                            this.tipoProdutos.map((option) => (
                              <option
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                          <TagsInput
                              selectedTags={this.handleSelecetedTags}
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
                              selectedTags={this.handleSelecetedTags}
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
                              selectedTags={this.handleSelecetedTags}
                              fullWidth
                              margin="normal"
                              variant="outlined"
                              id="ingredientes"
                              name="ingredientes"
                              placeholder="Adicionar Ingredientes"
                              tags={values.ingredientes}
                              label="Ingredientes"
                            />
                            <Grid container spacing={2}>
                              <Grid item xs={0}>
                              <Switch
                                checked={isChecked}
                                onChange={this.handleAtivoChecked}
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
            onClick={() => { console.log('onClick'); this.saveProdutos()}}> Salvar</Button>
        </Box>
      </Card>
      </div>
                     </Box>
          </Box>
      </Container>
    </Box>
  </>
  );
}
}



export default CadastrarProduto;
