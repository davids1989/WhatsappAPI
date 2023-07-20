import parsePhoneNumber, { isValidPhoneNumber } from "libphonenumber-js";
import { create, Whatsapp, Message, SocketState } from "venom-bot";


class Sender {
    private client: Whatsapp

    constructor() {
        this.initialize()
    }

    async sendText(to: string, body: string) {

        if (!isValidPhoneNumber(to, "BR")) {
            throw new Error("this number is not valid")
        }

        let phoneNumber = parsePhoneNumber(to, "BR")?.format("E.164")?.replace("+", "") as string
        phoneNumber = phoneNumber.includes("@c.us") ? phoneNumber : `${phoneNumber}@c.us`;

        console.log("phoneNumber", phoneNumber)
        await this.client.sendText(phoneNumber, body)
    }

    private initialize() {
        const qr = (base64Qrimg: string) => {
            //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || 
            //desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || 
            //noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || 
            //successPageWhatsapp || waitForLogin || waitChat || successChat

        }

        const status = (statusSession: String) => { }

        const start = (client: Whatsapp) => {
            this.client = client


        }


        create('ws-enviar', qr, status)
            .then((client) => start(client))
            .catch((error) => console.error(error))
    }

}

export default Sender