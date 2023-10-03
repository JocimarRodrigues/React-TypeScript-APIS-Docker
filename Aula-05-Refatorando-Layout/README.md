# Na aula 01 tu refatorou o código da pagina de formulário e adicionou uma AppBar do Mui para poder navegar entre as paginas

- Vale destacar que tu usou o LInk do Mui e o Link do React router dom ao mesmo tempo e para fazer isso, tu renomeou o nome do Link do react router para RouterLink

# Refatorando as rotas

- Como tu vem várias rotas /admin, o que tu pode fazer pra refatorar é criar uma rota e colocar todas as outras como filha, e a rota pai ser chamada de /admin

### Exemplo

```tsx
import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdministracaoRestaurantes from "./paginas/Administracao/Restaurantes";
import FormularioRestaurante from "./paginas/Administracao/Restaurantes/FormularioRestaurante";
import PaginaBaseAdmin from "./paginas/Administracao/PaginaBaseAdmin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<PaginaBaseAdmin />}>
      <Route
        path="restaurantes"
        element={<AdministracaoRestaurantes />}
      />
      <Route
        path="restaurantes/novo"
        element={<FormularioRestaurante />}
      />
      <Route
        path="restaurantes/:id"
        element={<FormularioRestaurante />}
      />
      </Route>
    </Routes>
  );
}

export default App;


```

- Dessa forma, tu também pode reaproveitar um layout base para todas as rotas q sejam do adm

```tsx
import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdministracaoRestaurantes from "./paginas/Administracao/Restaurantes";
import FormularioRestaurante from "./paginas/Administracao/Restaurantes/FormularioRestaurante";
import PaginaBaseAdmin from "./paginas/Administracao/PaginaBaseAdmin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<PaginaBaseAdmin />}>
      <Route
        path="restaurantes"
        element={<AdministracaoRestaurantes />}
      />
      <Route
        path="restaurantes/novo"
        element={<FormularioRestaurante />}
      />
      <Route
        path="restaurantes/:id"
        element={<FormularioRestaurante />}
      />
      </Route>
    </Routes>
  );
}

export default App;


```

### Essa forma é bem melhor q essa

```tsx
import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdministracaoRestaurantes from "./paginas/Administracao/Restaurantes";
import FormularioRestaurante from "./paginas/Administracao/Restaurantes/FormularioRestaurante";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      </Route>
      <Route
        path="/admin/restaurantes"
        element={<AdministracaoRestaurantes />}
      />
      <Route
        path="/admin/restaurantes/novo"
        element={<FormularioRestaurante />}
      />
      <Route
        path="/admin/restaurantes/:id"
        element={<FormularioRestaurante />}
      />
    </Routes>
  );
}

export default App;

```

## Importante lembrar que quando tu vai criar um layout base q vai funcionar em todos os filhos, tu precisa usar o outlet do react router dom, ele funciona +/- como um children com a diferença q ele vai renderizar todo o conteúdo das rotas filhas.

```tsx
import {
  Button,
  Typography,
  Box,
  AppBar,
  Container,
  Toolbar,
  Link,
  Paper,
} from "@mui/material";

import { Outlet, Link as RouterLink } from "react-router-dom";

export default function PaginaBaseAdmin() {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">Administração</Typography>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Link component={RouterLink} to="/admin/restaurantes">
                <Button sx={{ my: 2, color: "white" }}>Restaurantes</Button>
              </Link>
              <Link component={RouterLink} to="/admin/restaurantes/novo">
                <Button sx={{ my: 2, color: "white" }}>Novo Restaurante</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>{/* Aqui deve ir o conteúdo */}
          <Outlet />
          </Paper>
        </Container>
      </Box>
    </>
  );
}

```