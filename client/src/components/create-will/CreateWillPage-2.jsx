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

  const onSubmit = (data) => {
    console.log(data);
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
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 2 }}
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
                <Grid item xs={12} sm={6}>
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
        </Box>
      </Container>
    </>
  );
};

export default CreateWillPage;
