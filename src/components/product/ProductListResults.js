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

import { ArrowBack } from '@material-ui/icons';
import TagsInput from '../Other/TagsInput';
import ProductEdit from './ProductEdit';
import ProductListToolbar from './ProductListToolbar';

const ProductListResults = ({
  onListType,
  objs,
  categorias,
  subcategorias,
  ...rest
}) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const [isList, setIsList] = useState(true);
  const [values, setValues] = useState({
    nome: ''
  });

  const [produtos, setProdutos] = useState(objs);
  const [searchText, setSearchText] = useState('');

  const handleChangeSearch = (event) => {
    let value = event.target.value;
    setSearchText(value);
    let produtosFilter = objs.filter(function (item) {
      return (
        item.name.includes(value) ||
        item.name.includes(value.toLowerCase()) ||
        item.name.includes(value.toUpperCase()) ||
        item.name.includes(value.charAt(0).toUpperCase() + value.slice(1))
      );
    });
    setProdutos(produtosFilter);
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
    setValues({ nome: obj.name, ...obj });
    setIsEdit(true);
  };
  const handleBackEdit = () => {
    setIsEdit(false);
  };

  return (
    <div>
      {isEdit ? (
        <Card sx={{ backgroundColor: 'background.default' }}>
          <ProductEdit
            product={values}
            categorias={categorias}
            subcategorias={subcategorias}
            onBackEdit={handleBackEdit}
          />
        </Card>
      ) : (
        <div>
          <ProductListToolbar
            onTextHandle={handleChangeSearch}
            onListType={() => onListType()}
            list
          />

          <Card style={{ marginTop: 20 }}>
            <PerfectScrollbar>
              <Box sx={{}}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>Preço</TableCell>
                      <TableCell>Quantidade</TableCell>
                      <TableCell>Tamanhos</TableCell>
                      <TableCell>Cores</TableCell>
                      <TableCell>Ingredientes</TableCell>
                      <TableCell>Categoria</TableCell>
                      <TableCell>Subcategorias</TableCell>
                      <TableCell>Data</TableCell>
                      <TableCell>Ativo</TableCell>
                      <TableCell>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Number.isNaN(page * limit)
                      ? produtos.slice(0, produtos.length).map((obj) => (
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
                                  {obj.preco}
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
                                  {obj.quantidade}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              {obj.tamanhos.map((subcategoria) => (
                                <Box
                                  sx={{
                                    alignItems: 'center',
                                    display: 'flex'
                                  }}
                                >
                                  <Typography
                                    color="textPrimary"
                                    variant="body1"
                                  >
                                    {subcategoria}
                                  </Typography>
                                </Box>
                              ))}
                            </TableCell>
                            <TableCell>
                              {obj.cores.map((subcategoria) => (
                                <Box
                                  sx={{
                                    alignItems: 'center',
                                    display: 'flex'
                                  }}
                                >
                                  <Typography
                                    color="textPrimary"
                                    variant="body1"
                                  >
                                    {subcategoria}
                                  </Typography>
                                </Box>
                              ))}
                            </TableCell>
                            <TableCell>
                              {obj.ingredientes.map((subcategoria) => (
                                <Box
                                  sx={{
                                    alignItems: 'center',
                                    display: 'flex'
                                  }}
                                >
                                  <Typography
                                    color="textPrimary"
                                    variant="body1"
                                  >
                                    {subcategoria}
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
                                  {filterCategoriaFromId(obj.categoria)}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              {obj.subcategorias.map((subcategoria) => (
                                <Box
                                  sx={{
                                    alignItems: 'center',
                                    display: 'flex'
                                  }}
                                >
                                  <Typography
                                    color="textPrimary"
                                    variant="body1"
                                  >
                                    {filterSubCategoriaFromId(subcategoria)}
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
                                  {obj.data}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              {obj.ativo ? (
                                <Chip
                                  color="success"
                                  label={'Ativo'}
                                  size="small"
                                />
                              ) : (
                                <Chip
                                  color="warning"
                                  label={'Inativo'}
                                  size="small"
                                />
                              )}
                            </TableCell>
                            <TableCell>
                              <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={() => {
                                  handleEdit(obj);
                                }}
                              >
                                <Edit />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      : produtos
                          .slice(page * limit, page * limit + limit)
                          .map((obj) => (
                            <TableRow hover key={obj.id}>
                              <TableCell>
                                <Box
                                  sx={{
                                    alignItems: 'center',
                                    display: 'flex'
                                  }}
                                >
                                  <Typography
                                    color="textPrimary"
                                    variant="body1"
                                  >
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
                                  <Typography
                                    color="textPrimary"
                                    variant="body1"
                                  >
                                    {obj.preco}
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
                                  <Typography
                                    color="textPrimary"
                                    variant="body1"
                                  >
                                    {obj.quantidade}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                {obj.tamanhos.map((subcategoria) => (
                                  <Box
                                    sx={{
                                      alignItems: 'center',
                                      display: 'flex'
                                    }}
                                  >
                                    <Typography
                                      color="textPrimary"
                                      variant="body1"
                                    >
                                      {subcategoria}
                                    </Typography>
                                  </Box>
                                ))}
                              </TableCell>
                              <TableCell>
                                {obj.cores.map((subcategoria) => (
                                  <Box
                                    sx={{
                                      alignItems: 'center',
                                      display: 'flex'
                                    }}
                                  >
                                    <Typography
                                      color="textPrimary"
                                      variant="body1"
                                    >
                                      {subcategoria}
                                    </Typography>
                                  </Box>
                                ))}
                              </TableCell>
                              <TableCell>
                                {obj.ingredientes.map((subcategoria) => (
                                  <Box
                                    sx={{
                                      alignItems: 'center',
                                      display: 'flex'
                                    }}
                                  >
                                    <Typography
                                      color="textPrimary"
                                      variant="body1"
                                    >
                                      {subcategoria}
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
                                  <Typography
                                    color="textPrimary"
                                    variant="body1"
                                  >
                                    {filterCategoriaFromId(obj.categoria)}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                {obj.subcategorias.map((subcategoria) => (
                                  <Box
                                    sx={{
                                      alignItems: 'center',
                                      display: 'flex'
                                    }}
                                  >
                                    <Typography
                                      color="textPrimary"
                                      variant="body1"
                                    >
                                      {filterSubCategoriaFromId(subcategoria)}
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
                                  <Typography
                                    color="textPrimary"
                                    variant="body1"
                                  >
                                    {obj.data}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                {obj.ativo ? (
                                  <Chip
                                    color="success"
                                    label={'Ativo'}
                                    size="small"
                                  />
                                ) : (
                                  <Chip
                                    color="warning"
                                    label={'Inativo'}
                                    size="small"
                                  />
                                )}
                              </TableCell>
                              <TableCell>
                                <IconButton
                                  color="inherit"
                                  aria-label="open drawer"
                                  onClick={() => {
                                    handleEdit(obj);
                                  }}
                                >
                                  <Edit />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>

            <TablePagination
              component="div"
              count={produtos.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 'All']}
            />
          </Card>
        </div>
      )}
    </div>
  );
};

ProductListResults.propTypes = {
  onListType: PropTypes.func,
  objs: PropTypes.array.isRequired,
  categorias: PropTypes.array.isRequired,
  subcategorias: PropTypes.array.isRequired
};

export default ProductListResults;
