import {
  Box,
  Button,
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
  const [validatorNumber, setValidatorNumber] = useState(1);
  const { validators } = useWillContext();

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
      .then((res) => {
        return res.json();
      })
    console.log(response);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          p: 2
        }}
      // rowSpacing={2}
      // columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      >
        <Grid item xs={3}></Grid>
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
        <Grid item xs={12} md={6} container spacing={2}>

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
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => setValidatorNumber(validatorNumber + 1)}
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
                  {...register(`validatorsAddress.${index}`)}
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>

        <Grid item container xs={12} md={6} spacing={2} alignItems="flex-start">

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
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label={"Beneficiary Address " + (index + 1)}
                  variant="outlined"
                  {...register(`address.${index}`)}
                />
              </Grid>
              <Grid item xs={6}>
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

        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
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
