import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, CircularProgress, LinearProgress, Alert } from '@material-ui/core';
import ServicePedidos from '../services/Pedidos'

import ServiceCategorias from '../services/Categorias'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Switch,
  TextField,
  Typography, Grid, MenuItem, Checkbox, FormControlLabel
} from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import { Add, ArrowBack, ArrowDropDown, ArrowDropUp, HorizontalRule } from '@material-ui/icons';
import TagsInput from '../components/Other/TagsInput';

import ModalFeedback from 'src/components/Other/ModalFeedback';
import InputImages from 'src/components/Other/InputImages';
import AppConfig from 'src/AppConfig';
import { getLoja } from 'src/daos/auth';
import ServiceSubCategorias from 'src/services/SubCategorias';
import ServiceTipoPagamentos from 'src/services/TipoPagamentos';
import ServiceProdutos from 'src/services/Produtos';
import ProducsPedidotListResults from 'src/components/pedidos/ProductsPedidoListResults';

var tamanhos = []

var cores = []

var ingredientes = []

var imagens = []


class CadastrarPedido extends React.Component {



  state = {
    isChecked: true,
    errorNome: false,
    errorPreco: false,
    errorQtd: false,
    loading: true,
    errorText: 'Campo obrigatório',
    nome: '',
    isCheckedEntregarLoja: false,
    tipopagamentos: [],
    subcategoriaId: [],
    subcategorias: [],
    produtos: [],
    produtosPedido: [],
    ingredientesSelected: [],
    values: {},
    frete: 5.99,
    selectedProduto: {},
    quantidadeProduto: 1,
    modalVisible: false,
    modalSuccess: true,
    selectedFile: '',
    errorImagem: false,
    detalhesProduto: false,
    editProduct: null
  };


  componentDidMount() {

    this.getTipoPagamentos()
  }

  handleChangeSubcategoria = (event) => {

    const { subcategoriaId } = this.state
    if (!subcategoriaId.includes(event.target.value))
      this.setState({ subcategoriaId: event.target.value });

    console.log(subcategoriaId)
    // selected options
  };

  filterSubCategoriaFromId = (id) => {

    const { subcategorias } = this.state
    if (subcategorias.length == 0 || id == undefined) {
      return ''
    } else {
      let usuariosFilter = subcategorias.filter(function (item) {
        return item._id == id
      })
      if (usuariosFilter.length == 0) {
        return "Subcategoria não encontrada"
      }
      return usuariosFilter[0].name
    }
  }
  filterProductFromId = (id) => {

    const { produtos } = this.state
    if (produtos.length == 0 || id == undefined) {
      return {}
    } else {
      let usuariosFilter = produtos.filter(function (item) {
        return item._id == id
      })
      if (usuariosFilter.length == 0) {
        return {}
      }
      return usuariosFilter[0]
    }
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

  handleCheckedEntregarLoja = () => {
    this.setState({
      isCheckedEntregarLoja: !this.state.isCheckedEntregarLoja
    });
  };


  handleSelecetedTamanhos = (items) => {
    tamanhos = items
    console.log("tamanhos " + tamanhos);
  }
  handleSelecetedCores = (items) => {
    cores = items
    console.log("cores " + cores);
  }
  handleSelecetedIngredientes = (items) => {
    ingredientes = items
    console.log("ingredientes " + ingredientes);
  }
  handleSelecetedImagens = (items) => {
    imagens = items
    console.log("imagens " + imagens);
  }

  adicionarProduto = (product) => {




    var tamanho = this.state.values.tamanho

    if (tamanho == undefined) {
      tamanho = product.tamanhos[0]
    }
    var cor = this.state.values.cor

    if (cor == undefined) {
      cor = product.cores[0]
    }

    var produto = {
      "tamanho": tamanho,
      "cor": cor,
      "name": product.name,
      "preco": product.preco,
      "quantidade": this.state.quantidadeProduto,
      "ingredientes": this.state.ingredientesSelected,
      "produto": product._id
    }
    console.log(produto)

    this.setState({
      values:
      {
        ...this.state.values,
        "cor": undefined,
        "tamanho": undefined
      }
    });
    this.setState({ quantidadeProduto: 1 });

    var produtosPedidos = this.state.produtosPedido
    produtosPedidos.push(produto)

    this.setState({ "detalhesProduto": false })
    this.setState({ "produtosPedido": produtosPedidos })

  }
  savePedidos = () => {

    var possuiError = false

    var referencia = " "

    this.setState({ errorCep: false, errorLogradouro: false, errorNumero: false, errorComplemento: false, errorBairro: false, errorCidade: false, errorEstado: false })
    if (!this.state.isCheckedEntregarLoja) {

      if (this.state.values.cep != undefined) {
        if (this.state.values.cep.length == 0) {
          this.setState({ errorCep: true })
          possuiError = true
        }
      } else {
        this.setState({ errorCep: true })
        possuiError = true
      }
      if (this.state.values.logradouro != undefined) {
        if (this.state.values.logradouro.length == 0) {
          this.setState({ errorLogradouro: true })
          possuiError = true
        }
      } else {
        this.setState({ errorLogradouro: true })
        possuiError = true
      }

      if (this.state.values.numero != undefined) {
        if (this.state.values.numero.length == 0) {
          this.setState({ errorNumero: true })
          possuiError = true
        }
      } else {
        this.setState({ errorNumero: true })
        possuiError = true
      }
      if (this.state.values.complemento != undefined) {
        if (this.state.values.complemento.length == 0) {
          this.setState({ errorComplemento: true })
          possuiError = true
        }
      } else {
        this.setState({ errorComplemento: true })
        possuiError = true
      }
      if (this.state.values.bairro != undefined) {
        if (this.state.values.bairro.length == 0) {
          this.setState({ errorBairro: true })
          possuiError = true
        }
      } else {
        this.setState({ errorBairro: true })
        possuiError = true
      }
      if (this.state.values.cidade != undefined) {
        if (this.state.values.cidade.length == 0) {
          this.setState({ errorCidade: true })
          possuiError = true
        }
      } else {
        this.setState({ errorCidade: true })
        possuiError = true
      }

      if (this.state.values.estado != undefined) {
        if (this.state.values.estado.length == 0) {
          this.setState({ errorEstado: true })
          possuiError = true
        }
      } else {
        this.setState({ errorEstado: true })
        possuiError = true
      }

      if (this.state.values.referencia != undefined) {
        referencia = this.state.values.referencia
      } else {
        referencia = " "
      }

    }

    var tipoPagamento = this.state.values.tipopagamentos

    if (tipoPagamento == undefined) {
      tipoPagamento = this.state.tipopagamentos[0]._id
    }




    if (possuiError == false) {

      this.setState({ errorCep: false, errorLogradouro: false, errorNumero: false, errorComplemento: false, errorBairro: false, errorCidade: false, errorEstado: false })
      var pontos = (this.getValorTotal() / 2).toFixed(0)
      var json = {
        "user": getLoja(),
        "loja": getLoja(),
        "valor": this.getValorTotal(),
        "status": '01',
        "tipoPagamento": tipoPagamento,
        "produtos": this.state.produtosPedido,
        "endereco": {
          "cep": this.state.values.cep,
          "numero": this.state.values.numero,
          "complemento": this.state.values.complemento,
          "bairro": this.state.values.bairro,
          "cidade": this.state.values.cidade,
          "estado": this.state.values.estado,
          "logradouro": this.state.values.logradouro,
          "referencia": referencia
        },
        "pontos": pontos
      }

      if (this.state.isCheckedEntregarLoja) {
        json = {
          "user": getLoja(),
          "loja": getLoja(),
          "valor": this.getValorTotal(),
          "status": '01',
          "tipoPagamento": tipoPagamento,
          "produtos": this.state.produtosPedido,
          "pontos": pontos,
          "endereco": {
            "cep": "Loja Física",
            "numero": 0,
            "complemento": " ",
            "bairro": " ",
            "cidade": " ",
            "estado": " ",
            "logradouro": " ",
            "referencia": "Loja Física"
          },
        }
      }

      console.log(json)
      ServicePedidos.savePedidos(json).then(response => {
        var categorias = response.data;


        this.setState({ modalVisible: true, modalSuccess: true })
        console.log(categorias)
      }).catch(error => {

        this.setState({ modalVisible: true, modalSuccess: false })
        console.log(error);
      });
    }
  }

  detalheProduto = (produto) => {
    const { produtos } = this.state
    if (produto == undefined) {
      if (produtos.length == 0) {
        return alert("Não possui nenhum pedido cadastrado nesta loja.")
      } else {
        produto = produtos[0]._id
        var ingredientesSelected = this.filterProductFromId(produto).ingredientes

        this.setState({ ingredientesSelected });
      }
    }
    var selectedProduto = produto
    this.setState({ selectedProduto, detalhesProduto: true, editProduct: null });

  };

  handleChangeProductSelect = (event) => {
    this.setState({
      values:
      {
        ...this.state.values,
        [event.target.name]: event.target.value
      }
    });

    var selectedProduto = event.target.value
    var ingredientesSelected = this.filterProductFromId(selectedProduto).ingredientes

    this.setState({ selectedProduto, ingredientesSelected, quantidadeProduto: 1 });
  };

  handleChangeTipoPagamento = (event) => {
    this.setState({
      values:
      {
        ...this.state.values,
        [event.target.name]: event.target.value
      }
    });

  };
  handleChangeQuantidade = (event) => {
    this.setState({ quantidadeProduto: Number(event.target.value) });

  };
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
  getTipoPagamentos = () => {
    ServiceTipoPagamentos.getTipoPagamentos().then(response => {
      var tipopagamentos = response.data.items;
      this.setState({ tipopagamentos })
      this.getProdutos()
    }).catch(error => {

      alert('Falha ao carregar, tente novamente mais tarde.');
      console.log(error);
    });
  }
  getProdutos = () => {
    ServiceProdutos.getProdutos().then(response => {
      var produtos = response.data;
      this.setState({ produtos, loading: false })
    }).catch(error => {

      alert('Falha ao carregar os produtos, tente novamente mais tarde.');
      console.log(error);
    });
  }

  handleChangeIngredientes = (event) => {
    const { ingredientesSelected } = this.state
    if (!ingredientesSelected.includes(event.target.value))
      this.setState({ ingredientesSelected: event.target.value });

    console.log(ingredientesSelected)
    // selected options
  };

  editProduct = (produto) => {

    var ingredientesSelected = this.state.produtosPedido[produto].ingredientes

    this.setState({ ingredientesSelected });

    this.setState({
      values:
      {
        ...this.state.values,
        ...this.state.produtosPedido[produto]
      }
    });
    this.setState({ "editProduct": produto, "detalhesProduto": false, "quantidadeProduto": this.state.produtosPedido[produto].quantidade })

    // selected options
  };

  editarProduto = (product) => {


    var produtosPedidos = this.state.produtosPedido

    var tamanho = this.state.values.tamanho

    if (tamanho == undefined) {
      tamanho = produtosPedidos[product].tamanho
    }
    var cor = this.state.values.cor

    if (cor == undefined) {
      cor = produtosPedidos[product].cor
    }

    var produto = {
      "tamanho": tamanho,
      "cor": cor,
      "quantidade": this.state.quantidadeProduto,
      "ingredientes": this.state.ingredientesSelected
    }
    console.log(produto)

    this.setState({
      values:
      {
        ...this.state.values,
        "cor": undefined,
        "tamanho": undefined
      }
    });
    this.setState({ quantidadeProduto: 1 });

    produtosPedidos[product] = { ...produtosPedidos[product], ...produto }

    console.log("Produtos Pedidos", produtosPedidos)

    this.setState({ "detalhesProduto": false, "editProduct": null })
    this.setState({ "produtosPedido": produtosPedidos })

  }



  removeProduct = (product) => {

    var produtosPedidos = this.state.produtosPedido
    produtosPedidos.splice(product, 1);

    this.setState({ "produtosPedido": produtosPedidos })

    // selected options
  };


  handleAtivoChecked = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  };
  getValorTotal = () => {
    var valorTotal = 0
    this.state.produtosPedido.map((produto) => {
      var precoProduto = Number(produto.preco) * produto.quantidade
      valorTotal = valorTotal + precoProduto
    })
    if (!this.state.isCheckedEntregarLoja) {
      valorTotal = valorTotal + this.state.frete
    }
    return valorTotal.toFixed(2)
  };
  getSubTotal = () => {
    var valorTotal = 0
    this.state.produtosPedido.map((produto) => {
      var precoProduto = Number(produto.preco) * produto.quantidade
      valorTotal = valorTotal + precoProduto
    })
    return valorTotal.toFixed(2)
  };



  getDisponibilidade = (selectedProduto, editProduct) => {
    var quantidade = 0
    if (this.state.produtosPedido.length > 0) {
      this.state.produtosPedido.map((product, index) => {
        if (product.produto != undefined && product.produto == selectedProduto) {
          if (editProduct != null && index == editProduct) {
            quantidade = quantidade
          } else {
            quantidade = quantidade + product.quantidade
          }
        }
      })
    }
    return this.filterProductFromId(selectedProduto).quantidade - quantidade

  }

  render() {

    const { isCheckedEntregarLoja, values, tipopagamentos, produtos, produtosPedido, isChecked, errorText, modalVisible, modalSuccess, detalhesProduto, subcategoriaId, loading, selectedProduto, ingredientesSelected, quantidadeProduto } = this.state;
    return (

      <>
        <Helmet>
          <title>{'Cadastrar Pedido | ' + AppConfig.sigla}</title>
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
                      subheader="Pedido"
                      title="Cadastrar"
                    />
                    <Divider />
                    {loading ? <LinearProgress /> :
                      <CardContent>
                        {produtosPedido.length > 0 &&
                          <ProducsPedidotListResults customers={produtosPedido} editProduct={(product) => this.editProduct(product)} removeProduct={(product) => this.removeProduct(product)} />

                        }
                        {produtos.length > 0 &&
                          <div>
                            {this.state.editProduct != null &&
                              <Card>
                                <CardContent>


                                  <TextField
                                    fullWidth
                                    label="Produto"
                                    name="produtoItem"
                                    margin="normal"
                                    disabled
                                    required
                                    value={this.filterProductFromId(produtosPedido[this.state.editProduct].produto).name}
                                    variant="outlined"
                                  >

                                  </TextField>
                                  {this.filterProductFromId(produtosPedido[this.state.editProduct].produto).tamanhos != undefined && this.filterProductFromId(produtosPedido[this.state.editProduct].produto).tamanhos.length > 0 &&
                                    <TextField
                                      fullWidth
                                      label="Tamanho"
                                      name="tamanho"
                                      margin="normal"
                                      onChange={this.handleChangeTipoPagamento}
                                      required
                                      select
                                      value={values.tamanho}
                                      SelectProps={{ native: true }}
                                      variant="outlined"
                                    >
                                      {this.filterProductFromId(produtosPedido[this.state.editProduct].produto).tamanhos.map((option) => (
                                        <option
                                          key={option}
                                          value={option}
                                        >
                                          {option}
                                        </option>
                                      ))}
                                    </TextField>
                                  }
                                  {this.filterProductFromId(produtosPedido[this.state.editProduct].produto).cores != undefined && this.filterProductFromId(produtosPedido[this.state.editProduct].produto).cores.length > 0 &&
                                    <TextField
                                      fullWidth
                                      label="Cor"
                                      name="cor"
                                      margin="normal"
                                      onChange={this.handleChangeTipoPagamento}
                                      required
                                      select
                                      SelectProps={{ native: true }}
                                      value={values.cor}
                                      variant="outlined"
                                    >
                                      {this.filterProductFromId(produtosPedido[this.state.editProduct].produto).cores.map((option) => (
                                        <option
                                          key={option}
                                          value={option}
                                        >
                                          {option}
                                        </option>
                                      ))}
                                    </TextField>
                                  }
                                  {this.filterProductFromId(produtosPedido[this.state.editProduct].produto).ingredientes != undefined && this.filterProductFromId(produtosPedido[this.state.editProduct].produto).ingredientes.length > 0 &&
                                    <TextField
                                      fullWidth
                                      label="Ingredientes"
                                      name="ingredientes"
                                      margin="normal"
                                      select
                                      variant="outlined"
                                      SelectProps={{
                                        multiple: true,
                                        value: ingredientesSelected,
                                        onChange: (e) => this.handleChangeIngredientes(e),
                                        renderValue: (selected) => selected.join(", "),

                                      }}
                                    >
                                      {this.filterProductFromId(produtosPedido[this.state.editProduct].produto).ingredientes.map((ingrediente) => (
                                        <MenuItem key={ingrediente} value={ingrediente}>
                                          <FormControlLabel
                                            control={<Checkbox checked={ingredientesSelected.includes(ingrediente)} />}
                                            label={ingrediente}
                                          />
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                  }
                                  {this.filterProductFromId(produtosPedido[this.state.editProduct].produto).quantidade != undefined && this.filterProductFromId(produtosPedido[this.state.editProduct].produto).quantidade > 0 ?
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                      <Typography
                                        color="textPrimary"
                                        variant="h6"
                                        style={{ marginTop: 12, marginLeft: 2 }}>
                                        Quantidade:
                                      </Typography>
                                      <div style={{ display: 'flex', flexDirection: 'row' }}>

                                        <IconButton color="primary" size="large" onClick={() => { this.state.quantidadeProduto != 1 ? this.setState({ quantidadeProduto: this.state.quantidadeProduto - 1 }) : {} }}>
                                          <HorizontalRule />
                                        </IconButton>
                                        <Typography
                                          color="warning"
                                          style={{ marginTop: 12, marginLeft: 0 }}>
                                          {this.state.quantidadeProduto}
                                        </Typography>
                                        <IconButton color="primary" size="large" onClick={() => { this.state.quantidadeProduto < this.getDisponibilidade(produtosPedido[this.state.editProduct].produto, this.state.editProduct) ? this.setState({ quantidadeProduto: this.state.quantidadeProduto + 1 }) : {} }}>
                                          <Add />
                                        </IconButton>
                                        {(this.state.quantidadeProduto < this.getDisponibilidade(produtosPedido[this.state.editProduct].produto, this.state.editProduct)) == false &&
                                          <Typography
                                            color="orange"
                                            variant="h6"
                                            style={{ marginTop: 12, marginLeft: 10 }}>

                                            {"ÚLTIMO PRODUTO DO ESTOQUE!"}
                                          </Typography>
                                        }
                                        {this.state.quantidadeProduto == this.filterProductFromId(selectedProduto).quantidade &&
                                          <Typography
                                            color="orange"
                                            variant="h6"
                                            style={{ marginTop: 12, marginLeft: 10 }}>

                                            {"ÚLTIMO PRODUTO DO ESTOQUE!"}
                                          </Typography>}
                                      </div>
                                    </div>
                                    :
                                    <Typography
                                      color="error"
                                      variant="h6"
                                    >
                                      {"PRODUTO SEM ESTOQUE"}
                                    </Typography>
                                  }
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
                                    color="error"
                                    variant="outlined"
                                    style={{ marginRight: 10 }}
                                    onClick={() => { this.setState({ detalhesProduto: false, editProduct: null }) }}>
                                    {"Cancelar"}
                                  </Button>
                                  {this.filterProductFromId(produtosPedido[this.state.editProduct].produto).quantidade != undefined && this.filterProductFromId(produtosPedido[this.state.editProduct].produto).quantidade > 0 &&
                                    <Button
                                      color="primary"
                                      variant="contained"
                                      onClick={() => this.editarProduto(this.state.editProduct)}
                                    >
                                      Salvar
                                    </Button>
                                  }
                                </Box>
                              </Card>
                            }
                            {!detalhesProduto &&
                              <Button
                                fullWidth
                                color="warning"
                                variant="outlined"
                                onClick={() => { detalhesProduto ? this.setState({ detalhesProduto: false }) : this.detalheProduto(values.produtoItem) }}>
                                {detalhesProduto ? "Cancelar Produto" : "Adicionar Produto"}
                              </Button>
                            }
                            {detalhesProduto &&
                              <Card>
                                <CardContent>


                                  <TextField
                                    fullWidth
                                    label="Produto"
                                    name="produtoItem"
                                    margin="normal"
                                    onChange={this.handleChangeProductSelect}
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.produtoItem}
                                    variant="outlined"
                                  >
                                    {produtos.map((option) => (
                                      <option
                                        key={option._id}
                                        value={option._id}
                                      >
                                        {option.name}
                                      </option>
                                    ))}
                                  </TextField>
                                  {this.filterProductFromId(selectedProduto).tamanhos != undefined && this.filterProductFromId(selectedProduto).tamanhos.length > 0 &&
                                    <TextField
                                      fullWidth
                                      label="Tamanho"
                                      name="tamanho"
                                      margin="normal"
                                      onChange={this.handleChangeTipoPagamento}
                                      required
                                      select
                                      SelectProps={{ native: true }}
                                      variant="outlined"
                                    >
                                      {this.filterProductFromId(selectedProduto).tamanhos.map((option) => (
                                        <option
                                          key={option}
                                          value={option}
                                        >
                                          {option}
                                        </option>
                                      ))}
                                    </TextField>
                                  }
                                  {this.filterProductFromId(selectedProduto).cores != undefined && this.filterProductFromId(selectedProduto).cores.length > 0 &&
                                    <TextField
                                      fullWidth
                                      label="Cor"
                                      name="cor"
                                      margin="normal"
                                      onChange={this.handleChangeTipoPagamento}
                                      required
                                      select
                                      SelectProps={{ native: true }}
                                      variant="outlined"
                                    >
                                      {this.filterProductFromId(selectedProduto).cores.map((option) => (
                                        <option
                                          key={option}
                                          value={option}
                                        >
                                          {option}
                                        </option>
                                      ))}
                                    </TextField>
                                  }
                                  {this.filterProductFromId(selectedProduto).ingredientes != undefined && this.filterProductFromId(selectedProduto).ingredientes.length > 0 &&
                                    <TextField
                                      fullWidth
                                      label="Ingredientes"
                                      name="ingredientes"
                                      margin="normal"
                                      select
                                      variant="outlined"
                                      SelectProps={{
                                        multiple: true,
                                        value: ingredientesSelected,
                                        onChange: (e) => this.handleChangeIngredientes(e),
                                        renderValue: (selected) => selected.join(", "),

                                      }}
                                    >
                                      {this.filterProductFromId(selectedProduto).ingredientes.map((ingrediente) => (
                                        <MenuItem key={ingrediente} value={ingrediente}>
                                          <FormControlLabel
                                            control={<Checkbox checked={ingredientesSelected.includes(ingrediente)} />}
                                            label={ingrediente}
                                          />
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                  }
                                  {this.filterProductFromId(selectedProduto).quantidade != undefined && this.filterProductFromId(selectedProduto).quantidade > 0 ?
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                      <Typography
                                        color="textPrimary"
                                        variant="h6"
                                        style={{ marginTop: 12, marginLeft: 2 }}>
                                        Quantidade:
                                      </Typography>
                                      <div style={{ display: 'flex', flexDirection: 'row' }}>

                                        <IconButton color="primary" size="large" onClick={() => { this.state.quantidadeProduto != 1 ? this.setState({ quantidadeProduto: this.state.quantidadeProduto - 1 }) : {} }}>
                                          <HorizontalRule />
                                        </IconButton>
                                        <Typography
                                          color="warning"
                                          style={{ marginTop: 12, marginLeft: 0 }}>
                                          {this.state.quantidadeProduto}
                                        </Typography>
                                        <IconButton color="primary" size="large" onClick={() => { this.state.quantidadeProduto < this.getDisponibilidade(selectedProduto, null) ? this.setState({ quantidadeProduto: this.state.quantidadeProduto + 1 }) : {} }}>
                                          <Add />
                                        </IconButton>

                                        {(this.state.quantidadeProduto < this.getDisponibilidade(selectedProduto, null)) == false &&
                                          <Typography
                                            color="orange"
                                            variant="h6"
                                            style={{ marginTop: 12, marginLeft: 10 }}>

                                            {"ÚLTIMO PRODUTO DO ESTOQUE!"}
                                          </Typography>
                                        }


                                      </div>
                                    </div>
                                    :
                                    <Typography
                                      color="error"
                                      variant="h6"
                                    >
                                      {"PRODUTO SEM ESTOQUE"}
                                    </Typography>
                                  }
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
                                    color="error"
                                    variant="outlined"
                                    style={{ marginRight: 10 }}
                                    onClick={() => { this.setState({ detalhesProduto: false }) }}>
                                    {"Cancelar"}
                                  </Button>
                                  {this.filterProductFromId(selectedProduto).quantidade != undefined && this.filterProductFromId(selectedProduto).quantidade > 0 &&
                                    <Button
                                      color="primary"
                                      variant="contained"
                                      onClick={() => this.adicionarProduto(this.filterProductFromId(selectedProduto))}
                                    >
                                      Adicionar
                                    </Button>
                                  }
                                </Box>
                              </Card>
                            }


                          </div>
                        }
                        {tipopagamentos.length > 0 ?
                          <TextField
                            fullWidth
                            label="Tipo de Pagamentos"
                            name="tipopagamentos"
                            margin="normal"
                            onChange={this.handleChangeTipoPagamento}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={values.tipopagamentos}
                            variant="outlined"
                          >
                            {tipopagamentos.map((option) => (
                              <option
                                key={option._id}
                                value={option._id}
                              >
                                {option.name}
                              </option>
                            ))}
                          </TextField>
                          : <div></div>
                        }

                        <div style={{ display: 'flex', flexDirection: 'row' }}>

                          <Typography
                            color="textPrimary"
                            variant="h6"
                            style={{ marginTop: 8, marginLeft: 2 }}>
                            Entregar na Loja:
                          </Typography>

                          <Switch
                            checked={isCheckedEntregarLoja}
                            onChange={this.handleCheckedEntregarLoja}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />

                        </div>
                        {!isCheckedEntregarLoja &&
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
                                error={this.state.errorCep}
                                helperText={this.state.errorCep ? this.state.errorText : ''}
                                onChange={this.handleChangeTipoPagamento}
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
                                error={this.state.errorLogradouro}
                                helperText={this.state.errorLogradouro ? this.state.errorText : ''}
                                onChange={this.handleChangeTipoPagamento}
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
                                error={this.state.errorBairro}
                                helperText={this.state.errorBairro ? this.state.errorText : ''}
                                onChange={this.handleChangeTipoPagamento}
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
                                error={this.state.errorCidade}
                                helperText={this.state.errorCidade ? this.state.errorText : ''}
                                onChange={this.handleChangeTipoPagamento}
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
                                error={this.state.errorNumero}
                                helperText={this.state.errorNumero ? this.state.errorText : ''}
                                onChange={this.handleChangeTipoPagamento}
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
                                error={this.state.errorComplemento}
                                helperText={this.state.errorComplemento ? this.state.errorText : ''}
                                onChange={this.handleChangeTipoPagamento}
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
                                error={this.state.errorEstado}
                                helperText={this.state.errorEstado ? this.state.errorText : ''}
                                onChange={this.handleChangeTipoPagamento}
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
                                onChange={this.handleChangeTipoPagamento}
                                value={values.referencia}
                                variant="outlined"
                              />
                            </Grid>

                          </div>
                        }
                      </CardContent>
                    }
                    <Divider />
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      p: 2
                    }}>

                      <Typography
                        color="textPrimary"
                        variant="h6"
                        style={{ marginTop: 8, marginRight: 10 }}>
                        {"Subtotal: R$:" + this.getSubTotal()}
                      </Typography>
                      <Typography
                        color="textPrimary"
                        variant="h6"
                        style={{ marginTop: 8, marginRight: 10 }}>
                        {isCheckedEntregarLoja ? "" : "Frete: R$:" + this.state.frete}
                      </Typography>
                      <Typography
                        color="textPrimary"
                        variant="h6"
                        style={{ marginTop: 8, marginRight: 30 }}>
                        {isCheckedEntregarLoja ? "Total: R$:" + this.getValorTotal() : "Total: R$:" + this.getValorTotal()}
                      </Typography>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => { this.savePedidos() }}> Salvar</Button>
                    </Box>
                  </Card>
                </div>
              </Box>
            </Box>
          </Container>
          <ModalFeedback open={modalVisible} success={modalSuccess} redirect={modalSuccess ? '/app/pedidos' : ''} title={modalSuccess ? "Sucesso" : "Falhou"} subTitle={modalSuccess ? "Cadastro realizado com sucesso." : "Não foi possível realizar o cadastro, tente novamente mais tarde."} />

        </Box>
      </>
    );
  }
}



export default CadastrarPedido;
