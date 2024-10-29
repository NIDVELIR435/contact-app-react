import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Container from "../pages/container/Container";
import ErrorPage from "../pages/error/error-page";
import ContactList from "../pages/contact/ContactList";
import ContactForm from "../pages/contact/ContactForm";
import EditContactForm from "../pages/contact/EditContactForm";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Container />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts",
        element: <ContactList />,
      },
      {
        path: "contacts/create",
        element: <ContactForm />,
      },
      {
        path: "contacts/:contactsId/edit",
        element: <EditContactForm />,
      },
      {
        path: "*",
        element: <Navigate to="/contacts" replace />,
      },
    ],
  },
  {
    path: "/*",
    element: <Navigate to="/contacts" replace />,
  },
]);
