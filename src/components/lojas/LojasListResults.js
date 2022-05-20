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
import { Android, ArrowBack, Language } from '@material-ui/icons';
import ServiceLojas from 'src/services/Lojas';
import ModalFeedback from '../Other/ModalFeedback';
import LojasListToolbar from './LojasListToolbar';
import InputImages from '../Other/InputImages';


var imagens = []

const LojasListResults = ({ customers, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [customerEdit, setCustomerEdit] = useState({})
  const [isEdit, setIsEdit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false)
  const [modalSuccess, setModalSuccess] = useState(true)
  const [isChecked, setChecked] = useState(false);
  const [values, setValues] = useState({
    nome: '',
    tipo: ''
  });

  const [errorImagem, setErrorImagem] = useState(false)
  
  
  const [lojas, setLojas] = useState(customers)
  const [searchText, setSearchText] = useState("");
  

  const handleChangeSearch = (event) => {
    let value = event.target.value
    setSearchText(value)
    let lojasFilter = customers.filter(function(item){
      return item.name.includes(value) || item.name.includes(value.toLowerCase()) || item.name.includes(value.toUpperCase()) || item.name.includes(value.charAt(0).toUpperCase()+value.slice(1))
    })
    setLojas(lojasFilter)
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
    if(customer.logo && customer.logo.base){
      setValues({nome: customer.name, tipo: customer.tipoLoja, imagens: [customer.logo]})
    }else{
      setValues({nome: customer.name, tipo: customer.tipoLoja, imagens: []})
    }
    setIsEdit(true);
    setCustomerEdit(customer)
  };

  const handleBackEdit = () => {
    setIsEdit(false);
    setErrorImagem(false)
  };
  const handleAtivoChecked = () => {
    setChecked(!isChecked);
  };
  const handleSelecetedImagens =(items) =>{
    imagens = items
    console.log("imagens "+imagens);
  }
  
  const saveLoja = (nome, ativo) => {
    if(imagens.length < 1){
      setErrorImagem(true)
      return
    }

    var json = {
      "name": values.nome,
      "logo": imagens[0],
      "tipoLoja": values.tipo,
      "ativo": isChecked
    }
    ServiceLojas.editLojas(customerEdit._id, json).then(response => {
        setModalSuccess(true)
        setModalVisible(true)
        var lojas = response.data;
        console.log(lojas)
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
                            subheader="Lojas"
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
                            <TextField
                              fullWidth
                              label="Tipo da Loja"
                              margin="normal"
                              name="tipo"
                              onChange={handleChange}
                              value={values.tipo}
                              variant="outlined"
                            />
                            
                            <InputImages 
                              error={errorImagem}
                              selectedTags={handleSelecetedImagens}
                              fullWidth
                              margin="normal"
                              variant="outlined"
                              id="imagens"
                              name="imagens"
                              placeholder="Adicionar Imagens"
                              tags={values.imagens}
                              label="Imagens"
                            />
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
                              onClick={() => { saveLoja(values.nome, isChecked)}}> Salvar</Button>
                          </Box>
                        </Card>
                        </div>
                      <ModalFeedback open={modalVisible} success={modalSuccess} redirect={modalSuccess ? '/adm/painel' : ''} title={ modalSuccess ? "Sucesso" : "Falhou"} subTitle={ modalSuccess ? "Loja editada com sucesso." : "Não foi possível editar a loja, tente novamente mais tarde."} />
                      </Box>
                      </Card>
                      :
      <div>

     
      
      <LojasListToolbar onTextHandle={handleChangeSearch} />
        
      <Card style={{marginTop: 20}}>
      <PerfectScrollbar>
        <Box sx={{  }}>
          <Table>
            <TableHead>
              <TableRow>

                <TableCell>
                  Logo
                </TableCell>
                <TableCell>
                  Nome
                </TableCell>
                <TableCell>
                  Tipo
                </TableCell>
                <TableCell>
                  Aplicações
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
              {lojas.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                >
                  <TableCell>
                    { customer.logo != undefined && <img style={{justifyContent: 'center', width: 50, height: 50}} src={customer.logo.base}/> }
                   
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
                        {customer.tipoLoja}
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
                      {customer.aplications.map((aplication) => (
                        
                        <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={()=> { } }
                      >
                        {aplication.tipo == 'App' ? <Android color={aplication.ativo ? 'primary' : 'disabled'}/> : <Language color={aplication.ativo ? 'primary' : 'disabled'}/> }
                      </IconButton>
                      
                      ))}
                      
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

LojasListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default LojasListResults;
