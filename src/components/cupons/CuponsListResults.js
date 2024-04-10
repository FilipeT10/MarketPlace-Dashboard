import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
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
  Container
} from '@material-ui/core';
import getInitials from '../../utils/getInitials';

import Edit from '@material-ui/icons/Edit';

import IconButton from '@material-ui/core/IconButton';
import { ArrowBack } from '@material-ui/icons';
import ServiceCupons from 'src/services/Cupons';
import ModalFeedback from '../Other/ModalFeedback';
import CuponsListToolbar from './CuponsListToolbar';
import formatDate from 'src/utils/formatDate';

const CuponsListResults = ({ customers, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [customerEdit, setCustomerEdit] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(true);
  const [isChecked, setChecked] = useState(false);
  const [values, setValues] = useState({
    nome: ''
  });

  const [cupons, setCupons] = useState(customers);
  const [searchText, setSearchText] = useState('');

  const handleChangeSearch = (event) => {
    let value = event.target.value;
    setSearchText(value);
    let cuponsFilter = customers.filter(function (item) {
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
  const handleEdit = (customer) => {
    setChecked(customer.ativo);
    setValues({ nome: customer.name });
    setIsEdit(true);
    setCustomerEdit(customer);
  };

  const handleBackEdit = () => {
    setIsEdit(false);
  };
  const handleAtivoChecked = () => {
    setChecked(!isChecked);
  };

  function Row(props) {
    const { customer } = props;

    const [open, setOpen] = useState(false);

    return (
      <Fragment>
        <TableRow hover key={customer.id}>
          <TableCell>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <Typography color="textPrimary" variant="body1">
                {customer.name}
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
                {customer.descricao}
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
                {formatDate(customer.periodoInicial)}
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
                {formatDate(customer.periodoFinal)}
              </Typography>
            </Box>
          </TableCell>
          <TableCell>
            {customer.ativo ? (
              <Chip color="success" label={'Ativo'} size="small" />
            ) : (
              <Chip color="warning" label={'Inativo'} size="small" />
            )}
          </TableCell>

          <TableCell>
            {customer.ativo && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => {
                  handleEdit(customer);
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
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                {/*<ProducsPedidotListResults customers={customer.produtos} />*/}
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
    ServiceCupons.editCupons(customerEdit._id, json)
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
                      .map((customer) => (
                        <Row key={customer._id} customer={customer} />
                      ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>

            <TablePagination
              component="div"
              count={customers.length}
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

CuponsListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CuponsListResults;
