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
import ServiceCategorias from '../../services/Categorias.js'

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

 class Categorias extends React.Component {

  state = {
    categorias: []
  };


  componentDidMount() {

    this.getCategoria()
  }
  getCategoria = () => {
    ServiceCategorias.getCategorias().then(response => {
        var categorias = response.data;
        console.log(categorias)
        this.setState({categorias})
      
    }).catch(error => {
        console.log(error);
    });
  }
  

  render(){

    const { classes } = this.props;
    const { categorias} = this.state;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Categorias
            </h4>
            <p className={classes.cardCategoryWhite}>
              Lista de categorias
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Situação", "Ações"]}
              tableData={categorias}
              dataClass="categorias"
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
  }
}


Categorias.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Categorias);
