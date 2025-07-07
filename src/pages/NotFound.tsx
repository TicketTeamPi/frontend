import { Box, Typography, Button } from "@mui/material";

const NotFound = () => {
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h3" gutterBottom>
        404 - Página não encontrada
      </Typography>
      <Typography variant="body1" mb={4}>
        A rota acessada não existe ou foi movida.
      </Typography>
    </Box>
  );
};

export default NotFound;
