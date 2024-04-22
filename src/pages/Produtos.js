import { Helmet } from 'react-helmet';
import { Box, Card, Container, Grid, LinearProgress } from '@material-ui/core';
import ProductListToolbar from '../components/product/ProductListToolbar';
import ProductCard from '../components/product/ProductCard';
import ProductEdit from '../components/product/ProductEdit';
import ProductListResults from 'src/components/product/ProductListResults';

import React from 'react';
import ServiceProdutos from '../services/Produtos';

import ServiceCategorias from '../services/Categorias';
import AppConfig from 'src/AppConfig';
import ServiceSubCategorias from 'src/services/SubCategorias';
import ModalFeedback from 'src/components/Other/ModalFeedback';

class Produtos extends React.Component {
  state = {
    produtos: [],
    categorias: [],
    subcategorias: [],
    searchText: '',
    isList: false,
    loading: false,
    categorias: [],
    isEdit: false,
    values: {},
    modalVisible: false,
    modalSuccess: false,
    modalFeedbackVisible: false,
    selected: null
  };

  componentDidMount() {
    this.getProdutos();
  }
  getProdutos = () => {
    this.setState({ loading: true });
    ServiceProdutos.getProdutos()
      .then((response) => {
        var produtos = response.data;
        console.log(produtos);
        this.setState({ produtos });
        this.getCategorias();
      })
      .catch((error) => {
        alert('Falha ao carregar os produtos, tente novamente mais tarde.');
        console.log(error);
      });
  };

  getCategorias = () => {
    ServiceCategorias.getCategorias()
      .then((response) => {
        var categorias = response.data;
        this.setState({ categorias });
        this.getSubCategorias();
      })
      .catch((error) => {
        alert('Falha ao carregar as categorias, tente novamente mais tarde.');
        console.log(error);
      });
  };
  getSubCategorias = () => {
    ServiceSubCategorias.getSubCategorias()
      .then((response) => {
        var subcategorias = response.data;
        this.setState({ subcategorias, loading: false });
      })
      .catch((error) => {
        alert(
          'Falha ao carregar as subcategorias, tente novamente mais tarde.'
        );
        console.log(error);
      });
  };

  handleBackEdit = () => {
    this.setState({ isEdit: false });
  };
  handleEdit = (obj) => {
    this.setState({ values: { nome: obj.name, ...obj }, isEdit: true });
  };
  handleRemovePromo = (obj) => {
    this.setState({ modalVisible: true, selected: obj });
  };
  handleRemovePromoRequest = (id) => {
    this.setState({ loading: true, modalVisible: false });
    ServiceProdutos.removePromocao(id)
      .then(() => {
        this.setState({
          loading: false,
          modalFeedbackVisible: true,
          modalSuccess: true
        });
        this.getProdutos();
      })
      .catch((error) => {
        this.setState({
          loading: false,
          modalFeedbackVisible: true,
          modalSuccess: false
        });
      });
  };

  handleChange = (event) => {
    this.setState({ searchText: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const {
      produtos,
      isList,
      loading,
      searchText,
      values,
      isEdit,
      categorias,
      subcategorias,
      modalVisible,
      selected,
      modalFeedbackVisible,
      modalSuccess
    } = this.state;

    return (
      <>
        <Helmet>
          <title>{'Produtos | ' + AppConfig.sigla}</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
        >
          <ModalFeedback
            open={modalVisible && selected?._id}
            success={true}
            redirect={''}
            onClickConfirm={() => this.handleRemovePromoRequest(selected?._id)}
            onClose={() => {
              this.setState({ modalVisible: false });
            }}
            confirmationButton
            neutralButton
            title={'Confirmar'}
            subTitle={`O produto está com uma promoção ativa, tem certeza que deseja remover a promoção?`}
          />
          <ModalFeedback
            open={modalFeedbackVisible}
            success={modalSuccess}
            redirect={''}
            title={modalSuccess ? 'Sucesso' : 'Falhou'}
            subTitle={
              modalSuccess
                ? 'Promoção removida com sucesso.'
                : 'Não foi possível remover a promoção, tente novamente mais tarde.'
            }
          />
          <Container maxWidth={false}>
            {!isEdit && !isList && (
              <ProductListToolbar
                onTextHandle={this.handleChange}
                onListType={() => {
                  isList
                    ? this.setState({ isList: false })
                    : this.setState({ isList: true });
                }}
              />
            )}
            <div>
              {loading ? (
                <LinearProgress />
              ) : isList ? (
                <ProductListResults
                  objs={produtos}
                  categorias={categorias}
                  subcategorias={subcategorias}
                  onHandleRemovePromo={(produto) =>
                    this.handleRemovePromo(produto)
                  }
                  onListType={() => {
                    isList
                      ? this.setState({ isList: false })
                      : this.setState({ isList: true });
                  }}
                />
              ) : (
                <Grid container spacing={3}>
                  {isEdit ? (
                    <Card
                      sx={{
                        backgroundColor: 'background.default',
                        marginLeft: 3,
                        marginTop: 3,
                        width: '100%'
                      }}
                    >
                      <ProductEdit
                        product={values}
                        categorias={categorias}
                        subcategorias={subcategorias}
                        onBackEdit={this.handleBackEdit}
                      />
                    </Card>
                  ) : (
                    produtos
                      .filter(function (item) {
                        return (
                          item.name.includes(searchText) ||
                          item.name.includes(searchText.toLowerCase()) ||
                          item.name.includes(searchText.toUpperCase()) ||
                          item.name.includes(
                            searchText.charAt(0).toUpperCase() +
                              searchText.slice(1)
                          )
                        );
                      })
                      .map((produto) => (
                        <Grid
                          style={{ marginTop: 20 }}
                          item
                          key={produto._id}
                          lg={4}
                          md={6}
                          xs={12}
                        >
                          <ProductCard
                            product={produto}
                            onHandleEdit={() => this.handleEdit(produto)}
                            onHandleRemovePromo={() =>
                              this.handleRemovePromo(produto)
                            }
                          />
                        </Grid>
                      ))
                  )}
                </Grid>
              )}
            </div>
            {loading == false ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  pt: 3
                }}
              ></Box>
            ) : (
              <div />
            )}
          </Container>
        </Box>
      </>
    );
  }
}

export default Produtos;
