import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../db/firebase";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { Button } from "@mui/material";
import { useNotifications } from "@toolpad/core/useNotifications";

function normalizeData(id, name, email, phone) {
  return { id, name: name ?? "", email: email ?? "", phone: phone ?? "" };
}

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const notifications = useNotifications();
  const navigate = useNavigate();

  const getData = async () => {
    const docSnap = await getDocs(collection(db, "contacts"));
    const contacts = docSnap.docs.map((doc) => {
      const mainData = doc.data();
      return normalizeData(
        doc.id,
        mainData.name,
        mainData.email,
        mainData.phone,
      );
    });
    setContacts(contacts);
  };

  const handleRowEditClick = (id) => {
    navigate(`./${id}/edit`);
  };

  const handleRowDeleteClick = async (id) => {
    const docRef = doc(db, "contacts", id);
    await deleteDoc(docRef).catch(() => {
      notifications.show("Cannot delete contact!", {
        severity: "error",
        autoHideDuration: 3000,
      });
    });
    await getData();
    notifications.show("Contact deleted successfully!", {
      severity: "success",
      autoHideDuration: 3000,
    });
  };
  const handleNewContactClick = () => {
    navigate(`./create`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Button onClick={handleNewContactClick}>Add Contact</Button>
      {contacts.length ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Firebase Id</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Edit/Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="left">{row.id}</TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleRowEditClick(row.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleRowDeleteClick(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h1>No Records</h1>
      )}
    </>
  );
};

export default ContactList;
