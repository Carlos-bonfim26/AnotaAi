import express from 'express'
import sequelize from './config/db.js';

const app = express();
const port = process.env.API_PORT

sequelize.authenticate()
    .then(()=> console.log("Banco de dados conectado com sucesso"))
    .catch(()=> console.log("Falha na conexão"))

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${
        port
    }`);
});


