import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { TicketBoard } from "./pages/TicketBoard";
import PrivateLayout from "./contextConfig/PrivateLayout";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import Sectors from "./pages/Sectors";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index path="/login" element={<Login />} />
      <Route path="/sign" element={<Register />} />

      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<PrivateLayout />}>
        <Route path="/ticket" element={<TicketBoard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/sectors" element={<Sectors />} />
      </Route>
    </Routes>
  );
};
