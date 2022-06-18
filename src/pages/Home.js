import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useSession } from "../auth";

export const Home = () => {
  const { user } = useSession();

  return (
    <Container maxWidth="md" align="center">
      {user ? (
        <div>
          <h3>Welcome {user.displayName}</h3>
          <Stack direction="row" justifyContent="center" spacing={2}>
            <Button variant="contained" component={Link} to="/contacts">
              View Contacts
            </Button>
            <Button variant="contained" component={Link} to="/add">
              + Add New Contact
            </Button>
          </Stack>
        </div>
      ) : (
        <>
          <p>
            Welcome to G R I D contact manager. This app help you keep track of
            your contacts.
          </p>
          <Stack direction="row" justifyContent="center" spacing={2}>
            <Button variant="contained" component={Link} to="/login">
              Login
            </Button>
            <Button variant="contained" component={Link} to="/signup">
              Sign up
            </Button>
          </Stack>
        </>
      )}
    </Container>
  );
};
