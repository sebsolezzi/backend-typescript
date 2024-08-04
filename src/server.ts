import express from "express";
import router from "./router";
import db from "./config/db";
import colors from 'colors'
import morgan from 'morgan'
import cors, { CorsOptions } from 'cors'

//conectar a la base de datos
async function conectarDb() {
    try {
        await db.authenticate()
        db.sync() // ? Para actualizar las columnas si o cualquier cambio que hagamos en la base de datos
        //console.log(colors.bgCyan.bold.red('Connection has been established successfully.'));
    } catch (error) {
        //console.log(error)
        //console.log(colors.bgRed("Hubo un error al conectar a al base de datos"))
    }
}

conectarDb()
const server = express()

//permitir conexiones
/* 
    callback toma dos parametros
    error, que si hay error no permite la conexion aque ya la validamos con el if
    y si permite la conexion se pone true
*/
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
             callback(new Error('Error de cors'))
            }
    }
}
server.use(cors(corsOptions))

//leeer datos de formulario
server.use(express.json())
server.use(morgan('dev'))

//rutas
server.use('/api/products', router)

server.get('/api', (req, res) => {
    res.json({ msg: 'Desde API' })
})


export default server