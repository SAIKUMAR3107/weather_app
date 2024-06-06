import { Snackbar, Alert as MUIAlert, AlertColor } from "@mui/material";

interface AlertInterface { message: string, open: boolean, severity: AlertColor, onClose: Function };

function Alert(props: AlertInterface) {
  const { message, open, severity, onClose } = props;
  const handleClose = () => {
    onClose()
  }
  return (
    <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={6000} onClose={handleClose}>
      <MUIAlert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </MUIAlert>
    </Snackbar>
  );
}

export default Alert;
