# Busca, filtro, ordenação e paginação com Next.js

Quando um dev front-end pensa em _busca_, _filtro_, _ordenação_ e _paginação_, provavelmente pensa em usar métodos como `Array.filter()` ou `Array.sort()` diretamente no front. Mas e se tivermos 100, 500, 1000 itens paginados de 10 em 10? Gerenciar isso pelo front é uma tarefa hercúlea - e pior, não muito eficiente.

Neste Mini Projeto, vamos implementar uma API que retorna uma listagem de pedidos. Por mais simples que pareça, essa é uma API poderosa: ela nos permite passar, como _query parameters_, busca textual, filtro, ordenação e paginação. E o melhor de tudo: **todas essas informações ficarão na URL** para fácil compartilhamento!

Tudo isso no front usando Next.js e Server Components!

## 🤓 Antes de começar

O design e UI do front já estão implementados! O objetivo aqui é conseguir conectar a API e fazer as funcionalidades de busca, filtro, ordenação e paginação funcionarem.

Para isso, basta fazer um fork, clonar o código para a sua máquina, instalar as dependências e rodar `pnpm run dev` ou `npm run dev`!

#### A API

A API que será utilizada foi desenvolvida por nós, do Codante. O endpoint principal (de listagem de pedidos) está em `https://apis.codante.io/api/orders-api/orders`. A API é capaz de filtrar, ordenar, paginar e fazer uma busca textual.

A documentação da API está em <a target="_blank" href="https://apis-docs.codante.io/orders-api">https://apis-docs.codante.io/orders-api</a>. Será necessário consultá-la para fazer este Mini Projeto.

> [!NOTE]
> Nenhum dos dados da API são reais e a base de dados é redefinida a cada hora.

## 🔨 Requisitos

**Conectar dados da API à tabela**

- Popule a tabela com os dados que vêm da API.
- Você deverá usar os campos
  - Nome do Cliente
  - Email do Cliente
  - Status
  - Data do Pedido
  - Valor do Pedido

> [!TIP]
> O valor do pedido está em centavos. Faça as conversões e transforme para o formato brasileiro de número.

**Busca Textual**

- Faça uma busca textual pelo nome do cliente.
- A busca deverá ser totalmente server-side (ou seja, pela API e não pelo front-end).
- A busca deverá ser refletida na URL. Quando não há uma busca, a URL não deverá mais possuir a query de busca.

**Filtro de Status**

- Faça um filtro de status (pending, completed) usando o botão de filtro.
- O filtro deverá ser totalmente server-side.
- O filtro deverá ser refletido na URL. Quando não há filtros ativos, a URL não deverá mais possuir a query de filtro.

**Ordenação de Campos**

- Crie ordenação para, pelo menos, os campos de _data do pedido_ e _valor_.
- A ordenação deverá ser ativada com um clique no nome da coluna respectiva (por exemplo, `valor`).
- Troque o ícone ao lado do nome da coluna para que reflita corretamente o tipo da ordenação.
- A ordenação deverá ser refletida na URL. Quando não há nenhuma ordenação, a URL não deverá mais possuir a query de ordenação.

**Paginação**

- Implemente a paginação conforme os dados recebidos da API - a API já traz os links de páginas prontos para serem implementados.
- Ative e desative os botões de próximo e anterior quando estiver na primeira e na última página.
- A paginação também deverá ser refletida na URL.

**Server e Client Components**

- Decida quais componentes deverão ser servidor e quais deverão ser de cliente.

## 🔨 Desafio extra para quem quer ir além

- Utilize o hook `useDebounce` para atrasar a execução da função de busca textual e evitar muitos requests.

## 🎨 Design Sugerido

Neste mini projeto não será preciso implementar nenhum design - já fizemos isso por você.

## 👉🏽 Sobre este mini-projeto

### O que você irá praticar:

#### Next.js

- Router
- Search Params
- Estado na URL
- Server Components no Next.js
- 'use client'
- Paginação e Ordenação.

### Pré-requisitos

- React
- Next.js básico
- Entender as diferenças entre server e client components é recomendável

---

# Documentação do endpoint: /orders-api/orders

## Listagem de pedidos

Este endpoint permite que você recupere uma lista paginada de todos os seus pedidos. Por padrão, um máximo de dez pedidos são mostrados por página.

## Atributos opcionais (query params)

- **page**

  - **Tipo**: integer
  - **Descrição**: Número da página a ser recuperada.

- **status**

  - **Tipo**: string
  - **Descrição**: Filtra os pedidos por status. Pode ser `completed` ou `pending`.

- **sort**

  - **Tipo**: string
  - **Descrição**: Ordena os pedidos por um campo específico. Pode ser `customer_name`, `order_date`, `amount_in_cents`, `status`, `created_at` ou `updated_at`. O padrão é `order_date`.
  - Para ordenação decrescente, adicione um sinal de menos (`-`) antes do nome do campo.

- **search**
  - **Tipo**: string
  - **Descrição**: Filtra os pedidos por um termo de busca textual (nome do cliente).

## Exemplo de resposta

```json
{
  "data": [
    {
      "id": 178,
      "customer_name": "Michelle Carrara",
      "customer_email": "michelle.carrara@example.com",
      "order_date": "2014-05-05",
      "amount_in_cents": 2739,
      "status": "pending",
      "created_at": "2024-04-29T18:00:02.000000Z",
      "updated_at": "2024-04-29T18:00:02.000000Z"
    },
    // ...
    {
      "id": 87,
      "customer_name": "Stephanie Dias",
      "customer_email": "stephanie.dias@example.net",
      "order_date": "2014-09-07",
      "amount_in_cents": 965,
      "status": "completed",
      "created_at": "2024-04-29T18:00:02.000000Z",
      "updated_at": "2024-04-29T18:00:02.000000Z"
    }
  ],
  "links": {
    "first": "https://apis.codante.io/api/orders-api/orders?page=1",
    "last": "https://apis.codante.io/api/orders-api/orders?page=30",
    "prev": null,
    "next": "https://apis.codante.io/api/orders-api/orders?page=2"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 30,
    "links": [
      {
        "url": null,
        "label": "&laquo; Previous",
        "active": false
      },
      {
        "url": "https://apis.codante.io/api/orders-api/orders?page=1",
        "label": "1",
        "active": true
      },
      {
        "url": "https://apis.codante.io/api/orders-api/orders?page=2",
        "label": "2",
        "active": false
      },
      {
        "url": "https://apis.codante.io/api/orders-api/orders?page=3",
        "label": "3",
        "active": false
      },
      {
        "url": "https://apis.codante.io/api/orders-api/orders?page=4",
        "label": "4",
        "active": false
      },
      {
        "url": "https://apis.codante.io/api/orders-api/orders?page=5",
        "label": "5",
        "active": false
      },
      {
        "url": "https://apis.codante.io/api/orders-api/orders?page=6",
        "label": "6",
        "active": false
      },
      {
        "url": "https://apis.codante.io/api/orders-api/orders?page=7",
        "label": "7",
        "active": false
      },
      {
        "url": "https://apis.codante.io/api/orders-api/orders?page=8",
        "label": "8",
        "active": false
      },
      {
        "url": "https://apis.codante.io/api/orders-api/orders?page=9",
        "label": "9",
        "active": false
      },
      {
        "url": "https://apis.codante.io/api/orders-api/orders?page=10",
        "label": "10",
        "active": false
      },
      {
        "url": null,
        "label": "...",
        "active": false
      },
      {
        "url": "https://apis.codante.io/api/orders-api/orders?page=29",
        "label": "29",
        "active": false
      },
      {
        "url": "https://apis.codante.io/api/orders-api/orders?page=30",
        "label": "30",
        "active": false
      },
      {
        "url": "https://apis.codante.io/api/orders-api/orders?page=2",
        "label": "Next &raquo;",
        "active": false
      }
    ],
    "path": "https://apis.codante.io/api/orders-api/orders",
    "per_page": 10,
    "to": 10,
    "total": 300
  }
}
```
