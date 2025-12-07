import Anotacao from "../models/AnotacaoModel.js";

export async function criarAnotacao(req, res) {
  const { titulo_anotacao, data_create, descricao_anotacao, user_ID } =
    req.body;

  try {
    let novaAnatacao = {
      titulo_anotacao: titulo_anotacao,
      data_create: data_create,
      descricao_anotacao: descricao_anotacao,
      finalizada: false,
    };
    if (user_ID != undefined) {
      novaAnatacao.user_ID = user_ID;
    }

    const anoatacaoCriada = await Anotacao.create(novaAnatacao);
    res.status(201).json({ mensagem: "Anotação criada", anoatacaoCriada });
  } catch (error) {
    res.status(500).json({ mensagem: "erro inesperado: " + error });
  }
}
export async function listarTodosAnotacao(req, res) {
  try {
    const anatacoes = await Anotacao.findAll();
    res.status(200).json(anatacoes);
    return anatacoes;
  } catch (error) {
    res.status(500).json({ mensagem: "Erro inesperado: " + error });
    console.error("Erro na requisição: " + error);
  }
}
export async function obterAnotacao(req, res) {
  try {
    const { id } = req.params;
    const anotacaoId = await obterAnotacaoPorIDInterno(id);

    if (!anotacaoId) {
      return res.status(204).json({ mensagem: "Anotação não encontrada" });
    }

    return res.status(200).json(anotacaoId);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro inesperado: " + error });
    console.error("Erro na requisição: " + error);
  }
}
export async function atualizarAnotacao(req, res) {
  const { id } = req.params;
  const {
    titulo_anotacao,
    data_create,
    data_target,
    descricao_anotacao,
    user_ID,
  } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ mensagem: "ID inválido fornecido." });
  }

  try {
    const anotacaoExistente = await Anotacao.findByPk(id);

    if (!anotacaoExistente) {
      return res.status(404).json({ mensagem: "Anotação não encontrada." });
    }

    const dadosAtualizacao = {};

    if (titulo_anotacao !== undefined)
      dadosAtualizacao.titulo_anotacao = titulo_anotacao;
    if (data_create !== undefined) dadosAtualizacao.data_create = data_create;
    if (data_target !== undefined) dadosAtualizacao.data_target = data_target;
    if (descricao_anotacao !== undefined)
      dadosAtualizacao.descricao_anotacao = descricao_anotacao;
    if (user_ID !== undefined) {
      const usuarioExiste = await Usuario.findByPk(user_ID);
      if (!usuarioExiste) {
        return res.status(400).json({ mensagem: "Usuário não encontrado." });
      }
      dadosAtualizacao.user_ID = user_ID;
    }

    if (Object.keys(dadosAtualizacao).length === 0) {
      return res
        .status(400)
        .json({ mensagem: "Nenhum dado fornecido para atualização." });
    }

    const [linhasAfetadas] = await Anotacao.update(dadosAtualizacao, {
      where: {
        id_anotacao: id,
      },
    });

    if (linhasAfetadas === 0) {
      return res
        .status(404)
        .json({ mensagem: "Anotação não encontrada ou nenhum dado alterado." });
    }

    const anotacaoAtualizada = await Anotacao.findByPk(id);

    return res.status(200).json({
      mensagem: "Anotação atualizada com sucesso!",
      anotacao: anotacaoAtualizada,
    });
  } catch (error) {
    console.error("Erro na atualização da anotação:", error);

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        mensagem: "Erro de validação",
        erros: error.errors.map((e) => e.message),
      });
    }

    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        mensagem: "Erro de chave estrangeira: usuário não existe.",
      });
    }

    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}
export async function deletarAnotacao(req, res) {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ mensagem: "ID inválido fornecido." });
  }
  try {
    await Anotacao.destroy({
      where: {
        id_anotacao: id,
      },
    });
    return res.status(200).json({ mensagem: "usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro inesperado: " + error });
    console.error("Erro na requisição: " + error);
  }
}
async function obterAnotacaoPorIDInterno(id) {
  try {
    const idAnotacao = await Anotacao.findByPk(id);
    return idAnotacao;
  } catch (error) {
    res.status(500).json({ mensagem: "Erro inesperado: " + error });
    console.error("Erro na requisição: " + error);
  }
}
