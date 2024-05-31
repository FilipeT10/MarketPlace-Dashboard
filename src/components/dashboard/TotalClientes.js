import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PropTypes from 'prop-types';
const TotalClientes = ({ clientes, loading, ...props }) => {
  const totalClients = clientes ? clientes.length : 0;
  return (
    <Card {...props}>
      <CardContent>
        {loading == true ? (
          <LinearProgress />
        ) : (
          <>
            <Grid
              container
              spacing={3}
              sx={{ justifyContent: 'space-between' }}
            >
              <Grid item>
                <Typography color="textSecondary" gutterBottom variant="h6">
                  TOTAL DE CLIENTES
                </Typography>
                <Typography color="textPrimary" variant="h3">
                  {totalClients}
                </Typography>
              </Grid>
              <Grid item>
                <Avatar
                  sx={{
                    backgroundColor: green[600],
                    height: 56,
                    width: 56
                  }}
                >
                  <PeopleIcon />
                </Avatar>
              </Grid>
            </Grid>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                pt: 2
              }}
            >
              <ArrowUpwardIcon sx={{ color: green[900] }} />
              <Typography
                variant="body2"
                sx={{
                  color: green[900],
                  mr: 1
                }}
              >
                16%
              </Typography>
              <Typography color="textSecondary" variant="caption">
                Desde o último mês
              </Typography>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};
TotalClientes.propTypes = {
  clientes: PropTypes.array.isRequired,
  loading: PropTypes.bool
};
export default TotalClientes;
