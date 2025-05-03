# O Piadista

![Versão](https://img.shields.io/badge/versão-1.0.0-brightgreen)

Uma aplicação web desenvolvida com React para gerar piadas aleatórias utilizando a [JokeAPI v2](https://v2.jokeapi.dev/).

## 🚀 Recursos

- Busca de piadas por categoria
- Filtragem de conteúdo impróprio
- Sistema de favoritos com persistência local
- Cartões giratórios para visualização de piadas
- Compartilhamento de piadas
- Estatísticas sobre as piadas carregadas
- Temas claro e escuro
- Design responsivo

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## 🔧 Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/thejoker.git
cd thejoker
```

Instale as dependências:

```bash
npm install
# ou
yarn install
```

## ⚡ Executando o projeto

Para executar o projeto em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Acesse a aplicação em [http://localhost:5173](http://localhost:5173)

## 🏗️ Construção para produção

Para construir o projeto para produção:

```bash
npm run build
# ou
yarn build
```

Os arquivos serão gerados na pasta `dist`.

## 🔍 Como usar

1. Selecione as categorias de piadas desejadas no formulário.
2. Escolha a quantidade de piadas (1 a 10).
3. Selecione os filtros para remover conteúdo indesejado.
4. Escolha o idioma das piadas.
5. Clique em "Buscar Piadas" para carregar as piadas.
6. Clique em uma piada para ver o cartão girar e revelar o conteúdo completo.
7. Adicione piadas aos favoritos clicando no ícone de coração.
8. Compartilhe piadas clicando no ícone de compartilhamento.
9. Alterne entre os temas claro e escuro usando o botão flutuante no canto inferior direito.

## 📚 Tecnologias utilizadas

- React
- Vite
- React Hook Form
- Yup (validação de formulários)
- CSS Modules
- JokeAPI v2

## 🧪 Testes

Execute os testes utilizando:

```bash
npm test
# ou
yarn test
```

## 📝 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
