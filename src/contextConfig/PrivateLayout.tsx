import React, { type PropsWithChildren } from "react";
import {
  DashboardLayout,
  AppProvider,
  type AccountPreviewProps,
  AccountPreview,
  Account,
  type SidebarFooterProps,
  ThemeSwitcher,
} from "@toolpad/core";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import TicketBoard from "../pages/TicketBoard";
import {
  CallReceivedOutlined,
  FormatIndentIncreaseOutlined,
  ImportContactsOutlined,
  RouterOutlined,
  PeopleOutlineOutlined,
} from "@material-ui/icons";
import Logout from "@mui/icons-material/Logout";
import { Divider, Stack } from "@mui/material";
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
const demoSession = {
  user: {
    name: "Bharat Kashyap",
    email: "bharatkashyap@outlook.com",
    image: "https://avatars.githubusercontent.com/u/19550456",
  },
};

const CustomToolbarActions: React.FC = () => {
  return (
    <Stack direction="row" alignItems="center">
      <ThemeSwitcher />
    </Stack>
  );
};
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

const PrivateRoute: React.FC<PropsWithChildren> = () => {
  const [session, setSession] = React.useState<typeof demoSession | null>(
    demoSession
  );

  const authentication = React.useMemo(
    () => ({
      signIn: async () => {
        setSession(demoSession);
        return demoSession;
      },
      signOut: async () => {
        setSession(null);
        window.location.replace("/login");
      },
    }),
    []
  );

  return (
    <AppProvider
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
        homeUrl: "/toolpad/core/introduction",
      }}
    >
      <DashboardLayout
        slots={{
          sidebarFooter: SidebarFooterAccount,
          toolbarActions: CustomToolbarActions,
        }}
      >
        <TicketBoard />
      </DashboardLayout>
    </AppProvider>
  );
};

export default PrivateRoute;
