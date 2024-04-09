import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

import ServiceCategorias from '../../services/Categorias';
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Checkbox,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Grid,
  Switch
} from '@material-ui/core';
import getInitials from '../../utils/getInitials';

import Edit from '@material-ui/icons/Edit';

import IconButton from '@material-ui/core/IconButton';
import { CheckCircle, Close, NotInterested } from '@material-ui/icons';

const ProducsPedidotListResults = ({
  onListType,
  customers,
  removeProduct,
  editProduct,
  ...rest
}) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const [isList, setIsList] = useState(true);
  const [values, setValues] = useState({
    nome: ''
  });

  const [produtos, setProdutos] = useState(customers);
  const [searchText, setSearchText] = useState('');

  const handleEdit = (customer) => {
    setValues({ nome: customer.name, ...customer });
    setIsEdit(true);
  };
  const handleBackEdit = () => {
    setIsEdit(false);
  };

  const getValorTotal = () => {
    var valorTotal = 0;
    produtos.map((produto) => {
      var precoProduto = Number(produto.preco) * produto.quantidade;
      valorTotal = valorTotal + precoProduto;
    });
    return valorTotal.toFixed(2);
  };

  return (
    <div>
      {isEdit ? (
        <Card sx={{ backgroundColor: 'background.default' }}></Card>
      ) : (
        <div>
          <Card style={{ marginTop: 20 }}>
            <PerfectScrollbar>
              <Box sx={{}}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>Preço Unitário</TableCell>
                      <TableCell>Promoção</TableCell>
                      <TableCell>Quantidade</TableCell>
                      <TableCell>Tamanho</TableCell>
                      <TableCell>Cor</TableCell>
                      <TableCell>Ingredientes</TableCell>
                      {editProduct && removeProduct && (
                        <TableCell>Ações</TableCell>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {produtos
                      .slice(page * limit, page * limit + limit)
                      .map((customer, index) => (
                        <TableRow hover key={customer.produto}>
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
                                {customer.preco}
                              </Typography>
                            </Box>
                          </TableCell>
                          {customer.promocao ? (
                            <TableCell>
                              <Box
                                sx={{
                                  alignItems: 'center',
                                  display: 'flex'
                                }}
                              >
                                <CheckCircle color="success" />
                              </Box>
                            </TableCell>
                          ) : (
                            <TableCell>
                              <Box
                                sx={{
                                  alignItems: 'center',
                                  display: 'flex'
                                }}
                              >
                                <NotInterested color="error" />
                              </Box>
                            </TableCell>
                          )}
                          <TableCell>
                            <Box
                              sx={{
                                alignItems: 'center',
                                display: 'flex'
                              }}
                            >
                              <Typography color="textPrimary" variant="body1">
                                {customer.quantidade}
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
                                {customer.tamanho}
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
                                {customer.cor}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {customer.ingredientes.map((subcategoria) => (
                              <Box
                                sx={{
                                  alignItems: 'center',
                                  display: 'flex'
                                }}
                              >
                                <Typography color="textPrimary" variant="body1">
                                  {subcategoria}
                                </Typography>
                              </Box>
                            ))}
                          </TableCell>

                          {editProduct && removeProduct && (
                            <TableCell>
                              <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={() => editProduct(index)}
                              >
                                <Edit />
                              </IconButton>
                              <IconButton
                                color="error"
                                aria-label="open drawer"
                                onClick={() => removeProduct(index)}
                              >
                                <Close />
                              </IconButton>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    <TableRow>
                      <TableCell>
                        <Typography color="textPrimary" variant="body1">
                          {'Subtotal: R$:' + getValorTotal()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
          </Card>
        </div>
      )}
    </div>
  );
};

ProducsPedidotListResults.propTypes = {
  onListType: PropTypes.func,
  removeProduct: PropTypes.func,
  editProduct: PropTypes.func,
  customers: PropTypes.array.isRequired
};

export default ProducsPedidotListResults;
