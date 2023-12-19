import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express()

app.use(cors({
    origin: 'https://triplevi.github.io',
    optionsSuccessStatus: 200,
    credentials: true,
}))

app.use(session({
    secret: 'session secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 60000,
    },
}))

app.use(bodyParser.json())

app.get('/api/v1/test', (req, res) => {
    req.session.User = {
        'name': 'triple vi',
        'address': 'hp',
    }
    console.log(req.session)
    console.log(req.sessionID)
    // res.setHeader('')
    res.send({
        'data': 'hello world'
    })
})

app.post('/api/v1/test', (req, res) => {
    console.log(req.session)
    console.log(req.session.id)
    console.log(req.sessionID)
    res.send({
        data: 'hello world'
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running at port ${port}`)    
})