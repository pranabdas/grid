import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useSession, db } from "../auth";

export const ContactList = () => {
  const { user } = useSession();
  const userId = user.uid;
  const [userDoc, setUserDoc] = useState([]);

  useEffect(() => {
    const ref = doc(db, "users", `${userId}`);
    const unsubscribe = onSnapshot(ref, (document) => {
      if (document.exists) {
        setUserDoc(document.data().contacts);
      }
    });
    return unsubscribe;
  }, [userId]);

  return (
    <Container maxWidth="md" align="center">
      <h3>My Contacts</h3>
      <Button variant="contained" component={Link} to="/add">
        + Add New Contact
      </Button>

      {userDoc.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First name</TableCell>
                <TableCell>Last name</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {userDoc.map((row, key) => (
                <TableRow
                  key={key}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
