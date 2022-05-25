import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, CircularProgress, LinearProgress } from '@material-ui/core';
import ServiceSubCategorias from '../services/SubCategorias'

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

import ModalFeedback from 'src/components/Other/ModalFeedback';
import InputImages from 'src/components/Other/InputImages';
import AppConfig from 'src/AppConfig';
import { getLoja } from 'src/daos/auth';

var tamanhos = []

var cores = []

var ingredientes = []

var imagens = []


class CadastrarSubCategoria extends React.Component {
  


  state = {
    isChecked: true,
    errorNome: false,
    errorText: 'Campo obrigatório',
    nome: '',
    categorias: [], 
    loading: true,
    values: {},
    modalVisible: false,
    modalSuccess: true
  };
  

  componentDidMount() {

    this.getCategorias()
  }

  
  saveSubCategorias = () => {

    var possuiError = false
    this.setState({errorNome: false})
      
    if(this.state.values.name != undefined){
      if(this.state.values.name.length == 0){
        this.setState({errorNome: true})
        possuiError = true
      }
    }else{
      this.setState({errorNome: true})
      possuiError = true
    }

  
   
    var categoria = this.state.values.categoria

    if(categoria == undefined){
      categoria = this.state.categorias[0]._id
    }
   

    if(possuiError == false){
      this.setState({ errorNome: false})
      var json = {
        ...this.state.values,
        "categoria": categoria,
        "loja": getLoja(),
        "ativo": this.state.isChecked
      }
      ServiceSubCategorias.saveSubCategorias(json).then(response => {
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
        this.setState({categorias, loading: false})
      
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

    const { values, categorias, isChecked, errorNome, errorText, modalVisible, modalSuccess, loading} = this.state;
  return (

  <>
    <Helmet>
      <title>{'Cadastrar Subcategoria | '+AppConfig.sigla}</title>
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
          subheader="Subcategoria"
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
            onClick={() => { this.saveSubCategorias()}}> Salvar</Button>
        </Box>
      
      </Card>
      </div>
                     </Box>
          </Box>
      </Container>
      <ModalFeedback open={modalVisible} success={modalSuccess} redirect={modalSuccess ? '/app/subcategorias' : ''} title={ modalSuccess ? "Sucesso" : "Falhou"} subTitle={ modalSuccess ? "Cadastro realizado com sucesso." : "Não foi possível realizar o cadastro, tente novamente mais tarde."} />
            
    </Box>
  </>
  );
}
}



export default CadastrarSubCategoria;
