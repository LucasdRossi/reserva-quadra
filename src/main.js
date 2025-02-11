require("dotenv").config();

const cron = require("node-cron");
const reservaQuadra = require("./reservaQuadra");

const CPF = process.env.CPF;
const ENVIRONMENT = process.env.ENVIRONMENT;

if (ENVIRONMENT === "development") {
  reservaQuadra(CPF);
} else if (ENVIRONMENT === "production") {
  // Every Sunday 00:01
  cron.schedule(
    "1 0 * * 0",
    () => {
      console.log(`Executando tarefa agendada...`);
      reservaQuadra(CPF);
    },
    {
      scheduled: true,
      timezone: "America/Sao_Paulo",
    }
  );
}
