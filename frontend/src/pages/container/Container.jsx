import { Container as MuiContainer } from "@mui/material";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Container = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("./contacts");
    }
  }, [location, navigate]);
  return (
    <NotificationsProvider>
      <MuiContainer
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "column",
          width: "100wh",
          height: "100vh",
        }}
      >
        <Outlet />
      </MuiContainer>
    </NotificationsProvider>
  );
};

export default Container;
