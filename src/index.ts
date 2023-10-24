import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './database/knex'
import { Video } from './models/Videos'
import { TVideoDB } from './types'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/videos", async (req: Request, res: Response) => {
    try {
        const videosDB: TVideoDB[] = await db("videos")

        const videos: Video[] = videosDB.map((videosDB) => new Video(
            videosDB.id,
            videosDB.titulo,
            videosDB.duracao_em_segundos,
            videosDB.data_de_upload
        ))

        res.status(200).send(videos)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.post("/videos", async (req: Request, res: Response) => {
    try {
        const { id, titulo, duracao_em_segundos, data_de_upload } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }

        if (typeof titulo !== "string") {
            res.status(400)
            throw new Error("'titulo' deve ser string")
        }

        if (typeof duracao_em_segundos !== "number") {
            res.status(400)
            throw new Error("'duracao_em_segundos' deve ser number")
        }

        if (typeof data_de_upload !== "string") {
            res.status(400)
            throw new Error("'data_de_upload' deve ser string")
        }

        const [ videoDBExists ]: TVideoDB[] | undefined[] = await db("videos").where({ id })

        if (videoDBExists) {
            res.status(400)
            throw new Error("'id' já existe")
        }

        const video = new Video (
            id,
            titulo,
            duracao_em_segundos,
            data_de_upload
        )

        const newVideo: TVideoDB = {
            id: video.getId(),
            titulo: video.getTitulo(),
            duracao_em_segundos: video.getDuracaoEmSegundos(),
            data_de_upload: video.getDataDeUpload(),
        }

        await db("videos").insert(newVideo)
        res.status(201).send("Video adicionado com sucesso")

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.put("/accounts/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const value = req.body.value

        if (typeof value !== "number") {
            res.status(400)
            throw new Error("'value' deve ser number")
        }

        const [ accountDB ]: TAccountDB[] | undefined[] = await db("accounts").where({ id })

        if (!accountDB) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        accountDB.balance += value

        await db("accounts").update({ balance: accountDB.balance }).where({ id })
        
        res.status(200).send(accountDB)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.delete("/accounts/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const value = req.body.value

        if (typeof value !== "number") {
            res.status(400)
            throw new Error("'value' deve ser number")
        }

        const [ accountDB ]: TAccountDB[] | undefined[] = await db("accounts").where({ id })

        if (!accountDB) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        accountDB.balance += value

        await db("accounts").update({ balance: accountDB.balance }).where({ id })
        
        res.status(200).send(accountDB)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
