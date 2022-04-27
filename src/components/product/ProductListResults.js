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
import ProductEdit from './ProductEdit';


const ProductListResults = ({ customers, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [categorias, setCategorias] = useState([])
  const [isEdit, setIsEdit] = useState(false);
  const [values, setValues] = useState({
    nome: ''
  });

  
  const getCategorias = () => {
    ServiceCategorias.getCategorias().then(response => {
        var categorias = response.data;
        setCategorias(categorias)
      
    }).catch(error => {
        alert('Falha ao carregar as categorias, tente novamente mais tarde.');
        console.log(error);
    });
  }


  const handleLimitChange = (event) => {
    setPage(0);
    if(event.target.value == "All"){
      setLimit(customers.lenght);
    }else{
    setLimit(event.target.value);
    }

  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleEdit = (customer) => {
    getCategorias()
    setValues({nome: customer.name, ...customer})
    setIsEdit(true);
  };
  const handleBackEdit = () => {
    setIsEdit(false);
  };

  return (
    <Card {...rest}>
       { isEdit ? <ProductEdit product={values} categorias={categorias} onBackEdit={handleBackEdit}/>
                       :<div>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
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
              { Number.isNaN(page*limit) ?  
              customers.slice(0, customers.lenght).map((customer) => (
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
              ))
              :
              customers.slice(page*limit, (page*limit)+limit).map((customer) => (
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
        rowsPerPageOptions={[5, 10, "All"]}
      />

</div>
                    }
    </Card>
    
  );
};

ProductListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default ProductListResults;
