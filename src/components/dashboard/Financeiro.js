import {
  Avatar,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PropTypes from 'prop-types';

const Financeiro = ({
  totalPedidos,
  totalProdutos,
  lucroTotal,
  loading,
  props
}) => (
  <Card {...props}>
    <CardContent>
      {loading == true ? (
        <LinearProgress />
      ) : (
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TOTAL DE PEDIDOS
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {totalPedidos}
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
              marginTop={2}
            >
              TOTAL DE PRODUTOS
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {totalProdutos}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              LUCRO TOTAL
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {'R$: ' + lucroTotal}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: indigo[600],
                height: 56,
                width: 56
              }}
            >
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      )}
    </CardContent>
  </Card>
);

Financeiro.propTypes = {
  totalPedidos: PropTypes.number,
  totalProdutos: PropTypes.number,
  lucroTotal: PropTypes.number,
  loading: PropTypes.bool
};

export default Financeiro;
