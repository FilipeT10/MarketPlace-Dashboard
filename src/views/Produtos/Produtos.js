import React from 'react';
// @material-ui/core components
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import ServiceProdutos from '../../services/Produtos.js'

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
}

 class Produtos extends React.Component {

  state = {
    produtos: []
  };


  componentDidMount() {

    this.getProdutos()
  }
  getProdutos = () => {
    ServiceProdutos.getProdutos().then(response => {
        var produtos = response.data;
        console.log(produtos)
        this.setState({produtos})
      
    }).catch(error => {
        console.log(error);
    });
  }
  

  render(){

    const { classes } = this.props;
    const { produtos} = this.state;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Produtos
            </h4>
            <p className={classes.cardCategoryWhite}>
              Lista de produtos
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Tipo", "Estoque", "Situação", "Ações"]}
              tableData={produtos}
              dataClass="produtos"
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
  }
}


Produtos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Produtos);
