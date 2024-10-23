import { Container as MuiContainer } from "@mui/material";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import { Outlet } from "react-router-dom";

const Container = () => {
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
