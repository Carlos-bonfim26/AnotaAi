import { Router } from "express";
import {
  atualizarAnotacao,
  criarAnotacao,
  deletarAnotacao,
  listarTodosAnotacao,
  obterAnotacao,
} from "../controllers/AnotacaoController.js";

const routesAnotacao = Router();

routesAnotacao
  .get("/anotacao", listarTodosAnotacao)
  .get("/anotacao/:id", obterAnotacao)
  .post("/criarAnotacao", criarAnotacao)
  .patch("/atualizarAnotacao/:id", atualizarAnotacao)
  .delete("/deletarAnotacao/:id", deletarAnotacao);

export default routesAnotacao;
