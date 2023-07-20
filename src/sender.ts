import parsePhoneNumber, { isValidPhoneNumber } from "libphonenumber-js";
import { create, Whatsapp, Message, SocketState, CatchQR } from "venom-bot";

export type QRCode = {
    base64Qr: string
    asciiQR: string
    attempts: number
}


class Sender {
    private client: Whatsapp
    private connected: boolean
    private qr: QRCode
    private qrAttempts: number; // Nova variável para rastrear as tentativas


    get isConnected() : boolean {
        return this.connected
    }

    get qrCode() : QRCode {
        return this.qr
    }
    
    get qrAttemptsCount(): number { // Método para obter o número de tentativas
        return this.qrAttempts;
    }

    constructor() {
        this.qrAttempts = 0; // Inicializa o contador de tentativas
        this.initialize()
    }

    async sendText(to: string, body: string) {

        if (!isValidPhoneNumber(to, "BR")) {
            throw new Error("this number is not valid")
        }

        let phoneNumber = parsePhoneNumber(to, "BR")?.format("E.164")?.replace("+", "") as string
        phoneNumber = phoneNumber.includes("@c.us") ? phoneNumber : `${phoneNumber}@c.us`

        console.log("phoneNumber", phoneNumber)
        await this.client.sendText(phoneNumber, body)
    }

    private initialize() {
        const qr: CatchQR = (qrCode: string, asciiQR: string, attempt?: number) => {
            this.qrAttempts = attempt || 0; // Se attempt for undefined, atribui 0
            this.qr = { base64Qr: qrCode, asciiQR: asciiQR, attempts: this.qrAttempts };
        };

        const status = (statusSession: string) => { 

            this.connected = ["isLogged", "qrReadSuccess", "chatsAvailable", "successChat"].includes(
                statusSession
                )
        }

        const start = (client: Whatsapp) => {
            this.client = client


        }


        create('ws-enviar', qr, status)
            .then((client) => start(client))
            .catch((error) => console.error(error))
    }

}

export default Sender