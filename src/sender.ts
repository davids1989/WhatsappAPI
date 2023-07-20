import { start } from "repl";
import { create, Whatsapp, Message, SocketState } from "venom-bot";


class Sender{
    private client: Whatsapp

    constructor(){
        this.initialize()
    }

    async sendText(to: string, body: string){
        await this.client.sendText(to, body)
    }

    private initialize(){
        const qr = (base64Qrimg: string) => {
            //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || 
            //desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || 
            //noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || 
            //successPageWhatsapp || waitForLogin || waitChat || successChat
      
        }

        const status = (statusSession: String) => {}

        const start = (client: Whatsapp) => {
            this.client = client

            
        }


        create('ws-enviar', qr, status)
            .then((client) => start(client))
            .catch((error) => console.error(error))
    }

}

export default Sender