import Usuario from "../models/UsuarioModel.js";

export async function listarUsuarios(req, res) {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
    return usuarios;
  } catch (error) {
    res.status(500).json({ mensagem: "Erro inesperado: " + error });
    console.error("Erro na requisição: " + error);
  }
}
export async function usuario(req, res) {
  try {
    const { id } = req.params;
    const usuarioId = await obterUsuarioPorIdInterno(id);
    if (!usuarioId) {
      return res.status(204).json({ mensagem: "Usuário não encontrado" });
    }
    return res.status(200).json(usuarioId);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro inesperado: " + error });
    console.error("Erro na requisição: " + error);
  }
}
export async function criarUsuario(req, res) {
  const { nome_user, email_user, data_nasc_user, senha_user } = req.body;
  const emailExiste = await buscarEmail(email_user);

  if (emailExiste) {
    try {
      const novoUsuario = await Usuario.create({
        nome_user,
        email_user,
        data_nasc_user,
        senha_user,
      });
      return res.status(201).json(novoUsuario);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro inesperado: " + error });
      console.error("Erro na requisição: " + error);
    }
  } else {
    return res.status(409).json({
      mensagem: `O email ${email_user} já existe na nossa base de dados e não pode ser cadastrado novamente`,
    });
  }
}
export async function atualizarUsuario(req, res) {
  const { id } = req.params;
  const { nome_user, email_user, data_nasc_user, senha_user } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ mensagem: "ID inválido fornecido." });
  }
  try {
    const usuarioExistente = await Usuario.findByPk(id);
    if (!usuarioExistente) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    const dadosAtualizacao = {};
    if (nome_user !== undefined) dadosAtualizacao.nome_user = nome_user;
    if (email_user !== undefined) dadosAtualizacao.email_user = email_user;
    if (data_nasc_user !== undefined)
      dadosAtualizacao.data_nasc_user = data_nasc_user;
    if (senha_user !== undefined) dadosAtualizacao.senha_user = senha_user;
    await usuarioExistente.update(dadosAtualizacao);
    return res.status(200).json(usuarioExistente);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro inesperado: " + error });
    console.error("Erro na requisição: " + error);
  }
}
export async function deletarUsuario(req, res) {
  const { id } = req.params;
  if (!id || isNaN(id)) {
    return res.status(400).json({ mensagem: "ID inválido fornecido." });
  }
  try {
    const usuarioExistente = await Usuario.findByPk(id);
    if (!usuarioExistente) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }
    await Usuario.destroy({
      where: {
        id_user: id,
      },
    });
    return res.status(200).json({ mensagem: "usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro inesperado: " + error });
    console.error("Erro na requisição: " + error);
  }
}
async function obterUsuarioPorIdInterno(id) {
  try {
    const idUsuario = await Usuario.findByPk(id);
    return idUsuario;
  } catch (error) {
    console.error("Erro ao obter usuário por ID: " + error);
    throw error;
  }
}
async function buscarEmail(email) {
  const emailExistente = (await Usuario.findOne({
    where: {
      email_user: email,
    },
  }))
    ? true
    : false;
  return emailExistente;
}
