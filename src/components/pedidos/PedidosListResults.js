import { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
  Switch,
  Collapse
} from '@material-ui/core';
import getInitials from '../../utils/getInitials';

import Edit from "@material-ui/icons/Edit";

import IconButton from "@material-ui/core/IconButton";
import { ArrowBack, KeyboardArrowDown, KeyboardArrowUp, RemoveRedEye } from '@material-ui/icons';
import TagsInput from '../Other/TagsInput';
import PedidosEdit from './PedidosEdit';
import PedidosListToolbar from './PedidosListToolbar';
import ProducsPedidotListResults from './ProductsPedidoListResults';


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
  
  const navigate = useNavigate();

  const handleChangeSearch = (event) => {
    let value = event.target.value
    setSearchText(value)
    /*let pedidosFilter = customers.filter(function(item){
      return item.name.includes(value) || item.name.includes(value.toLowerCase()) || item.name.includes(value.toUpperCase()) || item.name.includes(value.charAt(0).toUpperCase()+value.slice(1))
    })
    setPedidos(pedidosFilter)*/
  };

  const formataData = (data) => {
    
    var dat = moment(data).format('DD/MM/YYYY  HH:mm:ss')
    return dat
  }

  

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
    //setValues({nome: customer.name, ...customer})

    navigate("/app/editar-pedido", { replace: true, state: {values: {...customer}} });
    //setIsEdit(true);
  };
  const handleBackEdit = () => {
    setIsEdit(false);
  };

  function Row(props) {
    const { customer } = props;

    const [open, setOpen] = useState(false);
  
    return (
      <Fragment>
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
                    
                      {customer.endereco.referencia == "Loja Física" && customer.endereco.cep == "Loja Física" && customer.endereco.numero == 0 ? 
                      <Typography
                      color="textPrimary"
                      variant="body1"
                    >
                      {customer.endereco.referencia}
                    </Typography>
                      
                      :
                      <Box
                      sx={{
                        alignItems: 'center'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.endereco.logradouro+", "+customer.endereco.complemento}
                      </Typography>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.endereco.numero+" "+customer.endereco.bairro}
                      </Typography>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.endereco.cidade+" - "+customer.endereco.estado}
                      </Typography>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.endereco.cep}
                      </Typography>
                      
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.endereco.referencia}
                      </Typography>

                    </Box>
                      }
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
                        {formataData(customer.data)}
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
                     <IconButton
                      aria-label="expand row"
                      size="small"
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
                      <ProducsPedidotListResults customers={customer.produtos}/>
            
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              
      </Fragment>
    );
  }

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
              {pedidos.slice(page*limit, (page*limit)+limit).map((customer) => (
              <Row key={customer._id} customer={customer} />
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
