import { Route, Routes } from "react-router-dom";
import SigninForm from "./pages/SigninForm";
import SignupForm from "./pages/SignupForm";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import Profile from "./pages/Profile";
import Files from "./pages/Files";
import { PrivateRoute } from "./Authentication/PrivateRoute/PrivateRoute";
import UpdateUser from "./pages/UpdateUser";

function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SigninForm />} />
      <Route path="/sign-up" element={<SignupForm />} />
      <Route
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Profile />} />
        <Route path="/files" element={<Files />} />
        <Route path="/profile/:id" element={<UpdateUser />} />
      </Route>
    </Routes>
  );
}

export default App;
