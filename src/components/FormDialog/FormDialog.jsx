import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

import { handleActionScenario } from "./utils";
import { actionScenarios } from "../FormDialog/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "30ch",
    },
  },
  dialogActions: {
    padding: "20px",
  },
}));

function FormDialog({
  open,
  title = "",
  textContent = "",
  assetModel = {},
  rowData,
  scenario,
  assetsURL,
  fetchAllDataAndSetRows,
  setFormOpen,
}) {
  const classes = useStyles();
  const [assetValues, setAssetValues] = useState({});
  const isSubmitDisabled = Object.keys(assetValues).some(
    (key) => !assetModel[key].validateField(assetValues[key])
  );

  const { handleClose, handleSubmit, handleDelete } = handleActionScenario({
    scenario,
    assetsURL,
    rowData,
    fetchAllDataAndSetRows,
    setFormOpen,
  });

  useEffect(() => {
    setAssetValues(
      Object.keys(assetModel).reduce(
        (acc, key) => ({ ...acc, [key]: rowData?.row[key] || "" }),
        {}
      )
    );
  }, [rowData]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.root}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{textContent}</DialogContentText>
          {Object.keys(assetModel).map((modelKey, index) => (
            <TextField
              value={assetValues[modelKey]}
              key={index}
              onChange={(e) =>
                setAssetValues({
                  ...assetValues,
                  [modelKey]: assetModel[modelKey].handleOnChange(
                    e.target.value
                  ),
                })
              }
              label={assetModel[modelKey].label}
              helperText={assetModel[modelKey].helperText}
              type={assetModel[modelKey].type}
              variant="outlined"
            />
          ))}
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            onClick={() => {
              handleClose();
            }}
            color="primary"
          >
            Cancel
          </Button>
          {scenario === actionScenarios.edit && (
            <Button
              onClick={handleDelete}
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          )}
          <Button
            onClick={() => {
              handleSubmit(assetValues);
            }}
            color="primary"
            variant="contained"
            disabled={isSubmitDisabled}
          >
            {scenario === actionScenarios.create ? "Add" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;
