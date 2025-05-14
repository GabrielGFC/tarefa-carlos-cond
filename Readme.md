# 💻 Monte seu PC – FullStack App (TypeScript + Yarn)

Este é um sistema completo para montagem de computadores, com validação de compatibilidade entre peças e exibição de componentes reais com imagens.
Dividido em **Frontend (React + Vite + TypeScript)** e **Backend (Express + Sequelize + SQLite + TypeScript)**.

---

## 📁 Estrutura do Projeto

```
📦 projeto/
 ┣ 📁 backend/     # Backend em TypeScript (Express, Sequelize, SQLite)
 ┗ 📁 frontend/    # Frontend em TypeScript (React + Vite)
```


## 🚀 Requisitos

* Node.js (v18+)
* Yarn instalado globalmente

---

## 🔧 Passo a passo de execução

### 1️⃣ Clonar ou extrair o projeto

Se estiver com um .zip:

```bash
unzip projeto_completo_monte_pc.zip
cd projeto_completo_monte_pc
```

---

### 2️⃣ Backend (API REST)

#### 📂 Navegar para a pasta:

```bash
cd backend-ts
```

#### 📦 Instalar dependências:

```bash
yarn install
```

#### 🧪 Popular o banco de dados com os componentes:

```bash
yarn seed
```

#### ▶️ Iniciar o servidor:

```bash
yarn dev
```

A API estará disponível em:
📍 **[http://localhost:3001](http://localhost:3001)**

---

### 3️⃣ Frontend (Interface Web)

Abra um novo terminal e siga os passos abaixo:

#### 📂 Acessar a pasta:

```bash
cd frontend-ts
```

#### 📦 Instalar dependências:

```bash
yarn install
```

#### ▶️ Rodar o projeto:

```bash
yarn dev
```

A interface estará disponível em:
🌐 **[http://localhost:5173](http://localhost:5173)**

---

## 🧠 Funcionalidades

* 🔍 Seleção de peças com imagens (CPU, RAM, SSD, Cooler etc.)
* ⚙️ Filtro de compatibilidade (ex: socket da CPU vs Placa-Mãe)
* 🌍 Suporte multilíngue 🇧🇷/🇺🇸 com botão de troca no topo
* 🛒 Resumo com cálculo de total

---

## 🗂️ Scripts disponíveis

### Backend

| Script       | Descrição                           |
| ------------ | ----------------------------------- |
| `yarn dev`   | Inicia o servidor em modo dev       |
| `yarn build` | Compila o TypeScript                |
| `yarn start` | Executa o servidor compilado        |
| `yarn seed`  | Popula o banco com dados de exemplo |

### Frontend

| Script         | Descrição                      |
| -------------- | ------------------------------ |
| `yarn dev`     | Inicia a interface em modo dev |
| `yarn build`   | Gera a build para produção     |
| `yarn preview` | Visualiza a build gerada       |

    ---

    ## 📷 Exemplo de imagens usadas

    As imagens dos produtos são retiradas do site [FGTEC](https://www.fgtec.com.br) com links diretos no `dump.json`.

    ---

    ## ❓ Dúvidas

    Caso algo não funcione:

    * Verifique se o backend está em `http://localhost:3001`
    * Confira se executou `yarn seed` no backend
    * Veja o console do navegador e do terminal para mensagens de erro 