import { useState, useEffect} from "react";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { db, useSession } from "../auth";

export function AddContactForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
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

  const onSubmit = async (data) => {
    let contacts = { contacts: [...userDoc, data] };
    try {
      const ref = doc(db, "users", `${userId}`);
      await setDoc(ref, contacts);
      navigate("/contacts");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add New Contact
        </Typography>
      </Box>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              {...register("firstName")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              {...register("lastName")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              {...register("email")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="phone"
              label="Phone Number"
              type="tel"
              id="phone"
              autoComplete="phone"
              {...register("phone")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="address1"
              label="Address Line 1"
              id="address1"
              {...register("address1")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="address2"
              label="Address Line 2"
              id="address2"
              {...register("address2")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="city"
              fullWidth
              id="city"
              label="City"
              {...register("city")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="zip"
              fullWidth
              id="zip"
              label="Zip"
              {...register("zip")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="country"
              label="Country"
              id="country"
              {...register("country")}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          + Add
        </Button>
      </Box>
    </Container>
  );
}
