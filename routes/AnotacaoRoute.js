import { Router } from "express";
import { criarAnotacao, listarTodosAnotacao, obterAnotacao } from "../controllers/AnotacaoController.js";

const routesAnotacao = Router();

routesAnotacao
    .get('/anotacao', listarTodosAnotacao)
    .get('/anotacao/:id', obterAnotacao)
    .post('/criarAnotacao', criarAnotacao)
    export default routesAnotacao;
    
