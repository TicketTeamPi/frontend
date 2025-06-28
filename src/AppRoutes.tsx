import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TicketBoard from "./pages/TicketBoard";
import PrivateLayout from "./contextConfig/PrivateLayout";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Register />} />
      </Route>
      <Route path="/" element={<PrivateLayout />}>
        <Route path="/ticket" index element={<TicketBoard />} />
        <Route path="/ticketSector" element={<TicketBoard />} />
      </Route>
    </Routes>
  );
};
