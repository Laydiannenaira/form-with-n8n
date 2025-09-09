import React, { useState } from "react";

const Form = () => {
  // Estado para armazenar os valores do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState(""); // Para exibir feedback

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que a página recarregue

    try {
      const response = await fetch("http://localhost:5000/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email }),
      });

      if (response.ok) {
        setMensagem("Formulário enviado com sucesso!");
        setNome("");
        setEmail("");
      } else {
        setMensagem("Erro ao enviar o formulário.");
      }
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Formulário de Contato</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Enviar
        </button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default Form;
