/**
 * Testes Unitários para o módulo de login
 */

const { validarEmail, validarSenha, login } = require('./login');

describe('Validação de Email', () => {
  test('deve aceitar email válido', () => {
    expect(validarEmail('usuario@email.com')).toBe(true);
  });

  test('deve aceitar email com domínio maior', () => {
    expect(validarEmail('teste@empresa.com.br')).toBe(true);
  });

  test('deve rejeitar email sem @', () => {
    expect(validarEmail('usuarioemail.com')).toBe(false);
  });

  test('deve rejeitar email sem domínio', () => {
    expect(validarEmail('usuario@')).toBe(false);
  });

  test('deve rejeitar email vazio', () => {
    expect(validarEmail('')).toBe(false);
  });

  test('deve rejeitar email null', () => {
    expect(validarEmail(null)).toBe(false);
  });

  test('deve rejeitar email undefined', () => {
    expect(validarEmail(undefined)).toBe(false);
  });

  test('deve rejeitar email que não é string', () => {
    expect(validarEmail(123)).toBe(false);
  });

  test('deve rejeitar email com espaços', () => {
    expect(validarEmail('usuario @email.com')).toBe(false);
  });
});

describe('Validação de Senha', () => {
  test('deve aceitar senha válida com maiúscula e número', () => {
    const resultado = validarSenha('Senha123');
    expect(resultado.valida).toBe(true);
    expect(resultado.mensagem).toBe('Senha válida');
  });

  test('deve rejeitar senha menor que 6 caracteres', () => {
    const resultado = validarSenha('Abc12');
    expect(resultado.valida).toBe(false);
    expect(resultado.mensagem).toBe('Senha deve ter no mínimo 6 caracteres');
  });

  test('deve rejeitar senha sem letra maiúscula', () => {
    const resultado = validarSenha('senha123');
    expect(resultado.valida).toBe(false);
    expect(resultado.mensagem).toBe('Senha deve conter pelo menos uma letra maiúscula');
  });

  test('deve rejeitar senha sem número', () => {
    const resultado = validarSenha('SenhaABC');
    expect(resultado.valida).toBe(false);
    expect(resultado.mensagem).toBe('Senha deve conter pelo menos um número');
  });

  test('deve rejeitar senha vazia', () => {
    const resultado = validarSenha('');
    expect(resultado.valida).toBe(false);
  });

  test('deve rejeitar senha null', () => {
    const resultado = validarSenha(null);
    expect(resultado.valida).toBe(false);
  });

  test('deve rejeitar senha undefined', () => {
    const resultado = validarSenha(undefined);
    expect(resultado.valida).toBe(false);
  });

  test('deve rejeitar senha que não é string', () => {
    const resultado = validarSenha(123456);
    expect(resultado.valida).toBe(false);
  });
});

describe('Função Login', () => {
  test('deve fazer login com sucesso com credenciais válidas', () => {
    const resultado = login('usuario@email.com', 'Senha123');
    
    expect(resultado.sucesso).toBe(true);
    expect(resultado.mensagem).toBe('Login realizado com sucesso');
    expect(resultado.usuario).not.toBeNull();
    expect(resultado.usuario.email).toBe('usuario@email.com');
    expect(resultado.usuario.dataLogin).toBeDefined();
  });

  test('deve falhar com email inválido', () => {
    const resultado = login('emailinvalido', 'Senha123');
    
    expect(resultado.sucesso).toBe(false);
    expect(resultado.mensagem).toBe('Email inválido');
    expect(resultado.usuario).toBeNull();
  });

  test('deve falhar com senha inválida', () => {
    const resultado = login('usuario@email.com', 'abc');
    
    expect(resultado.sucesso).toBe(false);
    expect(resultado.usuario).toBeNull();
  });

  test('deve falhar com email vazio', () => {
    const resultado = login('', 'Senha123');
    
    expect(resultado.sucesso).toBe(false);
    expect(resultado.mensagem).toBe('Email inválido');
  });

  test('deve falhar com senha vazia', () => {
    const resultado = login('usuario@email.com', '');
    
    expect(resultado.sucesso).toBe(false);
    expect(resultado.usuario).toBeNull();
  });

  test('deve retornar data de login em formato ISO', () => {
    const resultado = login('usuario@email.com', 'Senha123');
    
    expect(resultado.usuario.dataLogin).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });
});
