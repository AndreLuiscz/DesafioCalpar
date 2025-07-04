# Desafio Calpar - Desenvolvedor Frontend

Este projeto foi desenvolvido como parte do processo seletivo da Calpar, com o objetivo de consumir uma API e apresentar os dados de forma organizada, além de utilizar uma funcionalidade bônus nativa do navegador (geolocalização).

---

##  Funcionalidades

- Consumo de uma API mock com lista de motoristas e status de disponibilidade.
- Exibição dos dados em formato de tabela, com ícones.
- Utilização da API de geolocalização do navegador para capturar latitude, longitude, cidade e estado.
- Estilização leve e responsiva com CSS personalizado.
- Fonte personalizada via Google Fonts (`Libertinus Mono` com serifa).

---

##  Tecnologias Utilizadas

- [React](https://reactjs.org/) (via Vite)
- HTML + CSS
- [Google Fonts](https://fonts.google.com/)
- [OpenStreetMap/Nominatim](https://nominatim.org/release-docs/latest/api/Reverse/) (para geocodificação reversa)

---

##  Decisões de Design

- **Tabela com ícones** ao invés de lista comum, para melhor visualização dos motoristas e suas situações.
- **Fonte com serifa** (`Libertinus Mono`) para dar um visual mais profissional e formal.
- **Geolocalização com fallback** para tratar erros ou recusas de permissão.
- Uso de `fetch` direto para manter o código simples e direto, sem dependência externa de bibliotecas.

---
# Como Rodar o Projeto Localmente

 Siga os passos abaixo para rodar localmente:

---

## Passos

1. **Clone este repositório** = git clone https://github.com/AndreLuiscz/DesafioCalpar.git
2. **Acesse a pasta do projeto** = cd DesafioCalpar
3. **Instale as dependências** = npm install
4. **Inicie o servidor de desenvolvimento** = npm run dev
5. **Abra o projeto no navegador** = http://localhost:5173/

**Requisitos** 
Node.js instalado (versão recomendada: 18+)
Gerenciador de pacotes npm (vem junto com o Node)
Acesso ao terminal / console

Problemas comuns
npm: command not found → Você precisa instalar o Node.js.
vite: command not found → Não se preocupe, o Vite já vem configurado no projeto.
Porta já em uso → Tente fechar outras aplicações ou use npm run dev -- --port=3000.



