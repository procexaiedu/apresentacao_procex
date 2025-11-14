# 🚀 ProceX - Interactive Premium Deck

Apresentação interativa de altíssimo nível desenvolvida em Next.js 14, projetada para demonstrar o poder da IA aplicada em negócios B2B.

## ✨ Características

- **Design Premium**: Interface cinematográfica com animações suaves e efeitos visuais sofisticados
- **10 Slides Interativos**: Experiência guiada desde a introdução até o CTA final
- **Demonstrações ao Vivo**: Chat com IA, Kanban em tempo real, consultas SQL e muito mais
- **Integração N8n**: Processamento de IA via webhooks
- **Realtime com Supabase**: Atualizações instantâneas no Kanban e tabelas
- **Gravação de Áudio**: Captura, upload e análise de áudio com transcrição e insights

## 🎯 Slides

1. **Abertura Cinematográfica** - Impacto visual com partículas animadas
2. **Contexto de Mercado** - 3 cards com estatísticas impactantes
3. **O que são Agentes de IA** - Workflow visual animado
4. **Demo 1: CRM Kanban** - Chat + Kanban em tempo real
5. **Demo 2: Consulta SQL** - Análise de dados com visualização premium
6. **Demo 3: Popular Informações** - Preenchimento automático de tabelas
7. **Gravação de Áudio** - Interface de gravação estilo estúdio
8. **IA Processando** - Transcrição + Insights em Markdown
9. **CTA Final** - Agendamento de próxima reunião
10. **Encerramento** - Fechamento elegante

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Animações**: Framer Motion
- **Backend**: Supabase (Database + Realtime)
- **Storage**: Minio (S3-compatible)
- **Automação**: N8n (via webhooks)
- **Markdown**: react-markdown

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env

# Configurar as variáveis no .env
```

## ⚙️ Configuração

### Variáveis de Ambiente

Edite o arquivo `.env` com suas credenciais:

```env
# N8n Webhooks
NEXT_PUBLIC_N8N_WEBHOOK_CHAT=https://seu-n8n.com/webhook/chat
NEXT_PUBLIC_N8N_WEBHOOK_AUDIO_IN=https://seu-n8n.com/webhook/audio-in
NEXT_PUBLIC_N8N_WEBHOOK_AUDIO_OUT=https://seu-n8n.com/webhook/audio-out

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima

# Minio
MINIO_ENDPOINT=seu-endpoint.com
MINIO_PORT=9000
MINIO_USE_SSL=true
MINIO_ACCESS_KEY=sua-access-key
MINIO_SECRET_KEY=sua-secret-key
MINIO_BUCKET_NAME=audio-recordings
MINIO_PUBLIC_URL=https://seu-minio.com/audio-recordings

# Groq API (Whisper STT)
GROQ_API_KEY=sua-groq-api-key
```

### Supabase Schema

Crie as seguintes tabelas no Supabase:

```sql
-- Tabela de deals para o CRM Kanban
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  value DECIMAL NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('lead', 'qualified', 'proposal', 'negotiation', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de contatos para demo de preenchimento
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Realtime nas tabelas
ALTER PUBLICATION supabase_realtime ADD TABLE deals;
ALTER PUBLICATION supabase_realtime ADD TABLE contacts;
```

## 🚀 Desenvolvimento

```bash
# Rodar em modo de desenvolvimento
npm run dev

# Acessar em
http://localhost:3000
```

## 🏗️ Build para Produção

```bash
# Build otimizado
npm run build

# Rodar produção
npm start
```

## 📁 Estrutura do Projeto

```
apresentacao_procex/
├── app/
│   ├── layout.tsx          # Layout raiz
│   ├── page.tsx            # Página principal com navegação
│   └── globals.css         # Estilos globais
├── components/
│   ├── slides/             # Componentes de cada slide
│   │   ├── Slide1.tsx
│   │   ├── Slide2.tsx
│   │   └── ...
│   └── ui/                 # Componentes reutilizáveis
│       ├── button.tsx
│       ├── card.tsx
│       ├── chat.tsx
│       └── kanban.tsx
├── lib/
│   ├── utils.ts           # Utilitários
│   └── supabase.ts        # Cliente Supabase
└── public/                # Arquivos estáticos
```

## 🎨 Customização

### Cores e Tema

As cores podem ser ajustadas em `app/globals.css`:

```css
:root {
  --primary: 217.2 91.2% 59.8%;
  --secondary: 217.2 32.6% 17.5%;
  /* ... */
}
```

### Navegação

A navegação entre slides está em `app/page.tsx`. Para adicionar ou remover slides:

1. Crie o componente em `components/slides/`
2. Importe e adicione ao array `slides` em `app/page.tsx`

## 🔌 Integrações

### N8n Workflows

A apresentação espera os seguintes endpoints N8n:

1. **WEBHOOK_CHAT**: Recebe mensagens do chat e processa ações
2. **WEBHOOK_AUDIO_IN**: Recebe notificação de novo áudio gravado
3. **WEBHOOK_AUDIO_OUT**: Retorna transcrição e insights (polling)

### Minio Upload

O áudio gravado é enviado para Minio. Configure o bucket como público ou use presigned URLs.

## 🎭 Demonstrações

### Demo 1: CRM Kanban
- Chat envia comando → N8n processa → Atualiza Supabase → Kanban atualiza em realtime

### Demo 2: Consulta SQL
- Chat faz pergunta → N8n executa SQL → Retorna dados formatados → UI renderiza tabela + stats

### Demo 3: Popular Tabela
- Chat solicita dados → N8n gera via IA → Insere no Supabase → Tabela se preenche automaticamente

### Demo 4: Áudio
- Grava áudio → Upload Minio → Webhook para N8n → Whisper transcreve → GPT gera insights → UI exibe

## 🚨 Troubleshooting

### Erro: "N8N_WEBHOOK_CHAT não configurado"
- Verifique se as variáveis de ambiente estão corretas em `.env`

### Realtime não funciona
- Confirme que as tabelas têm Realtime habilitado no Supabase
- Verifique se a chave anon tem permissões corretas

### Upload de áudio falha
- Verifique credenciais do Minio
- Confirme que o bucket existe e está acessível

## 📝 Licença

Este projeto foi desenvolvido pela ProceX para uso comercial.

## 🤝 Suporte

Para dúvidas ou suporte, entre em contato com a equipe ProceX.

---

Desenvolvido com ❤️ pela equipe ProceX
