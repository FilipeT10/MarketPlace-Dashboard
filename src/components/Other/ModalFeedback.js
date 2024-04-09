import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import { IconButton, Typography, Grid } from '@material-ui/core';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Close, RemoveRedEye } from '@material-ui/icons';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  paper: {
    position: 'absolute',
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function ModalFeedback({ ...props }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(props.open);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(props.redirect);
    if (props.onClose) {
      props.onClose();
    }
    if (props.redirect) {
      navigate(props.redirect, { replace: true });
    }
  };
  return (
    <div>
      <Modal style={{ outline: 'none' }} open={open} onClose={handleClose}>
        <div
          style={{ ...modalStyle, borderRadius: 20, outline: 'none' }}
          className={classes.paper}
        >
          <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <Typography
                color={props.success ? '#2E7D32' : '#E53935'}
                display="inline"
                variant="h3"
                style={{}}
              >
                {props.title}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <IconButton
                edge="end"
                color="inherit"
                size="small"
                onClick={handleClose}
                style={{ marginBottom: 10 }}
              >
                <Close />
              </IconButton>
            </Grid>
          </Grid>
          <Typography color="textSecondary" display="inline" variant="h5">
            {props.subTitle}
          </Typography>
          <br />
          <br />
          <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              {props.neutralButton ? (
                <Button
                  variant="contained"
                  color="info"
                  onClick={handleClose}
                  style={{ marginRight: 10 }}
                >
                  Voltar
                </Button>
              ) : null}
            </Grid>
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              {props.confirmationButton ? (
                <Button
                  variant="contained"
                  color={props.cancel ? 'error' : 'success'}
                  onClick={
                    props.onClickConfirm
                      ? () => props.onClickConfirm()
                      : handleClose
                  }
                >
                  {props.cancel ? 'Cancelar' : 'Confirmar'}
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}

ModalFeedback.propTypes = {
  open: PropTypes.bool,
  neutralButton: PropTypes.bool,
  confirmationButton: PropTypes.bool,
  success: PropTypes.bool,
  title: PropTypes.string,
  redirect: PropTypes.string,
  subTitle: PropTypes.string
};
