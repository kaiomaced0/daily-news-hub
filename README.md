# Daily News

**Daily News** é um site de notícias desenvolvido com [React](https://reactjs.org/), que utiliza a API [newsapi.org](https://newsapi.org/) para obter e exibir as notícias mais recentes. Este projeto é ideal para aprendizado e consumo de dados de APIs externas.

## Requisitos

- **Node.js** (versão 16 ou superior)
- Gerenciador de pacotes: `npm` ou `yarn`

Se o Node.js ainda não estiver instalado, siga as instruções abaixo para instalá-lo.

## Instalação do Node.js

### Método 1: Instalação manual

1. Acesse o site oficial do Node.js: [https://nodejs.org/](https://nodejs.org/)
2. Baixe a versão LTS recomendada para maior estabilidade.
3. Siga as instruções de instalação para o seu sistema operacional.

### Método 2: Usando o Chocolatey (Windows)

1. Certifique-se de que o [Chocolatey](https://chocolatey.org/install) está instalado em sua máquina.
2. Abra o terminal como administrador.
3. Execute o seguinte comando para instalar o Node.js:

```bash
choco install nodejs-lts
```

4. Após a instalação, reinicie o terminal para garantir que as variáveis de ambiente foram configuradas corretamente.

Para verificar se o Node.js foi instalado corretamente, execute o seguinte comando no terminal:

```bash
node -v
```

Você deve ver a versão instalada do Node.js. Certifique-se também de que o `npm` foi instalado:

```bash
npm -v
```

## Configuração do Projeto

1. Clone este repositório:

```bash
git clone https://github.com/kaiomaced0/daily-news-hub.git
```

2. Navegue até o diretório do projeto:

```bash
cd daily-news
```

3. Instale as dependências:

```bash
npm install
```

ou, se preferir o `yarn`:

```bash
yarn install
```

4. Configure o acesso à API do [newsapi.org](https://newsapi.org/):

   - Acesse [https://newsapi.org/register](https://newsapi.org/register) para criar uma conta e gerar seu token de acesso.
   - Substitua `<YOUR_API_KEY>` no arquivo `.env.local` pelo token gerado. Crie este arquivo no diretório raiz do projeto, se ainda não existir:

   ```env
   REACT_APP_NEWS_API_KEY=<YOUR_API_KEY>
   ```

5. Certifique-se de que a aplicação será executada em `localhost`, pois a API está limitada com CORS para este domínio.

## Executando o Projeto

1. Inicie o servidor de desenvolvimento:

```bash
npm start
```

ou:

```bash
yarn start
```

2. Abra o navegador e acesse [http://localhost:3000](http://localhost:3000).

## Funcionalidades

- Exibição das principais notícias em várias categorias.
- Redirecionamento do usuário para registro no [newsapi.org](https://newsapi.org/) para obter um token de acesso.
- Interface simples e intuitiva.

## Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [newsapi.org](https://newsapi.org/)
- CSS/SCSS para estilização

## Problemas Conhecidos

- A API está limitada para uso apenas em `localhost` devido às restrições de CORS do plano gratuito da newsapi.

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

---

Feito com por Kaio Macedo (https://github.com/kaiomaced0).
