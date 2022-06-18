import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <Container maxWidth="md">
      <p>
        The page you have requested, could not be found! Go to{" "}
        <Link to="/">homepage.</Link>
      </p>
    </Container>
  );
};
