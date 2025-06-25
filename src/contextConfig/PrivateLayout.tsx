import React, { type PropsWithChildren } from "react";
import { DashboardLayout, AppProvider } from "@toolpad/core";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import TicketBoard from "../pages/TicketBoard";
import {
  CallReceivedOutlined,
  FormatIndentIncreaseOutlined,
  ImportContactsOutlined,
  RouterOutlined,
  PeopleOutlineOutlined,
} from "@material-ui/icons";

const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const navigation = [
    {
      kind: "header",
      title: "Tickets",
    },
    {
      segment: "ticket",
      title: "Todos os tickets",
      icon: <DashboardOutlinedIcon />,
    },
    {
      segment: "ticketSector",
      title: "Tickets - Setornome",
      icon: <DashboardOutlinedIcon />,
    },
    {
      segment: "myTickets",
      title: "Meus tickets",
      icon: <DashboardOutlinedIcon />,
    },
    {
      kind: "header",
      title: "Usuários",
    },
    {
      segment: "lord-of-the-rings",
      title: "Usuários",
      icon: <PeopleOutlineOutlined />,
    },
  ];

  return (
    <AppProvider
      navigation={navigation}
      branding={{
        logo: (
          <img
            src="src/assets/icons/ticketTool.svg"
            className="logo-menu"
            alt="MUI logo"
          />
        ),
        title: "Ticket Tool",
        homeUrl: "/toolpad/core/introduction",
      }}
    >
      <DashboardLayout
        slots={{
          toolbarActions: CustomToolbarActions,
          sidebarFooter: SidebarFooterAccount,
        }}
      >
        <TicketBoard />
      </DashboardLayout>
    </AppProvider>
  );
};

export default PrivateRoute;
