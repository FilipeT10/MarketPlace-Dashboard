import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import Edit from "@material-ui/icons/Edit";

import IconButton from "@material-ui/core/IconButton";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);


export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          { tableData != [] ? tableData.map((prop, key) => {
  
            return(
              <TableRow key={key} className={classes.tableBodyRow}>
                    <TableCell className={classes.tableCell} key={key}>
                      {key}
                    </TableCell>
                    <TableCell className={classes.tableCell} key={key}>
                      {prop.name}
                    </TableCell>
                    <TableCell className={classes.tableCell} key={key}>
                      {prop.ativo ? 'Ativo': "Desativado"}
                    </TableCell>
                    <TableCell className={classes.tableCell} key={key}>
                       <IconButton
                       color="inherit"
                       aria-label="open drawer"
                       onClick={()=>{}}
                     >
                       <Edit/>
                     </IconButton>
                     </TableCell>
                
              </TableRow> )
          
          }) : null}
          { /*tableData != [] ? tableData.map((prop, key) => {
            console.log(JSON.stringify(prop) + " Key" + key)
            return null
          }) : null*/}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
