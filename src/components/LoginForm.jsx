import { useState } from 'react'
import './LoginForm.css'

export default function LoginForm({ onLogin, mensagem }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erros, setErros] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const novoErros = {}
    
    if (!email) {
      novoErros.email = 'Email é obrigatório'
    }
    if (!senha) {
      novoErros.senha = 'Senha é obrigatória'
    }

    if (Object.keys(novoErros).length > 0) {
      setErros(novoErros)
      return
    }

    setErros({})
    onLogin(email, senha)
  }

  return (
    <div className="login-form-container">
      <div className="login-form">
        <h2>Login</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">📧 Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className={erros.email ? 'input-error' : ''}
            />
            {erros.email && <span className="error-message">{erros.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="senha">🔒 Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              className={erros.senha ? 'input-error' : ''}
            />
            {erros.senha && <span className="error-message">{erros.senha}</span>}
            <small className="password-hint">
              Mínimo 6 caracteres, 1 maiúscula e 1 número
            </small>
          </div>

          {mensagem && (
            <div className={`message ${mensagem.includes('✅') ? 'success' : 'error'}`}>
              {mensagem}
            </div>
          )}

          <button type="submit" className="btn-login">
            ✨ Entrar
          </button>
        </form>

        <div className="login-example">
          <p><strong>Exemplo de login válido:</strong></p>
          <p>Email: usuario@email.com</p>
          <p>Senha: Senha123</p>
        </div>
      </div>
    </div>
  )
}
