import { useAuth } from "../hooks/useAuth";
import { LoggedRoutes } from "./LoggedRoutes";
import { UnloggedRoutes } from "./UnloggedRoutes";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Routes() {
  const { signed, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress color="success" size="3rem" />
      </Box>
    );
  }

  return signed ? <LoggedRoutes /> : <UnloggedRoutes />;
}
