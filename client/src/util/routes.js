import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ActivateWillPage from "../components/activate-will/ActivateWillPage";
import CreateWillPage from "../components/create-will/CreateWillPage-2";
import SecureVaultPasswordPage from "../components/secure-vault-pw/SecureVaultPasswordPage";
import ErrorPage from "../components/shared/ErrorPage";
import ResponsiveAppBar from "../components/shared/ResponsiveAppBar";
import TransferAssetsPage from "../components/transfer-assets/TransferAssetsPage";
import ValidateWillPage from "../components/validate-will/ValidateWillPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ResponsiveAppBar></ResponsiveAppBar>
        <App />
      </>
    ),
    // errorElement: <ErrorPage />,
  },
  {
    path: "/create-will",
    element: (
      <>
        <ResponsiveAppBar></ResponsiveAppBar>
        <CreateWillPage />
      </>
    ),
  },
  {
    path: "/secure-password",
    element: (
      <>
        <ResponsiveAppBar></ResponsiveAppBar>
        <SecureVaultPasswordPage />
      </>
    ),
  },
  {
    path: "/activate-will",
    element: (
      <>
        <ResponsiveAppBar></ResponsiveAppBar>
        <ActivateWillPage />
      </>
    ),
  },
  {
    path: "/validate-will",
    element: (
      <>
        <ResponsiveAppBar></ResponsiveAppBar>
        <ValidateWillPage />
      </>
    ),
  },
  {
    path: "/transfer-assets",
    element: (
      <>
        <ResponsiveAppBar></ResponsiveAppBar>
        <TransferAssetsPage />
      </>
    ),
  },
]);

export default router;
