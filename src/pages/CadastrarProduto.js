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
  Typography, Grid, MenuItem, Checkbox, FormControlLabel
} from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import { ArrowBack } from '@material-ui/icons';
import TagsInput from '../components/Other/TagsInput';

import ModalFeedback from 'src/components/Other/ModalFeedback';
import InputImages from 'src/components/Other/InputImages';
import AppConfig from 'src/AppConfig';
import { getLoja } from 'src/daos/auth';
import ServiceSubCategorias from 'src/services/SubCategorias';

var tamanhos = []

var cores = []

var ingredientes = []

var imagens = []


class CadastrarProduto extends React.Component {
  


  state = {
    isChecked: true,
    errorNome: false,
    errorDescricao: false,
    errorPreco: false,
    errorQtd: false,
    loading: true,
    errorText: 'Campo obrigatório',
    nome: '',
    categorias: [], 
    subcategoriaId: [],
    subcategorias: [], 
    values: {},
    modalVisible: false,
    modalSuccess: true,
    selectedFile: '',
    errorImagem: false
  };
  

  componentDidMount() {

    this.getCategorias()
  }

   handleChangeSubcategoria = (event) => {
    const {subcategoriaId} = this.state
    if (!subcategoriaId.includes(event.target.value))
    this.setState({subcategoriaId: event.target.value}); 

    console.log(subcategoriaId)
    // selected options
  };
  
  filterSubCategoriaFromId = (id) => {

    const {subcategorias} = this.state
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

  handleInputChange = (event) => {
      let files = event.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onload = (e) => {
        console.log(e.target.result)
        this.saveImage(e.target.result)
      }
        
  }
  saveImage(image){

    this.setState({images: [...this.state.images, image]})
  }

  
   handleSelecetedTamanhos =(items) =>{
    tamanhos = items
    console.log("tamanhos "+tamanhos);
  }
  handleSelecetedCores =(items) =>{
    cores = items
    console.log("cores "+cores);
  }
  handleSelecetedIngredientes =(items) =>{
    ingredientes = items
    console.log("ingredientes "+ingredientes);
  }
  handleSelecetedImagens =(items) =>{
    imagens = items
    console.log("imagens "+imagens);
  }
  saveProdutos = () => {

    var possuiError = false
    this.setState({errorQtd: false, errorNome: false, errorPreco: false, errorDescricao: false})
      
    if(this.state.values.name != undefined){
      if(this.state.values.name.length == 0){
        this.setState({errorNome: true})
        possuiError = true
      }
    }else{
      this.setState({errorNome: true})
      possuiError = true
    }
    if(this.state.values.descricao != undefined){
      if(this.state.values.descricao.length == 0){
        this.setState({errorDescricao: true})
        possuiError = true
      }
    }else{
      this.setState({errorDescricao: true})
      possuiError = true
    }

    if(this.state.values.preco != undefined){
      if(this.state.values.preco.length == 0){
        this.setState({errorPreco: true})
        possuiError = true
      }
    }else{
      this.setState({errorPreco: true})
      possuiError = true
    }
    if(this.state.values.quantidade != undefined){
      if(this.state.values.quantidade.length == 0){
        this.setState({errorQtd: true})
        possuiError = true
      }
    }else{
      this.setState({errorQtd: true})
      possuiError = true
    }
    var categoria = this.state.values.categoria

    if(categoria == undefined){
      categoria = this.state.categorias[0]._id
    }
    

    if(imagens.length < 1){
      this.setState({errorImagem: true})
      possuiError = true
    }

    if(possuiError == false){
      this.setState({errorQtd: false, errorNome: false, errorPreco: false, errorDescricao: false})
      var json = {
        ...this.state.values,
        "loja": getLoja(),
        "tamanhos": tamanhos,
        "cores": cores,
        "ingredientes": ingredientes,
        "imagens": imagens,
        "categoria": categoria,
        "subcategorias": this.state.subcategoriaId,
        "ativo": this.state.isChecked
      }
      ServiceProdutos.saveProdutos(json).then(response => {
          var categorias = response.data;

          
          this.setState({modalVisible: true, modalSuccess: true})
          console.log(categorias)
      }).catch(error => {

          this.setState({modalVisible: true, modalSuccess: false})
          console.log(error);
      });
    }
  }


  handleChangeCategoria = (event) => {
    this.setState({
      values:
      {...this.state.values,
        [event.target.name]: event.target.value
        }
      });

    console.log(this.state.values)
  };
   handleChange = (event) => {
    this.setState({
      values:
      {...this.state.values,
        [event.target.name]: event.target.value
        }
      });

    console.log(this.state.values)
  };
  getCategorias = () => {
    ServiceCategorias.getCategorias().then(response => {
        var categorias = response.data;
        this.setState({categorias})
        ServiceSubCategorias.getSubCategorias().then(response => {
          console.log(response.data)
          var subcategorias = response.data;
          this.setState({subcategorias, loading: false})
          }).catch(error => {
      
              alert('Falha ao carregar as subcategorias, tente novamente mais tarde.');
              console.log(error);
          });
    }).catch(error => {

        alert('Falha ao carregar as categorias, tente novamente mais tarde.');
        console.log(error);
    });
  }

  
   handleAtivoChecked = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  };
 
  render(){

    const { values, categorias, subcategorias, isChecked, errorNome, errorPreco, errorQtd, errorDescricao, errorText, modalVisible, modalSuccess, subcategoriaId, loading} = this.state;
  return (

  <>
    <Helmet>
      <title>{'Cadastrar Produto | '+AppConfig.sigla}</title>
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
        <Box sx={{ }}> 
       <div>
         
      
      <Card>
        <CardHeader
          subheader="Produto"
          title="Cadastrar"
        />
        <Divider />
        { loading ? <LinearProgress/> :
        <CardContent>
                            <TextField
                              fullWidth
                              label="Nome"
                              margin="normal"
                              name="name"
                              required
                              error={errorNome}
                              helperText={errorNome ? errorText : ''}
                              onChange={this.handleChange}
                              value={values.name}
                              variant="outlined"
                            />
                            <TextField
                              fullWidth
                              label="Descrição"
                              margin="normal"
                              name="descricao"
                              required
                              error={errorDescricao}
                              helperText={errorDescricao ? errorText : ''}
                              onChange={this.handleChange}
                              value={values.descricao}
                              variant="outlined"
                            />
                            <TextField
                              fullWidth
                              label="Preço"
                              margin="normal"
                              name="preco"
                              required
                              error={errorPreco}
                              helperText={errorPreco ? errorText : ''}
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
                              error={errorQtd}
                              helperText={errorQtd ? errorText : ''}
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
                          { subcategorias.length > 0 ?
                            <TextField
                            fullWidth
                            label="Subcategoria"
                            name="subcategorias"
                            margin="normal"
                            select
                            value={values.subcategorias}
                            variant="outlined"
                            SelectProps={{
                               multiple: true,
                               value: subcategoriaId,
                               onChange: (e) => this.handleChangeSubcategoria(e),
                               renderValue: (selected) => {
                                 var ids = selected;
                                 var nomes = []
                                 ids.map((id) => (
                                    nomes.push(this.filterSubCategoriaFromId(id))
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
                              selectedTags={this.handleSelecetedTamanhos}
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
                              selectedTags={this.handleSelecetedCores}
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
                              selectedTags={this.handleSelecetedIngredientes}
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
                            error={this.state.errorImagem}
                            selectedTags={this.handleSelecetedImagens}
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
            }
        <Divider />
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => { this.saveProdutos()}}> Salvar</Button>
        </Box>
      </Card>
      </div>
                     </Box>
          </Box>
      </Container>
      <ModalFeedback open={modalVisible} success={modalSuccess} redirect={modalSuccess ? '/app/produtos' : ''} title={ modalSuccess ? "Sucesso" : "Falhou"} subTitle={ modalSuccess ? "Cadastro realizado com sucesso." : "Não foi possível realizar o cadastro, tente novamente mais tarde."} />
            
    </Box>
  </>
  );
}
}



export default CadastrarProduto;
