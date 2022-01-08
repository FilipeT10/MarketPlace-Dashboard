import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Chip,
  Typography
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import { MonetizationOn } from '@material-ui/icons';

const ProductCard = ({ product, ...rest }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3
        }}
      >
     { /*  <Avatar
          alt="Product"
          src={product.media}
          variant="square"
        />*/}
      </Box>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h4"
      >
        {product.name}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        {product.ativo}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
      
        >
           {product.ativo ? <Chip
                    color="success"
                    label={"Ativo"}
                    size="small"
                  />: <Chip
                  color="warning"
                  label={"Inativo"}
                  size="small"
                />}
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {product.quantidade+" "}
            Unidades
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <MonetizationOn color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {product.preco}
            {'R$'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductCard;
