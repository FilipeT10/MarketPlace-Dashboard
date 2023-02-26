import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography, Grid, Container
} from '@material-ui/core';
import getInitials from '../../utils/getInitials';

import Edit from "@material-ui/icons/Edit";

import IconButton from "@material-ui/core/IconButton";
import { Android, ArrowBack, Language } from '@material-ui/icons';
import ServiceLojas from 'src/services/Lojas';
import ModalFeedback from '../Other/ModalFeedback';
import LojasListToolbar from './LojasListToolbar';
import InputImages from '../Other/InputImages';
import ColorPicker from 'material-ui-color-picker';


var imagens = []

const LojasListResults = ({ customers, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [customerEdit, setCustomerEdit] = useState({})
  const [isEdit, setIsEdit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false)
  const [modalSuccess, setModalSuccess] = useState(true)
  const [isChecked, setChecked] = useState(false);
  const [isCheckedSite, setCheckedSite] = useState(false);
  const [isCheckedApp, setCheckedApp] = useState(false);
  const [values, setValues] = useState({
    nome: '',
    tipo: '',
    cep: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    logradouro: '',
    referencia: '',
    primaryColor: '',
    primaryLightColor: '',
    secondaryColor: '',
    secondaryLightColor: '',
  });
  const [errorImagem, setErrorImagem] = useState(false)
  const [errorNome, setErrorNome] = useState(false)
  const [errorCep, setErrorCep] = useState(false)
  const [errorLogradouro, setErrorLogradouro] = useState(false)
  const [errorBairro, setErrorBairro] = useState(false)
  const [errorCidade, setErrorCidade] = useState(false)
  const [errorEstado, setErrorEstado] = useState(false)
  const [errorNumero, setErrorNumero] = useState(false)
  const [errorComplemento, setErrorComplemento] = useState(false)

  const [errorCorPrimary, setErrorPrimary,] = useState(false)
  const [errorCorPrimaryLight, setErrorPrimaryLight] = useState(false)
  const [errorCorSecondary, setErrorSecondary] = useState(false)
  const [errorCorSecondaryLight, setErrorSecondaryLight] = useState(false)

  const [lojas, setLojas] = useState(customers)
  const [searchText, setSearchText] = useState("");

  var errorText = 'Campo obrigatório'
  var errorCoresText = "Selecione uma cor válida"

  var tipoLojas = [
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

  const handleChangeSearch = (event) => {
    let value = event.target.value
    setSearchText(value)
    let lojasFilter = customers.filter(function (item) {
      return item.name.includes(value) || item.name.includes(value.toLowerCase()) || item.name.includes(value.toUpperCase()) || item.name.includes(value.charAt(0).toUpperCase() + value.slice(1))
    })
    setLojas(lojasFilter)
  };
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleEdit = (customer) => {
    setChecked(customer.ativo);
    setCheckedApp(customer.aplications[0].ativo);
    setCheckedSite(customer.aplications[1].ativo);

    if (customer.logo && customer.logo.base) {
      setValues({
        nome: customer.name,
        tipo: customer.tipoLoja,
        imagens: [customer.logo],
        cep: customer.endereco.cep,
        numero: customer.endereco.numero,
        complemento: customer.endereco.complemento,
        bairro: customer.endereco.bairro,
        cidade: customer.endereco.cidade,
        estado: customer.endereco.estado,
        logradouro: customer.endereco.logradouro,
        referencia: customer.endereco.referencia,
        primaryColor: customer.cores.primary,
        primaryLightColor: customer.cores.primaryLight,
        secondaryColor: customer.cores.secondary,
        secondaryLightColor: customer.cores.secondaryLight
      })
    } else {
      setValues({
        nome: customer.name,
        tipo: customer.tipoLoja,
        imagens: [],
        cep: customer.endereco.cep,
        numero: customer.endereco.numero,
        complemento: customer.endereco.complemento,
        bairro: customer.endereco.bairro,
        cidade: customer.endereco.cidade,
        estado: customer.endereco.estado,
        logradouro: customer.endereco.logradouro,
        referencia: customer.endereco.referencia,
        primaryColor: customer.cores.primary,
        primaryLightColor: customer.cores.primaryLight,
        secondaryColor: customer.cores.secondary,
        secondaryLightColor: customer.cores.secondaryLight
      })
    }
    setIsEdit(true);
    setCustomerEdit(customer)
  };

  const handleBackEdit = () => {
    setIsEdit(false);
    setErrorImagem(false)
  };
  const handleAtivoChecked = () => {
    setChecked(!isChecked);
  };
  const handleSelecetedImagens = (items) => {
    imagens = items
    console.log("imagens " + imagens);
  }

  const saveLoja = (nome, ativo) => {
    if (imagens.length < 1 || imagens.length > 1) {
      setErrorImagem(true)
      return
    }
    var possuiError = false
    var referencia = " "

    setErrorCep(false)
    setErrorLogradouro(false)
    setErrorNumero(false)
    setErrorComplemento(false)
    setErrorBairro(false)
    setErrorCidade(false)
    setErrorEstado(false)

    if (values.cep != undefined) {
      if (values.cep.length == 0) {
        setErrorCep(true)
        possuiError = true
      }
    } else {
      setErrorCep(true)
      possuiError = true
    }
    if (values.logradouro != undefined) {
      if (values.logradouro.length == 0) {
        setErrorLogradouro(true)
        possuiError = true
      }
    } else {
      setErrorLogradouro(true)
      possuiError = true
    }

    if (values.numero != undefined) {
      if (values.numero.length == 0) {
        setErrorNumero(true)
        possuiError = true
      }
    } else {
      setErrorNumero(true)
      possuiError = true
    }
    if (values.complemento != undefined) {
      if (values.complemento.length == 0) {
        setErrorComplemento(true)
        possuiError = true
      }
    } else {
      setErrorComplemento(true)
      possuiError = true
    }
    if (values.bairro != undefined) {
      if (values.bairro.length == 0) {
        setErrorBairro(true)
        possuiError = true
      }
    } else {
      setErrorBairro(true)
      possuiError = true
    }
    if (values.cidade != undefined) {
      if (values.cidade.length == 0) {
        setErrorCidade(true)
        possuiError = true
      }
    } else {
      setErrorCidade(true)
      possuiError = true
    }

    if (values.estado != undefined) {
      if (values.estado.length == 0) {
        setErrorEstado(true)
        possuiError = true
      }
    } else {
      setErrorEstado(true)
      possuiError = true
    }

    if (values.referencia != undefined) {
      referencia = values.referencia
    } else {
      referencia = " "
    }

    if (values.nome != undefined) {
      if (values.nome.length == 0) {
        setErrorNome(true)
        possuiError = true
      }
    } else {
      setErrorNome(true)
      possuiError = true
    }


    var tipo = values.tipo

    if (tipo == undefined) {
      tipo = this.tipoLojas[0].value
    }

    if (values.primaryColor == undefined || (values.primaryColor == "" || values.primaryColor?.includes("#") == false || values.primaryColor?.length != 7)) {
      setErrorPrimary(true)
      possuiError = true
    } else {
      setErrorPrimary(false)
    }

    if (values.primaryLightColor == undefined || (values.primaryLightColor == "" || values.primaryLightColor?.includes("#") == false || values.primaryLightColor?.length != 7)) {
      setErrorPrimaryLight(true)
      possuiError = true
    } else {
      setErrorPrimaryLight(false)
    }
    if (values.secondaryColor == undefined || (values.secondaryColor == "" || values.secondaryColor?.includes("#") == false || values.secondaryColor?.length != 7)) {
      setErrorSecondary(true)
      possuiError = true
    } else {
      setErrorSecondary(false)
    }
    if (values.secondaryLightColor == undefined || (values.secondaryLightColor == "" || values.secondaryLightColor?.includes("#") == false || values.secondaryLightColor?.length != 7)) {
      setErrorSecondaryLight(true)
      possuiError = true
    } else {
      setErrorSecondaryLight(false)
    }

    if (possuiError == false) {
      setErrorNome(false)
      setErrorCep(false)
      setErrorLogradouro(false)
      setErrorNumero(false)
      setErrorComplemento(false)
      setErrorBairro(false)
      setErrorCidade(false)
      setErrorEstado(false)
      
      var json = {
        "name": values.nome,
        "logo": imagens[0],
        "tipoLoja": values.tipo,
        "ativo": isChecked,
        "endereco": {
          "cep": values.cep,
          "numero": values.numero,
          "complemento": values.complemento,
          "bairro": values.bairro,
          "cidade": values.cidade,
          "estado": values.estado,
          "logradouro": values.logradouro,
          "referencia": values.referencia,
        },
        "aplications": [
          {
            "ativo": isCheckedApp,
            "name": "App " + values.nome,
            "tipo": "App"
          },
          {
            "ativo": isCheckedSite,
            "name": "Site " + values.nome,
            "tipo": "Site"
          }
        ],
        "cores": {
          "primary": values.primaryColor,
          "primaryLight": values.primaryLightColor,
          "secondary": values.secondaryColor,
          "secondaryLight": values.secondaryLightColor,
        }
      }
      ServiceLojas.editLojas(customerEdit._id, json).then(response => {
        setModalSuccess(true)
        setModalVisible(true)
        var lojas = response.data;
        console.log(lojas)
      }).catch(error => {
        setModalSuccess(false)
        setModalVisible(true)
        console.log(error);
      });
    }
  }

  return (
    <div>
      {isEdit ?
        <Card sx={{ backgroundColor: 'background.default' }}>
          <Box sx={{}}>
            <div>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => { handleBackEdit() }}>
                <ArrowBack />
              </IconButton>

              <Card>
                <CardHeader
                  subheader="Lojas"
                  title="Editar"
                />
                <Divider />
                <CardContent>
                  <TextField
                    fullWidth
                    label="Nome"
                    margin="normal"
                    name="nome"
                    required
                    error={errorNome}
                    helperText={errorNome ? errorText : ''}
                    onChange={handleChange}
                    value={values.nome}
                    variant="outlined"
                  />

                  <TextField
                    fullWidth
                    label="Tipo de Loja"
                    name="tipo"
                    margin="normal"
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={values.tipo}
                    variant="outlined"
                  >
                    {
                      tipoLojas.map((option) => (
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
                        error={errorCep}
                        helperText={errorCep ? errorText : ''}
                        onChange={handleChange}
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
                        error={errorLogradouro}
                        helperText={errorLogradouro ? errorText : ''}
                        onChange={handleChange}
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
                        error={errorBairro}
                        helperText={errorBairro ? errorText : ''}
                        onChange={handleChange}
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
                        error={errorCidade}
                        helperText={errorCidade ? errorText : ''}
                        onChange={handleChange}
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
                        error={errorNumero}
                        helperText={errorNumero ? errorText : ''}
                        onChange={handleChange}
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
                        error={errorComplemento}
                        helperText={errorComplemento ? errorText : ''}
                        onChange={handleChange}
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
                        error={errorEstado}
                        helperText={errorEstado ? errorText : ''}
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                          <div style={{ width: 20, height: 20, backgroundColor: values.primaryColor }}></div>
                        </Grid>
                      </Grid>

                      <ColorPicker
                        style={{ marginTop: 10 }}
                        defaultValue={values.primaryColor}
                        value={values.primaryColor || ''}
                        InputProps={{ value: values.primaryColor }}
                        onChange={color => {
                          setValues({
                            ...values,
                            primaryColor: color
                          });
                        }}
                        margin="normal"
                        name="primaryColor"
                        required
                        error={errorCorPrimary}
                        helperText={errorCorPrimary ? errorCoresText : ''}
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
                          <div style={{ width: 20, height: 20, backgroundColor: values.primaryLightColor }}></div>
                        </Grid>
                      </Grid>
                      <ColorPicker
                        style={{ marginTop: 10 }}
                        defaultValue={values.primaryLightColor}
                        InputProps={{ value: values.primaryLightColor }}
                        value={values.primaryLightColor || ''}
                        onChange={color => {
                          setValues({
                            ...values,
                            primaryLightColor: color
                          });
                        }}
                        margin="normal"
                        name="primaryLightColor"
                        required
                        error={errorCorPrimaryLight}
                        helperText={errorCorPrimaryLight ? errorCoresText : ''}
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
                          <div style={{ width: 20, height: 20, backgroundColor: values.secondaryColor }}></div>
                        </Grid>
                      </Grid>
                      <ColorPicker
                        style={{ marginTop: 10 }}
                        defaultValue={values.secondaryColor}
                        InputProps={{ value: values.secondaryColor }}
                        value={values.secondaryColor || ''}
                        onChange={color => {
                          setValues({
                            ...values,
                            secondaryColor: color
                          });
                        }}
                        margin="normal"
                        name="secondaryColor"
                        required
                        error={errorCorSecondary}
                        helperText={errorCorSecondary ? errorCoresText : ''}
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
                          <div style={{ width: 20, height: 20, backgroundColor: values.secondaryLightColor }}></div>
                        </Grid>
                      </Grid>


                      <ColorPicker
                        style={{ marginTop: 10 }}
                        defaultValue={values.secondaryLightColor}
                        InputProps={{ value: values.secondaryLightColor }}
                        value={values.secondaryLightColor || ''}
                        onChange={color => {
                          setValues({
                            ...values,
                            secondaryLightColor: color
                          });
                        }}
                        margin="normal"
                        name="secondaryLightColor"
                        required
                        error={errorCorSecondaryLight}
                        helperText={errorCorSecondaryLight ? errorCoresText : ''}
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
                        onChange={() => setCheckedSite(!isCheckedSite)}
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
                        onChange={() => setCheckedApp(!isCheckedApp)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </Grid>


                    <Grid item xs={1} style={{ marginTop: 10 }}>
                      <Typography
                        color="textPrimary"
                        variant="h5"
                      >
                        Aplicativo
                      </Typography>
                    </Grid>
                  </Grid>

                  <InputImages
                    error={errorImagem}
                    maxLenght={1}
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


                  <Grid container spacing={1}>
                    <Grid item xs={0}>
                      <Switch
                        checked={isChecked}
                        onChange={() => setChecked(!isChecked)}
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
                    onClick={() => { saveLoja(values.nome, isChecked) }}> Salvar</Button>
                </Box>
              </Card>
            </div>
            <ModalFeedback open={modalVisible} success={modalSuccess} redirect={modalSuccess ? '/adm/painel' : ''} title={modalSuccess ? "Sucesso" : "Falhou"} subTitle={modalSuccess ? "Loja editada com sucesso." : "Não foi possível editar a loja, tente novamente mais tarde."} />
          </Box>
        </Card>
        :
        <div>



          <LojasListToolbar onTextHandle={handleChangeSearch} />

          <Card style={{ marginTop: 20 }}>
            <PerfectScrollbar>
              <Box sx={{}}>
                <Table>
                  <TableHead>
                    <TableRow>

                      <TableCell>
                        Logo
                      </TableCell>
                      <TableCell>
                        Nome
                      </TableCell>
                      <TableCell>
                        Tipo
                      </TableCell>
                      <TableCell>
                        Aplicações
                      </TableCell>
                      <TableCell>
                        Ativo
                      </TableCell>
                      <TableCell>
                        Ações
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lojas.slice(0, limit).map((customer) => (
                      <TableRow
                        hover
                        key={customer.id}
                      >
                        <TableCell>
                          {customer.logo != undefined && <img style={{ justifyContent: 'center', width: 50, height: 50 }} src={customer.logo.base} />}

                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              alignItems: 'center',
                              display: 'flex'
                            }}
                          >
                            <Typography
                              color="textPrimary"
                              variant="body1"
                            >
                              {customer.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              alignItems: 'center',
                              display: 'flex'
                            }}
                          >
                            <Typography
                              color="textPrimary"
                              variant="body1"
                            >
                              {customer.tipoLoja}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              alignItems: 'center',
                              display: 'flex'
                            }}
                          >
                            {customer.aplications.map((aplication) => (

                              <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={() => { }}
                              >
                                {aplication.tipo == 'App' ? <Android color={aplication.ativo ? 'primary' : 'disabled'} /> : <Language color={aplication.ativo ? 'primary' : 'disabled'} />}
                              </IconButton>

                            ))}

                          </Box>
                        </TableCell>
                        <TableCell >
                          {customer.ativo ? <Chip
                            color="success"
                            label={"Ativo"}
                            size="small"
                          /> : <Chip
                            color="warning"
                            label={"Inativo"}
                            size="small"
                          />}
                        </TableCell>
                        <TableCell >
                          <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => {
                              handleEdit(customer)
                            }}
                          >
                            <Edit />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

              </Box>

            </PerfectScrollbar>


            <TablePagination
              component="div"
              count={customers.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </div>
      }
    </div>
  );
};

LojasListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default LojasListResults;
