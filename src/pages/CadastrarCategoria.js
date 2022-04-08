import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, CircularProgress, LinearProgress } from '@material-ui/core';
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



class CadastrarCategoria extends React.Component {

  state = {
    isChecked: true,
    nome: ''
  };


  saveCategoria = () => {
    var json = {
      "name": this.state.nome,
      "loja": "61663f593ad92700047d5e1f",
      "ativo": this.state.isChecked
    }
    ServiceCategorias.saveCategorias(json).then(response => {
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

  return (
  <>
    <Helmet>
      <title>Cadastrar Categoria</title>
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
          subheader="Categorias"
          title="Cadastrar"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Nome"
            margin="normal"
            name="nome"
            onChange={this.handleChange}
            value={this.state.nome}
            variant="outlined"
          />
          
          <Grid container spacing={2}>
            <Grid item xs={0}>
            <Switch
              checked={this.state.isChecked}
              onChange={this.handleAtivoChecked}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            </Grid>
            <Grid item xs={1} style={{marginTop: 10}}>
                { this.state.isChecked ? <Typography
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
            onClick={() => { console.log('onClick'); this.saveCategoria()}}> Salvar</Button>
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



export default CadastrarCategoria;
