import { Router } from "express";
import {
  atualizarUsuario,
  criarUsuario,
  listarUsuarios,
  usuario,
  deletarUsuario,
} from "../controllers/UsuarioController.js";

const routesUsuario = Router();

routesUsuario
  .get("/usuario", listarUsuarios)
  .get("/usuario/:id", usuario)
  .post("/criarusuario", criarUsuario)
  .put("/atualizarusuario/:id", atualizarUsuario)
  .delete("/deletarusuario/:id", deletarUsuario);

  export default routesUsuario;