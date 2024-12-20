import React, { useState } from "react";
import { Button, CircularProgress, Input } from "@mui/material";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";
import { createContact } from "../../api/contacts";

const ContactForm = () => {
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const notifications = useNotifications();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createContact(contact);
      setContact({ name: "", email: "", phone: "" });
      notifications.show("Contact added successfully!", {
        severity: "success",
        autoHideDuration: 3000,
      });
      await navigate(`../contacts`);
    } catch (error) {
      const text = "Error adding contact.";
      notifications.show(text, {
        severity: "error",
        autoHideDuration: 5000,
      });
      console.error(text, error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleBack = async () => {
    await navigate(`../contacts`);
  };

  return (
    <>
      <Button onClick={handleBack}>Back</Button>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h1>Contact Manager</h1>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={contact.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={contact.email}
          onChange={handleChange}
          required
        />
        <Input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={contact.phone}
          onChange={handleChange}
          required
        />
        <Button variant="outlined" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size="30px" /> : "Add contacts"}
        </Button>
      </form>
    </>
  );
};

export default ContactForm;
