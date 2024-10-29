import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Input } from "@mui/material";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate, useParams } from "react-router-dom";
import { getContact, updateContact } from "../../api/contacts";

const defaultState = { name: "", email: "", phone: "" };

const EditContactForm = () => {
  const [contact, setContact] = useState(defaultState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const notifications = useNotifications();
  const navigate = useNavigate();
  const { contactsId } = useParams();

  const getData = async (contactsId) => {
    const contact = await getContact(contactsId);
    setContact(contact);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    setContact(defaultState);
    getData(contactsId);
  }, [contactsId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateContact(contactsId, contact);
      notifications.show("Contact updated successfully!", {
        severity: "success",
        autoHideDuration: 3000,
      });
      await navigate(`../contacts`);
    } catch (error) {
      const text = "Error updating contact.";
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
      {" "}
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
          {isSubmitting ? <CircularProgress size="30px" /> : "Update contacts"}
        </Button>
      </form>
    </>
  );
};

export default EditContactForm;
