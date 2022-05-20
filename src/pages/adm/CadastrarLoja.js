import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, CircularProgress, LinearProgress } from '@material-ui/core';
import ServiceLojas from '../../services/Lojas'

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

import ModalFeedback from 'src/components/Other/ModalFeedback';
import InputImages from 'src/components/Other/InputImages';
import AppConfig from 'src/AppConfig';


var imagens = []


class CadastrarLoja extends React.Component {
  


  state = {
    isChecked: true,
    isCheckedSite: true,
    isCheckedApp: true,
    errorNome: false,
    errorPreco: false,
    errorQtd: false,
    errorText: 'Campo obrigatório',
    nome: '',
    categorias: [], 
    values: {},
    modalVisible: false,
    modalSuccess: true,
    selectedFile: '',
    errorImagem: false
  };
  

  componentDidMount() {

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

  tipoLojas = [
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
  
  handleSelecetedImagens =(items) =>{
    imagens = items
    console.log("imagens "+imagens);
  }
  saveLojas = () => {

    var possuiError = false
    if(this.state.values.name != undefined){
      if(this.state.values.name.length == 0){
        this.setState({errorNome: true})
        possuiError = true
      }
    }else{
      this.setState({errorNome: true})
      possuiError = true
    }

    
    var tipo = this.state.values.tipo

    if(tipo == undefined){
      tipo = this.tipoLojas[0].value
    }

    /*if(imagens.length < 1){
      this.setState({errorImagem: true})
      possuiError = true
    }*/

    if(possuiError == false){
      this.setState({errorQtd: true, errorNome: false, errorPreco: false})
      var json = {
        ...this.state.values,
        //"imagens": imagens,
        "tipoLoja": tipo,
        "ativo": this.state.isChecked,
        "aplications": [
          {
          "ativo": this.state.isCheckedApp,
          "name": "App "+this.state.values.name,
          "tipo": "App"
          },
          {
          "ativo": this.state.isCheckedSite,
          "name": "Site "+this.state.values.name,
          "tipo": "Site"
          }
      ]
      }
      ServiceLojas.saveLojas(json).then(response => {
          this.setState({modalVisible: true, modalSuccess: true})
      }).catch(error => {

          this.setState({modalVisible: true, modalSuccess: false})
          console.log(error);
      });
    }
  }


  
   handleChange = (event) => {
    this.setState({
      values:
      {...this.state.values,
        [event.target.name]: event.target.value
        }
      });

    console.log(this.state.values)
  };
  

  
   handleAtivoChecked = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  };
  handleAtivoCheckedSite = () => {
    this.setState({
      isCheckedSite: !this.state.isCheckedSite
    });
  };
  handleAtivoCheckedApp = () => {
    this.setState({
      isCheckedApp: !this.state.isCheckedApp
    });
  };
 
  render(){

    const { values, categorias, isChecked, isCheckedSite, isCheckedApp, errorNome, errorPreco, errorQtd, errorText, modalVisible, modalSuccess} = this.state;
  return (

  <>
    <Helmet>
      <title>{'Cadastrar Loja | '+AppConfig.sigla}</title>
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
          subheader="Loja"
          title="Cadastrar"
        />
        <Divider />
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
                            label="Tipo de Loja"
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
                            this.tipoLojas.map((option) => (
                              <option
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                          <Typography
                                color="textSecondary"
                                variant="h5"
                              >
                                Aplicações
                              </Typography>
                          <Grid container spacing={1}>
                            
                              <Grid item xs={0}>
                              <Switch
                                checked={isCheckedSite}
                                onChange={this.handleAtivoCheckedSite}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                              </Grid>
                            

                              <Grid item xs={1} style={{marginTop: 10}}>
                                 <Typography
                                color="textPrimary"
                                variant="h5"
                              >
                                Site
                              </Typography>
                              </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                              <Grid item xs={0}>
                              <Switch
                                checked={isCheckedApp}
                                onChange={this.handleAtivoCheckedApp}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                              </Grid>
                            

                              <Grid item xs={1} style={{marginTop: 10}}>
                                  <Typography
                                color="textPrimary"
                                variant="h5"
                              >
                                App
                              </Typography>
                              </Grid>
                            </Grid>
                         
                           {/* <InputImages 
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
                            */}
                            <Grid container spacing={1}>
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
            onClick={() => { this.saveLojas()}}> Salvar</Button>
        </Box>
      </Card>
      </div>
                     </Box>
          </Box>
      </Container>
      <ModalFeedback open={modalVisible} success={modalSuccess} redirect={modalSuccess ? '/adm/lojas' : ''} title={ modalSuccess ? "Sucesso" : "Falhou"} subTitle={ modalSuccess ? "Cadastro realizado com sucesso." : "Não foi possível realizar o cadastro, tente novamente mais tarde."} />
            
    </Box>
  </>
  );
}
}



export default CadastrarLoja;
