import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "type", label: "Type", minWidth: 170 },
  { id: "serial", label: "Serial", minWidth: 100 },
  {
    id: "color",
    label: "Color",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "metaData",
    label: "Meta Data",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(type, serial, color, metaData) {
  return { type, serial, color, metaData };
}

const rows = [
  createData("asdfasdf", "ISADFN", 1324171354, 3287263),
  createData("Chisadfasdfna", "CASDFN", 1403500365, 9596961),
  createData("Itasdfasdfgasfgaly", "SADFIT", 60483973, 301340),
  createData("Unisadfted Stasfgasgates", "UASADFS", 327167434, 9833520),
  createData("Canasfgasfgada", "CFASDA", 37602103, 9984670),
  createData("Ausasfgasftralia", "ASFAU", 25475400, 7692024),
  createData("Geasfgrmany", "FGFDE", 83019200, 357578),
  createData("Irasfgasfgeland", "ASIE", 4857000, 70273),
  createData("Mesafgasfxico", "MGFAX", 126577691, 1972550),
  createData("Jaadsfgsfgpan", "SADFJP", 126317000, 377973),
  createData("Fraasfgsfnce", "SADFFR", 67022000, 640679),
  createData("Unidsfgsdfted Kdsfgingfsdgsdfgdom", "SFGGB", 67545757, 242495),
  createData("Ruasfdgassia", "GARUASF", 146793744, 17098246),
  createData("Nasfgigefsaria", "NASFGG", 200962417, 923768),
  createData("Brasfgaasfgzil", "ASFGDBR", 210147125, 8515767),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

function DataTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default DataTable;
