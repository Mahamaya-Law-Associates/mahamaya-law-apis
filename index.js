const express = require('express');
const userRouter = require('./routers/userRouter');
const blogRouter = require('./routers/blogRouter')
const app = express();
const port = 4200;
const cors = require('cors');


app.use(express.json()) 
app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(cors());


app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/about', (req, res) => {
    res.send('about world')
})


app.listen(port, () => {
    console.log("saurabh's server listening")

})

