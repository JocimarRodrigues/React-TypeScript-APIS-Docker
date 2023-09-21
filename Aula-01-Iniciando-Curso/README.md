# Para tu iniciar o docker:

- docker-compose build
- docker-compose up

# Obtendo lista de dados vindo da api

- A lógica é a mesma q com o jsx, com a diferença q tu precisa tipar por causa do ts
```tsx
import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/restaurantes/').then(resposta => {
      setRestaurantes(resposta.data.results)
    }).catch(erro => {
      console.log(erro)
    })
  }, [])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
  </section>)
}

export default ListaRestaurantes
```

- Prestar atencao no state de restaurante, lembrar que o <> q vem dps do useState é para tu definir o tipo do state, no caso tu tá usando uma interface q é IRestaurente e o [] significa q é para especificar q esse useState é um array, e como valor padrao, ele vem vazio

- Aí dps no useEffect tu colocou q ao renderizar o componente ele faz um get pra api pega os results e seta no state q tu criou

# Tu vai tipar também os resultados vindo da API em formato json

- 1 Tu cria a interface de acordo com as props dos dados vindo da api.

```tsx
export interface IPaginacao<T> {
    count: number
    next: string
    previous: string
    results: T[]
}
```

### Sobre o T => Deveríamos ter o tipo desse array, então, vamos usar recurso do TypeScript que é trabalhar com generics, ou seja, essa paginação vai ser uma paginação de uma outra interface e, aí sim, os nossos resultados vão ser uma lista, vai ser um array desse tipo de interface que especificamos.


- 2 Depois basta ir no código e tipar o axios

```tsx
import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/').then(resposta => {
      setRestaurantes(resposta.data.results)
    }).catch(erro => {
      console.log(erro)
    })
  }, [])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
  </section>)
}

export default ListaRestaurantes
```

### Olha que doideira o T q tu criou na interface anterior é para especificar q o Ipaginacao vai receber uma tipagem de outra interface q é o IRestaurante

- Isto é, dá pra tu criar uma interface genérica q vai receber outra interface, esse é o uso daquele T lá em cima.

- Se tiver dúvidas a aula é éssa -> https://cursos.alura.com.br/course/react-integrando-projeto-react-apis/task/103531

# Este é o código completo, tipado e usando as interfaces corretamente

```tsx
import { useEffect, useState } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import axios from "axios";
import { IPaginacao } from "../../interfaces/IPaginacao";

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");

  useEffect(() => {
    axios
      .get<IPaginacao<IRestaurante>>(
        "http://localhost:8000/api/v1/restaurantes/"
      )
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  const verMais = () => {
    axios
      .get<IPaginacao<IRestaurante>>(proximaPagina)
      .then((resposta) => {
        setRestaurantes([...restaurantes, ...resposta.data.results]);
        setProximaPagina(resposta.data.next);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {proximaPagina && <button onClick={verMais}>Ver mais</button>}
    </section>
  );
};

export default ListaRestaurantes;

```

### Tu também criou o código para pegar os pratos

```tsx
import axios from 'axios';
import { useState, useEffect } from 'react';
import IPrato from '../../../interfaces/IPrato';
import IRestaurante from '../../../interfaces/IRestaurante';
import Prato from '../Prato';
import estilos from './Restaurante.module.scss';

interface RestauranteProps {
  restaurante: IRestaurante
}

const Restaurante = ({ restaurante }: RestauranteProps) => {
  const [pratos, setPratos] = useState<IPrato[]>()
  useEffect(() => {
    axios.get<IPrato[]>(`http://localhost:8000/api/v1/restaurantes/${restaurante.id}/pratos/`)
      .then(resposta => {
        setPratos(resposta.data)
      })
  }, [restaurante.id])

  return (<section className={estilos.Restaurante}>
    <div className={estilos.Titulo}>
      <h2>{restaurante.nome}</h2>
    </div>
    <div>
      {pratos?.map(item => <Prato prato={item} key={item.id} />)}
    </div>
  </section>)
}

export default Restaurante
```