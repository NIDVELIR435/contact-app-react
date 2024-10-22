import './App.css';
import ContactForm from "./ContactForm";
import {Container} from "@mui/material";
import {NotificationsProvider} from '@toolpad/core/useNotifications';

function App() {
  return (
      <NotificationsProvider>
      <Container style={{display: 'flex', justifyContent: 'space-between', alignItems: "center", flexDirection: "column"}}>
        <h1>Contact Manager</h1>
        <ContactForm/>
      </Container>
      </NotificationsProvider>
  );
}

export default App;
