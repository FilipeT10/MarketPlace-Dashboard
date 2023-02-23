import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, CircularProgress, LinearProgress } from '@material-ui/core';
import ServiceLojas from '../../services/Lojas'
import ColorPicker from 'material-ui-color-picker'

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
    errorImagem: false,
    primaryColor: "",
    primaryLightColor: "",
    secondaryColor: "",
    secondaryLightColor: "",
    errorCoresText: "Selecione uma cor válida",
    errorCorPrimary: false,
    errorCorPrimaryLight: false,
    errorCorSecondary: false,
    errorCorSecondaryLight: false,
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
  saveImage(image) {

    this.setState({ images: [...this.state.images, image] })
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

  handleSelecetedImagens = (items) => {
    imagens = items
    console.log("imagens " + imagens);
  }
  saveLojas = () => {

    var possuiError = false
    var referencia = " "

    this.setState({ errorCep: false, errorLogradouro: false, errorNumero: false, errorComplemento: false, errorBairro: false, errorCidade: false, errorEstado: false })


    if (this.state.values.cep != undefined) {
      if (this.state.values.cep.length == 0) {
        this.setState({ errorCep: true })
        possuiError = true
      }
    } else {
      this.setState({ errorCep: true })
      possuiError = true
    }
    if (this.state.values.logradouro != undefined) {
      if (this.state.values.logradouro.length == 0) {
        this.setState({ errorLogradouro: true })
        possuiError = true
      }
    } else {
      this.setState({ errorLogradouro: true })
      possuiError = true
    }

    if (this.state.values.numero != undefined) {
      if (this.state.values.numero.length == 0) {
        this.setState({ errorNumero: true })
        possuiError = true
      }
    } else {
      this.setState({ errorNumero: true })
      possuiError = true
    }
    if (this.state.values.complemento != undefined) {
      if (this.state.values.complemento.length == 0) {
        this.setState({ errorComplemento: true })
        possuiError = true
      }
    } else {
      this.setState({ errorComplemento: true })
      possuiError = true
    }
    if (this.state.values.bairro != undefined) {
      if (this.state.values.bairro.length == 0) {
        this.setState({ errorBairro: true })
        possuiError = true
      }
    } else {
      this.setState({ errorBairro: true })
      possuiError = true
    }
    if (this.state.values.cidade != undefined) {
      if (this.state.values.cidade.length == 0) {
        this.setState({ errorCidade: true })
        possuiError = true
      }
    } else {
      this.setState({ errorCidade: true })
      possuiError = true
    }

    if (this.state.values.estado != undefined) {
      if (this.state.values.estado.length == 0) {
        this.setState({ errorEstado: true })
        possuiError = true
      }
    } else {
      this.setState({ errorEstado: true })
      possuiError = true
    }

    if (this.state.values.referencia != undefined) {
      referencia = this.state.values.referencia
    } else {
      referencia = " "
    }

    if (this.state.values.name != undefined) {
      if (this.state.values.name.length == 0) {
        this.setState({ errorNome: true })
        possuiError = true
      }
    } else {
      this.setState({ errorNome: true })
      possuiError = true
    }


    var tipo = this.state.values.tipo

    if (tipo == undefined) {
      tipo = this.tipoLojas[0].value
    }

    if (imagens.length < 1 || imagens.length > 1) {
      this.setState({ errorImagem: true })
      possuiError = true
    }
    if (this.state.primaryColor == undefined || (this.state.primaryColor == "" || this.state.primaryColor?.includes("#") == false || this.state.primaryColor?.length != 7)) {
      this.setState({ errorCorPrimary: true })
      possuiError = true
    } else {
      this.setState({ errorCorPrimary: false })
    }
    console.log(this.state.primaryLightColor)
    if (this.state.primaryLightColor == undefined || (this.state.primaryLightColor == "" || this.state.primaryLightColor?.includes("#") == false || this.state.primaryLightColor?.length != 7)) {
      this.setState({ errorCorPrimaryLight: true })
      possuiError = true
    } else {
      this.setState({ errorCorPrimaryLight: false })
    }
    if (this.state.secondaryColor == undefined || (this.state.secondaryColor == "" || this.state.secondaryColor?.includes("#") == false || this.state.secondaryColor?.length != 7)) {
      this.setState({ errorCorSecondary: true })
      possuiError = true
    } else {
      this.setState({ errorCorSecondary: false })
    }
    if (this.state.secondaryLightColor == undefined || (this.state.secondaryLightColor == "" || this.state.secondaryLightColor?.includes("#") == false || this.state.secondaryLightColor?.length != 7)) {
      this.setState({ errorCorSecondaryLight: true })
      possuiError = true
    } else {
      this.setState({ errorCorSecondaryLight: false })
    }

    if (possuiError == false) {
      this.setState({ errorQtd: true, errorNome: false, errorPreco: false })
      this.setState({ errorCep: false, errorLogradouro: false, errorNumero: false, errorComplemento: false, errorBairro: false, errorCidade: false, errorEstado: false })
     
      var json = {
        ...this.state.values,
        "logo": imagens[0],
        "tipoLoja": tipo,
        "ativo": this.state.isChecked,
        "endereco": {
          "cep": this.state.values.cep,
          "numero": this.state.values.numero,
          "complemento": this.state.values.complemento,
          "bairro": this.state.values.bairro,
          "cidade": this.state.values.cidade,
          "estado": this.state.values.estado,
          "logradouro": this.state.values.logradouro,
          "referencia": referencia
        },
        "aplications": [
          {
            "ativo": this.state.isCheckedApp,
            "name": "App " + this.state.values.name,
            "tipo": "App"
          },
          {
            "ativo": this.state.isCheckedSite,
            "name": "Site " + this.state.values.name,
            "tipo": "Site"
          }
        ],
        "cores": {
            "primary": this.state.primaryColor,
            "primaryLight": this.state.primaryLightColor,
            "secondary": this.state.secondaryColor,
            "secondaryLight": this.state.secondaryLightColor,
          }
      }
      ServiceLojas.saveLojas(json).then(response => {
        this.setState({ modalVisible: true, modalSuccess: true })
      }).catch(error => {

        this.setState({ modalVisible: true, modalSuccess: false })
        console.log(error);
      });
    }
  }



  handleChange = (event) => {
    this.setState({
      values:
      {
        ...this.state.values,
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

  render() {

    const { values, categorias, isChecked, isCheckedSite, isCheckedApp, errorNome, errorPreco, errorQtd, errorText, modalVisible, modalSuccess } = this.state;
    return (

      <>
        <Helmet>
          <title>{'Cadastrar Loja | ' + AppConfig.sigla}</title>
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
              <Box sx={{}}>
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
                        Endereço
                      </Typography>
                      <div>
                        <Grid
                          item
                          md={6}
                          xs={12}
                        >
                          <TextField
                            fullWidth
                            label="CEP"
                            name="cep"
                            margin="normal"
                            error={this.state.errorCep}
                            helperText={this.state.errorCep ? this.state.errorText : ''}
                            onChange={this.handleChange}
                            required
                            value={values.cep}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid
                          item
                          md={6}
                          xs={12}
                        >
                          <TextField
                            fullWidth
                            label="Logradouro"
                            name="logradouro"
                            margin="normal"
                            error={this.state.errorLogradouro}
                            helperText={this.state.errorLogradouro ? this.state.errorText : ''}
                            onChange={this.handleChange}
                            required
                            value={values.logradouro}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid
                          item
                          md={6}
                          xs={12}
                        >
                          <TextField
                            fullWidth
                            label="Bairro"
                            name="bairro"
                            margin="normal"
                            error={this.state.errorBairro}
                            helperText={this.state.errorBairro ? this.state.errorText : ''}
                            onChange={this.handleChange}
                            required
                            value={values.bairro}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid
                          item
                          md={6}
                          xs={12}
                        >
                          <TextField
                            fullWidth
                            label="Cidade"
                            name="cidade"
                            margin="normal"
                            error={this.state.errorCidade}
                            helperText={this.state.errorCidade ? this.state.errorText : ''}
                            onChange={this.handleChange}
                            required
                            value={values.cidade}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid
                          item
                          md={6}
                          xs={12}
                        >
                          <TextField
                            fullWidth
                            label="Número"
                            name="numero"
                            required
                            margin="normal"
                            error={this.state.errorNumero}
                            helperText={this.state.errorNumero ? this.state.errorText : ''}
                            onChange={this.handleChange}
                            type="number"
                            value={values.numero}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid
                          item
                          md={6}
                          xs={12}
                        >
                          <TextField
                            fullWidth
                            label="Complemento"
                            name="complemento"
                            margin="normal"
                            error={this.state.errorComplemento}
                            helperText={this.state.errorComplemento ? this.state.errorText : ''}
                            onChange={this.handleChange}
                            required
                            value={values.complemento}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid
                          item
                          md={6}
                          xs={12}
                        >
                          <TextField
                            fullWidth
                            label="Estado"
                            name="estado"
                            margin="normal"
                            error={this.state.errorEstado}
                            helperText={this.state.errorEstado ? this.state.errorText : ''}
                            onChange={this.handleChange}
                            required
                            value={values.estado}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid
                          item
                          md={6}
                          xs={12}
                        >
                          <TextField
                            fullWidth
                            label="Referência"
                            name="referencia"
                            margin="normal"
                            onChange={this.handleChange}
                            value={values.referencia}
                            variant="outlined"
                          />
                        </Grid>

                      </div>
                      <Typography
                        color="textSecondary"
                        variant="h5"
                      >
                        Cores
                      </Typography>

                      <Grid container spacing={1}>
                        <Grid item xs={0}>
                          <Grid container spacing={1}>
                            <Grid item xs={0}>
                              <Typography
                                color="textSecondary"
                                variant="h6"
                              >
                                Principal
                              </Typography>
                            </Grid>


                            <Grid item xs={1} >
                              <div style={{ width: 20, height: 20, backgroundColor: this.state.primaryColor }}></div>
                            </Grid>
                          </Grid>
                          <ColorPicker
                            style={{ marginTop: 10 }}
                            defaultValue={this.state.primaryColor}
                            value={this.state.primaryColor || ''}
                            InputProps={{ value: this.state.primaryColor }}
                            onChange={color => { this.setState({ primaryColor: color }) }}
                            margin="normal"
                            name="primaryColor"
                            required
                            error={this.state.errorCorPrimary}
                            helperText={this.state.errorCorPrimary ? this.state.errorCoresText : ''}
                            variant="outlined"
                          />
                        </Grid>


                        <Grid item xs={0}>
                          <Grid container spacing={1}>
                            <Grid item xs={0}>
                              <Typography
                                color="textSecondary"
                                variant="h6"
                              >
                                Principal Clara
                              </Typography>
                            </Grid>


                            <Grid item xs={1} >
                              <div style={{ width: 20, height: 20, backgroundColor: this.state.primaryLightColor }}></div>
                            </Grid>
                          </Grid>
                          <ColorPicker
                            style={{ marginTop: 10 }}
                            defaultValue={this.state.primaryLightColor}
                            InputProps={{ value: this.state.primaryLightColor }}
                            value={this.state.primaryLightColor || ''}
                            onChange={color => { this.setState({ primaryLightColor: color }); console.log(color); console.log(this.state.primaryLightColor) }}
                            margin="normal"
                            name="primaryLightColor"
                            required
                            error={this.state.errorCorPrimaryLight}
                            helperText={this.state.errorCorPrimaryLight ? this.state.errorCoresText : ''}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={0}>
                          <Grid container spacing={1}>
                            <Grid item xs={0}>
                              <Typography
                                color="textSecondary"
                                variant="h6"
                              >
                                Secundária
                              </Typography>
                            </Grid>


                            <Grid item xs={1} >
                              <div style={{ width: 20, height: 20, backgroundColor: this.state.secondaryColor }}></div>
                            </Grid>
                          </Grid>
                          <ColorPicker
                            style={{ marginTop: 10 }}
                            defaultValue={this.state.secondaryColor}
                            InputProps={{ value: this.state.secondaryColor }}
                            value={this.state.secondaryColor || ''}
                            onChange={color => { this.setState({ secondaryColor: color }) }}
                            margin="normal"
                            name="secondaryColor"
                            required
                            error={this.state.errorCorSecondary}
                            helperText={this.state.errorCorSecondary ? this.state.errorCoresText : ''}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={0}>
                          <Grid container spacing={1}>
                            <Grid item xs={0}>
                              <Typography
                                color="textSecondary"
                                variant="h6"
                              >
                                Secundária Clara
                              </Typography>
                            </Grid>


                            <Grid item xs={1} >
                              <div style={{ width: 20, height: 20, backgroundColor: this.state.secondaryLightColor }}></div>
                            </Grid>
                          </Grid>


                          <ColorPicker
                            style={{ marginTop: 10 }}
                            defaultValue={this.state.secondaryLightColor}
                            InputProps={{ value: this.state.secondaryLightColor }}
                            value={this.state.secondaryLightColor || ''}
                            onChange={color => { this.setState({ secondaryLightColor: color }) }}
                            margin="normal"
                            name="secondaryLightColor"
                            required
                            error={this.state.errorCorSecondaryLight}
                            helperText={this.state.errorCorSecondaryLight ? this.state.errorCoresText : ''}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>

                      <Typography
                        color="textSecondary"
                        variant="h5"
                        style={{ marginTop: 10 }}
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


                        <Grid item xs={1} style={{ marginTop: 10 }}>
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


                        <Grid item xs={1} style={{ marginTop: 10 }}>
                          <Typography
                            color="textPrimary"
                            variant="h5"
                          >
                            App
                          </Typography>
                        </Grid>
                      </Grid>

                      <InputImages
                        error={this.state.errorImagem}
                        maxLenght={1}
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


                      <Grid container spacing={1}>
                        <Grid item xs={0}>
                          <Switch
                            checked={isChecked}
                            onChange={this.handleAtivoChecked}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        </Grid>


                        <Grid item xs={1} style={{ marginTop: 10 }}>
                          {isChecked ? <Typography
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
                      p: 2
                    }}>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => { this.saveLojas() }}> Salvar</Button>
                    </Box>
                  </Card>
                </div>
              </Box>
            </Box>
          </Container>
          <ModalFeedback open={modalVisible} success={modalSuccess} redirect={modalSuccess ? '/adm/lojas' : ''} title={modalSuccess ? "Sucesso" : "Falhou"} subTitle={modalSuccess ? "Cadastro realizado com sucesso." : "Não foi possível realizar o cadastro, tente novamente mais tarde."} />

        </Box>
      </>
    );
  }
}



export default CadastrarLoja;
