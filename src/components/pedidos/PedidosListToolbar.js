import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  IconButton,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


import { FormatListBulleted, Reorder, ViewModule } from '@material-ui/icons';

const PedidoListToolbar = ({ onListType, onTextHandle, list, props}) => {

  const [isList, setList] = useState(list);
  
  return (
  <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Button
        color="primary"
        variant="contained"
        href="/app/cadastrar-pedido"
      >
        Adicionar Pedido
      </Button>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent sx={{  display: 'flex',
        justifyContent: 'space-between'}}>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              onChange={onTextHandle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Pesquisar pedidos"
              variant="outlined"
            />
          </Box>
        </CardContent>
        
      </Card>

    </Box>
  </Box>
  )
};

PedidoListToolbar.propTypes = {
  list: PropTypes.bool,
  onListType: PropTypes.func,
  onTextHandle: PropTypes.func
};


export default PedidoListToolbar;
