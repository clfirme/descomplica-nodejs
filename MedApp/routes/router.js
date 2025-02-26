import express from "express";
const router = express.Router();

// suas rotas aqui
router.get("/", (req, res) => {
    console.log("Hello!"); // Isto apenas registra no console do servidor
    res.status(200).json({message: "Hello!"}); // Uma única resposta ao cliente
  });

export default router;  // Exportação padrão