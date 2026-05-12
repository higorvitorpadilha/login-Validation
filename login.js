/**
 * Módulo de validação de login
 * Valida email e senha de um usuário
 */

/**
 * Valida o formato do email
 * @param {string} email - Email a ser validado
 * @returns {boolean} - True se email é válido, False caso contrário
 */
function validarEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}

/**
 * Valida a senha
 * @param {string} senha - Senha a ser validada
 * @returns {object} - Objeto com propriedades: valida (boolean) e mensagem (string)
 */
function validarSenha(senha) {
  if (!senha || typeof senha !== 'string') {
    return {
      valida: false,
      mensagem: 'Senha é obrigatória e deve ser uma string'
    };
  }

  if (senha.length < 6) {
    return {
      valida: false,
      mensagem: 'Senha deve ter no mínimo 6 caracteres'
    };
  }

  if (!/[A-Z]/.test(senha)) {
    return {
      valida: false,
      mensagem: 'Senha deve conter pelo menos uma letra maiúscula'
    };
  }

  if (!/[0-9]/.test(senha)) {
    return {
      valida: false,
      mensagem: 'Senha deve conter pelo menos um número'
    };
  }

  return {
    valida: true,
    mensagem: 'Senha válida'
  };
}

/**
 * Realiza o login do usuário
 * @param {string} email - Email do usuário
 * @param {string} senha - Senha do usuário
 * @returns {object} - Objeto com propriedades: sucesso (boolean), mensagem (string), usuario (object)
 */
function login(email, senha) {
  // Validar email
  if (!validarEmail(email)) {
    return {
      sucesso: false,
      mensagem: 'Email inválido',
      usuario: null
    };
  }

  // Validar senha
  const validacaoSenha = validarSenha(senha);
  if (!validacaoSenha.valida) {
    return {
      sucesso: false,
      mensagem: validacaoSenha.mensagem,
      usuario: null
    };
  }

  // Login bem-sucedido
  return {
    sucesso: true,
    mensagem: 'Login realizado com sucesso',
    usuario: {
      email: email,
      dataLogin: new Date().toISOString()
    }
  };
}

module.exports = {
  validarEmail,
  validarSenha,
  login
};
