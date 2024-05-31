import { Helmet } from 'react-helmet';
import { Box, Container, Grid, LinearProgress } from '@material-ui/core';
import MediaMes from '../components/dashboard/MediaMes';
import MediaDia from '../components/dashboard/MediaDia';
import UltimosPedidos from '../components/dashboard/UltimosPedidos';
import MaisVendidos from '../components/dashboard/MaisVendidos';
import Vendas from '../components/dashboard/Vendas';
import PedidosResumo from '../components/dashboard/PedidosResumo';
import Financeiro from '../components/dashboard/Financeiro';
import CategoriasMaisVendidas from '../components/dashboard/CategoriasMaisVendidas';
import AppConfig from 'src/AppConfig';
import TotalClientes from '../components/dashboard/TotalClientes';
import PagamentosUtilizados from 'src/components/dashboard/PagamentosUtilizados';
import RankingHorarios from 'src/components/dashboard/RankingHorarios';
import ComprasCupons from 'src/components/dashboard/ComprasCupons';
import ComprasPromocoes from 'src/components/dashboard/ComprasPromocoes';
import PrincipaisCuponsPromo from 'src/components/dashboard/PrincipaisCuponsPromo';
import React from 'react';
import ServicePedidos from 'src/services/Pedidos';
import ServiceProdutos from 'src/services/Produtos';
import ServiceCategorias from 'src/services/Categorias';
import ServiceSubCategorias from 'src/services/SubCategorias';
import ServiceTipoPagamentos from 'src/services/TipoPagamentos';
import ServiceUsuarios from 'src/services/Usuarios';
import { getLoja } from 'src/daos/auth';
class Dashboard extends React.Component {
  state = {
    pedidos: [],
    loadingPedidos: true,
    tipopagamentos: [],
    loadingPagamentos: true,
    produtos: [],
    loadingProdutos: true,
    categorias: [],
    loadingCategorias: true,
    subcategorias: [],
    loadingSubCategorias: true,
    usuarios: [],
    loadingUsuarios: true
  };

  componentDidMount() {
    this.getPedidos();
  }
  getPedidos = () => {
    ServicePedidos.getPedidos()
      .then((response) => {
        var pedidos = response.data;
        this.setState({ pedidos, loadingPedidos: false });
        this.getUsers();
      })
      .catch((error) => {
        alert('Falha ao carregar os pedidos, tente novamente mais tarde.');
        console.log(error);
      });
  };

  getUsers = () => {
    ServiceUsuarios.getUsuarios()
      .then((response) => {
        var usuarios = response.data.items;
        this.setState({ usuarios, loadingUsuarios: false });
        this.getProdutos();
      })
      .catch((error) => {
        alert('Falha ao carregar, tente novamente mais tarde.');
        console.log(error);
      });
  };
  getProdutos = () => {
    ServiceProdutos.getProdutos()
      .then((response) => {
        var produtos = response.data;
        this.setState({ produtos, loadingProdutos: false });
        this.getTipoPagamendos();
      })
      .catch((error) => {
        alert('Falha ao carregar, tente novamente mais tarde.');
        console.log(error);
      });
  };
  getTipoPagamendos = () => {
    ServiceTipoPagamentos.getTipoPagamentos()
      .then((response) => {
        var tipopagamentos = response.data.items;
        this.setState({ tipopagamentos, loadingPagamentos: false });
        this.getCategorias();
      })
      .catch((error) => {
        alert('Falha ao carregar, tente novamente mais tarde.');
        console.log(error);
      });
  };
  getCategorias = () => {
    ServiceCategorias.getCategorias()
      .then((response) => {
        var categorias = response.data;
        this.setState({ categorias, loadingCategorias: false });
        ServiceSubCategorias.getSubCategorias()
          .then((response) => {
            var subcategorias = response.data;
            this.setState({ subcategorias, loadingSubCategorias: false });
          })
          .catch((error) => {
            alert(
              'Falha ao carregar as subcategorias, tente novamente mais tarde.'
            );
            console.log(error);
          });
      })
      .catch((error) => {
        alert('Falha ao carregar as categorias, tente novamente mais tarde.');
        console.log(error);
      });
  };

  render() {
    const {
      pedidos,
      loading,
      categorias,
      usuarios,
      tipopagamentos,
      produtos,
      loadingCategorias,
      loadingPagamentos,
      loadingProdutos,
      loadingUsuarios,
      loadingSubCategorias,
      subcategorias,
      loadingPedidos
    } = this.state;

    return (
      <>
        <Helmet>
          <title>{'Painel | ' + AppConfig.sigla}</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
        >
          <Container maxWidth={false}>
            {loading ? (
              <LinearProgress />
            ) : (
              <Grid container spacing={3}>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <MediaDia />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <MediaMes />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <TotalClientes
                    clientes={usuarios.filter(function (item) {
                      return (
                        item.loja === getLoja() && item.profiles[0] == 'cliente'
                      );
                    })}
                    loading={loadingUsuarios}
                    sx={{ height: '100%' }}
                  />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <Financeiro
                    totalProdutos={produtos.length}
                    totalPedidos={pedidos.length}
                    lucroTotal={0}
                    loading={loadingPedidos || loadingProdutos}
                    sx={{ height: '100%' }}
                  />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <PedidosResumo />
                </Grid>
                <Grid item lg={4} md={6} xl={3} xs={12}>
                  <MaisVendidos sx={{ height: '100%' }} />
                </Grid>
                <Grid item lg={8} md={12} xl={9} xs={12}>
                  <Vendas />
                </Grid>
                <Grid item lg={4} md={6} xl={3} xs={12}>
                  <CategoriasMaisVendidas sx={{ height: '100%' }} />
                </Grid>
                {/*Horário que mais vende ranking */}
                <Grid item lg={4} md={6} xl={3} xs={12}>
                  <RankingHorarios />
                </Grid>
                {/*COMPRAS POR CUPONS ATIVOS*/}
                <Grid item lg={4} md={6} xl={3} xs={12}>
                  <ComprasCupons sx={{ height: '100%' }} />
                </Grid>
                {/*COMPRAS POR PROMOCOES ATIVAS*/}
                <Grid item lg={4} md={6} xl={3} xs={12}>
                  <ComprasPromocoes sx={{ height: '100%' }} />
                </Grid>
                {/*PROMOCOES E CUPONS DE SUCESSO ranking */}
                <Grid item lg={4} md={6} xl={3} xs={12}>
                  <PrincipaisCuponsPromo sx={{ height: '100%' }} />
                </Grid>
                <Grid item lg={4} md={6} xl={3} xs={12}>
                  <PagamentosUtilizados sx={{ height: '100%' }} />
                </Grid>
                <Grid item lg={8} md={12} xl={9} xs={12}>
                  <UltimosPedidos />
                </Grid>

                {/*ESTATISTICAS ESTOQUE*/}
              </Grid>
            )}
          </Container>
        </Box>
      </>
    );
  }
}

export default Dashboard;
