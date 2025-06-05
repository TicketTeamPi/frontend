import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TicketBoard from "./pages/TicketBoard";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Register />} />
        <Route path="/ticket" element={<TicketBoard />} />
      </Route>
    </Routes>
  );
};
