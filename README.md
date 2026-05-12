# 🔐 Login Validation System

Um sistema completo de autenticação e gerenciamento de sessão em Node.js com testes unitários, de integração e uma interface React visual.

## 📋 Sobre o Projeto

Este projeto implementa um sistema robusto de validação de login e gerenciamento de sessão com:

- ✅ **Backend Node.js** com funções de login e sessão
- ✅ **Testes Unitários** com Jest (52 testes passando)
- ✅ **Testes de Integração** para fluxos completos
- ✅ **Interface React** com Vite (visual e interativa)
- ✅ **100% de cobertura** de testes

## 🚀 Estrutura do Projeto

```
login-Validation/
├── validador-login/              # Backend - Sistema de validação
│   ├── login.js                 # Funções de validação de login
│   ├── sessao.js                # Gerenciamento de sessão
│   ├── login.test.js            # Testes unitários do login
│   ├── sessao.test.js           # Testes unitários da sessão
│   ├── integracao.test.js       # Testes de integração
│   ├── package.json             # Dependências
│   └── .gitignore
│
└── validador-login-ui/           # Frontend - Interface React
    ├── src/
    │   ├── components/
    │   │   ├── LoginForm.jsx     # Componente de formulário
    │   │   ├── SessionPanel.jsx  # Painel de sessão
    │   │   └── TestResults.jsx   # Dashboard de testes
    │   ├── App.jsx               # Aplicação principal
    │   └── index.css             # Estilos globais
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🔑 Funcionalidades

### Backend (login.js)
- ✅ Validação de email com regex
- ✅ Validação de senha com requisitos de segurança
- ✅ Retorno estruturado com mensagens de erro

### Sessão (sessao.js)
- ✅ Criação de sessão com ID único
- ✅ Validação de sessão ativa
- ✅ Encerramento de sessão
- ✅ Expiração automática em 1 hora
- ✅ Recuperação de informações de sessão

### Testes Jest
- **23 testes unitários** para login (email, senha, função login)
- **18 testes unitários** para sessão (criação, validação, encerramento)
- **9 testes de integração** para fluxo completo
- **100% de sucesso** na execução

### Interface React
- 🎨 Design moderno com gradientes
- 📱 Responsivo (mobile-friendly)
- ✅ Formulário com validação em tempo real
- 📊 Dashboard visual dos testes
- 🔐 Gerenciamento de sessão visual

## 📦 Instalação

### Backend (Validação e Testes)

```bash
cd validador-login
npm install
npm test
```

### Frontend (Interface React)

```bash
cd validador-login-ui
npm install
npm run dev
```

A aplicação abrirá em: `http://localhost:3000`

## 🧪 Executando os Testes

```bash
cd validador-login

# Rodar todos os testes
npm test

# Modo watch (para desenvolvimento)
npm run test:watch

# Cobertura de testes
npm run test:coverage
```

### Resultado dos Testes
```
✓ Test Suites: 3 passed
✓ Tests: 52 passed, 52 total
✓ Snapshots: 0 total
✓ Time: 0.489s
```

## 📝 Exemplos de Uso

### Validação de Login

```javascript
const { login } = require('./login.js');

const resultado = login('usuario@email.com', 'Senha123');
console.log(resultado);
// {
//   sucesso: true,
//   mensagem: 'Login realizado com sucesso',
//   usuario: {
//     email: 'usuario@email.com',
//     dataLogin: '2026-05-12T10:30:00.000Z'
//   }
// }
```

### Criação de Sessão

```javascript
const { criarSessao } = require('./sessao.js');

const sessao = criarSessao('usuario@email.com');
console.log(sessao);
// {
//   sucesso: true,
//   mensagem: 'Sessão criada com sucesso',
//   sessao: {
//     idSessao: 'SESS_1684...xxx',
//     email: 'usuario@email.com',
//     dataCriacao: '2026-05-12T10:30:00.000Z',
//     dataExpiracao: '2026-05-12T11:30:00.000Z',
//     ativa: true
//   }
// }
```

## 🔐 Requisitos de Segurança

### Email
- Deve estar em formato válido (xxx@xxx.xx)

### Senha
- ✅ Mínimo de 6 caracteres
- ✅ Pelo menos 1 letra maiúscula
- ✅ Pelo menos 1 número

### Exemplo de Credenciais Válidas
- **Email:** usuario@email.com
- **Senha:** Senha123

## 📊 Suites de Teste

### 1. Validação de Email (9 testes)
- Emails válidos
- Emails inválidos
- Valores nulos/undefined

### 2. Validação de Senha (8 testes)
- Senhas com requisitos atendidos
- Senhas fraca (sem maiúscula/número)
- Valores nulos/undefined

### 3. Função Login (6 testes)
- Login bem-sucedido
- Falhas por email inválido
- Falhas por senha inválida
- Formato de data ISO

### 4-8. Sessão (18 testes)
- Criação de sessão
- Validação de sessão ativa
- Encerramento de sessão
- Recuperação de informações
- Expiração de sessão

### 9. Integração (9 testes)
- Fluxo completo login + sessão
- Múltiplas sessões simultâneas
- Encerramento de sessão
- Tratamento de erros

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Jest** - Framework de testes
- **JavaScript (ES6)** - Linguagem

### Frontend
- **React 18** - Biblioteca UI
- **Vite** - Build tool
- **CSS3** - Estilização
- **JSX** - Sintaxe React

## 📄 Licença

Este projeto é de código aberto e disponível sob licença ISC.

## 👨‍💻 Autor

**Higor Vitor Padilha**
- GitHub: [@higorvitorpadilha](https://github.com/higorvitorpadilha)

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📞 Contato

Para dúvidas ou sugestões, entre em contato através do GitHub.

---

**Desenvolvido com ❤️ em 2026**