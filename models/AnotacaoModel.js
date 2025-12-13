import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Usuario from "./UsuarioModel.js";

const Anotacao = sequelize.define(
  "Anotacao",
  {
    id_anotacao: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement:true,
      allowNull: false,
    },
    titulo_anotacao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_create: {
      type: DataTypes.DATE,
    },
    data_target: {
      type: DataTypes.DATE,
    },
    descricao_anotacao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_ID: {
      key:true,
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Anotacao_tb",
    timestamps: false,
  }
);
Usuario.hasMany(Anotacao, {foreignKey:"id_usuario"});
Anotacao.belongsTo(Usuario,{foreignKey:"user_ID"});
export default Anotacao;
