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
import { FieldArray, Form, FormikProvider, useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const CreateWillPage = () => {
  const formik = useFormik({
    initialValues: {
      beneficiaries: [{ address: "0xddsaa", percentage: 100 }],
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("hi");
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <FormikProvider value={formik}>
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
            <Grid item xs={12}>
              <Typography variant="h5" component="h2">
                Create Will
              </Typography>
            </Grid>
            <FieldArray
              name="beneficiaries"
              render={(arrayHelpers) =>
                formik.values.beneficiaries.map((beneficiary, i) => (
                  <React.Fragment key={"beneficiary" + i}>
                    {i === 0 && (
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          onClick={() =>
                            arrayHelpers.push({ address: "", percentage: 0 })
                          }
                        >
                          Add Beneficiary
                        </Button>
                      </Grid>
                    )}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={"Beneficiary Address " + (i + 1)}
                        variant="outlined"
                        id={`beneficiaries.${i}.address`}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        // id={`beneficiaries.${i}.percentage`}
                        values={formik.values.beneficiaries[i].percentage}
                        label="Percentage"
                        type="number"
                        max="100"
                        variant="outlined"
                        onChange={formik.handleChange}
                      />
                    </Grid>
                  </React.Fragment>
                ))
              }
            />
            {/* {formik.values.beneficiaries.map((beneficiary, i) => (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label={"Beneficiary Address " + (i + 1)}
                    variant="outlined"
                    value={beneficiary.address}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Percentage"
                    variant="outlined"
                    value={beneficiary.percentage}
                  />
                </Grid>
              </>
            ))} */}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={formik.handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </FormikProvider>
  );
};

export default CreateWillPage;
