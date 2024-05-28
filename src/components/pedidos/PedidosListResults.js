import { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  AssignmentTurnedIn,
  Cancel,
  DoneAll,
  Moped,
  NotInterested,
  PriceCheck
} from '@material-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Collapse
} from '@material-ui/core';

import Edit from '@material-ui/icons/Edit';

import IconButton from '@material-ui/core/IconButton';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import PedidosEdit from './PedidosEdit';
import PedidosListToolbar from './PedidosListToolbar';
import ProducsPedidotListResults from './ProductsPedidoListResults';
import ModalFeedback from '../Other/ModalFeedback';
import ServicePedidos from 'src/services/Pedidos';

const PedidoListResults = ({
  onListType,
  objs,
  usuarios,
  tipopagamentos,
  produtos,
  onRefresh,
  ...rest
}) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [modalCancelVisible, setModalCancelVisible] = useState(false);

  const [selected, setSelected] = useState();
  const [values, setValues] = useState({
    nome: ''
  });

  const [pedidos, setPedidos] = useState(objs);
  const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();

  const handleChangeSearch = (event) => {
    let value = event.target.value;
    setSearchText(value);
    let pedidosFilter = objs.filter(function (item) {
      if (item.numeroPedido) {
        return String(item.numeroPedido).includes(value);
      } else {
        return false;
      }
    });
    setPedidos(pedidosFilter);
  };

  const formataData = (data) => {
    var dat = moment(data).format('DD/MM/YYYY  HH:mm:ss');
    return dat;
  };

  const filterUsuarioFromId = (id) => {
    if (usuarios.length == 0 || id == undefined) {
      return '';
    } else {
      let usuariosFilter = usuarios.filter(function (item) {
        return item._id == id;
      });
      if (usuariosFilter.length == 0) {
        return 'Usuário não encontrado';
      }
      return usuariosFilter[0].name;
    }
  };
  const filterTipoPagamentoFromId = (id) => {
    if (tipopagamentos.length == 0 || id == undefined) {
      return '';
    } else {
      let usuariosFilter = tipopagamentos.filter(function (item) {
        return item._id == id;
      });
      if (usuariosFilter.length == 0) {
        return 'Não encontrado';
      }
      return usuariosFilter[0].name;
    }
  };

  const handleLimitChange = (event) => {
    setPage(0);
    if (event.target.value == 'All') {
      setLimit(objs.length);
    } else {
      setLimit(event.target.value);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleEdit = (obj) => {
    //setValues({nome: obj.name, ...obj})

    navigate('/app/editar-pedido', {
      replace: true,
      state: { values: { ...obj } }
    });
    //setIsEdit(true);
  };

  const handleBackEdit = () => {
    setIsEdit(false);
  };

  const handleCancel = (id) => {
    ServicePedidos.cancelarPedido(id)
      .then(() => {
        if (onRefresh) {
          onRefresh();
        }
        setModalCancelVisible(false);
      })
      .catch(() => {
        alert('Falha ao cancelar o pedido, tente novamente mais tarde.');
      });
  };
  const handleApprove = (id) => {
    ServicePedidos.aprovarPedido(id)
      .then(() => {
        if (onRefresh) {
          onRefresh();
        }
        setModalVisible(false);
      })
      .catch(() => {
        alert('Falha ao aprovar o pedido, tente novamente mais tarde.');
      });
  };
  const handlePay = (id) => {
    ServicePedidos.pagoPedido(id)
      .then(() => {
        if (onRefresh) {
          onRefresh();
        }
        setModalVisible(false);
      })
      .catch(() => {
        alert(
          'Falha ao aprovar o pagamento do pedido, tente novamente mais tarde.'
        );
      });
  };
  const handleDelivery = (id) => {
    ServicePedidos.entregaPedido(id)
      .then(() => {
        if (onRefresh) {
          onRefresh();
        }
        setModalVisible(false);
      })
      .catch(() => {
        alert(
          'Falha ao enviar o pedido para entrega, tente novamente mais tarde.'
        );
      });
  };
  const handleFinish = (id) => {
    ServicePedidos.finalizarPedido(id)
      .then(() => {
        if (onRefresh) {
          onRefresh();
        }
        setModalVisible(false);
      })
      .catch(() => {
        alert('Falha ao finalizar o pedido, tente novamente mais tarde.');
      });
  };

  function Row(props) {
    const { obj } = props;

    const [open, setOpen] = useState(false);

    return (
      <Fragment>
        <TableRow
          hover
          key={obj._id}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <TableCell>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <Typography color="textPrimary" variant="h4">
                {obj.numeroPedido}
              </Typography>
            </Box>
          </TableCell>
          <TableCell>
            {obj.produtos.map((subcategoria) => (
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <Typography color="textPrimary" variant="body1">
                  {subcategoria.name}
                </Typography>
              </Box>
            ))}
          </TableCell>

          <TableCell>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <Typography color="textPrimary" variant="body1">
                {obj.valor}
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
                {filterTipoPagamentoFromId(obj.tipoPagamento)}
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
              {obj.cupom ? (
                <Typography color="textPrimary" variant="body1">
                  {obj.cupom.name}
                </Typography>
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
              <Typography color="textPrimary" variant="body1">
                {filterUsuarioFromId(obj.user)}
              </Typography>
            </Box>
          </TableCell>
          <TableCell>
            {obj.endereco.referencia == 'Loja Física' &&
            obj.endereco.cep == 'Loja Física' &&
            obj.endereco.numero == 0 ? (
              <Typography color="textPrimary" variant="body1">
                {obj.endereco.referencia}
              </Typography>
            ) : (
              <Box
                sx={{
                  alignItems: 'center'
                }}
              >
                <Typography color="textPrimary" variant="body1">
                  {obj.endereco.logradouro + ', ' + obj.endereco.complemento}
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  {obj.endereco.numero + ' ' + obj.endereco.bairro}
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  {obj.endereco.cidade + ' - ' + obj.endereco.estado}
                </Typography>
                <Typography color="textPrimary" variant="body1">
                  {obj.endereco.cep}
                </Typography>

                <Typography color="textPrimary" variant="body1">
                  {obj.endereco.referencia}
                </Typography>
              </Box>
            )}
          </TableCell>

          <TableCell>
            {obj.status == 1 ? (
              <Chip color="info" label={'Em análise'} size="small" />
            ) : obj.status == 2 ? (
              <Chip
                color="warning"
                label={'Aguardando pagamento'}
                size="small"
                style={{ backgroundColor: '#D4BC34' }}
              />
            ) : obj.status == 3 ? (
              <Chip
                color="success"
                label={'Em andamento'}
                size="small"
                style={{ backgroundColor: '#563880' }}
              />
            ) : obj.status == 4 ? (
              <Chip
                color="success"
                label={'A caminho'}
                size="small"
                style={{ backgroundColor: '#4F77BE' }}
              />
            ) : obj.status == 5 ? (
              <Chip color="success" label={'Finalizado'} size="small" />
            ) : obj.status == 6 ? (
              <Chip color="error" label={'Cancelado'} size="small" />
            ) : (
              <></>
            )}
          </TableCell>
          <TableCell>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <Typography color="textPrimary" variant="body1">
                {formataData(obj.data)}
              </Typography>
            </Box>
          </TableCell>
          <TableCell>
            {obj.status == 1 ? (
              <IconButton
                color="inherit"
                aria-label="aprovar pedido"
                onClick={() => {
                  setSelected(obj);
                  setModalVisible(true);
                }}
              >
                <AssignmentTurnedIn />
              </IconButton>
            ) : obj.status == 2 ? (
              <IconButton
                color="inherit"
                aria-label="aprovar pagamento"
                onClick={() => {
                  setSelected(obj);
                  setModalVisible(true);
                }}
              >
                <PriceCheck />
              </IconButton>
            ) : obj.status == 3 ? (
              <IconButton
                color="inherit"
                aria-label="realizar entrega"
                onClick={() => {
                  setSelected(obj);
                  setModalVisible(true);
                }}
              >
                <Moped />
              </IconButton>
            ) : obj.status == 4 ? (
              <IconButton
                color="inherit"
                aria-label="finalizar pedido"
                onClick={() => {
                  setSelected(obj);
                  setModalVisible(true);
                }}
              >
                <DoneAll />
              </IconButton>
            ) : (
              <></>
            )}
            {obj.status != 5 && (
              <IconButton
                color="inherit"
                aria-label="editar"
                onClick={() => {
                  handleEdit(obj);
                }}
              >
                <Edit />
              </IconButton>
            )}
            {obj.status != 5 && (
              <IconButton
                color="inherit"
                aria-label="cancelar"
                onClick={() => {
                  setSelected(obj);
                  setModalCancelVisible(true);
                }}
              >
                <Cancel />
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
                <ProducsPedidotListResults
                  objs={obj.produtos}
                  observacao={obj.observacao}
                  produtos={produtos}
                />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    );
  }

  return (
    <div>
      {isEdit ? (
        <Card sx={{ backgroundColor: 'background.default' }}>
          <PedidosEdit
            pedido={values}
            categorias={usuarios}
            subcategorias={tipopagamentos}
            onBackEdit={handleBackEdit}
          />
        </Card>
      ) : (
        <div>
          <PedidosListToolbar
            onTextHandle={handleChangeSearch}
            onListType={() => onListType()}
            list
          />
          <ModalFeedback
            open={modalVisible && selected?._id}
            success={true}
            redirect={''}
            onClickConfirm={() =>
              selected?.status != undefined
                ? selected.status == 1
                  ? handleApprove(selected?._id)
                  : selected.status == 2
                  ? handlePay(selected?._id)
                  : selected.status == 3
                  ? handleDelivery(selected?._id)
                  : selected.status == 4
                  ? handleFinish(selected?._id)
                  : {}
                : {}
            }
            onClose={() => {
              setModalVisible(false);
            }}
            confirmationButton
            neutralButton
            title={
              selected?.status != undefined
                ? selected.status == 1
                  ? 'Aprovar'
                  : selected.status == 2
                  ? 'Confirmar'
                  : selected.status == 3
                  ? 'Confirmar'
                  : selected.status == 4
                  ? 'Confirmar'
                  : ''
                : ''
            }
            subTitle={
              selected?.status != undefined
                ? `O pedido está em ${
                    selected.status == 1
                      ? 'EM ANÁLISE'
                      : selected.status == 2
                      ? 'AGUARDANDO PAGAMENTO'
                      : selected.status == 3
                      ? 'EM ANDAMENTO'
                      : selected.status == 4
                      ? 'A CAMINHO'
                      : ''
                  }, tem certeza que deseja ${
                    selected.status == 1
                      ? 'aprovar o pedido?'
                      : selected.status == 2
                      ? 'confirmar o pagamento do pedido?'
                      : selected.status == 3
                      ? 'mandar o pedido para entrega?'
                      : selected.status == 4
                      ? 'confirmar a entrega do pedido?'
                      : ''
                  }`
                : ''
            }
          />
          <ModalFeedback
            open={modalCancelVisible && selected?._id}
            success={false}
            redirect={''}
            onClickConfirm={() => handleCancel(selected?._id)}
            onClose={() => {
              setModalCancelVisible(false);
            }}
            confirmationButton
            cancel
            neutralButton
            title={'Cancelar'}
            subTitle={
              selected?.status != undefined
                ? `O pedido está em ${
                    selected.status == 1
                      ? 'EM ANÁLISE'
                      : selected.status == 2
                      ? 'AGUARDANDO PAGAMENTO'
                      : selected.status == 3
                      ? 'EM ANDAMENTO'
                      : selected.status == 4
                      ? 'A CAMINHO'
                      : ''
                  }, tem certeza que deseja cancelar o pedido?`
                : ''
            }
          />

          <Card style={{ marginTop: 20 }}>
            <PerfectScrollbar>
              <Box sx={{}}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Número</TableCell>
                      <TableCell>Produtos</TableCell>
                      <TableCell>Valor</TableCell>
                      <TableCell>Forma de Pagamento</TableCell>
                      <TableCell>Cupom</TableCell>
                      <TableCell>Cliente</TableCell>
                      <TableCell>Endereço</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Data</TableCell>
                      <TableCell>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pedidos
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
              count={pedidos.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, pedidos.length]}
            />
          </Card>
        </div>
      )}
    </div>
  );
};

PedidoListResults.propTypes = {
  onListType: PropTypes.func,
  objs: PropTypes.array.isRequired,
  usuarios: PropTypes.array.isRequired,
  produtos: PropTypes.array.isRequired,
  tipopagamentos: PropTypes.array.isRequired
};

export default PedidoListResults;
