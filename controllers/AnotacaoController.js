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
export async function atualizarAnotacao(req, res) {}
export async function deletarAnotacao(req, res) {}
async function obterAnotacaoPorIDInterno(id) {
  try {
    const idAnotacao = await Anotacao.findByPk(id);
    return idAnotacao;
  } catch (error) {
    res.status(500).json({ mensagem: "Erro inesperado: " + error });
    console.error("Erro na requisição: " + error);
  }
}
