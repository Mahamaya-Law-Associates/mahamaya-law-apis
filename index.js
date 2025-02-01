const express = require('express');
const router = express.Router();
const userRouter = require('./routers/userRouter');
const blogRouter = require('./routers/blogRouter')
const app = express();
const port = 4200;
const cors = require('cors');


app.use(express.json({limit: '5mb'}));
app.use('/user', userRouter);
app.use('/blog', blogRouter);

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://mahamaya-law.in',
        'https://mahamaya-law.vercel.app',
        'https://mahamaya-law-associates.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/about', (req, res) => {
    res.send('about world')
})


app.listen(port, () => {
    console.log("saurabh's server listening")

})

