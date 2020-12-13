import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import FormDialog from "../FormDialog";

import { useAjax } from "../../utils/hooks/";
import { assetStaticProps, assetModel, assetsURL } from "./utils";
import { actionScenarios } from "../FormDialog/utils";

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

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 600,
  },
  tableRow: {
    cursor: "pointer",
  },
});

function DataTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [formConfig, setFormConfig] = useState({});
  const fetchAllDataAndSetRows = () => {
    fetch(assetsURL)
      .then((res) => res.json())
      .then((res) => setRows([...res.data]))
      .catch((err) => console.log("err:", err));
  };

  useEffect(() => {
    fetchAllDataAndSetRows();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <FormDialog open={formOpen} assetModel={assetModel} {...formConfig} />
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          setFormConfig({
            ...assetStaticProps.createAsset,
            scenario: actionScenarios.create,
            assetsURL,
            fetchAllDataAndSetRows,
            setFormOpen,
          });
          setFormOpen(true);
        }}
      >
        Add new asset
      </Button>
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
              .map((row, idx) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={idx}
                    className={classes.tableRow}
                    onClick={() => {
                      setFormConfig({
                        ...assetStaticProps.editAsset,
                        scenario: actionScenarios.edit,
                        assetsURL,
                        fetchAllDataAndSetRows,
                        rowData: { row },
                        setFormOpen,
                      });
                      setFormOpen(true);
                    }}
                  >
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
