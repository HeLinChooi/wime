import logo from "./wimeLogo.png";
import "./App.css";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { WillContext } from "./context/WillContext";
import { useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import Chip from "@mui/material/Chip";

function App() {
  const {
    // currentAccount,
    connectWallet,
    currentAccount,
    // handleChange,
    // sendTransaction,
    // formData,
    // isLoading,
    // currentBalance,
  } = useContext(WillContext);
  const navigate = useNavigate();

  const StyledChip = styled(Chip)(() =>
    currentAccount
      ? {
          backgroundColor: "limeGreen",
          color: "white",
          fontWeight: "bold",
          float: "right",
        }
      : {
          backgroundColor: "crimson",
          color: "white",
          fontWeight: "bold",
          float: "right",
        }
  );
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Box sx={{ paddingY: 2, paddingX: 10 }}>
          <Typography>
            WIME is a smart contract-powered wealth inheritance and protection
            service that automates the inheritance process, reduces the need for
            intermediaries, and lowers costs. WIME aims to offer a secure and
            transparent means of transferring digital assets upon inheritance.
          </Typography>
        </Box>
        <StyledChip
          sx={{ mb: 2 }}
          label={
            currentAccount ? "Wallet is Connected" : "Wallet is Disconnected"
          }
          size="small"
        ></StyledChip>
        {currentAccount ? (
          <Button variant="contained" onClick={() => navigate("/create-will")}>
            Start to create will
            <ArrowForwardIcon />
          </Button>
        ) : (
          <>
            <Button variant="contained" onClick={() => connectWallet()}>
              Connect
            </Button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
