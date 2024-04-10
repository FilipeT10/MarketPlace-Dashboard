import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  NotInterested
} from '@material-ui/icons';
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
  Typography,
  Grid,
  Collapse
} from '@material-ui/core';
import getInitials from '../../utils/getInitials';

import Edit from '@material-ui/icons/Edit';

import IconButton from '@material-ui/core/IconButton';
import { ArrowBack } from '@material-ui/icons';
import ServiceCupons from 'src/services/Cupons';
import ModalFeedback from '../Other/ModalFeedback';
import CuponsListToolbar from './CuponsListToolbar';
import formatDate from 'src/utils/formatDate';

const CuponsListResults = ({ objs, categorias, subcategorias, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [objEdit, setobjEdit] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(true);
  const [isChecked, setChecked] = useState(false);
  const [values, setValues] = useState({
    nome: ''
  });

  const [cupons, setCupons] = useState(objs);
  const [searchText, setSearchText] = useState('');

  const handleChangeSearch = (event) => {
    let value = event.target.value;
    setSearchText(value);
    let cuponsFilter = objs.filter(function (item) {
      return (
        item.name.includes(value) ||
        item.name.includes(value.toLowerCase()) ||
        item.name.includes(value.toUpperCase()) ||
        item.name.includes(value.charAt(0).toUpperCase() + value.slice(1))
      );
    });
    setCupons(cuponsFilter);
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
  const handleEdit = (obj) => {
    setChecked(obj.ativo);
    setValues({ nome: obj.name });
    setIsEdit(true);
    setobjEdit(obj);
  };

  const handleBackEdit = () => {
    setIsEdit(false);
  };
  const handleAtivoChecked = () => {
    setChecked(!isChecked);
  };
  const filterCategoriaFromId = (id) => {
    if (categorias.length == 0 || id == undefined) {
      return '';
    } else {
      let usuariosFilter = categorias.filter(function (item) {
        return item._id == id;
      });
      if (usuariosFilter.length == 0) {
        return 'Categoria não encontrada';
      }
      return usuariosFilter[0].name;
    }
  };
  const filterSubCategoriaFromId = (id) => {
    if (subcategorias.length == 0 || id == undefined) {
      return '';
    } else {
      let usuariosFilter = subcategorias.filter(function (item) {
        return item._id == id;
      });
      if (usuariosFilter.length == 0) {
        return 'Subcategoria não encontrada';
      }
      return usuariosFilter[0].name;
    }
  };

  function TableCollapsable(props) {
    const { obj } = props;

    return (
      <Fragment>
        <Card style={{ marginTop: 10 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Valor</TableCell>
                <TableCell>Condição</TableCell>
                <TableCell>Categorias</TableCell>
                <TableCell>Subcategorias</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover key={obj.id}>
                <TableCell>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <Typography color="textPrimary" variant="body1">
                      {obj.tipo == '$' ? 'R$: ' + obj.valor : obj.valor + '%'}
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
                    <Typography color="textPrimary" variant="body1">
                      {obj.condicao == 'all'
                        ? 'Todos'
                        : obj.condicao == 'PC'
                        ? 'Primeira compra'
                        : obj.condicao == '>'
                        ? 'Compras a partir de R$: ' + obj.valorCondicao
                        : ''}
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
                    {obj.categorias.length > 0 ? (
                      obj.categorias.map((category) => (
                        <Typography color="textPrimary" variant="body1">
                          {filterCategoriaFromId(category)}
                        </Typography>
                      ))
                    ) : (
                      <NotInterested color="error" />
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    {obj.subcategorias.length > 0 ? (
                      obj.subcategorias.map((subcategory) => (
                        <Typography color="textPrimary" variant="body1">
                          {filterSubCategoriaFromId(subcategory)}
                        </Typography>
                      ))
                    ) : (
                      <NotInterested color="error" />
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </Fragment>
    );
  }
  function Row(props) {
    const { obj } = props;

    const [open, setOpen] = useState(false);

    return (
      <Fragment>
        <TableRow hover key={obj.id}>
          <TableCell>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <Typography color="textPrimary" variant="body1">
                {obj.name}
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
              <Typography color="textPrimary" variant="body1">
                {obj.descricao}
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
              <Typography color="textPrimary" variant="body1">
                {formatDate(obj.periodoInicial)}
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
              <Typography color="textPrimary" variant="body1">
                {formatDate(obj.periodoFinal)}
              </Typography>
            </Box>
          </TableCell>
          <TableCell>
            {obj.ativo ? (
              <Chip color="success" label={'Ativo'} size="small" />
            ) : (
              <Chip color="warning" label={'Inativo'} size="small" />
            )}
          </TableCell>

          <TableCell>
            {obj.ativo && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => {
                  handleEdit(obj);
                }}
              >
                <Edit />
              </IconButton>
            )}
            <IconButton
              color="inherit"
              aria-label="expandir linha"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              backgroundColor: 'transparent'
            }}
            colSpan={10}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <TableCollapsable obj={obj} />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    );
  }

  const saveCupom = (nome, ativo) => {
    var json = {
      name: values.nome,
      ativo: isChecked
    };
    ServiceCupons.editCupons(objEdit._id, json)
      .then((response) => {
        setModalSuccess(true);
        setModalVisible(true);
        var cupons = response.data;
        console.log(cupons);
      })
      .catch((error) => {
        setModalSuccess(false);
        setModalVisible(true);
        console.log(error);
      });
  };

  return (
    <div>
      {isEdit ? (
        <Card sx={{ backgroundColor: 'background.default' }}>
          <Box sx={{}}>
            <div>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => {
                  handleBackEdit();
                }}
              >
                <ArrowBack />
              </IconButton>

              <Card>
                <CardHeader subheader="Cupons" title="Editar" />
                <Divider />
                <CardContent>
                  <TextField
                    fullWidth
                    label="Nome"
                    margin="normal"
                    name="nome"
                    onChange={handleChange}
                    value={values.nome}
                    variant="outlined"
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={0}>
                      <Switch
                        checked={isChecked}
                        onChange={handleAtivoChecked}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </Grid>
                    <Grid item xs={1} style={{ marginTop: 10 }}>
                      {isChecked ? (
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
                      saveCupom(values.nome, isChecked);
                    }}
                  >
                    {' '}
                    Salvar
                  </Button>
                </Box>
              </Card>
            </div>
            <ModalFeedback
              open={modalVisible}
              success={modalSuccess}
              redirect={modalSuccess ? '/app/painel' : ''}
              title={modalSuccess ? 'Sucesso' : 'Falhou'}
              subTitle={
                modalSuccess
                  ? 'Cupom editado com sucesso.'
                  : 'Não foi possível editar a categoria, tente novamente mais tarde.'
              }
            />
          </Box>
        </Card>
      ) : (
        <div>
          <CuponsListToolbar onTextHandle={handleChangeSearch} />

          <Card style={{ marginTop: 20 }}>
            <PerfectScrollbar>
              <Box sx={{}}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>Descrição</TableCell>
                      <TableCell>Período inicial</TableCell>
                      <TableCell>Período final</TableCell>
                      <TableCell>Ativo</TableCell>
                      <TableCell>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cupons
                      .slice(page * limit, page * limit + limit)
                      .map((obj) => (
                        <Row key={obj._id} obj={obj} />
                      ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>

            <TablePagination
              component="div"
              count={objs.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </div>
      )}
    </div>
  );
};

export default CuponsListResults;
