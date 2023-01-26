import { Alert, Box, Button, Container, Dialog, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import signImg from "../../assets/sign.png";
import { useWillContext } from "../../context/WillContext";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ValidateWillPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { willDetails, validators, setValidators, willCreated, signTransactionToValidate } = useWillContext();
  // const [validated, setValidated] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleValidate = async (data) => {
    console.log(data);
    const API_URL = "http://localhost:8000";
    const requestBody = { ownerIcNumber: willDetails.ownerIcNumber, validatorPubKey: data.validatorWalletAddress }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    };
    console.log("requestBody", requestBody)
    const response = await fetch(`${API_URL}/validate-will`, requestOptions)
    if (response.ok) {
      const responseBody = await response.json();
      console.log("responseBody", responseBody);

      // Front End update validators approved
      let tempValidators = validators.map(validator => ({ ...validator }));
      tempValidators = tempValidators.map(v => {
        if (v.validatorPubKey === data.validatorWalletAddress) {
          v.isValidated = true;
        }
        return v;
      })
      setValidators(tempValidators);
      handleClickOpen();
    } else {
      alert("Something went wrong. Please try again.")
    }
  };

  const onValidate = async () => {
    signTransactionToValidate();
  }

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
          }}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {
              !willCreated ? <Grid item xs={12}>
              <Alert severity="warning">Will is not created yet.</Alert>
            </Grid> : <></>
            }
            <Grid item xs={12}>
              <Typography variant="h5" component="h2">
                Validate Will
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img src={signImg} alt="" height="200px" />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <p>Deceased ID: {willDetails.ownerIcNumber}</p>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!errors.validatorWalletAddress}
                // helperText="This field is required"
                fullWidth
                label="Validator Wallet Address"
                variant="outlined"
                {...register("validatorWalletAddress", { required: true })}
                disabled={!willCreated}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                // onClick={handleSubmit(handleValidate)}
                onClick={handleSubmit(onValidate)}
                disabled={!willCreated}
              >
                Validate
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
                  <CheckCircleIcon sx={{ fontSize: "80px", color: "limegreen" }} />
                </Grid>
                <Grid item sx={{ textAlign: "center" }}>
                  {`You have approved the assets transfer.`}
                </Grid>
              </Grid>
            </DialogTitle>
          </Dialog>
        </div>
      </Container>
    </>
  );
};

export default ValidateWillPage;
