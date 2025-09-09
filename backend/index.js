const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rota para receber dados do formulário
app.post("/form", async (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios." });
  }

  try {
    // Enviar dados para o n8n
    await axios.post("http://localhost:5678/webhook/formulario", { nome, email });
    res.status(200).json({ message: "Dados enviados para o n8n com sucesso!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Erro ao enviar dados para o n8n." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
