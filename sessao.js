/**
 * Módulo de gerenciamento de sessão
 * Gerencia criação, validação e término de sessões de usuário
 */

// Simulação de um banco de dados em memória para armazenar sessões
const sessoes = {};

/**
 * Gera um ID de sessão único
 * @returns {string} - ID da sessão
 */
function gerarIdSessao() {
  return 'SESS_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Cria uma nova sessão para um usuário
 * @param {string} email - Email do usuário
 * @returns {object} - Objeto com propriedades: idSessao (string), email (string), dataCriacao (string), dataExpiracao (string)
 */
function criarSessao(email) {
  if (!email || typeof email !== 'string') {
    return {
      sucesso: false,
      mensagem: 'Email é obrigatório e deve ser uma string',
      sessao: null
    };
  }

  const idSessao = gerarIdSessao();
  const dataCriacao = new Date();
  const dataExpiracao = new Date(dataCriacao.getTime() + 60 * 60 * 1000); // 1 hora de expiração

  const sessao = {
    idSessao,
    email,
    dataCriacao: dataCriacao.toISOString(),
    dataExpiracao: dataExpiracao.toISOString(),
    ativa: true
  };

  sessoes[idSessao] = sessao;

  return {
    sucesso: true,
    mensagem: 'Sessão criada com sucesso',
    sessao
  };
}

/**
 * Valida se uma sessão é válida
 * @param {string} idSessao - ID da sessão
 * @returns {object} - Objeto com propriedades: valida (boolean), mensagem (string)
 */
function validarSessao(idSessao) {
  if (!idSessao) {
    return {
      valida: false,
      mensagem: 'ID da sessão não fornecido',
      sessao: null
    };
  }

  const sessao = sessoes[idSessao];

  if (!sessao) {
    return {
      valida: false,
      mensagem: 'Sessão não encontrada',
      sessao: null
    };
  }

  if (!sessao.ativa) {
    return {
      valida: false,
      mensagem: 'Sessão inativa',
      sessao: null
    };
  }

  const agora = new Date();
  const dataExpiracao = new Date(sessao.dataExpiracao);

  if (agora > dataExpiracao) {
    sessao.ativa = false;
    return {
      valida: false,
      mensagem: 'Sessão expirada',
      sessao: null
    };
  }

  return {
    valida: true,
    mensagem: 'Sessão válida',
    sessao
  };
}

/**
 * Encerra uma sessão
 * @param {string} idSessao - ID da sessão
 * @returns {object} - Objeto com propriedades: sucesso (boolean), mensagem (string)
 */
function encerrarSessao(idSessao) {
  if (!idSessao) {
    return {
      sucesso: false,
      mensagem: 'ID da sessão não fornecido'
    };
  }

  const sessao = sessoes[idSessao];

  if (!sessao) {
    return {
      sucesso: false,
      mensagem: 'Sessão não encontrada'
    };
  }

  sessao.ativa = false;

  return {
    sucesso: true,
    mensagem: 'Sessão encerrada com sucesso'
  };
}

/**
 * Obtém informações de uma sessão
 * @param {string} idSessao - ID da sessão
 * @returns {object} - Objeto com propriedades: encontrada (boolean), sessao (object)
 */
function obterSessao(idSessao) {
  if (!idSessao) {
    return {
      encontrada: false,
      sessao: null
    };
  }

  const sessao = sessoes[idSessao];

  if (!sessao) {
    return {
      encontrada: false,
      sessao: null
    };
  }

  return {
    encontrada: true,
    sessao
  };
}

/**
 * Limpa todas as sessões (útil para testes)
 */
function limparSessoes() {
  for (const key in sessoes) {
    delete sessoes[key];
  }
}

module.exports = {
  criarSessao,
  validarSessao,
  encerrarSessao,
  obterSessao,
  limparSessoes,
  gerarIdSessao
};
