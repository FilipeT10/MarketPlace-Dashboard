import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

import ServiceCategorias from '../../services/Categorias'
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

import Edit from "@material-ui/icons/Edit";

import IconButton from "@material-ui/core/IconButton";

import { ArrowBack } from '@material-ui/icons';
import TagsInput from '../Other/TagsInput';
import PedidosEdit from './PedidosEdit';
import PedidosListToolbar from './PedidosListToolbar';


const PedidoListResults = ({ onListType, customers, usuarios, tipopagamentos, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const [isList, setIsList] = useState(true);
  const [values, setValues] = useState({
    nome: ''
  });
  

  const [pedidos, setPedidos] = useState(customers)
  const [searchText, setSearchText] = useState("");
  

  const handleChangeSearch = (event) => {
    let value = event.target.value
    setSearchText(value)
    /*let pedidosFilter = customers.filter(function(item){
      return item.name.includes(value) || item.name.includes(value.toLowerCase()) || item.name.includes(value.toUpperCase()) || item.name.includes(value.charAt(0).toUpperCase()+value.slice(1))
    })
    setPedidos(pedidosFilter)*/
  };

  

  const filterUsuarioFromId = (id) => {
    if(usuarios.length == 0 || id == undefined){
      return ''
    }else{
      let usuariosFilter = usuarios.filter(function(item){
        return item._id == id
      })
      if(usuariosFilter.length == 0){
        return "Usuário não encontrado"
      }
      return usuariosFilter[0].name
    }
  }
  const filterTipoPagamentoFromId = (id) => {
    if(tipopagamentos.length == 0 || id == undefined){
      return ''
    }else{
      let usuariosFilter = tipopagamentos.filter(function(item){
        return item._id == id
      })
      if(usuariosFilter.length == 0){
        return "Não encontrado"
      }
      return usuariosFilter[0].name
    }
  }

  const handleLimitChange = (event) => {
    setPage(0);
    if(event.target.value == "All"){
      setLimit(customers.length);
    }else{
    setLimit(event.target.value);
    }

  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleEdit = (customer) => {
    setValues({nome: customer.name, ...customer})
    setIsEdit(true);
  };
  const handleBackEdit = () => {
    setIsEdit(false);
  };

  return (
    <div>
       { isEdit ? <Card sx={{ backgroundColor: 'background.default'}}>
                    <PedidosEdit pedido={values} categorias={usuarios} subcategorias={tipopagamentos} onBackEdit={handleBackEdit}/>
                  </Card>
                       :<div>

      <PedidosListToolbar onTextHandle={handleChangeSearch}  onListType={() => onListType()} list />

      <Card style={{marginTop: 20}}>
      <PerfectScrollbar>
        
        <Box sx={{  }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Produtos
                </TableCell>
                <TableCell>
                  Valor
                </TableCell>
                <TableCell>
                  Tipo de Pagamento
                </TableCell>
                <TableCell>
                  Cliente
                </TableCell>
                <TableCell>
                  Endereço
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Data
                </TableCell>
                <TableCell>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
              pedidos.slice(page*limit, (page*limit)+limit).map((customer) => (
                <TableRow
                  hover
                  key={customer._id}
                >
                  <TableCell>
                    
                      { customer.produtos.map((subcategoria) => (
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
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.valor}
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
                        {filterTipoPagamentoFromId(customer.tipoPagamento)}
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
                        {filterUsuarioFromId(customer.user)}
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
                        {customer.endereco.bairro}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  <TableCell >
                    {customer.status == "01" ? <Chip
                    color="success"
                    label={"Status 01"}
                    size="small"
                      />: <Chip
                      color="warning"
                      label={"Inativo"}
                      size="small"
                    />}
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
                        {customer.data}
                      </Typography>
                    </Box>
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
        count={pedidos.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, pedidos.length]}
      />
      </Card>

</div>
                    }
    </div>
    
  );
};

PedidoListResults.propTypes = {
  onListType: PropTypes.func,
  customers: PropTypes.array.isRequired,
  usuarios: PropTypes.array.isRequired,
  tipopagamentos: PropTypes.array.isRequired
};

export default PedidoListResults;
