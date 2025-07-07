import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Unauthorized = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh',
          textAlign: 'center',
        }}
      >
        <LockOutlinedIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Acesso não autorizado
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Você não tem permissão para acessar esta página.
        </Typography>
      </Box>
    </Container>
  );
};

export default Unauthorized;
