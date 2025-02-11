const dateFns = require("date-fns");

const { waitTimeout } = require("./utils");

const QUADRA_POLIESPORTIVA = 3131;
const URL = "https://buscaquadras.com.br/actions/locacoes_acoes.php";
const HORARIOS = ["18:00,18:30", "19:00,19:30"];

module.exports = async function reservaQuadra(cpf) {
  const today = new Date();

  let day = dateFns.addWeeks(today, 1);

  for (let i = 0; i < 5; i++) {
    day = dateFns.addDays(day, 1);

    if (dateFns.isWeekend(day)) {
      break;
    }

    const formatedDate = dateFns.format(day, "dd/MM/yyyy");

    console.log(`Agendando para o dia ${formatedDate}`);

    for (const horarios of HORARIOS) {
      console.log(`Agendando para o horário ${horarios}`);

      const body = {
        flag_local: "site",
        id_quadra: QUADRA_POLIESPORTIVA,
        somente_horario_cheio: "t",
        somente_horario_inteiro: "t",
        data_locacao: formatedDate,
        horario_inicial: horarios,
        id_tarifa: 20536,
        id_cliente_portal: 3523,
        controle_check: "",
        cpf,
        sub_confirmar_reserva_agendamento_online: "Confirmar Reserva",
        confirmacao_agendamento: 1,
      };

      await fetch(URL, {
        headers: {
          accept: "*/*",
          "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
          cookie: "PHPSESSID=dlj7058mh93e05mu0gv8558ss2",
          Referer:
            "https://buscaquadras.com.br/centro-esportivo-agendamento-online?a=riWC4S",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: new URLSearchParams(body),
        method: "POST",
      })
        .then((res) => {
          if (res.ok) {
            console.log("Reserva realizada com sucesso!");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    await waitTimeout(5000);
  }
};
