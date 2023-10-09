# Pra tu enviar um arquivo, tu vai usar o input do tipo file e tu vai usar formData

```tsx
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
```

## Essa é a forma que tu vai faze para enviar um arquivo usando o post, tu n vai enviar um json e sim um form, usando o formData, note q tu fez isso no Headers do cabecalho.

- Se tiver dúvidas o link da aula é esse -> https://cursos.alura.com.br/course/react-integrando-projeto-react-apis/task/103543