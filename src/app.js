//! Dependencias
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express');
const multer = require('multer');

//? Import files
const config = require('./config')
const userRouter = require('./users/users.routes').router
const authRouter = require('./auth/auth.routes').router
const customersRouter = require('./customers/customers.routes').router
const swaggerDocument = require('./users/swagger.json');
const {
    transporter
} = require('./tools/email');
//! Configuracion inicial
const app = express()

//? Habilitar la informacion entrante en formato Json
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(cors())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

app.get('/files/:name', (req, res) => {
    res.sendFile(__dirname + `/uploads/${req.params.name}`)

})

const upload = multer({
    storage
}
)

if (config.nodeEnv === 'development') {
    app.use(morgan("dev"))
} else {
    app.use(morgan("combined"))
}

//*Routes
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/users", userRouter, customersRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/customer", customersRouter)


app.listen(config.port, () => {
    console.log(`Server started at port ${config.port}`)
})

app.get('/email', (req, res) => {
    transporter.sendMail({
        subject: 'Test email',
        html: "Hello world <h1>hola</h1> <img width='200px' src='https://i.imgur.com/f33c3x9.jpeg'>",
        to: 'jhoseb29@gmail.com',
        from: 'xjhoseb@gmail.com'
    })
    res.status(200).json({
        message: "Email sent"
    })

})

app.post('/upload', upload.single('image'), (req, res) => {
    try {
        res.status(201).send(req.file)
    } catch (error) {
        res.status(400).json({message: 'Error uploading file'})
    }
})
    

module.exports = {
    app
}