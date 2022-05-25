import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, CircularProgress, LinearProgress } from '@material-ui/core';
import ServiceTipoPagamentos from '../../services/TipoPagamentos'

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


class CadastrarTipoPagamento extends React.Component {
  


  state = {
    isChecked: true,
    errorNome: false,
    errorText: 'Campo obrigatório',
    nome: '',
    categorias: [], 
    values: {},
    modalVisible: false,
    modalSuccess: true,
    selectedFile: ''
  };
  

  componentDidMount() {

  }

   
  
  saveTipoPagamentos = () => {

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

    

    if(possuiError == false){
      this.setState({errorNome: false})
      var json = {
        ...this.state.values,
        "ativo": this.state.isChecked
      }
      ServiceTipoPagamentos.saveTipoPagamentos(json).then(response => {
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
      <title>{'Cadastrar TipoPagamento | '+AppConfig.sigla}</title>
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
          subheader="Tipo de Pagamento"
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
            onClick={() => { this.saveTipoPagamentos()}}> Salvar</Button>
        </Box>
      </Card>
      </div>
                     </Box>
          </Box>
      </Container>
      <ModalFeedback open={modalVisible} success={modalSuccess} redirect={modalSuccess ? '/adm/tipopagamento' : ''} title={ modalSuccess ? "Sucesso" : "Falhou"} subTitle={ modalSuccess ? "Cadastro realizado com sucesso." : "Não foi possível realizar o cadastro, tente novamente mais tarde."} />
            
    </Box>
  </>
  );
}
}



export default CadastrarTipoPagamento;
