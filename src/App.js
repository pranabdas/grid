import { Routes, Route } from "react-router-dom";
import {
  Home,
  Signup,
  SignIn,
  AddContactForm,
  ContactList,
  PageNotFound,
} from "./pages";
import { NavbarHeader, Footer } from "./components";
import { UserProvider } from "./auth";
import { ProtectedRoute } from "./routes";

function App() {
  return (
    <UserProvider>
      <NavbarHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<SignIn />} />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddContactForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <ContactList />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </UserProvider>
  );
}

export default App;
