import { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import SessionPanel from './components/SessionPanel'
import TestResults from './components/TestResults'

export default function App() {
  const [usuario, setUsuario] = useState(null)
  const [sessao, setSessao] = useState(null)
  const [mensagem, setMensagem] = useState('')
  const [mostrarTestes, setMostrarTestes] = useState(false)

  const handleLogin = (email, senha) => {
    // Simular validação
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (!regexEmail.test(email)) {
      setMensagem('Email inválido')
      return
    }

    if (senha.length < 6 || !/[A-Z]/.test(senha) || !/[0-9]/.test(senha)) {
      setMensagem('Senha deve ter: mínimo 6 caracteres, 1 maiúscula e 1 número')
      return
    }

    // Login bem-sucedido
    const novoUsuario = {
      email,
      dataLogin: new Date().toLocaleString('pt-BR')
    }
    setUsuario(novoUsuario)
    
    // Criar sessão
    const idSessao = 'SESS_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    const dataCriacao = new Date()
    const dataExpiracao = new Date(dataCriacao.getTime() + 60 * 60 * 1000)
    
    const novaSessao = {
      idSessao,
      email,
      dataCriacao: dataCriacao.toLocaleString('pt-BR'),
      dataExpiracao: dataExpiracao.toLocaleString('pt-BR'),
      ativa: true
    }
    setSessao(novaSessao)
    setMensagem('✅ Login realizado com sucesso!')
  }

  const handleLogout = () => {
    setUsuario(null)
    setSessao(null)
    setMensagem('✅ Logout realizado com sucesso!')
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🔐 Validador de Login</h1>
        <p>Sistema de autenticação com testes</p>
      </header>

      <div className="app-content">
        {!usuario ? (
          <LoginForm onLogin={handleLogin} mensagem={mensagem} />
        ) : (
          <div className="logged-in-container">
            <SessionPanel usuario={usuario} sessao={sessao} onLogout={handleLogout} />
          </div>
        )}

        <div className="test-section">
          <button 
            className={`toggle-tests ${mostrarTestes ? 'active' : ''}`}
            onClick={() => setMostrarTestes(!mostrarTestes)}
          >
            {mostrarTestes ? '🧪 Ocultar Testes' : '🧪 Ver Testes'}
          </button>
          
          {mostrarTestes && <TestResults />}
        </div>
      </div>

      <footer className="app-footer">
        <p>© 2026 - Validador de Login | Todos os direitos reservados</p>
      </footer>
    </div>
  )
}
