import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
  Typography, Grid, Container
} from '@material-ui/core';
import getInitials from '../../utils/getInitials';

import Edit from "@material-ui/icons/Edit";

import IconButton from "@material-ui/core/IconButton";
import { ArrowBack } from '@material-ui/icons';
import ServiceSubCategorias from 'src/services/SubCategorias';
import ModalFeedback from '../Other/ModalFeedback';
import SubCategoriasListToolbar from './SubCategoriasListToolbar';

const SubCategoriasListResults = ({ customers, categorias, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [customerEdit, setCustomerEdit] = useState({})
  const [isEdit, setIsEdit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false)
  const [modalSuccess, setModalSuccess] = useState(true)
  const [isChecked, setChecked] = useState(false);
  const [values, setValues] = useState({
    nome: ''
  });
  
  const [subcategorias, setSubCategorias] = useState(customers)
  const [searchText, setSearchText] = useState("");
  

  const handleChangeSearch = (event) => {
    let value = event.target.value
    setSearchText(value)
    let subcategoriasFilter = customers.filter(function(item){
      return item.name.includes(value) || item.name.includes(value.toLowerCase()) || item.name.includes(value.toUpperCase()) || item.name.includes(value.charAt(0).toUpperCase()+value.slice(1))
    })
    setSubCategorias(subcategoriasFilter)
  };
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const filterCategoriaFromId = (id) => {
    if(categorias.length == 0 || id == undefined){
      return ''
    }else{
      let usuariosFilter = categorias.filter(function(item){
        return item._id == id
      })
      if(usuariosFilter.length == 0){
        return "Categoria não encontrada"
      }
      return usuariosFilter[0].name
    }
  }
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleEdit = (customer) => {
    setChecked(customer.ativo);
    setValues({nome: customer.name, categoria: customer.categoria})
    setIsEdit(true);
    setCustomerEdit(customer)
  };

  const handleBackEdit = () => {
    setIsEdit(false);
  };
  const handleAtivoChecked = () => {
    setChecked(!isChecked);
  };
  const handleChangeCategoria = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  
  const saveSubCategoria = (nome, ativo) => {
    var json = {
      "name": values.nome,
      "categoria": values.categoria,
      "ativo": isChecked
    }
    ServiceSubCategorias.editSubCategorias(customerEdit._id, json).then(response => {
        setModalSuccess(true)
        setModalVisible(true)
        var subcategorias = response.data;
        console.log(subcategorias)
    }).catch(error => {
        setModalSuccess(false)
        setModalVisible(true)
        console.log(error);
    });
  }

  return (
    <div>
      { isEdit ?        
                      <Card sx={{ backgroundColor: 'background.default'}}>
                        <Box sx={{ }}> 
                        <div>
                          <IconButton
                              color="inherit"
                              aria-label="open drawer"
                              onClick={()=>{ handleBackEdit()}}>
                                  <ArrowBack/>
                          </IconButton>
                        
                        <Card>
                          <CardHeader
                            subheader="Subcategorias"
                            title="Editar"
                          />
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
                            { categorias.length > 0 ?
                            <TextField
                            fullWidth
                            label="Categoria"
                            name="categoria"
                            margin="normal"
                            onChange={handleChangeCategoria}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={values.categoria}
                            variant="outlined"
                          >
                            {categorias.map((option) => (
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
                            
                            <Grid container spacing={2}>
                              <Grid item xs={0}>
                              <Switch
                                checked={isChecked}
                                onChange={handleAtivoChecked}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                              </Grid>
                              <Grid item xs={1} style={{marginTop: 10}}>
                                  { isChecked ? <Typography
                                color="textPrimary"
                                variant="h5"
                              >
                                Ativo
                              </Typography> : <Typography
                                color="textPrimary"
                                variant="h5"
                              >
                                Inativo
                              </Typography>}
                              </Grid>
                            </Grid>
                            
                          
                          </CardContent>
                          <Divider />
                          <Box sx={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              p: 2 }}>
                            <Button
                              color="primary"
                              variant="contained"
                              onClick={() => { saveSubCategoria(values.nome, isChecked)}}> Salvar</Button>
                          </Box>
                        </Card>
                        </div>
                      <ModalFeedback open={modalVisible} success={modalSuccess} redirect={modalSuccess ? '/app/painel' : ''} title={ modalSuccess ? "Sucesso" : "Falhou"} subTitle={ modalSuccess ? "Subcategoria editada com sucesso." : "Não foi possível editar, tente novamente mais tarde."} />
                      </Box>
                      </Card>
                      :
      <div>

     
      
      <SubCategoriasListToolbar onTextHandle={handleChangeSearch} />
        
      <Card style={{marginTop: 20}}>
      <PerfectScrollbar>
        <Box sx={{  }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Nome
                </TableCell>
                <TableCell>
                  Categoria
                </TableCell>
                <TableCell>
                  Ativo
                </TableCell>
                <TableCell>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subcategorias.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                >
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
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {filterCategoriaFromId(customer.categoria)}
                      </Typography>
                    </Box>
                  </TableCell>
                    <TableCell >
                      {customer.ativo ? <Chip
                    color="success"
                    label={"Ativo"}
                    size="small"
                  />: <Chip
                  color="warning"
                  label={"Inativo"}
                  size="small"
                />}
                    </TableCell>
                    <TableCell >
                       <IconButton
                       color="inherit"
                       aria-label="open drawer"
                       onClick={()=>{ handleEdit(customer)
                      }}
                     >
                       <Edit/>
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
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      </Card>
      </div>
    }
    </div>
  );
};

SubCategoriasListResults.propTypes = {
  customers: PropTypes.array.isRequired,
  categorias: PropTypes.array.isRequired
};

export default SubCategoriasListResults;
