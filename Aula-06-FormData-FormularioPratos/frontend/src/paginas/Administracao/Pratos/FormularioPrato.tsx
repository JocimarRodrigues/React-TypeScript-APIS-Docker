import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import http from "../../../http";
import Itag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function FormularioPrato() {
  const [nomePrato, setNomePrato] = useState("");
  const [descricao, setDescricao] = useState("");

  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<Itag[]>([]);

  const [restaurante, setRestaurante] = useState("");
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  const [imagem, setImagem] = useState<File | null>(null)

  useEffect(() => {
    http
      .get<{ tags: Itag[] }>("tags/")
      .then((resposta) => setTags(resposta.data.tags));
    http
      .get<IRestaurante[]>("restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data));
  });

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if(evento.target.files?.length) {
        setImagem(evento.target.files[0])
    } else {
        setImagem(null)
    }
  }

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const formData = new FormData();

    formData.append('nome', nomePrato)
    formData.append('descricao', descricao)

    formData.append('tag', tag)
    formData.append('restaurante', restaurante)

    if(imagem) {
      formData.append('imagem', imagem)
    }

    http.request({
      url: 'pratos/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form'
      },
      data: formData
    })
    .then(() => alert('prato cadastrado com sucesso')).catch(erro => console.log(erro))
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Typography component="h1" variant="h6">
            Formulário de PRatos
          </Typography>
          <Box
            component="form"
            onSubmit={aoSubmeterForm}
            sx={{ width: "100%" }}
          >
            <TextField
              value={nomePrato}
              onChange={(evento) => setNomePrato(evento.target.value)}
              label="Nome do Prato"
              variant="standard"
              fullWidth
              margin="dense"
              required
            />
            <TextField
              value={descricao}
              onChange={(evento) => setDescricao(evento.target.value)}
              label="Descrição do Prato"
              variant="standard"
              fullWidth
              margin="dense"
              required
            />
            <FormControl margin="dense" fullWidth>
              <InputLabel id="select-tag">Tag</InputLabel>
              <Select
                labelId="select-tag"
                value={tag}
                onChange={(evento) => setTag(evento.target.value)}
              >
                {tags.map((tag) => (
                  <MenuItem value={tag.value} key={tag.id}>
                    {tag.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="dense" fullWidth>
              <InputLabel id="select-restaurante">Restaurante</InputLabel>
              <Select
                labelId="select-restaurante"
                value={restaurante}
                onChange={(evento) => setRestaurante(evento.target.value)}
              >
                {restaurantes.map((restaurante) => (
                  <MenuItem value={restaurante.id} key={restaurante.id}>
                    {restaurante.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <input type="file"  onChange={selecionarArquivo}/>
            <Button
              sx={{ marginTop: 1 }}
              type="submit"
              variant="outlined"
              fullWidth
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
