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

class CadastrarCupom extends React.Component {
  state = {
    isChecked: true,
    loading: true,
    nome: '',
    valor: '',
    tipoValor: null,
    descricao: '',
    errorNome: false,
    errorDescricao: false,
    modalVisible: false,
    modalSuccess: true,
    categorias: []
  };

  componentDidMount() {
    this.getCategorias();
  }

  getCategorias = () => {
    ServiceCategorias.getCategorias()
      .then((response) => {
        var categorias = response.data;
        this.setState({ categorias, loading: false });
      })
      .catch((error) => {
        alert('Falha ao carregar as categorias, tente novamente mais tarde.');
        console.log(error);
      });
  };

  saveCupom = () => {
    this.setState({ errorNome: false, errorDescricao: false });
    if (this.state.nome == '') {
      this.setState({ errorNome: true });
      return;
    }
    if (this.state.descricao == '') {
      this.setState({ errorDescricao: true });
      return;
    }
    // var json = {
    //   name: this.state.nome,
    //   loja: getLoja(),
    //   ativo: this.state.isChecked
    // };
    // ServiceCupons.saveCupons(json)
    //   .then((response) => {
    //     var cupom = response.data;

    //     this.setState({ modalVisible: true, modalSuccess: true });
    //   })
    //   .catch((error) => {
    //     this.setState({ modalVisible: true, modalSuccess: false });
    //     console.log(error);
    //   });
    return;
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleAllChecked = () => {
    this.setState({
      isChecked: !this.state.isChecked
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
                              defaultValue="$"
                              name="radio-buttons-group"
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

                          <Typography color="textPrimary" variant="body1">
                            {'Válido para todos os produtos?'}
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={0}>
                              <Switch
                                checked={this.state.isChecked}
                                onChange={this.handleAllChecked}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                            </Grid>
                            <Grid item xs={1} style={{ marginTop: 10 }}>
                              {this.state.isChecked ? (
                                <Typography color="textPrimary" variant="h5">
                                  Sim
                                </Typography>
                              ) : (
                                <Typography color="textPrimary" variant="h5">
                                  Não
                                </Typography>
                              )}
                            </Grid>
                          </Grid>
                          <MultiSelect
                            fullWidth
                            onSelectedValue={(values) => {
                              console.log(values);
                            }}
                            title={'Categorias'}
                            placeholder={'Selecione as Categorias'}
                            items={this.state.categorias}
                          />
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
