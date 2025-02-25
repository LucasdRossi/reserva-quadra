require("dotenv").config();

const cron = require("node-cron");
const reservaQuadra = require("./reservaQuadra");

const CPFS = process.env.CPFS;
const ENVIRONMENT = process.env.ENVIRONMENT;

if (ENVIRONMENT === "development") {
  const parsedCPFs = CPFS.split(",").map((cpf) => cpf.trim());

  reservaQuadra(parsedCPFs);
} else if (ENVIRONMENT === "production") {
  // Every Sunday 00:01
  cron.schedule(
    "1 0 * * 0",
    () => {
      console.log(`Executando tarefa agendada...`);
      reservaQuadra(parsedCPFs);
    },
    {
      scheduled: true,
      timezone: "America/Sao_Paulo",
    }
  );
}
