import logo from "./wimeLogo.png";
import "./App.css";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function App() {
  const navigate = useNavigate();

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
        <Button variant="contained" onClick={() => navigate("/create-will")}>
          Start to create will
          <ArrowForwardIcon />
        </Button>
      </header>
    </div>
  );
}

export default App;
