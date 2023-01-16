import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import vaultImg from "../../assets/vault.png";

const TransferAssetsPage = () => {
  const handleValidate = (data) => {
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
          }}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              <Typography variant="h5" component="h2">
                Start transferring assets
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img src={vaultImg} alt="" height="200px" />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <p>Deceased ID: 980101801980</p>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleValidate()}
              >
                Start
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default TransferAssetsPage;
