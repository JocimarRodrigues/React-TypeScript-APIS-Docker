# Na aula 1 tu refatorou o css do código usando o MUI, se tu for usar a lib, leia bastante a doc pra tu ver as opcões que tu pode usar.

# Na aula 2 tu vai criar uma instancia do Axios para utilizar a baseURL da API, para não precisar ficar repetindo ela no código, tu já fez isso no jsx, e é a mesma coisa no tsx.

- Nessa aula ele criou a pasta como http, é um bom nome para a pasta q vai criar a instancia da api.

```ts
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000/api/v2/",
});

export default http;

```

### Aí em vez de tu usar o axios, tu usa o http q tu criou

- Com Axios

```tsx

  useEffect(() => {
    axios
      .get<IRestaurante[]>("http://localhost:8000/api/v2/restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data));
  }, []);

  const excluir = (restauranteASerExcluido: IRestaurante) => {
    axios.delete(`http://localhost:8000/api/v2/restaurantes/${restauranteASerExcluido.id}/`).then(() => {
      const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteASerExcluido.id)
      setRestaurantes([...listaRestaurante])
    })
```

- Com http

```tsx
  useEffect(() => {
    http
      .get<IRestaurante[]>("restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data));
  }, []);

  const excluir = (restauranteASerExcluido: IRestaurante) => {
    http.delete(`restaurantes/${restauranteASerExcluido.id}/`).then(() => {
      const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteASerExcluido.id)
      setRestaurantes([...listaRestaurante])
    })
  }
```