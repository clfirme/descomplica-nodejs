// para utilizar as dependências do Express, criamos um ponto de entrada no index
// para utilizar as dependências do Express, criamos um ponto de entrada no index
import express from "express";
import bodyParser from "body-parser"; // Opcional em versões modernas do Express
import router from "./routes/router.js";

const app = express();

// Se estiver usando body-parser como módulo separado:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// OU nas versões mais recentes do Express (4.16.0+):
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

app.use("/", router);

app.listen(3000, function(){
    console.log("Listening to port 3000");
});