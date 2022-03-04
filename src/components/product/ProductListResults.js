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


const ProductListResults = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [customerEdit, setCustomerEdit] = useState({})
  const [isEdit, setIsEdit] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [values, setValues] = useState({
    nome: ''
  });

  const states = [
    {
      value: 'alabama',
      label: 'Alabama'
    },
    {
      value: 'new-york',
      label: 'New York'
    },
    {
      value: 'san-francisco',
      label: 'San Francisco'
    }
  ];

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleEdit = (customer) => {
    setChecked(customer.ativo);
    setValues({nome: customer.name, preco: customer.preco, quantidade: customer.quantidade})
    setIsEdit(true);
    setCustomerEdit(customer)
  };

  const handleBackEdit = () => {
    setIsEdit(false);
  };
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleAtivoChecked = () => {
    setChecked(!isChecked);
  };

  const handleSelecetedTags =(items) =>{
    console.log(items);
  }


  return (
    <Card {...rest}>
       { isEdit ?
                        <Box sx={{ minWidth: 1050 }}> 
                        <div>
                          <IconButton
                              color="inherit"
                              aria-label="open drawer"
                              onClick={()=>{ handleBackEdit()}}>
                                  <ArrowBack/>
                          </IconButton>
                        
                        <Card>
                          <CardHeader
                            subheader="Produtos"
                            title="Editar"
                          />
                          <Divider />
                          <CardContent>
                            <TextField
                              fullWidth
                              label="Nome"
                              margin="normal"
                              name="nome"
                              required
                              onChange={handleChange}
                              value={values.nome}
                              variant="outlined"
                            />
                            <TextField
                              fullWidth
                              label="Preço"
                              margin="normal"
                              name="preco"
                              required
                              onChange={handleChange}
                              value={values.preco}
                              variant="outlined"
                            />
                            <TextField
                              fullWidth
                              label="Quantidade"
                              margin="normal"
                              required
                              name="quantidade"
                              onChange={handleChange}
                              value={values.quantidade}
                              variant="outlined"
                            />
                            <TextField
                            fullWidth
                            label="Categoria"
                            name="categoria"
                            margin="normal"
                            onChange={handleChange}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={values.states}
                            variant="outlined"
                          >
                            {states.map((option) => (
                              <option
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                          <TextField
                            fullWidth
                            label="Tipo de Produto"
                            name="tipo"
                            margin="normal"
                            onChange={handleChange}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={values.states}
                            variant="outlined"
                          >
                            {states.map((option) => (
                              <option
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                          <TagsInput
                              selectedTags={handleSelecetedTags}
                              fullWidth
                              margin="normal"
                              variant="outlined"
                              id="tamanhos"
                              name="tamanhos"
                              placeholder="Adicionar Tamanho"
                              label="Tamanhos"
                            />
                            <TagsInput
                              selectedTags={handleSelecetedTags}
                              fullWidth
                              margin="normal"
                              variant="outlined"
                              id="cores"
                              name="cores"
                              placeholder="Adicionar Cores"
                              label="Cores"
                            />
                            <TagsInput
                              selectedTags={handleSelecetedTags}
                              fullWidth
                              margin="normal"
                              variant="outlined"
                              id="ingredientes"
                              name="ingredientes"
                              placeholder="Adicionar Ingredientes"
                              label="Ingredientes"
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
                              onClick={() => { console.log('onClick'); saveCategoria(values.nome, isChecked)}}> Salvar</Button>
                          </Box>
                        </Card>
                        </div>
                      </Box>:<div>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
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
              {customers.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
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

</div>
                    }
    </Card>
    
  );
};

ProductListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default ProductListResults;
