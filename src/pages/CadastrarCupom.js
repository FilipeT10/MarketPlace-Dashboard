import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, LinearProgress } from '@material-ui/core';
import ServiceCupons from '../services/Cupons';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Switch,
  TextField,
  Typography,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { ArrowBack, TryRounded } from '@material-ui/icons';
import ModalFeedback from 'src/components/Other/ModalFeedback';
import AppConfig from 'src/AppConfig';
import { getLoja } from 'src/daos/auth';
import MultiSelect from 'src/components/Other/MultiSelect';
import ServiceCategorias from 'src/services/Categorias';
import ServiceSubCategorias from 'src/services/SubCategorias';
import formatMoney from 'src/utils/formatMoney';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DateTimePicker from 'src/components/datetimepicker/DateTimePicker';
class CadastrarCupom extends React.Component {
  state = {
    disponibilidade: null,
    loading: true,
    nome: '',
    valor: '',
    valorMinimo: '',
    tipoValor: '$',
    descricao: '',
    errorNome: false,
    errorDescricao: false,
    errorValorMinimo: false,
    errorCategorias: false,
    errorDisponibilidade: false,
    errorDataFinalMessage: null,
    modalVisible: false,
    modalSuccess: true,
    dataFinal: null,
    dataInicial: null,
    errorDataFinal: false,
    errorDataInicial: false,
    categorias: [],
    subcategorias: [],
    categoriasSelected: [],
    subcategoriasSelected: []
  };

  componentDidMount() {
    this.getCategorias();
  }
  getSubCategorias = () => {
    ServiceSubCategorias.getSubCategorias()
      .then((response) => {
        var subcategorias = response.data;
        this.setState({
          subcategorias,
          subcategoriasSelected: subcategorias,
          loading: false
        });
      })
      .catch((error) => {
        alert('Falha ao carregar as categorias, tente novamente mais tarde.');
        console.log(error);
      });
  };
  getCategorias = () => {
    ServiceCategorias.getCategorias()
      .then((response) => {
        var categorias = response.data;
        this.setState({ categorias, categoriasSelected: categorias });
        this.getSubCategorias();
      })
      .catch((error) => {
        alert('Falha ao carregar as categorias, tente novamente mais tarde.');
        console.log(error);
      });
  };

  saveCupom = () => {
    this.setState({
      errorNome: false,
      errorDescricao: false,
      errorValor: false,
      errorDisponibilidade: false,
      errorCategorias: false,
      errorValorMinimo: false,
      errorDataFinalMessage: null,
      errorDataFinal: false,
      errorDataInicial: false
    });
    if (this.state.nome == '') {
      this.setState({ errorNome: true });
      return;
    }
    if (this.state.descricao == '') {
      this.setState({ errorDescricao: true });
      return;
    }
    if (this.state.valor == '') {
      this.setState({ errorValor: true });
      return;
    }
    if (this.state.disponibilidade == null) {
      this.setState({ errorDisponibilidade: true });
      return;
    }
    if (this.state.valorMinimo == '' && this.state.disponibilidade == '>') {
      this.setState({ errorValorMinimo: true });
      return;
    }
    if (
      this.state.categoriasSelected.length == 0 &&
      this.state.subcategoriasSelected.length == 0 &&
      this.state.disponibilidade != 'all'
    ) {
      this.setState({ errorCategorias: true });
      return;
    }
    if (this.state.dataInicial == null) {
      this.setState({ errorDataInicial: true });
      return;
    }
    if (this.state.dataFinal == null) {
      this.setState({ errorDataFinal: true });
      return;
    }
    if (new Date(this.state.dataFinal) <= new Date()) {
      this.setState({
        errorDataFinal: true,
        errorDataFinalMessage: 'Período final inválido!'
      });
      return;
    }
    const tempoRestante = new Date(this.state.dataFinal) - new Date();
    //20 dias
    if (tempoRestante > 1728000000) {
      this.setState({
        errorDataFinal: true,
        errorDataFinalMessage:
          'O intervalo máximo permitido é de 20 dias a partir da data atual.'
      });
      return;
    }
    var json = {
      name: this.state.nome,
      loja: getLoja(),
      descricao: this.state.descricao,
      categorias:
        this.state.disponibilidade == 'all'
          ? []
          : this.state.categoriasSelected,
      subcategorias:
        this.state.disponibilidade == 'all'
          ? []
          : this.state.subcategoriasSelected,
      valor: this.state.valor,
      tipo: this.state.tipoValor,
      periodoInicial: this.state.dataInicial,
      periodoFinal: this.state.dataFinal,
      condicao: this.state.disponibilidade,
      valorCondicao:
        this.state.disponibilidade == '>' ? this.state.valorMinimo : undefined
    };
    this.setState({ loading: true });
    ServiceCupons.saveCupons(json)
      .then(() => {
        this.setState({
          modalVisible: true,
          modalSuccess: true,
          loading: false
        });
      })
      .catch((error) => {
        if (error.response.data.message) {
          this.setState({ errorMessage: error.response.data.message });
        }
        this.setState({
          modalVisible: true,
          modalSuccess: false,
          loading: false
        });
        console.log(error);
      });
    return;
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { modalVisible, modalSuccess, loading } = this.state;
    return (
      <>
        <Helmet>
          <title>{'Cadastrar Cupom | ' + AppConfig.sigla}</title>
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
                    <CardHeader subheader="Cupom" title="Cadastrar" />
                    <Divider />
                    {loading ? (
                      <LinearProgress />
                    ) : (
                      <>
                        <CardContent>
                          <TextField
                            fullWidth
                            label="Nome"
                            margin="normal"
                            name="nome"
                            required
                            error={this.state.errorNome}
                            helperText={
                              this.state.errorNome ? 'Campo obrigatório' : ''
                            }
                            onChange={this.handleChange}
                            value={this.state.nome}
                            variant="outlined"
                          />
                          <TextField
                            fullWidth
                            label="Descrição"
                            margin="normal"
                            name="descricao"
                            required
                            error={this.state.errorDescricao}
                            helperText={
                              this.state.errorDescricao
                                ? 'Campo obrigatório'
                                : ''
                            }
                            onChange={this.handleChange}
                            value={this.state.descricao}
                            variant="outlined"
                          />

                          <TextField
                            label="Valor"
                            margin="normal"
                            name="valor"
                            required
                            error={this.state.errorValor}
                            helperText={
                              this.state.errorValor ? 'Campo obrigatório' : ''
                            }
                            onChange={this.handleChange}
                            value={this.state.valor}
                            variant="outlined"
                          />
                          <FormControl style={{ marginLeft: 10, marginTop: 5 }}>
                            <RadioGroup
                              aria-labelledby="tipo do valor"
                              defaultValue={this.state.tipoValor}
                              name="tipoValor"
                              onChange={(event, value) => {
                                this.setState({ tipoValor: value });
                              }}
                            >
                              <FormControlLabel
                                value="$"
                                control={<Radio size="small" />}
                                label="R$"
                              />
                              <FormControlLabel
                                value="%"
                                control={<Radio size="small" />}
                                label="%"
                              />
                            </RadioGroup>
                          </FormControl>

                          <Typography
                            color={
                              this.state.errorDisponibilidade
                                ? 'error'
                                : 'textPrimary'
                            }
                            variant="body1"
                          >
                            {this.state.errorDisponibilidade
                              ? 'Disponibilidade *   Campo obrigatório'
                              : 'Disponibilidade *'}
                          </Typography>
                          <FormControl
                            style={{
                              marginLeft: 10,
                              marginTop: 5,
                              width: '100%'
                            }}
                          >
                            <RadioGroup
                              aria-labelledby="disponibilidade"
                              required
                              name="disponibilidade"
                              style={{ marginBottom: 10 }}
                              onChange={(event, value) => {
                                if (value == 'all') {
                                  this.setState({
                                    categoriasSelected: this.state.categorias,
                                    errorCategorias: false,
                                    subcategoriasSelected:
                                      this.state.subcategorias
                                  });
                                }
                                this.setState({ disponibilidade: value });
                              }}
                            >
                              <FormControlLabel
                                value="all"
                                control={<Radio size="small" />}
                                label="Válido para todos os produtos?"
                              />
                              <FormControlLabel
                                value="PC"
                                control={<Radio size="small" />}
                                label="Válido somente para a primeira compra?"
                              />
                              <FormControlLabel
                                value=">"
                                control={<Radio size="small" />}
                                label="Válido para compras a partir de algum valor?"
                              />
                            </RadioGroup>
                          </FormControl>

                          {this.state.disponibilidade == '>' && (
                            <TextField
                              label="Valor mínimo"
                              margin="normal"
                              name="valorMinimo"
                              required
                              error={this.state.errorValorMinimo}
                              helperText={
                                this.state.errorValorMinimo
                                  ? 'Campo obrigatório'
                                  : ''
                              }
                              onChange={this.handleChange}
                              value={this.state.valorMinimo}
                              variant="outlined"
                            />
                          )}
                          {(this.state.disponibilidade == 'PC' ||
                            this.state.disponibilidade == '>') && (
                            <>
                              <MultiSelect
                                fullWidth
                                onSelectedValue={(values) => {
                                  console.log(values);
                                  this.setState({
                                    categoriasSelected: values
                                  });
                                }}
                                title={'Categorias'}
                                placeholder={'Selecione as Categorias'}
                                items={this.state.categorias}
                              />
                              <MultiSelect
                                fullWidth
                                onSelectedValue={(values) => {
                                  this.setState({
                                    subcategoriasSelected: values
                                  });
                                }}
                                title={'Subcategorias'}
                                placeholder={'Selecione as Subcategorias'}
                                items={this.state.subcategorias}
                              />
                              {this.state.errorCategorias && (
                                <Typography color={'error'} variant="body1">
                                  {
                                    'É obrigatório selecionar pelo menos 1 categoria ou 1 subcategoria.'
                                  }
                                </Typography>
                              )}
                            </>
                          )}
                          <Grid container spacing={2} fullWidth>
                            <Grid item>
                              <DateTimePicker
                                required
                                onSelectedValue={(date) =>
                                  this.setState({ dataInicial: date })
                                }
                                title={'Horário inicial'}
                                error={this.state.errorDataInicial}
                              />
                            </Grid>
                            <Grid item style={{ marginTop: 0 }}>
                              <DateTimePicker
                                required
                                onSelectedValue={(date) =>
                                  this.setState({ dataFinal: date })
                                }
                                title={'Horário final'}
                                errorMessage={this.state.errorDataFinalMessage}
                                error={this.state.errorDataFinal}
                              />
                            </Grid>
                          </Grid>
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
                            onClick={() => {
                              this.saveCupom();
                            }}
                          >
                            {' '}
                            Salvar
                          </Button>
                        </Box>
                        <ModalFeedback
                          open={modalVisible}
                          success={modalSuccess}
                          redirect={modalSuccess ? '/app/cupons' : ''}
                          title={modalSuccess ? 'Sucesso' : 'Falhou'}
                          subTitle={
                            modalSuccess
                              ? 'Cadastro realizado com sucesso.'
                              : this.state.errorMessage
                              ? this.state.errorMessage
                              : 'Não foi possível realizar o cadastro, tente novamente mais tarde.'
                          }
                        />{' '}
                      </>
                    )}
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

export default CadastrarCupom;
