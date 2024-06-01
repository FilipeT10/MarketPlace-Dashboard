import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  LinearProgress
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import MoneyIcon from '@material-ui/icons/Money';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import PropTypes from 'prop-types';

const MediaLucro = ({ lucro, media, variacao, loading, type, ...props }) => (
  <Card sx={{ height: '100%' }} {...props}>
    <CardContent>
      {loading == true ? (
        <LinearProgress />
      ) : (
        <>
          <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="h6">
                {'LUCRO DO ' + (type == 'mensal' ? 'MÉS' : 'DIA')}
              </Typography>
              <Typography color="textPrimary" variant="h3">
                {'R$' + lucro.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="h6">
                {'MÉDIA DE LUCRO POR ' + (type == 'mensal' ? 'MÉS' : 'DIA')}
              </Typography>
              <Typography color="textPrimary" variant="h3">
                {'R$' + media.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: red[600],
                  height: 56,
                  width: 56
                }}
              >
                <MoneyIcon />
              </Avatar>
            </Grid>
          </Grid>
          {variacao != 0 && (
            <Box
              sx={{
                pt: 2,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {variacao > 0 ? (
                <ArrowUpwardIcon sx={{ color: green[900] }} />
              ) : (
                <ArrowDownwardIcon sx={{ color: red[900] }} />
              )}
              <Typography
                sx={{
                  color: variacao > 0 ? green[900] : red[900],
                  mr: 1
                }}
                variant="body2"
              >
                {variacao.toFixed(0) + '%'}
              </Typography>
              <Typography color="textSecondary" variant="caption">
                {'Desde o último ' + (type == 'mensal' ? 'mês' : 'dia')}
              </Typography>
            </Box>
          )}
        </>
      )}
    </CardContent>
  </Card>
);

MediaLucro.propTypes = {
  media: PropTypes.number.isRequired,
  lucro: PropTypes.number.isRequired,
  variacao: PropTypes.number.isRequired,
  type: PropTypes.string,
  loading: PropTypes.bool
};
export default MediaLucro;
