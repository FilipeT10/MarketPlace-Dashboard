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
  TextField,
  Grid
} from '@material-ui/core';
import ModalFeedback from 'src/components/Other/ModalFeedback';
import AppConfig from 'src/AppConfig';
import 'react-datepicker/dist/react-datepicker.css';
import DateTimePicker from 'src/components/datetimepicker/DateTimePicker';
import { useLocation, useNavigate } from 'react-router';
import ServiceProdutos from 'src/services/Produtos';

function withLocation(Component) {
  return (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
      <CadastrarPromocao {...props} location={location} navigate={navigate} />
    );
  };
}

class CadastrarPromocao extends React.Component {
  state = {
    loading: false,
    valor: '',
    descricao: '',
    errorDescricao: false,
    errorValor: false,
    modalVisible: false,
    modalSuccess: true,
    dataFinal: null,
    dataInicial: null,
    errorDataFinal: false,
    errorDataInicial: false,
    id: null
  };

  componentDidMount() {
    const { location, navigate } = this.props;
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('product');
    this.setState({ id: id });
    if (!id) {
      navigate('/app/', { replace: true });
      alert('Não foi possível reconhecer o produto.');
    }
  }

  savePromocao = () => {
    this.setState({
      errorDescricao: false,
      errorValor: false,
      errorDataFinalMessage: null,
      errorDataFinal: false,
      errorDataInicial: false
    });
    if (this.state.descricao == '') {
      this.setState({ errorDescricao: true });
      return;
    }
    if (this.state.valor == '') {
      this.setState({ errorValor: true });
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
      descricao: this.state.descricao,
      preco: this.state.valor,
      periodoInicial: this.state.dataInicial,
      periodoFinal: this.state.dataFinal
    };
    this.setState({ loading: true });
    ServiceProdutos.savePromocao(this.state.id, json)
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
          <title>{'Cadastrar Promoção | ' + AppConfig.sigla}</title>
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
                    <CardHeader subheader="Promoção" title="Cadastrar" />
                    <Divider />
                    {loading ? (
                      <LinearProgress />
                    ) : (
                      <>
                        <CardContent>
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
                              this.savePromocao();
                            }}
                          >
                            {' '}
                            Salvar
                          </Button>
                        </Box>
                        <ModalFeedback
                          open={modalVisible}
                          success={modalSuccess}
                          redirect={modalSuccess ? '/app/promocoes' : ''}
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

export default withLocation(CadastrarPromocao);
