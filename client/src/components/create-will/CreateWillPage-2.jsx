import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import beneficiaryImg from "../../assets/beneficiary.png";
import { useWillContext } from "../../context/WillContext";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function createArrayWithNumbers(length) {
  return Array.from({ length }, (_, i) => i);
}

const CreateWillPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { willDetails, setWillDetails, setValidators, willCreated, setWillCreated } = useWillContext();
  const [beneficiaryNumber, setBeneficiaryNumber] = useState(1);
  const [validatorNumber, setValidatorNumber] = useState(1);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const API_URL = "http://localhost:8000";
  const onSubmit = async (data) => {
    console.log("data", data);
    const { validatorsAddress } = data;
    // Contruct request options
    const requestBody = {
      "ownerPubKey": data.ownerPubKey,
      "ownerIcNumber": data.ownerIcNumber,
      "beneficiaries": [
        {
          "beneficiaryPubKey": data.address[0],
          "percentage": data.percentage[0]
        }
      ],
      "validators": validatorsAddress.map(address =>
      ({
        "validatorPubKey": address,
        "isValidated": false
      }))
      ,
      "ownerPrivKey": data.ownerPrivKey
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    };
    console.log("requestBody", requestBody)
    const response = await fetch(`${API_URL}/create-will`, requestOptions)
    if (response.ok) {
      const responseBody = await response.json();
      console.log("responseBody", responseBody);

      // Save will details
      const { ownerPrivKey, ...otherDetailsExceptPrivKey } = requestBody;
      setWillCreated(true);
      handleClickOpen();
      setValidators(responseBody.validators);
      setWillDetails({ ...otherDetailsExceptPrivKey, contractAddress: responseBody.contract.address, randomKey: responseBody.randomKey });
    } else {
      alert("Something went wrong. Please try again.")
    }
  };

  return (
    <Container
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
        }}
      >
        <Grid
          container
          spacing={2}
        >
          {
            willCreated ? <Grid item xs={12}>
              <Alert severity="success">Will Smart Contract deployed at address {willDetails.contractAddress} with randomKey value {willDetails.randomKey}.</Alert>
            </Grid> : <></>
          }
          <Grid item xs={6}>
            <Typography variant="h5" component="h2">
              Create Will
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <img src={beneficiaryImg} alt="" height="200px" />
            </Box>
          </Grid>
          {/* <Grid item xs={12} md={6} container spacing={2}> */}

          <Grid item xs={12}>
            <TextField
              error={!!errors.ownerPubKey}
              // helperText="This field is required"
              fullWidth
              label="Owner Wallet Address"
              variant="outlined"
              defaultValue="0xcd3b766ccdd6ae721141f452c550ca635964ce71"
              {...register("ownerPubKey", { required: true })}
              disabled={willCreated}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={!!errors.ownerIcNumber}
              // helperText="This field is required"
              fullWidth
              label="Owner Identity Number"
              variant="outlined"
              defaultValue="1234"
              {...register("ownerIcNumber", { required: true })}
              disabled={willCreated}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={!!errors.ownerPrivKey}
              // helperText="This field is required"
              fullWidth
              label="Owner Private Key"
              variant="outlined"
              defaultValue="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
              {...register("ownerPrivKey", { required: true })}
              disabled={willCreated}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => setValidatorNumber(validatorNumber + 1)}
              disabled={willCreated}
            >
              <AddIcon />
              <span>Validators</span>
            </Button>
          </Grid>
          {createArrayWithNumbers(validatorNumber).map((index) => (
            <React.Fragment key={`validators${index}`}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label={"Validator Address " + (index + 1)}
                  variant="outlined"
                  {...register(`validatorsAddress.${index}`, { required: true })}
                  disabled={willCreated}
                  defaultValue="0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
                />
              </Grid>
            </React.Fragment>
          ))}
          {/* </Grid> */}

          {/* <Grid item container xs={12} md={6} spacing={2} alignItems="flex-start"> */}

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => setBeneficiaryNumber(beneficiaryNumber + 1)}
              disabled={willCreated}
            >
              <AddIcon />
              <span>Beneficiary</span>
            </Button>
          </Grid>
          {/* TODO: add guard: max only 100% */}
          {createArrayWithNumbers(beneficiaryNumber).map((index) => (
            <React.Fragment key={`beneficiary${index}`}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id={`address.${index}`}
                  label={"Beneficiary Address " + (index + 1)}
                  variant="outlined"
                  {...register(`address.${index}`, { required: true })}
                  disabled={willCreated}
                  defaultValue="0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id={`percentage.${index}`}
                  label="Percentage"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                  {...register(`percentage.${index}`, { required: true })}
                  disabled={willCreated}
                  defaultValue="100"
                />
              </Grid>
            </React.Fragment>
          ))}
          {/* </Grid> */}

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              disabled={willCreated}
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
                <CheckCircleIcon sx={{ fontSize: "80px", color: "green" }} />
              </Grid>
              <Grid item sx={{ textAlign: "center" }}>
                {`Will Smart Contract deployed at address ${willDetails.contractAddress} with randomKey value ${willDetails.randomKey}.`}
              </Grid>
            </Grid>
          </DialogTitle>
        </Dialog>
      </div>
    </Container>
  );
};

export default CreateWillPage;
