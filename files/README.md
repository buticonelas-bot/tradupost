# Tradutor Web

App de tradução que usa a tua própria API key da Anthropic (consome o saldo da tua Console).

## Estrutura
- `index.html` — interface (estático)
- `api/translate.js` — função serverless que chama a API da Anthropic
- `package.json` — necessário para o Vercel reconhecer o projeto Node

## Como fazer deploy (igual ao CreatorHub Pro)

1. **Cria um repositório no GitHub** e faz upload desta pasta (ou `git init` + `git push`).
2. Vai a [vercel.com](https://vercel.com) → **Add New Project** → importa o repositório.
3. Antes (ou depois) do deploy, vai a **Settings → Environment Variables** e adiciona:
   - Nome: `ANTHROPIC_API_KEY`
   - Valor: a tua chave de API (gerada em [console.anthropic.com](https://console.anthropic.com) → API Keys)
4. Faz **Deploy**. O Vercel detecta automaticamente `index.html` como estático e `api/translate.js` como função serverless.
5. Se mudares a variável de ambiente depois do primeiro deploy, faz um **Redeploy** para ela ficar ativa.

## Notas
- Cada tradução chama a API da Anthropic e consome créditos da tua Console — não é gratuito.
- O modelo usado é `claude-sonnet-5`; podes trocar em `api/translate.js` se quiseres um modelo mais barato/rápido (ex. Haiku) ou mais avançado (ex. Opus).
- A chave nunca fica exposta no browser porque só a função serverless (lado do servidor) a lê.
