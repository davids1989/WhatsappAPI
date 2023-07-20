import express, { Request, Response } from "express"

import Sender from "./sender"

const sender = new Sender()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/status', (req: Request, res: Response) => {
    return res.send({
        qr_code: sender.qrCode,
        connected: sender.isConnected
    })

})

app.post("/send", async (req: Request, res: Response) => {
    const { number, message } = req.body

    // Verificar se o número de telefone e a mensagem não estão vazios
    if (!number || !message) {
        return res.status(400).json({ status: "error", message: "Número de telefone e/ou mensagem não foram fornecidos corretamente." });
    }
    try {
        await sender.sendText(number, message)

        return res.status(200).json({ status: "success", message: "Mensagem enviada com sucesso!" });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ status: "error", message: "Ocorreu um erro ao enviar a mensagem." });
    }

})

app.listen(5000, () => {
    console.log("⚡ server started")
})