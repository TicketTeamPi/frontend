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
      <Route path="/">
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/" element={<PrivateLayout />}>
        <Route path="/ticket" index element={<TicketBoard />} />
        <Route path="myTickets" element={<TicketBoard />} />
        <Route path="users" element={<Users />} />
        <Route path="sectors" element={<Sectors />} />
      </Route>
    </Routes>
  );
};
