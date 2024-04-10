import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  CircularProgress,
  LinearProgress
} from '@material-ui/core';
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
  Grid
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { ArrowBack, TryRounded } from '@material-ui/icons';
import ModalFeedback from 'src/components/Other/ModalFeedback';
import AppConfig from 'src/AppConfig';
import { getLoja } from 'src/daos/auth';

class CadastrarCupom extends React.Component {
  state = {
    isChecked: true,
    nome: '',
    errorNome: false,
    modalVisible: false,
    modalSuccess: true
  };

  saveCategoria = () => {
    if (this.state.nome != '') {
      this.setState({ errorNome: false });
      var json = {
        name: this.state.nome,
        loja: getLoja(),
        ativo: this.state.isChecked
      };
      ServiceCupons.saveCupons(json)
        .then((response) => {
          var cupom = response.data;

          this.setState({ modalVisible: true, modalSuccess: true });
        })
        .catch((error) => {
          this.setState({ modalVisible: true, modalSuccess: false });
          console.log(error);
        });
    } else {
      this.setState({ errorNome: true });
    }
  };

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

  render() {
    const { modalVisible, modalSuccess } = this.state;
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

                      <Grid container spacing={2}>
                        <Grid item xs={0}>
                          <Switch
                            checked={this.state.isChecked}
                            onChange={this.handleAtivoChecked}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        </Grid>
                        <Grid item xs={1} style={{ marginTop: 10 }}>
                          {this.state.isChecked ? (
                            <Typography color="textPrimary" variant="h5">
                              Ativo
                            </Typography>
                          ) : (
                            <Typography color="textPrimary" variant="h5">
                              Inativo
                            </Typography>
                          )}
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
                          : 'Não foi possível realizar o cadastro, tente novamente mais tarde.'
                      }
                    />
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
