import { useState } from 'react'
import './SessionPanel.css'

export default function SessionPanel({ usuario, sessao, onLogout }) {
  const [sessionActive, setSessionActive] = useState(true)

  const handleLogout = () => {
    setSessionActive(false)
    onLogout()
  }

  return (
    <div className="session-panel">
      <div className="session-header">
        <h2>✅ Bem-vindo, {usuario?.email}!</h2>
        <div className="user-avatar">{usuario?.email.charAt(0).toUpperCase()}</div>
      </div>

      {sessionActive && sessao && (
        <div className="session-info">
          <div className="info-card">
            <h3>📋 Informações de Sessão</h3>
            
            <div className="info-row">
              <span className="label">ID da Sessão:</span>
              <span className="value">{sessao.idSessao}</span>
            </div>

            <div className="info-row">
              <span className="label">Email:</span>
              <span className="value">{sessao.email}</span>
            </div>

            <div className="info-row">
              <span className="label">Data de Login:</span>
              <span className="value">{sessao.dataCriacao}</span>
            </div>

            <div className="info-row">
              <span className="label">Data de Expiração:</span>
              <span className="value">{sessao.dataExpiracao}</span>
            </div>

            <div className="info-row">
              <span className="label">Status:</span>
              <span className={`value status ${sessao.ativa ? 'active' : 'inactive'}`}>
                {sessao.ativa ? '🟢 Ativa' : '🔴 Inativa'}
              </span>
            </div>
          </div>

          <div className="session-stats">
            <div className="stat">
              <span className="stat-icon">⏱️</span>
              <span className="stat-label">Duração</span>
              <span className="stat-value">1 hora</span>
            </div>

            <div className="stat">
              <span className="stat-icon">🔐</span>
              <span className="stat-label">Segurança</span>
              <span className="stat-value">Ativa</span>
            </div>

            <div className="stat">
              <span className="stat-icon">✔️</span>
              <span className="stat-label">Verificado</span>
              <span className="stat-value">Sim</span>
            </div>
          </div>
        </div>
      )}

      {!sessionActive && (
        <div className="logout-message">
          <p>🚪 Você foi desconectado com sucesso!</p>
        </div>
      )}

      <button className="btn-logout" onClick={handleLogout}>
        🚪 Sair
      </button>
    </div>
  )
}
