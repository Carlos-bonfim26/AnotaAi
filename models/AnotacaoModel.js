import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const Anotacao = sequelize.define('Anotacao', {
    id_anotacao: {
        primaryKey, type:DataTypes.INTEGER, autoIncrement, allowNull: false
    },
    titulo_anotacao:{
        type:DataTypes.STRING, 
        allowNull:false,
    },
    data_create:{
        type:DataTypes.DATE,
    },
    data_target:{
        type:DataTypes.DATE,
    },
    descricao_anotacao:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    user_ID:{
        key, type:DataTypes.INTEGER
    }
})