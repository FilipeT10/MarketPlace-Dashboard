import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  LinearProgress,
  Typography,
  Chip
} from '@material-ui/core';
import PropTypes from 'prop-types';

const getNameStatus = (key) => {
  switch (key) {
    case '1':
      return 'Em análise';
    case '2':
      return 'Aguardando pagamento';
    case '3':
      return 'Em andamento';
    case '4':
      return 'A caminho';
    case '5':
      return 'Finalizado';
    case '6':
      return 'Cancelado';
    default:
      return 'Indefinido';
  }
};
const getColorStatus = (key) => {
  switch (key) {
    case '1':
      return '#2196f3';
    case '2':
      return '#D4BC34';
    case '3':
      return '#563880';
    case '4':
      return '#4F77BE';
    case '5':
      return '#4caf50';
    case '6':
      return '#f44336';
    default:
      return '#4F77BE';
  }
};
const getChipStatus = (key) => {
  return (
    <>
      {' '}
      {key == '1' ? (
        <Chip color="info" label={'Em análise'} size="small" />
      ) : key == '2' ? (
        <Chip
          color="warning"
          label={'Aguardando pagamento'}
          size="small"
          style={{ backgroundColor: '#D4BC34' }}
        />
      ) : key == '3' ? (
        <Chip
          color="success"
          label={'Em andamento'}
          size="small"
          style={{ backgroundColor: '#563880' }}
        />
      ) : key == '4' ? (
        <Chip
          color="success"
          label={'A caminho'}
          size="small"
          style={{ backgroundColor: '#4F77BE' }}
        />
      ) : key == '5' ? (
        <Chip color="success" label={'Finalizado'} size="small" />
      ) : key == '6' ? (
        <Chip color="error" label={'Cancelado'} size="small" />
      ) : (
        <></>
      )}
    </>
  );
};
const PedidosResumo = ({ contagem, loading, ...props }) => (
  <Card sx={{ height: '100%' }} {...props}>
    <CardHeader title="STATUS DOS PEDIDOS" />
    <Divider />
    <CardContent>
      {loading == true ? (
        <LinearProgress />
      ) : (
        <>
          {Object.keys(contagem).map((key) => (
            <>
              <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'space-between', pt: 1 }}
              >
                <Grid item sx={{ pt: 2 }}>
                  {getChipStatus(key)}
                  <Typography color="textPrimary" variant="h5" marginTop={0.5}>
                    {'Quantidade: ' + contagem[key].quantidade}
                  </Typography>
                </Grid>
                <Grid item sx={{ pt: 2 }}>
                  <Typography color="textPrimary" variant="h3">
                    {contagem[key].porcentagem.toFixed(2) + '%'}
                  </Typography>
                </Grid>
              </Grid>
              <Box sx={{ pt: 1, pb: 1 }}>
                <LinearProgress
                  value={contagem[key].porcentagem}
                  variant="determinate"
                  sx={{
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: getColorStatus(key) // Define a cor personalizada aqui
                    }
                  }}
                />
              </Box>
            </>
          ))}
        </>
      )}
    </CardContent>
  </Card>
);

PedidosResumo.propTypes = {
  contagem: PropTypes.object.isRequired,
  loading: PropTypes.bool
};

export default PedidosResumo;
