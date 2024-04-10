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
  Typography,
  Grid,
  Container
} from '@material-ui/core';
import getInitials from '../../utils/getInitials';

import Edit from '@material-ui/icons/Edit';

import IconButton from '@material-ui/core/IconButton';
import { Android, ArrowBack, Language } from '@material-ui/icons';
import ServiceUsuarios from 'src/services/Usuarios';
import ModalFeedback from '../Other/ModalFeedback';
import UsuariosListToolbar from './UsuariosListToolbar';

const UsuariosListResults = ({ objs, lojas, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [objEdit, setobjEdit] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(true);
  const [isChecked, setChecked] = useState(false);
  const [values, setValues] = useState({
    nome: '',
    tipo: ''
  });

  const [usuarios, setUsuarios] = useState(objs);

  const [searchText, setSearchText] = useState('');

  const handleChangeSearch = (event) => {
    let value = event.target.value;
    setSearchText(value);
    let usuariosFilter = objs.filter(function (item) {
      return (
        item.name.includes(value) ||
        item.name.includes(value.toLowerCase()) ||
        item.name.includes(value.toUpperCase()) ||
        item.name.includes(value.charAt(0).toUpperCase() + value.slice(1)) ||
        item.cpf?.includes(value) ||
        item.email?.includes(value)
      );
    });
    setUsuarios(usuariosFilter);
  };

  const filterLojaFromId = (id) => {
    console.log(id);
    console.log(lojas);
    if (lojas.length == 0 || id == undefined) {
      return '';
    } else {
      let usuariosFilter = lojas.filter(function (item) {
        return item._id == id;
      });
      console.log(usuariosFilter);
      if (usuariosFilter.length == 0) {
        return 'Loja não encontrada';
      }
      return usuariosFilter[0].name;
    }
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
    setValues({ nome: obj.name, tipo: obj.tipoUsuario });
    setIsEdit(true);
    setobjEdit(obj);
  };

  const handleBackEdit = () => {
    setIsEdit(false);
  };
  const handleAtivoChecked = () => {
    setChecked(!isChecked);
  };

  const saveUsuario = (nome, ativo) => {
    var json = {
      name: values.nome,
      tipoUsuario: values.tipo,
      ativo: isChecked
    };
    ServiceUsuarios.editUsuarios(objEdit._id, json)
      .then((response) => {
        setModalSuccess(true);
        setModalVisible(true);
        var usuarios = response.data;
        console.log(usuarios);
      })
      .catch((error) => {
        setModalSuccess(false);
        setModalVisible(true);
        console.log(error);
      });
  };

  return (
    <div>
      {isEdit ? null /*    
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
                            subheader="Usuarios"
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
                              label="Tipo da Usuario"
                              margin="normal"
                              name="tipo"
                              onChange={handleChange}
                              value={values.tipo}
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
                              onClick={() => { saveUsuario(values.nome, isChecked)}}> Salvar</Button>
                          </Box>
                        </Card>
                        </div>
                      <ModalFeedback open={modalVisible} success={modalSuccess} redirect={modalSuccess ? '/adm/painel' : ''} title={ modalSuccess ? "Sucesso" : "Falhou"} subTitle={ modalSuccess ? "Usuario editada com sucesso." : "Não foi possível editar a usuario, tente novamente mais tarde."} />
                      </Box>
                      </Card>
                    */ : (
        <div>
          <UsuariosListToolbar onTextHandle={handleChangeSearch} />

          <Card style={{ marginTop: 20 }}>
            <PerfectScrollbar>
              <Box sx={{}}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>CPF</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Sexo</TableCell>
                      <TableCell>Loja</TableCell>
                      <TableCell>Perfil</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {usuarios
                      .slice(page * limit, page * limit + limit)
                      .map((obj) => (
                        <TableRow hover key={obj._id}>
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
                                {obj.cpf}
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
                                {obj.email}
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
                                {obj.gender == 'Male'
                                  ? 'Masculino'
                                  : obj.gender == 'Female'
                                  ? 'Feminino'
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
                              <Typography color="textPrimary" variant="body1">
                                {filterLojaFromId(obj.loja)}
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
                              {obj.profiles.map((user) => (
                                <Typography color="textPrimary" variant="body1">
                                  {user == 'sysAdminMktPlc' ? 'sistema' : user}
                                </Typography>
                              ))}
                            </Box>
                          </TableCell>
                        </TableRow>
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

UsuariosListResults.propTypes = {
  objs: PropTypes.array.isRequired,
  lojas: PropTypes.array.isRequired
};

export default UsuariosListResults;
