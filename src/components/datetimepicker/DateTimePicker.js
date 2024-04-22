import React, { useEffect, useState } from 'react';
import PropTypes, { bool, string } from 'prop-types';
import Check from '@material-ui/icons/Check';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './custom-styles.css';
import { Typography } from '@material-ui/core';

export default function DateTimePicker({ ...props }) {
  const { title, onSelectedValue, required, error, errorMessage } = props;
  const [date, setDate] = useState(null);

  return (
    <>
      <Typography color={'textPrimary'} variant="body1">
        {title && required ? title + '*' : title}
      </Typography>
      <DatePicker
        selected={date}
        onChange={(date) => {
          setDate(date);
          if (onSelectedValue) {
            onSelectedValue(date);
          }
        }}
        showTimeSelect
        showIcon
        icon={<Check />}
        locale={'br'}
        placeholderText={'Selecione uma data e hora'}
        dateFormat="dd/MM/yyyy h:mm aa"
      />
      {error && (
        <Typography color={'error'} variant="body1">
          {errorMessage
            ? errorMessage
            : required
            ? 'É obrigatório selecionar uma data.'
            : 'Data inválida.'}
        </Typography>
      )}
    </>
  );
}

DateTimePicker.defaultProps = {
  title: 'Selecione uma data e hora',
  required: false
};
DateTimePicker.propTypes = {
  title: string,
  required: bool,
  errorMessage: string
};
