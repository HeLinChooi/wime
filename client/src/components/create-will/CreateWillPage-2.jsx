import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import beneficiaryImg from "../../assets/beneficiary.png";

function createArrayWithNumbers(length) {
  return Array.from({ length }, (_, i) => i);
}

const CreateWillPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [beneficiaryNumber, setBeneficiaryNumber] = useState(1);

  const API_URL = "http://localhost:8000";
  const onSubmit = async (data) => {
    console.log(data);

    // Contruct request options
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "ownerPubKey": data.ownerPubKey,
        "ownerIcNumber": data.ownerIcNumber,
        "beneficiaries": [
          {
            "beneficiaryPubKey": data.address[0],
            "percentage": data.percentage[0]
          }
        ],
        "validators": [
          {
            "validatorPubKey": "0x123456789",
            "isValidated": false
          }
        ],
        "ownerPrivKey": data.ownerPrivKey
      }),
    };
    const message = await fetch(`${API_URL}/create-will`, requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data.message;
      });
    // .then((data) => {
    //   return data.message;
    // });
    console.log(message);
  };

  return (
    <>
      {/* <Container
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
            // width: 600,
            // height: 300,
            // backgroundColor: "primary.dark",
          }}
        > */}
      <Grid
        container
        spacing={2}
        sx={{
          p: 2
        }}
      // rowSpacing={2}
      // columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      >
        <Grid item xs={12}>
            <Typography variant="h5" component="h2">
              Create Will
            </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <img src={beneficiaryImg} alt="" height="200px" />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>

          <Grid item xs={12}>
            <TextField
              error={!!errors.ownerPubKey}
              // helperText="This field is required"
              fullWidth
              label="Owner Wallet Address"
              variant="outlined"
              {...register("ownerPubKey", { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={!!errors.ownerIcNumber}
              // helperText="This field is required"
              fullWidth
              label="Owner Identity Number"
              variant="outlined"
              {...register("ownerIcNumber", { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={!!errors.ownerPrivKey}
              // helperText="This field is required"
              fullWidth
              label="Owner Private Key"
              variant="outlined"
              {...register("ownerPrivKey", { required: true })}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} md={6} rowSpacing={2}>

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => setBeneficiaryNumber(beneficiaryNumber + 1)}
            >
              <AddIcon />
              <span>Beneficiary</span>
            </Button>
          </Grid>
          {createArrayWithNumbers(beneficiaryNumber).map((index) => (
            <React.Fragment key={`beneficiary${index}`}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label={"Beneficiary Address " + (index + 1)}
                  variant="outlined"
                  {...register(`address.${index}`)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Percentage"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                  {...register(`percentage.${index}`)}
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      {/* </Box>
      </Container> */}
    </>
  );
};

export default CreateWillPage;
