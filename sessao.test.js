/**
 * Testes Unitários para o módulo de sessão
 */

const { criarSessao, validarSessao, encerrarSessao, obterSessao, limparSessoes, gerarIdSessao } = require('./sessao');

// Limpar sessões antes de cada teste
beforeEach(() => {
  limparSessoes();
});

describe('Geração de ID de Sessão', () => {
  test('deve gerar um ID de sessão válido', () => {
    const id = gerarIdSessao();
    expect(id).toBeDefined();
    expect(typeof id).toBe('string');
    expect(id).toMatch(/^SESS_/);
  });

  test('deve gerar IDs únicos', () => {
    const id1 = gerarIdSessao();
    const id2 = gerarIdSessao();
    expect(id1).not.toBe(id2);
  });
});

describe('Criação de Sessão', () => {
  test('deve criar uma sessão com sucesso', () => {
    const resultado = criarSessao('usuario@email.com');
    
    expect(resultado.sucesso).toBe(true);
    expect(resultado.mensagem).toBe('Sessão criada com sucesso');
    expect(resultado.sessao).toBeDefined();
    expect(resultado.sessao.email).toBe('usuario@email.com');
    expect(resultado.sessao.idSessao).toBeDefined();
    expect(resultado.sessao.dataCriacao).toBeDefined();
    expect(resultado.sessao.dataExpiracao).toBeDefined();
    expect(resultado.sessao.ativa).toBe(true);
  });

  test('deve falhar com email vazio', () => {
    const resultado = criarSessao('');
    
    expect(resultado.sucesso).toBe(false);
    expect(resultado.sessao).toBeNull();
  });

  test('deve falhar com email null', () => {
    const resultado = criarSessao(null);
    
    expect(resultado.sucesso).toBe(false);
    expect(resultado.sessao).toBeNull();
  });

  test('deve falhar com email undefined', () => {
    const resultado = criarSessao(undefined);
    
    expect(resultado.sucesso).toBe(false);
    expect(resultado.sessao).toBeNull();
  });

  test('deve definir expiração de sessão em 1 hora', () => {
    const resultado = criarSessao('usuario@email.com');
    const dataCriacao = new Date(resultado.sessao.dataCriacao);
    const dataExpiracao = new Date(resultado.sessao.dataExpiracao);
    
    const diferenca = dataExpiracao - dataCriacao;
    const umaHoraEmMs = 60 * 60 * 1000;
    
    expect(diferenca).toBe(umaHoraEmMs);
  });
});

describe('Validação de Sessão', () => {
  test('deve validar uma sessão ativa', () => {
    const sessaoCriada = criarSessao('usuario@email.com');
    const resultado = validarSessao(sessaoCriada.sessao.idSessao);
    
    expect(resultado.valida).toBe(true);
    expect(resultado.mensagem).toBe('Sessão válida');
    expect(resultado.sessao).toBeDefined();
  });

  test('deve rejeitar sessão com ID inválido', () => {
    const resultado = validarSessao('ID_INVALIDO_12345');
    
    expect(resultado.valida).toBe(false);
    expect(resultado.mensagem).toBe('Sessão não encontrada');
    expect(resultado.sessao).toBeNull();
  });

  test('deve rejeitar sessão sem ID', () => {
    const resultado = validarSessao(null);
    
    expect(resultado.valida).toBe(false);
    expect(resultado.mensagem).toBe('ID da sessão não fornecido');
  });

  test('deve rejeitar sessão inativa', () => {
    const sessaoCriada = criarSessao('usuario@email.com');
    const idSessao = sessaoCriada.sessao.idSessao;
    
    encerrarSessao(idSessao);
    const resultado = validarSessao(idSessao);
    
    expect(resultado.valida).toBe(false);
    expect(resultado.mensagem).toBe('Sessão inativa');
  });
});

describe('Encerramento de Sessão', () => {
  test('deve encerrar uma sessão com sucesso', () => {
    const sessaoCriada = criarSessao('usuario@email.com');
    const resultado = encerrarSessao(sessaoCriada.sessao.idSessao);
    
    expect(resultado.sucesso).toBe(true);
    expect(resultado.mensagem).toBe('Sessão encerrada com sucesso');
  });

  test('deve falhar ao encerrar sessão não existente', () => {
    const resultado = encerrarSessao('ID_INVALIDO');
    
    expect(resultado.sucesso).toBe(false);
    expect(resultado.mensagem).toBe('Sessão não encontrada');
  });

  test('deve falhar ao encerrar com ID vazio', () => {
    const resultado = encerrarSessao('');
    
    expect(resultado.sucesso).toBe(false);
    expect(resultado.mensagem).toBe('ID da sessão não fornecido');
  });

  test('deve desativar a sessão após encerramento', () => {
    const sessaoCriada = criarSessao('usuario@email.com');
    const idSessao = sessaoCriada.sessao.idSessao;
    
    encerrarSessao(idSessao);
    const resultado = validarSessao(idSessao);
    
    expect(resultado.valida).toBe(false);
  });
});

describe('Obtenção de Sessão', () => {
  test('deve obter uma sessão existente', () => {
    const sessaoCriada = criarSessao('usuario@email.com');
    const resultado = obterSessao(sessaoCriada.sessao.idSessao);
    
    expect(resultado.encontrada).toBe(true);
    expect(resultado.sessao).toBeDefined();
    expect(resultado.sessao.email).toBe('usuario@email.com');
  });

  test('deve retornar não encontrada para ID inválido', () => {
    const resultado = obterSessao('ID_INVALIDO');
    
    expect(resultado.encontrada).toBe(false);
    expect(resultado.sessao).toBeNull();
  });

  test('deve retornar não encontrada para ID vazio', () => {
    const resultado = obterSessao('');
    
    expect(resultado.encontrada).toBe(false);
    expect(resultado.sessao).toBeNull();
  });
});

describe('Limpeza de Sessões', () => {
  test('deve limpar todas as sessões', () => {
    criarSessao('usuario1@email.com');
    criarSessao('usuario2@email.com');
    
    limparSessoes();
    
    const resultado = obterSessao('qualquer_id');
    expect(resultado.encontrada).toBe(false);
  });
});
