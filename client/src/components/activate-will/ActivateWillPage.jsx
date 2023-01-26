import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Alert,
  Dialog,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import idImg from "../../assets/id.png";
import { useWillContext } from "../../context/WillContext";
import InfoIcon from '@mui/icons-material/Info';

const ActivateWillPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { validators, willCreated, willActivated, setWillActivated } = useWillContext();
  const approvedValidator = validators.filter(v => v.isValidated).length;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const API_URL = "http://localhost:8000";
  const onSubmit = async (data) => {
    console.log(data);
    // Contruct request options
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "ownerIcNumber": data.ownerIcNumber
      }),
    };
    const response = await fetch(`${API_URL}/activate-will`, requestOptions)
    if (response.ok) {
      const responseBody = await response.json();
      console.log("responseBody", responseBody);
      console.log(responseBody);
      if (responseBody.isActive) {
        setWillActivated(true);
        handleClickOpen();
      } else {
        alert("Something went wrong. Please try again.")
      }
    } else {
      alert("Something went wrong. Please try again.")
    }
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          marginY: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 600,
            height: 300,
            // backgroundColor: "primary.dark",
          }}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {
              willActivated ?
                <Grid item xs={12}>
                  {
                    approvedValidator === validators.length ?
                      <Alert severity="success">{approvedValidator}/{validators.length} validators approve the assets transfer. Assets transferred!</Alert> :
                      <Alert severity="warning">{approvedValidator}/{validators.length} validators approve the assets transfer.</Alert>
                  }
                </Grid> : <></>
            }
            {
              !willCreated ? <Grid item xs={12}>
                <Alert severity="warning">Will is not created yet.</Alert>
              </Grid> : <></>
            }
            <Grid item xs={12}>
              <Typography variant="h5" component="h2">
                Activate Will
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img src={idImg} alt="" height="200px" />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.ownerIcNumber}
                // helperText="This field is required"
                fullWidth
                label="Identity Number"
                variant="outlined"
                // defaultValue="1234"
                {...register("ownerIcNumber", { required: true })}
                disabled={!willCreated || willActivated}
                defaultValue="1234"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.randomKey}
                helperText="The random key was generated when the will was created"
                fullWidth
                label="Random Key"
                variant="outlined"
                {...register("randomKey", { required: true })}
                disabled={!willCreated || willActivated}
                defaultValue="9a001906-e239-40e4-bdb1-6a0e52346ee0"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                disabled={!willCreated || willActivated}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <InfoIcon sx={{ fontSize: "80px", color: "dodgerblue" }} />
                </Grid>
                <Grid item sx={{ textAlign: "center" }}>
                  {`Notified ${validators.length} validators!`}
                </Grid>
              </Grid>
            </DialogTitle>
          </Dialog>
        </div>
      </Container>
    </>
  );
};

export default ActivateWillPage;
