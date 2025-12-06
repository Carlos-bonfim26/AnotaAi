import express from 'express'
import sequelize from './config/db.js';
import routesAnotacao from './routes/AnotacaoRoute.js';

const app = express();

app.use(express.json())
app.use("/", routesAnotacao)
const port = process.env.API_PORT

sequelize.authenticate()
    .then(()=> console.log("Banco de dados conectado com sucesso"))
    .catch(()=> console.log("Falha na conexão"))

app.listen(port, ()=>{
    console.log(`Servidor rodando`);
});


