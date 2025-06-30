import React, { useState, useMemo, useEffect } from "react";
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
import { useAppSelector } from "../store/hook";
import { api } from "../utils/API";
import type { MeResponse } from "src/types/type";
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
interface MeResponseSession extends Omit<MeResponse['data'], 'isAdmin'> { }
const PrivateRoute: React.FC = () => {
  const [users, setUser] = useState<MeResponseSession>()
  const userRef = useAppSelector((state) => state.user )
  useEffect(() => {
    console.log(userRef)
  }, [userRef])
  const session = {
    user: {
     ...users
    },
  };
  const authentication = useMemo(
    () => ({
      signIn: async () => {
        return;
      },
      signOut: async () => {
        await api.delete('/logout')
        window.location.replace("/login");

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
