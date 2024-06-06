import { Helmet } from 'react-helmet';
import { Box, Container, Grid, LinearProgress } from '@material-ui/core';
import MediaLucro from '../components/dashboard/MediaLucro';
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
    loadingUsuarios: true,
    totalMesAtual: 0,
    mediaMensal: 0,
    variacaoMensal: 0,
    totalDiaAtual: 0,
    mediaDiaria: 0,
    variacaoDiaria: 0,
    valorTotal: 0,
    contagemStatus: {},
    maisVendidos: {}
  };

  componentDidMount() {
    this.getPedidos();
  }
  getPedidos = () => {
    ServicePedidos.getPedidos()
      .then((response) => {
        var pedidos = response.data;
        this.setState({ pedidos });
        this.analisarPedidos(pedidos);
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

  // Função para organizar pedidos por mês, preenchendo meses sem registros
  organizarPedidosPorMes(pedidos) {
    const pedidosPorMes = {};
    const inicio = new Date(Math.min(...pedidos.map((p) => new Date(p.data))));
    const fim = new Date(Math.max(...pedidos.map((p) => new Date(p.data))));

    for (
      let d = new Date(inicio.getFullYear(), inicio.getMonth(), 1);
      d <= new Date(fim.getFullYear(), fim.getMonth(), 1);
      d.setMonth(d.getMonth() + 1)
    ) {
      const mes =
        d.getFullYear() + '-' + (d.getMonth() + 1).toString().padStart(2, '0');
      pedidosPorMes[mes] = [];
    }

    pedidos.forEach((pedido) => {
      const data = new Date(pedido.data);
      const mes =
        data.getFullYear() +
        '-' +
        (data.getMonth() + 1).toString().padStart(2, '0');
      pedidosPorMes[mes].push(pedido);
    });

    return pedidosPorMes;
  }

  // Função para organizar pedidos por dia, preenchendo dias sem registros
  organizarPedidosPorDia(pedidos) {
    const pedidosPorDia = {};
    const inicio = new Date(Math.min(...pedidos.map((p) => new Date(p.data))));
    const fim = new Date(Math.max(...pedidos.map((p) => new Date(p.data))));

    for (let d = new Date(inicio); d <= fim; d.setDate(d.getDate() + 1)) {
      const dia = d.toISOString().split('T')[0];
      pedidosPorDia[dia] = [];
    }

    pedidos.forEach((pedido) => {
      const data = new Date(pedido.data);
      const dia = data.toISOString().split('T')[0];
      pedidosPorDia[dia].push(pedido);
    });

    return pedidosPorDia;
  }

  // Função para calcular o total arrecadado por período (mês ou dia)
  calcularTotalPorPeriodo(pedidosPorPeriodo) {
    const totalPorPeriodo = {};

    for (const periodo in pedidosPorPeriodo) {
      totalPorPeriodo[periodo] = pedidosPorPeriodo[periodo].reduce(
        (total, pedido) => total + Number(pedido.valor),
        0
      );
    }

    return totalPorPeriodo;
  }

  // Função para calcular a média por período (mês ou dia)
  calcularMediaPorPeriodo(totalPorPeriodo) {
    const valores = Object.values(totalPorPeriodo);
    const total = valores.reduce((total, valor) => total + valor, 0);
    return total / valores.length;
  }

  // Função para calcular a variação percentual entre dois períodos
  calcularVariacaoPercentual(periodoAtual, periodoAnterior) {
    if (periodoAnterior === 0) return 0;
    return ((periodoAtual - periodoAnterior) / periodoAnterior) * 100;
  }

  contarStatus(pedidos) {
    const contagemStatus = [];

    pedidos.forEach((pedido) => {
      const status = pedido.status;
      if (!contagemStatus[status]) {
        contagemStatus[status] = {
          key: status,
          quantidade: 0,
          porcentagem: 0
        };
      }
      contagemStatus[status].quantidade++;
    });
    for (const status in contagemStatus) {
      contagemStatus[status].porcentagem =
        (contagemStatus[status].quantidade / pedidos.length) * 100;
    }

    return contagemStatus;
  }
  contarVendas(pedidos) {
    const contagemProduto = [];
    var qtdProdutos = 0;
    pedidos.forEach((pedido) => {
      pedido.produtos.forEach((obj) => {
        const produto = obj.produto;
        if (!contagemProduto[produto]) {
          contagemProduto[produto] = {
            nome: obj.name,
            quantidade: 0,
            porcentagem: 0
          };
        }
        contagemProduto[produto].quantidade += Number(obj.quantidade);
        qtdProdutos += Number(obj.quantidade);
      });
    });

    for (const produto in contagemProduto) {
      contagemProduto[produto].porcentagem =
        (contagemProduto[produto].quantidade / qtdProdutos) * 100;
    }

    return contagemProduto;
  }

  // Função principal
  analisarPedidos(pedidos) {
    // Análise mensal
    const pedidosPorMes = this.organizarPedidosPorMes(pedidos);
    const totalPorMes = this.calcularTotalPorPeriodo(pedidosPorMes);

    const meses = Object.keys(totalPorMes).sort();
    const mesAtual = meses[meses.length - 1];
    const mesAnterior = meses[meses.length - 2];

    const totalMesAtual = totalPorMes[mesAtual] || 0;
    const totalMesAnterior = totalPorMes[mesAnterior] || 0;

    const mediaMensal = this.calcularMediaPorPeriodo(totalPorMes);
    const variacaoMensal = this.calcularVariacaoPercentual(
      totalMesAtual,
      totalMesAnterior
    );

    // Análise diária
    const pedidosPorDia = this.organizarPedidosPorDia(pedidos);
    const totalPorDia = this.calcularTotalPorPeriodo(pedidosPorDia);

    const dias = Object.keys(totalPorDia).sort();
    const diaAtual = dias[dias.length - 1];
    const diaAnterior = dias[dias.length - 2];

    const totalDiaAtual = totalPorDia[diaAtual] || 0;
    const totalDiaAnterior = totalPorDia[diaAnterior] || 0;

    const mediaDiaria = this.calcularMediaPorPeriodo(totalPorDia);
    const variacaoDiaria = this.calcularVariacaoPercentual(
      totalDiaAtual,
      totalDiaAnterior
    );

    //analise total
    const valorTotal = pedidos.reduce(
      (total, pedido) => total + Number(pedido.valor),
      0
    );

    //analise status
    const contagemStatus = this.contarStatus(pedidos);
    contagemStatus.sort((a, b) => b.quantidade - a.quantidade);
    //analise mais vendidos
    const maisVendidos = this.contarVendas(pedidos);
    maisVendidos.sort((a, b) => b.quantidade - a.quantidade);

    console.log(maisVendidos);

    this.setState({
      totalMesAtual,
      mediaMensal,
      variacaoMensal,
      totalDiaAtual,
      mediaDiaria,
      variacaoDiaria,
      valorTotal,
      contagemStatus,
      maisVendidos,
      loadingPedidos: false
    });
  }

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
      loadingPedidos,
      totalMesAtual,
      mediaMensal,
      variacaoMensal,
      totalDiaAtual,
      mediaDiaria,
      valorTotal,
      variacaoDiaria,
      contagemStatus,
      maisVendidos
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
                  <MediaLucro
                    type={'diario'}
                    lucro={totalDiaAtual}
                    media={mediaDiaria}
                    variacao={variacaoDiaria}
                    loading={loadingPedidos}
                  />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <MediaLucro
                    type={'mensal'}
                    lucro={totalMesAtual}
                    media={mediaMensal}
                    variacao={variacaoMensal}
                    loading={loadingPedidos}
                  />
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
                    lucroTotal={valorTotal.toFixed(2)}
                    loading={loadingPedidos || loadingProdutos}
                    sx={{ height: '100%' }}
                  />
                </Grid>
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <PedidosResumo
                    contagem={contagemStatus}
                    loading={loadingPedidos}
                  />
                </Grid>
                <Grid item lg={4} md={6} xl={3} xs={12}>
                  <MaisVendidos
                    sx={{ height: '100%' }}
                    contagem={maisVendidos}
                    loading={loadingPedidos}
                  />
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
