import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, CircularProgress, LinearProgress } from '@material-ui/core';
import TipoPagamentosListResults from '../../components/tipoPagamentos/TipoPagamentosListResults';
import TipoPagamentosListToolbar from '../../components/tipoPagamentos/TipoPagamentosListToolbar';
import ServiceTipoPagamentos from '../../services/TipoPagamentos'
import AppConfig from 'src/AppConfig';


class TipoPagamentos extends React.Component {

  state = {
    tipoPagamentos: [],
    searchText: "",
    loading: false
  };


  componentDidMount() {

    this.getTipoPagamentos()
  }
  getTipoPagamentos = () => {
    this.setState({loading: true})
    ServiceTipoPagamentos.getTipoPagamentos().then(response => {
        var tipoPagamentos = response.data.items;
        console.log(tipoPagamentos)
        this.setState({tipoPagamentos, loading: false})
      
    }).catch(error => {
        alert('Falha ao carregar as formas de pagamento, tente novamente mais tarde.');
        console.log(error);
    });
  }

  render(){

    const { classes } = this.props;
    const { tipoPagamentos, loading, searchText} = this.state;
  return (
  <>
    <Helmet>
      <title>{'TipoPagamentos | '+AppConfig.sigla}</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
          { loading ? <LinearProgress/> :
          <TipoPagamentosListResults customers={tipoPagamentos} />
          }
      </Container>
    </Box>
  </>
  );
}
}



export default TipoPagamentos;
