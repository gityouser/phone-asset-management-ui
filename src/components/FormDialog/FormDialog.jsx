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
  handleClose,
  handleSubmit,
  open,
  title = "",
  textContent = "",
  assetModel = {},
}) {
  const classes = useStyles();
  const [assetValues, setAssetValues] = useState({});
  const isSubmitDisabled = Object.keys(assetValues).some(
    (key) => !assetModel[key].validateField(assetValues[key])
  );

  useEffect(() => {
    setAssetValues(
      Object.keys(assetModel).reduce(
        (acc, key) => ({ ...acc, [key]: assetModel[key].default || null }),
        {}
      )
    );
  }, [assetModel]);

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
              key={index}
              onChange={(e) =>
                setAssetValues({
                  ...assetValues,
                  [modelKey]: e.target.value || assetModel[modelKey].default,
                })
              }
              label={assetModel[modelKey].label}
              defaultValue=""
              helperText={assetModel[modelKey].helperText}
              defaultValue={assetModel[modelKey].default}
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
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            color="primary"
            variant="contained"
            disabled={isSubmitDisabled}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;
