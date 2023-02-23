import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, CircularProgress, LinearProgress } from '@material-ui/core';
import ServiceUsuarios from '../../services/Usuarios'

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
import ServiceLojas from 'src/services/Lojas';


var imagens = []


class CadastrarUsuario extends React.Component {



  state = {
    isChecked: true,
    isCheckedSite: true,
    isCheckedApp: true,
    errorNome: false,
    errorPreco: false,
    errorQtd: false,
    errorText: 'Campo obrigatório',
    errorTextEmail: 'Campo obrigatório',
    nome: '',
    lojas: [],
    values: {},
    modalVisible: false,
    modalSuccess: true,
    selectedFile: '',
    errorPassword: false,
    errorEmail: false,
    errorPasswordConfirm: false,
    confirmarSenha: ''
  };


  componentDidMount() {
    this.getLojas()
  }

  getLojas = () => {
    ServiceLojas.getLojas().then(response => {
      var lojas = response.data;
      this.setState({ lojas })

    }).catch(error => {

      alert('Falha ao carregar as lojas, tente novamente mais tarde.');
      console.log(error);
    });
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

  tipoUsuarios = [
    {
      value: 'cliente',
      label: 'Cliente'
    },
    {
      value: 'admin',
      label: 'Administrador'
    },
    {
      value: 'sysAdminMktPlc',
      label: 'Sistema'
    }
  ];
  tipoSexo = [
    {
      value: null,
      label: 'Não informado'
    },
    {
      value: 'Male',
      label: 'Masculino'
    },
    {
      value: 'Female',
      label: 'Feminino'
    }
  ];

  handleSelecetedImagens = (items) => {
    imagens = items
    console.log("imagens " + imagens);
  }

  validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }
  saveUsuarios = () => {

    var possuiError = false
    this.setState({ errorQtd: true, errorNome: false, errorPreco: false, errorEmail: false, errorPassword: false, errorPasswordConfirm: false })

    if (this.state.values.name != undefined) {
      if (String(this.state.values.name).length == 0) {
        this.setState({ errorNome: true })
        possuiError = true
      }
    } else {
      this.setState({ errorNome: true })
      possuiError = true
    }

    if (this.state.values.email != undefined) {
      if (this.state.values.email == '') {
        this.setState({ errorEmail: true, errorTextEmail: 'Campo obrigatório' })
        possuiError = true
      } else {
        var isValid = this.validateEmail(this.state.values.email)
        if (!isValid) {
          this.setState({ errorEmail: true, errorTextEmail: 'Email inválido' })
          possuiError = true
        }
      }
    } else {
      this.setState({ errorEmail: true, errorTextEmail: 'Campo obrigatório' })
      possuiError = true
    }

    if (this.state.values.password != undefined) {
      if (String(this.state.values.password).length < 6) {
        this.setState({ errorPassword: true })
        possuiError = true
      }
    } else {
      this.setState({ errorPassword: true })
      possuiError = true
    }

    if (this.state.errorPassword == false && this.state.values.password != this.state.confirmarSenha) {
      this.setState({ errorPasswordConfirm: true })
      possuiError = true
    }


    var tipo = this.state.values.tipo

    if (tipo == undefined) {
      tipo = this.tipoUsuarios[0].value
    }
    var loja = this.state.values.loja

    if (loja == undefined && tipo == 'admin') {
      loja = this.state.lojas.items[0]._id
    }

    if (tipo != 'admin') {
      loja = undefined
    }

    var gender = this.state.values.gender

    if (gender == undefined) {
      gender = this.tipoSexo[0].value
    }
    if (gender == null) {
      gender = ''
    }

    /*if(imagens.length < 1){
      this.setState({errorImagem: true})
      possuiError = true
    }*/

    if (possuiError == false) {
      this.setState({ errorQtd: true, errorNome: false, errorPreco: false, errorEmail: false, errorPassword: false, errorPasswordConfirm: false })
      var json = {
        ...this.state.values,
        //"imagens": imagens,
        "profiles": [tipo],
        "loja": loja,
        "gender": gender,
      }
      ServiceUsuarios.saveUsuarios(json).then(response => {
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

  handleChangeConfirmar = (event) => {
    this.setState({ confirmarSenha: event.target.value });

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

    const { values, lojas, isChecked, isCheckedSite, errorTextEmail, isCheckedApp, errorNome, errorPreco, errorQtd, errorText, modalVisible, modalSuccess, errorEmail, errorPassword, errorPasswordConfirm } = this.state;
    return (

      <>
        <Helmet>
          <title>{'Cadastrar Usuario | ' + AppConfig.sigla}</title>
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
                      subheader="Usuario"
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
                        label="CPF"
                        margin="normal"
                        name="cpf"
                        onChange={this.handleChange}
                        value={values.cpf}
                        variant="outlined"
                      />
                      <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        name="email"
                        required
                        error={errorEmail}
                        helperText={errorEmail ? errorTextEmail : ''}
                        onChange={this.handleChange}
                        value={values.email}
                        variant="outlined"
                      />
                      <TextField
                        fullWidth
                        label="Sexo"
                        name="gender"
                        margin="normal"
                        onChange={this.handleChange}
                        required
                        select
                        SelectProps={{ native: true }}
                        value={values.gender}
                        variant="outlined"
                      >
                        {
                          this.tipoSexo.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </option>
                          ))}
                      </TextField>
                      <TextField
                        fullWidth
                        label="Tipo de Usuario"
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
                          this.tipoUsuarios.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </option>
                          ))}
                      </TextField>

                      {values.tipo == 'admin' && <TextField
                        fullWidth
                        label="Loja"
                        name="loja"
                        margin="normal"
                        onChange={this.handleChange}
                        required
                        select
                        SelectProps={{ native: true }}
                        value={values.loja}
                        variant="outlined"
                      >
                        {
                          lojas.items.map((option) => (
                            <option
                              key={option._id}
                              value={option._id}
                            >
                              {option.name}
                            </option>
                          ))}
                      </TextField>}

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

                      <TextField
                        fullWidth
                        required
                        label="Senha"
                        margin="normal"
                        error={errorPassword}
                        helperText={errorPassword ? 'Senha inválida, precisa ter no mínimo 6 caracteres' : ''}
                        name="password"
                        onChange={this.handleChange}
                        type="password"
                        value={values.password}
                        variant="outlined"
                      />
                      <TextField
                        fullWidth
                        required
                        label="Confirme a sua senha"
                        margin="normal"
                        error={errorPasswordConfirm}
                        helperText={errorPasswordConfirm ? 'Confirme sua senha' : ''}
                        name="confirmarSenha"
                        onChange={this.handleChangeConfirmar}
                        type="password"
                        value={this.confirmarSenha}
                        variant="outlined"
                      />


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
                        onClick={() => { this.saveUsuarios() }}> Salvar</Button>
                    </Box>
                  </Card>
                </div>
              </Box>
            </Box>
          </Container>
          <ModalFeedback open={modalVisible} success={modalSuccess} redirect={modalSuccess ? '/adm/usuarios' : ''} title={modalSuccess ? "Sucesso" : "Falhou"} subTitle={modalSuccess ? "Cadastro realizado com sucesso." : "Não foi possível realizar o cadastro, tente novamente mais tarde."} />

        </Box>
      </>
    );
  }
}



export default CadastrarUsuario;
