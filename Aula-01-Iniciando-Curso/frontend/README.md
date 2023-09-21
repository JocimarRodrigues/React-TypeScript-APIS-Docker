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