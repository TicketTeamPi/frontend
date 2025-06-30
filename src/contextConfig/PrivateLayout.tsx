import React, { useState, useMemo } from "react";
import {
  DashboardLayout,
  Account,
  ThemeSwitcher,
  type Navigation,
  type SidebarFooterProps,
} from "@toolpad/core";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { PeopleOutlineOutlined } from "@material-ui/icons";
import Logout from "@mui/icons-material/Logout";
import { Divider, Stack } from "@mui/material";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { Outlet } from "react-router";
import ApartmentIcon from "@mui/icons-material/Apartment";
const navigation: Navigation = [
  { kind: "header", title: "Tickets" },
  {
    segment: "ticket",
    title: "Todos os tickets",
    icon: <DashboardOutlinedIcon />,
  },
  {
    segment: "myTickets",
    title: "Meus tickets",
    icon: <DashboardOutlinedIcon />,
  },
  { kind: "header", title: "Informações" },
  {
    segment: "users",
    title: "Usuários",
    icon: <PeopleOutlineOutlined />,
  },
  {
    segment: "sectors",
    title: "Setores",
    icon: <ApartmentIcon />,
  },
];

const demoSession = {
  user: {
    name: "Bharat Kashyap",
    email: "bharatkashyap@outlook.com",
  },
};

const CustomToolbarActions: React.FC = () => (
  <Stack direction="row" alignItems="center">
    <ThemeSwitcher />
  </Stack>
);

const SidebarFooterAccount: React.FC<SidebarFooterProps> = ({ mini }) => (
  <Stack direction="column" p={0}>
    <Divider />
    <Account
      slotProps={{
        signOutButton: {
          color: "success",
          startIcon: <Logout />,
        },
        preview: {
          variant: "expanded",
          slotProps: {
            avatarIconButton: {
              sx: { width: "fit-content", margin: "auto" },
            },
            avatar: { variant: "rounded" },
          },
        },
      }}
    />
  </Stack>
);

const PrivateRoute: React.FC = () => {
  const [session, setSession] = useState<typeof demoSession | null>(
    demoSession
  );

  const authentication = useMemo(
    () => ({
      signIn: async () => {
        setSession(demoSession);
        return demoSession;
      },
      signOut: async () => {
        window.location.replace("/login");

        setSession(null);
      },
    }),
    []
  );

  return (
    <ReactRouterAppProvider
      navigation={navigation}
      session={session}
      authentication={authentication}
      branding={{
        logo: (
          <img
            src="src/assets/icons/ticketTool.svg"
            className="logo-menu"
            alt="Ticket Tool Logo"
          />
        ),
        title: "Ticket Tool",
        homeUrl: "/ticket",
      }}
    >
      <DashboardLayout
        slots={{
          sidebarFooter: SidebarFooterAccount,
          toolbarActions: CustomToolbarActions,
        }}
      >
        <Outlet />
      </DashboardLayout>
    </ReactRouterAppProvider>
  );
};

export default PrivateRoute;
