import React from "react";
import PropTypes from "prop-types";
import Link from "@material-ui/core/Link";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

export default function SimpleDialog(props) {
  const { onClose, open, data } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">{data.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {data.link}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Link href={data.link} target="_blank">
          Link
        </Link>
      </DialogActions>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
