# USARP Tool API

### 👨‍💻️ Tecnologias

- JavaScript
- Node.js
- ReactJS
- Scss
- Vite


## Baixar o projeto

```bash
  # Clonar o repositório
  ❯ git clone https://github.com/DAUUX/usarp-tool.git

  # Entrar no diretório
  ❯ cd usarp-tool
```

## Setup do projeto

** Utilizando npm, acesse a pastar do projeto e instale as dependências **

```bash
  # Instalar as dependências
  ❯ npm install
```


```bash
  # Execute o script de modo desenvolvimento.
  # Então para esse caso preencher o .env.development
  ❯ npm run dev
```

### Utilizar em desenvimento

** Utilize as configurações abaixo, considere usar as porta 3000 para front-end e 3333 para back-end, preencha os dados do .env.development.json com dados **

```.env.development

PORT=3000
PREVIEW_PORT=3000
ORIGIN=http://localhost:3000
BASE_URL=http://localhost:3333
```

```.js
//vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import dotenv from "dotenv";

export default ({ mode }) => {
  // Carrega variáveis de ambiente correspondentes ao modo
  const env = dotenv.config({ path: `./.env.${mode}` }).parsed;

  return defineConfig({
    base: "/",
    plugins: [svgr(), react()],
    server: {
      port: env.PORT || 5173, // Usa a porta definida nas variáveis de ambiente ou 3000 por padrão
      strictPort: true,
      host: true,
      origin: env.ORIGIN || "http://localhost:5173", // Usa o origin definido nas variáveis de ambiente ou localhost:3000 por padrão
    },
    // Configuração da visualização
    preview: {
      port: env.PREVIEW_PORT || 5173, // Usa a porta definida nas variáveis de ambiente ou 3001 por padrão
      strictPort: true,
    },
    define: {
      "process.env.BASE_URL": JSON.stringify(env.BASE_URL),
    },
  });
};


```