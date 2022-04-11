import React from "react";
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

import PropTypes from "prop-types";
import Modal from '@material-ui/core/Modal';
import { IconButton, Typography } from "@material-ui/core";

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
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
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
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ModalSuccess({...props}) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    var that = this; 

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Open Modal
            </Button>

            <Modal style={{outline:'none'}}
                open={open}
                onClose={handleClose}
            >
                <div style={{...modalStyle, borderRadius: 20, outline: 'none'}} className={classes.paper}>
                    <div style={{ justifyContent: 'space-between', width: '100%' }}>
                    <Typography
                        color={props.success ? '#2E7D32': '#E53935'}
                        display="inline"
                        variant="h3"
                        style={{ paddingRight: 250}}
                    >
                        
                       {props.title}
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        size="small"
                        onClick={handleClose }
                        style={{marginBottom: 10}}
                    >
                        <Close/>
                    </IconButton>
                    </div>
                    <Typography
                        color="textSecondary"
                        display="inline"
                        variant="h5"
                    >
                       
                       {props.subTitle}
                        </Typography>
                    <br/>
                    <br/>
                    
                </div>
            </Modal>
        </div>
    );
}

ModalSuccess.propTypes = {
    success: PropTypes.bool,
    title: PropTypes.string,
    subTitle: PropTypes.string,
  };