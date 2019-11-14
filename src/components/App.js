import React, { useState } from "react";
import CSVReader from "react-csv-reader";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
}));

const App = () => {
  const classes = useStyles();

  const [tableProps, setTableProps] = useState(null);
  const [rows, setRows] = useState(null);

  const onFileLoaded = data => {
    let props = null;
    const dataRows = [];
    data.map((items, dataIndex) => {
      if (dataIndex === 0) {
        props = items;
        setTableProps(props);
      } else {
        const dataRow = {};
        items.map((item, itemIndex) => {
          dataRow[props[itemIndex]] = item;
        });
        dataRows.push(dataRow);
      }
    });
    console.log(data);
    console.log("********************");
    console.log(dataRows);
    setRows(dataRows);
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <CSVReader
          cssClass="csv-reader-input"
          label="Select CSV"
          onFileLoaded={onFileLoaded}
          onError={() => {}}
          inputId="ObiWan"
          inputStyle={{ color: "red" }}
        />
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {tableProps &&
                  tableProps.map(prop => {
                    return <StyledTableCell key={prop}>{prop}</StyledTableCell>;
                  })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.map((row, rowIndex) => (
                  <StyledTableRow key={"row-" + rowIndex}>
                    {tableProps &&
                      tableProps.map(prop => {
                        return (
                          <StyledTableCell component="th" scope="row">
                            {row[prop]}
                          </StyledTableCell>
                        );
                      })}
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default App;
