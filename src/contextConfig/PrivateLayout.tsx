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
import { useDispatch } from "react-redux";
import { login, resetUser } from "../store/userReducer";
import Unauthorized from "../components/Unauthorized ";

const navigation: Navigation = [
  { kind: "header", title: "Principal" },
  {
    segment: "ticket",
    title: "Tickets",
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

const CustomToolbarActions: React.FC = () => <></>;

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
interface MeResponseSession extends Omit<MeResponse["data"], "isAdmin"> {}
const PrivateRoute: React.FC = () => {
  const userRef = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    api.get("/me").then((res) => {
      if (res.data) {
        dispatch(login(res.data));
      }
    });
  }, [userRef]);
  const session = {
    user: {
      ...userRef,
    },
  };
  const authentication = useMemo(
    () => ({
      signIn: async () => {
        return;
      },
      signOut: async () => {
        await api.delete("/logout");
        window.location.replace("/login");
        dispatch(resetUser())
      },
    }),
    []
  );
  (userRef)
  if(userRef.email === null){
    return (<Unauthorized/>)
  }
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
