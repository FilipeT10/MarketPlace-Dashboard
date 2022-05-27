import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, CircularProgress, LinearProgress } from '@material-ui/core';
import ServicePedidos from '../services/Pedidos'

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
import { ArrowBack, ArrowDropDown } from '@material-ui/icons';
import TagsInput from '../components/Other/TagsInput';

import ModalFeedback from 'src/components/Other/ModalFeedback';
import InputImages from 'src/components/Other/InputImages';
import AppConfig from 'src/AppConfig';
import { getLoja } from 'src/daos/auth';
import ServiceSubCategorias from 'src/services/SubCategorias';
import ServiceTipoPagamentos from 'src/services/TipoPagamentos';
import ServiceProdutos from 'src/services/Produtos';

var tamanhos = []

var cores = []

var ingredientes = []

var imagens = []


class CadastrarPedido extends React.Component {
  


  state = {
    isChecked: true,
    errorNome: false,
    errorPreco: false,
    errorQtd: false,
    loading: true,
    errorText: 'Campo obrigatório',
    nome: '',
    tipopagamentos: [], 
    subcategoriaId: [],
    subcategorias: [], 
    produtos: [],
    produtosPedido: [], 
    ingredientesSelected: [],
    values: {},
    selectedProduto: {},
    modalVisible: false,
    modalSuccess: true,
    selectedFile: '',
    errorImagem: false
  };
  

  componentDidMount() {

    this.getTipoPagamentos()
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
  filterProductFromId = (id) => {

    const {produtos} = this.state
    if(produtos.length == 0 || id == undefined){
      return {}
    }else{
      let usuariosFilter = produtos.filter(function(item){
        return item._id == id
      })
      if(usuariosFilter.length == 0){
        return {}
      }
      return usuariosFilter[0]
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
  savePedidos = () => {

    var possuiError = false
    this.setState({errorQtd: true, errorNome: false, errorPreco: false})
      
    if(this.state.values.name != undefined){
      if(this.state.values.name.length == 0){
        this.setState({errorNome: true})
        possuiError = true
      }
    }else{
      this.setState({errorNome: true})
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
      this.setState({errorQtd: true, errorNome: false, errorPreco: false})
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
      ServicePedidos.savePedidos(json).then(response => {
          var categorias = response.data;

          
          this.setState({modalVisible: true, modalSuccess: true})
          console.log(categorias)
      }).catch(error => {

          this.setState({modalVisible: true, modalSuccess: false})
          console.log(error);
      });
    }
  }

  detalheProduto = (produto) => {
    console.log(produto)
    var selectedProduto = produto
    this.setState({selectedProduto});

  };

  handleChangeProductSelect = (event) => {
    this.setState({
      values:
      {...this.state.values,
        [event.target.name]: event.target.value
        }
      });
    
      var selectedProduto = event.target.value
      var ingredientesSelected = this.filterProductFromId(selectedProduto).ingredientes
      
      this.setState({selectedProduto, ingredientesSelected});
  };

  handleChangeTipoPagamento = (event) => {
    this.setState({
      values:
      {...this.state.values,
        [event.target.name]: event.target.value
        }
      });
    
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
  getTipoPagamentos = () => {
    ServiceTipoPagamentos.getTipoPagamentos().then(response => {
        var tipopagamentos = response.data.items;
        this.setState({tipopagamentos})
        this.getProdutos()
    }).catch(error => {

        alert('Falha ao carregar, tente novamente mais tarde.');
        console.log(error);
    });
  }
  getProdutos = () => {
    ServiceProdutos.getProdutos().then(response => {
        var produtos = response.data;
        this.setState({produtos, loading: false})
    }).catch(error => {

        alert('Falha ao carregar os produtos, tente novamente mais tarde.');
        console.log(error);
    });
  }

  handleChangeIngredientes = (event) => {
    const {ingredientesSelected} = this.state
    if (!ingredientesSelected.includes(event.target.value))
    this.setState({ingredientesSelected: event.target.value}); 

    console.log(ingredientesSelected)
    // selected options
  };
  
  
   handleAtivoChecked = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  };
 
  render(){

    const { values, tipopagamentos, produtos, produtosPedido, isChecked, errorText, modalVisible, modalSuccess, subcategoriaId, loading, selectedProduto, ingredientesSelected} = this.state;
  return (

  <>
    <Helmet>
      <title>{'Cadastrar Pedido | '+AppConfig.sigla}</title>
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
          subheader="Pedido"
          title="Cadastrar"
        />
        <Divider />
        { loading ? <LinearProgress/> :
          <CardContent>   
               { produtos.length > 0 ?
           <div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
              fullWidth
              label="Produto"
              name="produtoItem"
              margin="normal"
              onChange={this.handleChangeProductSelect}
              required
              select
              SelectProps={{ native: true }}
              value={values.produtoItem}
              variant="outlined"
            >
              {produtos.map((option) => (
                <option
                  key={option._id}
                  value={option._id}
                >
                  {option.name}
                </option>
              ))}
            </TextField>
            <Button
            color="primary"
            style={{margin: 15, marginBottom: 8}}
            variant="outlined"
            onClick={() => { this.detalheProduto(values.produtoItem)}}>
              <ArrowDropDown/>
            </Button>
            </div>
            <Card>
              <CardContent>
                
                {this.filterProductFromId(selectedProduto).tamanhos != undefined && this.filterProductFromId(selectedProduto).tamanhos.length > 0 &&
                <TextField
                fullWidth
                label="Tamanho"
                name="tamanho"
                margin="normal"
                onChange={this.handleChangeTipoPagamento}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {this.filterProductFromId(selectedProduto).tamanhos.map((option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </TextField>
               }
               {this.filterProductFromId(selectedProduto).cores != undefined && this.filterProductFromId(selectedProduto).cores.length > 0 &&
                  <TextField
                  fullWidth
                  label="Cor"
                  name="cor"
                  margin="normal"
                  onChange={this.handleChangeTipoPagamento}
                  required
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                >
                  {this.filterProductFromId(selectedProduto).cores.map((option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  ))}
                </TextField>
              }
              {this.filterProductFromId(selectedProduto).ingredientes != undefined && this.filterProductFromId(selectedProduto).ingredientes.length > 0 &&
                            <TextField
                            fullWidth
                            label="Ingredientes"
                            name="ingredientes"
                            margin="normal"
                            select
                            variant="outlined"
                            SelectProps={{
                               multiple: true,
                               value: ingredientesSelected,
                               onChange: (e) => this.handleChangeIngredientes(e),
                               renderValue: (selected) => selected.join(", "),
                               
                             }}
                           >
                             {this.filterProductFromId(selectedProduto).ingredientes.map((ingrediente) => (
                               <MenuItem key={ingrediente} value={ingrediente}>
                                 <FormControlLabel
                                   control={<Checkbox checked={ingredientesSelected.includes(ingrediente)} />}
                                   label={ingrediente}
                                 />
                               </MenuItem>
                             ))}
                           </TextField>
                          }
              </CardContent>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  p: 2
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                >
                  Adicionar
                </Button>
              </Box>
            </Card>
            </div>
            : 
            <div></div>
            }
              { tipopagamentos.length > 0 ?
              <TextField
              fullWidth
              label="Tipo de Pagamentos"
              name="tipopagamentos"
              margin="normal"
              onChange={this.handleChangeTipoPagamento}
              required
              select
              SelectProps={{ native: true }}
              value={values.tipopagamentos}
              variant="outlined"
            >
              {tipopagamentos.map((option) => (
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
            onClick={() => { this.savePedidos()}}> Salvar</Button>
        </Box>
      </Card>
      </div>
                     </Box>
          </Box>
      </Container>
      <ModalFeedback open={modalVisible} success={modalSuccess} redirect={modalSuccess ? '/app/pedidos' : ''} title={ modalSuccess ? "Sucesso" : "Falhou"} subTitle={ modalSuccess ? "Cadastro realizado com sucesso." : "Não foi possível realizar o cadastro, tente novamente mais tarde."} />
            
    </Box>
  </>
  );
}
}



export default CadastrarPedido;
