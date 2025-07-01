import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { mockUsers } from "../../UserData";
import { api } from "../utils/API";
import { useAppSelector } from "../store/hook";

interface Sector {
  id: string;
  name: string;
  color: string | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: number;
  sector: Sector;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: 0,
    sectorId: "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const isAdmin = useAppSelector((state) => state.user.isAdmin);
  useEffect(() => {
    api
      .get<{ data: Sector[] }>("/sectors")
      .then((res) => setSectors(res.data.data))
      .catch(() => setSectors([]));
    api.get<{ data: User[] }>("/users").then((res) => setUsers(res.data.data));
  }, []);

  const refreshUsers = () => {
    api.get<{ data: User[] }>("/users").then((res) => setUsers(res.data.data));
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      isAdmin: 0,
      sectorId: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      isAdmin: user.isAdmin,
      sectorId: user.sector.id,
    });
    setModalOpen(true);
  };

  const openDeleteDialog = (id: string) => {
    setDeleteTargetId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleteDialogOpen(false);

    if (deleteTargetId) {
      await api.patch(`/users/change-status/${deleteTargetId}`).then((res) => {
        if (res.status.valueOf() === 204) {
        }
      });
      refreshUsers();
    }
    setDeleteTargetId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteTargetId(null);
  };

  const handleSubmit = async () => {
    try {
      const payload: any = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        isAdmin: formData.isAdmin,
        sectorId: formData.sectorId,
      };
      if (!editingUser && formData.password) {
        payload.password = formData.password;
      }

      if (editingUser) {
        const payloadUpdate: any = {
          userId: editingUser.id,
          name: formData.name,
          sectorId: formData.sectorId,
        };
        await api.put(`users/updateUser`, payloadUpdate);
      } else {
        await api.post(`/users`, payload);
      }
      refreshUsers();
      setModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box style={{ height: "100%" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        mb={2}
        style={{ padding: "10px" }}
      >
        <Typography variant="h5" style={{ padding: 16 }}>
          Usuários
        </Typography>
        {isAdmin === 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={openCreateModal}
            className="primary-button"
          >
            + Novo
          </Button>
        )}
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Setor</TableCell>
              {isAdmin === 1 && <TableCell>Ações</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={user.sector.name}
                    style={{
                      backgroundColor: user.sector.color ?? undefined,
                      color: "#fff",
                    }}
                    size="small"
                  />
                </TableCell>
                {isAdmin === 1 && (
                  <TableCell>
                    <Button size="small" onClick={() => openEditModal(user)}>
                      Editar
                    </Button>
                    <IconButton
                      size="small"
                      onClick={() => openDeleteDialog(user.id)}
                      style={{ marginLeft: 8 }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <Typography>Deseja realmente deletar este usuário?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancelar</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="secondary"
            variant="contained"
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingUser ? "Editar Usuário" : "Novo Usuário"}
        </DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <TextField
              label="Nome"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="E-mail"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              fullWidth
            />
          </Box>
          {!editingUser && (
            <Box mb={2}>
              <TextField
                label="Senha"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                fullWidth
              />
            </Box>
          )}
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel>Setor</InputLabel>
              <Select
                value={formData.sectorId}
                onChange={(e) =>
                  setFormData({ ...formData, sectorId: String(e.target.value) })
                }
                label="Setor"
              >
                {sectors.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingUser ? "Salvar" : "Criar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
