import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  Button,
  LinearProgress,
  Typography
} from '@material-ui/core';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import PropTypes from 'prop-types';

const MaisVendidos = ({ contagem, loading, ...props }) => (
  <Card sx={{ height: '100%' }} {...props}>
    <CardHeader title="MAIS VENDIDOS" />
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
                  <Typography color="textPrimary" variant="h5" marginTop={0.5}>
                    {contagem[key].nome}
                  </Typography>
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
                  color="primary"
                />
              </Box>
            </>
          ))}
        </>
      )}
    </CardContent>
    <Divider />
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
      >
        Ver todos
      </Button>
    </Box>
  </Card>
);

MaisVendidos.propTypes = {
  contagem: PropTypes.object.isRequired,
  loading: PropTypes.bool
};

export default MaisVendidos;
