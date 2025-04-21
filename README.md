# 🎳 Bowling Lane Scheduling API

API RESTful para gerenciamento de pistas de boliche, clientes e agendamentos.

---

## 🚀 Tecnologias

- Node.js
- Express
- MongoDB + Mongoose
- OpenAPI (Swagger)
- Jest (testes)

---

## 📚 Sumário

- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Endpoints](#endpoints)
- [Modelos](#modelos)
- [Testes](#testes)
- [Licença](#licença)

---

## 🛠 Instalação

```bash
git clone https://github.com/seu-usuario/bowling-lane-api.git
cd bowling-lane-api
npm install
Crie um arquivo .env com as seguintes variáveis:

ini
Copiar
Editar
PORT=3000
MONGO_URI=mongodb://localhost:27017/bowling
Inicie o servidor:
npm run dev

▶️ Como Usar
Acesse a documentação interativa via Swagger:

http://localhost:3000/api-docs
Ou utilize um client HTTP (Insomnia, Postman) para testar os endpoints da API.

📌 Endpoints
🟢 Bowling Lanes (/bowling-lanes)
POST /bowling-lanes → Criar uma pista

GET /bowling-lanes → Listar todas as pistas

GET /bowling-lanes/name/:name → Buscar pista por nome

GET /bowling-lanes/id/:id → Buscar pista por ID

GET /bowling-lanes/schedule?date=YYYY-MM-DD&startHour=12 → Buscar pistas disponíveis

PUT /bowling-lanes/:id → Atualizar pista

DELETE /bowling-lanes/:id → Remover pista

🟡 Clients (/clients)
POST /clients → Cadastrar cliente

GET /clients → Listar clientes

GET /clients/id/:id → Buscar cliente por ID

GET /clients/document/:documentId → Buscar cliente por documento

GET /clients/schedule?date=YYYY-MM-DD&startHour=12 → Buscar clientes agendados

PUT /clients/:id → Atualizar cliente

DELETE /clients/:id → Deletar cliente

🔵 Schedules (/schedules)
POST /schedules → Criar agendamento

GET /schedules → Listar agendamentos

DELETE /schedules/:id → Cancelar agendamento

📦 Modelos
🎳 Bowling Lane
{
  id: string;
  name: string;
}
🙋 Client
{
  id: string;
  name: string;
  documentId: string;
  age: number;
}
⏰ Schedule
{
  id: string;
  date: string; // formato: YYYY-MM-DD
  startHour: number; // 0 a 23
  bowlingLaneId: string;
  clientId: string;
}
🧪 Testes
Para rodar os testes automatizados:


Copiar
Editar
npm test
📄 Licença
Este projeto está licenciado sob a licença MIT.

Desenvolvido com 💙 por James Junior
