<h1 align="center"> ZUII GraphQL </h1> <br>

<h2> :dart: Objetivo </h2>
<p> Desenvolver pela primeira vez uma API em GraphQL; portanto, o aprendizado era o que mais contava. </p>
<p> Utilizei Node.js e Typescript juntamente com as ferramentas ApolloServer, TypeORM, Invesify, TypeGraphQL e JWT. Como Banco de Dados foi o MySQL. </p> <br>

<h2> :page_with_curl: Descrição do Projeto </h2>
<p> A ideia era criar uma plataforma de compras fictícias de músicas. </p>

<h3> Como Funciona </h3>
<p> O usuário possui uma biblioteca (inicialmente vazia), e é mostrado para ele um catálogo de artistas, podendo filtrar os mesmos por gêneros musicais. Selecionando um artista, é mostrado uma lista de albums pertencentes a ele, cada um contendo suas músicas. Cada música necessita de uma quantidade de coins para ser adquirida. Após a compra da música, é adicionado o album à biblioteca do usuário, juntamente com a música.</p> <br>

<h2> :computer: Utilização </h2>
<p> Clone o repositório e vá até a pasta criada. Dentro dela dê o comando <i>npm install</i> (fará com que as dependências do projeto sejam instaladas). No mesmo diretório, digite <i>npm run start</i> (Iniciará o servidor na porta 3000). As configurações do Banco de Dados estão no arquivo <strong> src/database/db.ts </strong> </p>

<h2> :thought_balloon: Exemplos </h2>
<p> Os exemplos de Queries e Mutations estão no arquivo <strong> ./examples.gql </strong></p>
