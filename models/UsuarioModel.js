import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
const Usuario = sequelize.define('Usuario', {
    id_user:{
        primaryKey:true, type:DataTypes.INTEGER, autoIncrement:true, allowNull:false
    },
    nome_user:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email_user:{
        type:DataTypes.STRING,
        allowNull:false,
        unique
    },
    data_nasc_user:{
        type:DataTypes.DATE,
        allowNull:false

    },
    senha_user:{
        type:DataTypes.STRING,
        allowNull:false
    },
},
{
    tableName: "Usuario_tb",
    timestamps: false,
  })

export default Usuario;