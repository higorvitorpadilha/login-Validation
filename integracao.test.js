/**
 * Testes de Integração para o fluxo completo de login e sessão
 */

const { login } = require('./login');
const { criarSessao, validarSessao, encerrarSessao, obterSessao, limparSessoes } = require('./sessao');

// Limpar sessões antes de cada teste
beforeEach(() => {
  limparSessoes();
});

describe('Fluxo Completo de Login e Sessão', () => {
  
  test('deve fazer login e criar uma sessão válida', () => {
    // Passo 1: Fazer login
    const resultadoLogin = login('usuario@email.com', 'Senha123');
    expect(resultadoLogin.sucesso).toBe(true);

    // Passo 2: Criar sessão com o email do usuário logado
    const resultadoSessao = criarSessao(resultadoLogin.usuario.email);
    expect(resultadoSessao.sucesso).toBe(true);

    // Passo 3: Validar sessão criada
    const validacao = validarSessao(resultadoSessao.sessao.idSessao);
    expect(validacao.valida).toBe(true);
    expect(validacao.sessao.email).toBe('usuario@email.com');
  });

  test('deve fazer login com sucesso mas falhar na criação de sessão com email inválido', () => {
    // Passo 1: Fazer login
    const resultadoLogin = login('usuario@email.com', 'Senha123');
    expect(resultadoLogin.sucesso).toBe(true);

    // Passo 2: Tentar criar sessão com email vazio (erro simulado)
    const resultadoSessao = criarSessao('');
    expect(resultadoSessao.sucesso).toBe(false);
  });

  test('deve falhar no login com credenciais inválidas e não criar sessão', () => {
    // Passo 1: Tentar fazer login com email inválido
    const resultadoLogin = login('emailinvalido', 'Senha123');
    expect(resultadoLogin.sucesso).toBe(false);
    expect(resultadoLogin.usuario).toBeNull();

    // Passo 2: Verificar que nenhuma sessão foi criada
    // (não há usuário para criar sessão)
  });

  test('deve falhar no login com senha fraca e não criar sessão', () => {
    // Passo 1: Tentar fazer login com senha inválida
    const resultadoLogin = login('usuario@email.com', 'senha123');
    expect(resultadoLogin.sucesso).toBe(false);

    // Passo 2: Verificar que nenhuma sessão foi criada
  });

  test('deve fazer login, criar sessão e depois encerrar sessão', () => {
    // Passo 1: Fazer login
    const resultadoLogin = login('usuario@email.com', 'Senha123');
    expect(resultadoLogin.sucesso).toBe(true);

    // Passo 2: Criar sessão
    const resultadoSessao = criarSessao(resultadoLogin.usuario.email);
    expect(resultadoSessao.sucesso).toBe(true);

    // Passo 3: Validar que a sessão está ativa
    const validacaoAntes = validarSessao(resultadoSessao.sessao.idSessao);
    expect(validacaoAntes.valida).toBe(true);

    // Passo 4: Encerrar sessão
    const resultadoEncerramento = encerrarSessao(resultadoSessao.sessao.idSessao);
    expect(resultadoEncerramento.sucesso).toBe(true);

    // Passo 5: Validar que a sessão está inativa
    const validacaoDepois = validarSessao(resultadoSessao.sessao.idSessao);
    expect(validacaoDepois.valida).toBe(false);
    expect(validacaoDepois.mensagem).toBe('Sessão inativa');
  });

  test('deve fazer login, criar múltiplas sessões e gerenciá-las', () => {
    // Passo 1: Fazer login
    const resultadoLogin = login('usuario@email.com', 'Senha123');
    expect(resultadoLogin.sucesso).toBe(true);

    // Passo 2: Criar primeira sessão
    const sessao1 = criarSessao(resultadoLogin.usuario.email);
    expect(sessao1.sucesso).toBe(true);

    // Passo 3: Criar segunda sessão
    const sessao2 = criarSessao(resultadoLogin.usuario.email);
    expect(sessao2.sucesso).toBe(true);

    // Passo 4: Validar que ambas as sessões existem e estão ativas
    const validacao1 = validarSessao(sessao1.sessao.idSessao);
    const validacao2 = validarSessao(sessao2.sessao.idSessao);
    expect(validacao1.valida).toBe(true);
    expect(validacao2.valida).toBe(true);

    // Passo 5: Encerrar primeira sessão
    encerrarSessao(sessao1.sessao.idSessao);

    // Passo 6: Validar que primeira sessão está inativa mas segunda ainda ativa
    const validacao1Depois = validarSessao(sessao1.sessao.idSessao);
    const validacao2Depois = validarSessao(sessao2.sessao.idSessao);
    expect(validacao1Depois.valida).toBe(false);
    expect(validacao2Depois.valida).toBe(true);
  });

  test('deve fazer login, criar sessão e recuperar informações da sessão', () => {
    // Passo 1: Fazer login
    const resultadoLogin = login('usuario@email.com', 'Senha123');
    expect(resultadoLogin.sucesso).toBe(true);

    // Passo 2: Criar sessão
    const resultadoSessao = criarSessao(resultadoLogin.usuario.email);
    expect(resultadoSessao.sucesso).toBe(true);

    // Passo 3: Obter informações da sessão
    const obtencaoSessao = obterSessao(resultadoSessao.sessao.idSessao);
    expect(obtencaoSessao.encontrada).toBe(true);
    expect(obtencaoSessao.sessao.email).toBe('usuario@email.com');
    expect(obtencaoSessao.sessao.ativa).toBe(true);
    expect(obtencaoSessao.sessao.dataCriacao).toBeDefined();
    expect(obtencaoSessao.sessao.dataExpiracao).toBeDefined();
  });

  test('deve fazer login, criar sessão e validar período de expiração', () => {
    // Passo 1: Fazer login
    const resultadoLogin = login('usuario@email.com', 'Senha123');
    expect(resultadoLogin.sucesso).toBe(true);

    // Passo 2: Criar sessão
    const resultadoSessao = criarSessao(resultadoLogin.usuario.email);
    expect(resultadoSessao.sucesso).toBe(true);

    // Passo 3: Validar que a data de expiração é posterior à de criação
    const dataCriacao = new Date(resultadoSessao.sessao.dataCriacao);
    const dataExpiracao = new Date(resultadoSessao.sessao.dataExpiracao);
    expect(dataExpiracao.getTime()).toBeGreaterThan(dataCriacao.getTime());

    // Passo 4: Validar que a diferença é de 1 hora
    const umaHoraEmMs = 60 * 60 * 1000;
    const diferenca = dataExpiracao.getTime() - dataCriacao.getTime();
    expect(diferenca).toBe(umaHoraEmMs);
  });

  test('deve falhar em todo o fluxo com email inválido desde o início', () => {
    // Passo 1: Tentar fazer login com email inválido
    const resultadoLogin = login('nao-eh-email', 'Senha123');
    expect(resultadoLogin.sucesso).toBe(false);
    expect(resultadoLogin.mensagem).toBe('Email inválido');

    // Não há usuário para criar sessão
  });

  test('deve fazer login com sucesso mas falhar na validação de sessão inexistente', () => {
    // Passo 1: Fazer login
    const resultadoLogin = login('usuario@email.com', 'Senha123');
    expect(resultadoLogin.sucesso).toBe(true);

    // Passo 2: Tentar validar uma sessão que não existe
    const validacao = validarSessao('ID_SESSAO_INEXISTENTE');
    expect(validacao.valida).toBe(false);
    expect(validacao.mensagem).toBe('Sessão não encontrada');
  });
});
