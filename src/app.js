import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
// import MongoDBStore from "connect-mongodb-session";

const app = express()

// const mongoStore = MongoDBStore(session);

// const store = new mongoStore({
//   collection: "userSessions",
//   uri: process.env.mongoURI,
//   expires: 1000,
// });

app.set("trust proxy", 1);

app.use(cors({
    origin: 'https://triplevi.github.io',
    optionsSuccessStatus: 200,
    credentials: true,
}))

app.use(session({
    secret: 'session secret',
    // store: store,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 60000,
        sameSite: 'none',
    },
}))

app.use(bodyParser.json())

app.get('/api/v1/test', (req, res) => {
    req.session.User = {
        'name': 'triple vi',
        'address': 'hp',
    }
    console.log(req.session)
    // req.session.save(err => {
    //     console.log(err)
    // })
    // req.session.
    // console.log(req.signedCookies)
    // req.sessionStore.get(req.sessionID, (error, session) => {
    //     console.log('retrieved', session)
    // })
    res.send({
        data: 'hello world'
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