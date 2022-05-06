import { Typography } from "@material-ui/core";
import AppConfig from "src/AppConfig";

const Logo = (props) => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
  <img
    alt="Logo"
    style={{height: '100%', marginBottom: 10}}
    src="/static/logo.svg"
    {...props}
  />
  <Typography
    color="#ffffff"
    style={{height: '100%', alignSelf: 'center', marginLeft: 10}}
    variant="h3">
    {AppConfig.sigla}
  </Typography>
  </div>
);

export default Logo;
