import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Check from '@material-ui/icons/Check';
import { TextField, Autocomplete, MenuItem } from '@material-ui/core';

export default function MultiSelect({ ...props }) {
  const { placeholder, items, title, fullWidth, onSelectedValue, ...other } =
    props;

  return (
    <Autocomplete
      sx={{ mt: 1, mb: 2, width: fullWidth ? '100%' : 500 }}
      multiple
      onChange={(event, value) =>
        onSelectedValue ? onSelectedValue(value) : {}
      }
      options={items}
      defaultValue={items}
      getOptionLabel={(option) => option.name}
      disableCloseOnSelect
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={title ? title : 'Multiple Autocomplete'}
          placeholder={placeholder ? placeholder : 'Multiple Autocomplete'}
        />
      )}
      renderOption={(props, option, { selected }) => (
        <MenuItem
          {...props}
          key={option.name}
          value={option.name}
          sx={{ justifyContent: 'space-between' }}
        >
          {option.name}
          {selected ? <Check color="info" /> : null}
        </MenuItem>
      )}
    />
  );
}

MultiSelect.defaultProps = {
  items: []
};
MultiSelect.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string)
};
