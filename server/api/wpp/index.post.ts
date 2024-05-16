import { PrismaClient } from "@prisma/client"
import { H3Event } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: H3Event) => {
  
  const body = await readBody(event);

  const celular = body.celular;
  const mensagem = "Olá {{ responsavel }}, o aluno {{ aluno }} não participou das aulas {{ ocorrencias }} hoje. Retorne este contato para falar com a coordenação da escola caso tenha alguma dúvida."


  const wppconnect = require("@wppconnect-team/wppconnect");

  wppconnect
    .create({
      session: "session",
      puppeteerOptions: {
        userDataDir: '.tokens/session',
      },
      catchQR: (base64Qr: string, asciiQR: any) => {
        console.log(asciiQR);
        var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
          response = {};

        if (matches.length !== 3) {
          return new Error("Invalid input string");
        }
        response.type = matches[1];
        response.data = new Buffer.from(matches[2], "base64");

        var imageBuffer = response;
        writeFile(
          "out.png",
          imageBuffer["data"],
          "binary",
          function (err) {
            if (err != null) {
              console.log(err);
            }
          }
        );
      },
      logQR: false,
    })
    .then((client: { sendText: (arg0: any, arg1: any) => Promise<any>; }) => start(client, celular, mensagem))
    .catch((error: any) => console.log(error));

    async function start(client: { sendText: (arg0: any, arg1: any) => Promise<any>; }, celular: any, mensagem: string) {
      setTimeout(async () => {
        await client
          .sendText(celular, mensagem)
          .then((result: any) => {
            console.log("Result: ", result);
          })
          .catch((erro: any) => {
            console.error("Error when sending: ", erro);
          });
      }, 10000);
    }
});