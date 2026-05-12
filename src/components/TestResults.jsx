import './TestResults.css'

const testData = [
  {
    suite: 'Validação de Email',
    count: 9,
    tests: [
      '✅ Deve aceitar email válido',
      '✅ Deve aceitar email com domínio maior',
      '✅ Deve rejeitar email sem @',
      '✅ Deve rejeitar email sem domínio',
      '✅ Deve rejeitar email vazio',
      '✅ Deve rejeitar email null',
      '✅ Deve rejeitar email undefined',
      '✅ Deve rejeitar email que não é string',
      '✅ Deve rejeitar email com espaços'
    ]
  },
  {
    suite: 'Validação de Senha',
    count: 8,
    tests: [
      '✅ Deve aceitar senha válida',
      '✅ Deve rejeitar senha < 6 caracteres',
      '✅ Deve rejeitar senha sem maiúscula',
      '✅ Deve rejeitar senha sem número',
      '✅ Deve rejeitar senha vazia',
      '✅ Deve rejeitar senha null',
      '✅ Deve rejeitar senha undefined',
      '✅ Deve rejeitar senha que não é string'
    ]
  },
  {
    suite: 'Função Login',
    count: 6,
    tests: [
      '✅ Deve fazer login com sucesso',
      '✅ Deve falhar com email inválido',
      '✅ Deve falhar com senha inválida',
      '✅ Deve falhar com email vazio',
      '✅ Deve falhar com senha vazia',
      '✅ Deve retornar data de login em ISO'
    ]
  },
  {
    suite: 'Geração de ID de Sessão',
    count: 2,
    tests: [
      '✅ Deve gerar ID de sessão válido',
      '✅ Deve gerar IDs únicos'
    ]
  },
  {
    suite: 'Criação de Sessão',
    count: 5,
    tests: [
      '✅ Deve criar uma sessão com sucesso',
      '✅ Deve falhar com email vazio',
      '✅ Deve falhar com email null',
      '✅ Deve falhar com email undefined',
      '✅ Deve definir expiração em 1 hora'
    ]
  },
  {
    suite: 'Validação de Sessão',
    count: 4,
    tests: [
      '✅ Deve validar uma sessão ativa',
      '✅ Deve rejeitar sessão com ID inválido',
      '✅ Deve rejeitar sessão sem ID',
      '✅ Deve rejeitar sessão inativa'
    ]
  },
  {
    suite: 'Encerramento de Sessão',
    count: 4,
    tests: [
      '✅ Deve encerrar uma sessão com sucesso',
      '✅ Deve falhar ao encerrar sessão não existente',
      '✅ Deve falhar ao encerrar com ID vazio',
      '✅ Deve desativar a sessão após encerramento'
    ]
  },
  {
    suite: 'Obtenção de Sessão',
    count: 3,
    tests: [
      '✅ Deve obter uma sessão existente',
      '✅ Deve retornar não encontrada para ID inválido',
      '✅ Deve retornar não encontrada para ID vazio'
    ]
  },
  {
    suite: 'Fluxo Completo de Login e Sessão',
    count: 9,
    tests: [
      '✅ Deve fazer login e criar uma sessão',
      '✅ Deve fazer login mas falhar na criação',
      '✅ Deve falhar no login com credenciais inválidas',
      '✅ Deve falhar no login com senha fraca',
      '✅ Deve fazer login, criar e encerrar sessão',
      '✅ Deve fazer login e criar múltiplas sessões',
      '✅ Deve fazer login e recuperar informações',
      '✅ Deve fazer login e validar período',
      '✅ Deve falhar em todo fluxo com email inválido'
    ]
  }
]

export default function TestResults() {
  const totalTests = testData.reduce((sum, suite) => sum + suite.count, 0)

  return (
    <div className="test-results">
      <div className="test-summary">
        <h3>🧪 Resultados dos Testes</h3>
        <div className="summary-stats">
          <div className="stat-box success">
            <span className="stat-number">{totalTests}</span>
            <span className="stat-label">Testes Passando</span>
          </div>
          <div className="stat-box info">
            <span className="stat-number">{testData.length}</span>
            <span className="stat-label">Suites de Teste</span>
          </div>
          <div className="stat-box success">
            <span className="stat-number">100%</span>
            <span className="stat-label">Taxa de Sucesso</span>
          </div>
        </div>
      </div>

      <div className="test-suites">
        {testData.map((suite, idx) => (
          <div key={idx} className="test-suite">
            <details>
              <summary>
                <span className="suite-name">{suite.suite}</span>
                <span className="suite-count">{suite.count} testes</span>
              </summary>
              <div className="test-list">
                {suite.tests.map((test, testIdx) => (
                  <div key={testIdx} className="test-item">
                    <span className="test-check">✓</span>
                    <span className="test-name">{test}</span>
                  </div>
                ))}
              </div>
            </details>
          </div>
        ))}
      </div>

      <div className="test-footer">
        <p>⏱️ <strong>Tempo de execução:</strong> 0.489s</p>
        <p>✅ <strong>Status:</strong> Todos os testes passaram com sucesso!</p>
      </div>
    </div>
  )
}
