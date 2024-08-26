import { Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Dashboard from "./screens/Dashboard";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Testimonials from "./screens/Testimonials";
import Design from "./screens/Design";
import Profile from "./screens/Profile";
import CompanyTestimonials from "./screens/CompanyTestimonials";
import Embed from "./screens/Embed";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element = {<Dashboard/>}/>
          <Route path="/testimonials" element={<Testimonials/>}/>
          <Route path="/layouts" element={<Design/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Route>

      {/* Dynamic Route */}
      <Route path="/company/:username" element={<CompanyTestimonials/>}/>
      <Route path="/embed/:username" element={<Embed/>}/>
    </Routes>
  );
}

export default App;
