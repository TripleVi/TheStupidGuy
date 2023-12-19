import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import MongoDBStore from "connect-mongodb-session";

const app = express()

const mongoStore = MongoDBStore(session);

const store = new mongoStore({
  collection: "userSessions",
  uri: process.env.mongoURI,
  expires: 1000,
});

// app.set("trust proxy", 1);

app.use(cors({
    origin: 'https://triplevi.github.io',
    optionsSuccessStatus: 200,
    credentials: true,
    exposedHeaders: ['set-cookie'],
}))

app.use(session({
    name: 'access_token',
    secret: 'session secret',
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 60000,
        sameSite: 'none',
        domain: 'localhost'
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
    // res.cookie('access_token', req.session.cookie, {
    //     secure: false,
    //     httpOnly: false,
    //     maxAge: 60000,
    //     sameSite: 'none',
    // })
    res.send({
        'id': req.session.id
    })
})

app.post('/api/v1/test', (req, res) => {
    console.log(req.headers['cookie'])
    console.log(req.headers['set-cookie'])
    console.log(req.session)
    console.log(req.session.id)
    res.send({
        data: 'hello world'
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running at port ${port}`)    
})