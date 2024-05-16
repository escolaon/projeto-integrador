class wppConnect {
  constructor(public nome: string, public telefone: string, public email: string) {
    this.telefone = telefone;
  }

  async criarToken() {
    return "Sessão criada"
  }

  async gerarQRCode() {
    return "QRCode gerado"
  }

  async entrar(telefone: string) {
    return "Entrou"
  }

  async sair(telefone: string) {
    return "Saiu"
  }

  async enviarMensagem(telefone: string, mensagem: string) {
    return "Mensagem enviada"
  }
}

const fs = require("fs");
import {writeFile} from "fs";
const wppconnect = require("@wppconnect-team/wppconnect");

export default defineEventHandler(async (event, phoneNumber, message) => {

  wppconnect
    .create({
      session: "sessionName",
      puppeteerOptions: {
        userDataDir: '.tokens/sessionName',
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
    .then((client) => start(client, phoneNumber, message))
    .catch((error) => console.log(error));

    async function start(client, phoneNumber, message) {
      setTimeout(async () => {
        await client
          .sendText(phoneNumber, message)
          .then((result) => {
            console.log("Result: ", result);
          })
          .catch((erro) => {
            console.error("Error when sending: ", erro);
          });
      }, 10000);
    }
});
