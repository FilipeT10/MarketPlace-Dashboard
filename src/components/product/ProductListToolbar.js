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

import { useState } from 'react';
import PropTypes from 'prop-types';


import { FormatListBulleted, Reorder, ViewModule } from '@material-ui/icons';

const ProductListToolbar = ({ onListType, onTextHandle, props}) => {

  const [isList, setList] = useState(false);

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
        href="/app/cadastrar-produto"
      >
        Adicionar Produto
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
              placeholder="Pesquisar produtos"
              variant="outlined"
            />
          </Box>
          <IconButton color="inherit" onClick={() => {  onListType(); isList ?  setList(false) : setList(true) }} size="large">
            {isList ? <ViewModule/> : <FormatListBulleted/>}
          </IconButton>
        </CardContent>
        
      </Card>

    </Box>
  </Box>
  )
};

ProductListToolbar.propTypes = {
  onListType: PropTypes.func,
  onTextHandle: PropTypes.func
};


export default ProductListToolbar;
